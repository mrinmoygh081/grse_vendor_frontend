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
import SkeletonLoader from "../loader/SkeletonLoader";

const BGExtensionSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const { token } = useSelector((state) => state.auth);

  const handlePopupToggle = () => {
    setIsPopup(!isPopup);
  };

  const predefinedRanges = [
    { value: "upcomingOneMonth", label: "Upcoming One Month" },
    { value: "upcomingTwoMonths", label: "Upcoming Two Months" },
  ];

  const handleRangeChange = (selectedOption) => {
    const today = new Date();
    let start, end;

    if (selectedOption.value === "upcomingOneMonth") {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    } else if (selectedOption.value === "upcomingTwoMonths") {
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    }

    setStartDate(start);
    setEndDate(end);
    handleSearch(start, end); // Fetch data for the new date range
  };

  const handleSearch = async (start = startDate, end = endDate) => {
    if (start && end) {
      setLoading(true); // Start loading
      const payload = {
        startDate: convertToEpoch(new Date(start)),
        endDate: convertToEpoch(new Date(end)),
      };

      try {
        const empListData = await apiCallBack(
          "POST",
          `po/sdbg/bger`,
          payload,
          token
        );
        if (empListData?.data) {
          setTableData(empListData.data);
        } else {
          console.error("Error fetching data:", empListData.message);
        }
      } catch (error) {
        console.error("Error fetching employee list:", error.message);
      } finally {
        setLoading(false); // End loading
      }
    } else {
      toast.warning("Please select both start and end dates.");
    }
  };

  const handleSave = (index, action) => {
    setSelectedRow(index);
    setSelectedAction(action);
    setIsPopup(true);
  };

  const handlePopupSave = () => {
    // Implement the save logic here, e.g., send selectedDate and selectedAction to the backend
    console.log(`Action: ${selectedAction}, Date: ${selectedDate}`);
    setIsPopup(false); // Close the popup after saving
  };

  const formatDatee = (timestamp) => {
    if (!timestamp || timestamp === "0") return "";
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString("en-US");
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
                                aria-label="Start Date"
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
                                aria-label="End Date"
                              />
                            </div>
                            <button
                              className="btn fw-bold btn-sm btn-primary me-2"
                              onClick={() => handleSearch(startDate, endDate)}
                              aria-label="Search"
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
                            aria-label="Select Range"
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
                              {loading ? (
                                <tr>
                                  <td colSpan="5">
                                    <SkeletonLoader />
                                  </td>
                                </tr>
                              ) : tableData?.length > 0 ? (
                                tableData.map((item, index) => (
                                  <tr key={index}>
                                    <td className="table_center">
                                      {item.purchasing_doc_no}
                                    </td>
                                    <td>{item.reference_no}</td>
                                    <td>{item.bg_file_no || ""}</td>
                                    <td>
                                      {item.validity_date &&
                                        formatDatee(item.validity_date)}
                                    </td>
                                    <td>
                                      <div className="d-flex">
                                        <select
                                          name="action"
                                          className="form-select me-2"
                                          aria-label="Action"
                                          onChange={(e) =>
                                            setSelectedAction(e.target.value)
                                          }
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
                                          onClick={() =>
                                            handleSave(index, selectedAction)
                                          }
                                          aria-label="Save"
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
                  {selectedAction} Date
                </span>
              </h3>
              <button
                className="btn fw-bold btn-danger"
                onClick={handlePopupToggle}
                aria-label="Close Popup"
              >
                Close
              </button>
            </div>
            <form>
              <div className="row">
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Select Date <span className="star">*</span>
                    </label>
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      className="form-control"
                      aria-label="Selected Date"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <button
                      className="btn fw-bold btn-primary"
                      onClick={handlePopupSave}
                      aria-label="Save Date"
                    >
                      SAVE
                    </button>
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
