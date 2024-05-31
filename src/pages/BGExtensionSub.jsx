import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { convertToEpoch, formatDate } from "../utils/getDateTimeNow";
import { toast } from "react-toastify";

const BGExtensionSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tableData, setTableData] = useState([]);
  const { token } = useSelector((state) => state.auth);

  const handlePopupToggle = () => {
    setIsPopup(!isPopup);
  };

  const predefinedRanges = [
    { value: "lastMonth", label: "Last Month" },
    { value: "lastTwoMonths", label: "Last Two Months" },
  ];

  const handleRangeChange = (selectedOption) => {
    const today = new Date();
    let start, end;

    if (selectedOption.value === "lastMonth") {
      start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      end = new Date(today.getFullYear(), today.getMonth(), 0);
    } else if (selectedOption.value === "lastTwoMonths") {
      start = new Date(today.getFullYear(), today.getMonth() - 2, 1);
      end = new Date(today.getFullYear(), today.getMonth(), 0);
    }

    setStartDate(start);
    setEndDate(end);
    handleSearch(start, end); // Fetch data for the new date range
  };

  const handleSearch = async (start = startDate, end = endDate) => {
    if (start && end) {
      const payload = {
        startDate: convertToEpoch(new Date(start)),
        endDate: convertToEpoch(new Date(end)),
      };

      try {
        const empListData = await apiCallBack(
          "POST",
          `po/sdbg/sdbgfilterData`,
          payload,
          token
        );
        if (empListData) {
          setTableData(empListData);
        } else {
          console.error("Error fetching data:", empListData.message);
        }
      } catch (error) {
        console.error("Error fetching employee list:", error.message);
      }
    } else {
      toast.warning("Please select both start and end dates.");
    }
  };

  const handleSave = (index) => {
    // Implement the save logic here
    console.log(`Save clicked for row ${index}`);
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <div className="d-flex flex-column flex-row-fluid">
            <MainHeader title={"BG Extension/Release"} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="d-flex">
                            <div className="me-2">
                              <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                selectsStart
                                startDate={startDate}
                                endDate={endDate}
                                className="form-control me-2"
                                placeholderText="Start Date"
                              />
                            </div>
                            <div className="me-2">
                              <DatePicker
                                selected={endDate}
                                onChange={(date) => setEndDate(date)}
                                selectsEnd
                                startDate={startDate}
                                endDate={endDate}
                                minDate={startDate}
                                className="form-control me-2"
                                placeholderText="End Date"
                              />
                            </div>
                            <button
                              className="btn fw-bold btn-sm btn-primary me-2"
                              onClick={() => handleSearch(startDate, endDate)}
                            >
                              SEARCH
                            </button>
                          </div>
                          <Select
                            className="me-2"
                            options={predefinedRanges}
                            onChange={handleRangeChange}
                            placeholder="Select Range"
                            styles={{
                              container: (base) => ({ ...base, width: 200 }),
                            }}
                          />
                        </div>
                        <div className="table-responsive">
                          <table className="table table-striped table-bordered table_height">
                            <thead>
                              <tr className="border-0">
                                <th>PO Num</th>
                                <th>BG Ref Num</th>
                                <th>BG File No</th>
                                <th>Validity Date</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {tableData?.length > 0 ? (
                                tableData.map((item, index) => (
                                  <tr key={index}>
                                    <td className="table_center">
                                      {item.purchasing_doc_no}
                                    </td>
                                    <td>{item.reference_no}</td>
                                    <td>{item.bgFileNo}</td>
                                    <td>
                                      {item.validity_date &&
                                        formatDate(item.validity_date)}
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <select
                                          name="action"
                                          className="form-control me-2"
                                        >
                                          <option value="Extension">
                                            Extension
                                          </option>
                                          <option value="Release">
                                            Release
                                          </option>
                                        </select>
                                        <button
                                          className="btn btn-primary"
                                          onClick={() => handleSave(index)}
                                        >
                                          SAVE
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="5" className="text-center">
                                    No data available
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
      {isPopup && (
        <div className="popup active">
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Upload Shipping Documents
                </span>
              </h3>
              <button
                className="btn fw-bold btn-danger"
                onClick={handlePopupToggle}
              >
                Close
              </button>
            </div>
            <form>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Shipping File Type <span className="star">*</span>
                    </label>
                    <input type="text" className="form-control" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Shipping File <span className="star">*</span>
                    </label>
                    <input type="file" className="form-control" />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Remarks</label>
                    <textarea rows="4" className="form-control"></textarea>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <button className="btn fw-bold btn-primary">UPDATE</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BGExtensionSub;
