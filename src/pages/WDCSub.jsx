import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";
import { reConfirm } from "../utils/reConfirm";
import ReactDatePicker from "react-datepicker";
import { convertToEpoch } from "../utils/getDateTimeNow";

const WDCSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [allData, setAllData] = useState([]);
  const [formData, setFormData] = useState({
    file: null,
    remarks: "",
    wdc_ref_no: "",
    wdc_date: "",
    po_line_iten_no: "",
    job_location: "",
    yard_no: "",
    actual_start_date: "",
    actual_completion_date: "",
    unit: "",
    messurment: "",
    quantity: "",
    entry_by_production: "",
    stage_datiels: "",
    actual_payable_amount: "",
  });
  const { id } = useParams();
  const { user, token, userType } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   const handlePopState = (event) => {
  //     if (event.state === null) {
  //       console.log("Hello World!");
  //     }
  //     alert("Hello World!");
  //   };

  //   window.addEventListener("popstate", handlePopState);

  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, []);

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/wdc/wdcList?poNo=${id}`,
        null,
        token
      );
      if (data?.status) {
        setAllData(data?.data);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id, token]);

  const submitHandler = async (flag) => {
    try {
      const {
        file,
        remarks,
        wdc_ref_no,
        wdc_date,
        po_line_iten_no,
        job_location,
        yard_no,
        actual_start_date,
        actual_completion_date,
        unit,
        messurment,
        quantity,
        entry_by_production,
        stage_datiels,
        actual_payable_amount,
      } = formData;
      if (
        file &&
        id !== "" &&
        remarks !== "" &&
        wdc_ref_no !== "" &&
        wdc_date !== "" &&
        po_line_iten_no !== "" &&
        job_location !== "" &&
        yard_no !== "" &&
        actual_start_date !== "" &&
        actual_completion_date !== "" &&
        unit !== "" &&
        messurment !== "" &&
        quantity !== "" &&
        entry_by_production !== "" &&
        stage_datiels !== "" &&
        actual_payable_amount !== ""
      ) {
        const fdToSend = new FormData();
        fdToSend.append("purchasing_doc_no", id);
        fdToSend.append("file", file);
        fdToSend.append("remarks", remarks);
        fdToSend.append("wdc_ref_no", wdc_ref_no);
        fdToSend.append("wdc_date", convertToEpoch(wdc_date));
        fdToSend.append("po_line_iten_no", po_line_iten_no);
        fdToSend.append("job_location", job_location);
        fdToSend.append("yard_no", yard_no);
        fdToSend.append("actual_start_date", convertToEpoch(actual_start_date));
        fdToSend.append(
          "actual_completion_date",
          convertToEpoch(actual_completion_date)
        );
        fdToSend.append("unit", unit);
        fdToSend.append("messurment", messurment);
        fdToSend.append("quantity", quantity);
        fdToSend.append("entry_by_production", entry_by_production);
        fdToSend.append("stage_datiels", stage_datiels);
        fdToSend.append("actual_payable_amount", actual_payable_amount);
        fdToSend.append("status", flag);

        const response = await apiCallBack(
          "POST",
          "po/wdc/submitWdc",
          fdToSend,
          token
        );

        if (response?.status) {
          toast.success("WDC uploaded successfully");
          setIsPopup(false);
          setFormData({
            file: null,
            remarks: "",
            wdc_ref_no: "",
            wdc_date: "",
            po_line_iten_no: "",
            job_location: "",
            yard_no: "",
            actual_start_date: "",
            actual_completion_date: "",
            unit: "",
            messurment: "",
            quantity: "",
            entry_by_production: "",
            stage_datiels: "",
            actual_payable_amount: "",
          });
          fileInputRef.current.value = null;
          getData();
        } else {
          toast.error("Failed to upload WDC");
        }
      } else {
        toast.warn("All fields are required!");
      }
    } catch (error) {
      toast.error("Error uploading WDC:", error);
      console.error("error", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"WDC /"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="screen_header">
                        <button
                          onClick={() => setIsPopup(true)}
                          className="btn fw-bold btn-primary mx-3"
                        >
                          ACTION
                        </button>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="card-body p-3">
                        <div className="tab-content">
                          <div className="table-responsive">
                            <table className="table table-striped table-bordered table_height">
                              <thead>
                                <tr className="border-0">
                                  <th className="min-w-150px">DateTime </th>
                                  <th className="min-w-150px">WDC File</th>
                                  <th className="min-w-150px">Updated By</th>
                                  <th className="min-w-150px">Wdc Ref NO</th>
                                  <th className="min-w-150px">Wdc Date</th>
                                  <th className="min-w-150px">
                                    Po Line Iten No
                                  </th>
                                  <th className="min-w-150px">Job Location</th>
                                  <th className="min-w-150px">Yard No</th>
                                  <th className="min-w-150px">
                                    Actual Start Date
                                  </th>
                                  <th className="min-w-150px">
                                    Actual Completion Date
                                  </th>
                                  <th className="min-w-150px">Unit</th>
                                  <th className="min-w-150px">Messurment</th>
                                  <th className="min-w-150px">Quantity</th>
                                  <th className="min-w-150px">
                                    Entry By Production
                                  </th>
                                  <th className="min-w-150px">Stage Datiels</th>
                                  <th className="min-w-150px">
                                    Actual Payable Amount
                                  </th>

                                  <th className="min-w-150px">Remarks</th>
                                  <th className="min-w-150px">Status</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {allData &&
                                  allData.map((item, index) => (
                                    <tr key={index}>
                                      <td className="table_center">
                                        {/* {moment(item.created_at)
                                          .utc()
                                          .format("DD/MM/YY (HH:mm)")} */}

                                        {item?.created_at &&
                                          new Date(
                                            item.created_at
                                          ).toLocaleDateString()}
                                      </td>
                                      <td>
                                        <a
                                          href={`${process.env.REACT_APP_PDF_URL}wdc/${item.file_name}`}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {item.file_name}
                                        </a>
                                      </td>
                                      <td>{item.updated_by}</td>
                                      <td>{item.wdc_ref_no}</td>
                                      <td>
                                        {item?.wdc_date &&
                                          new Date(
                                            item.wdc_date * 1000
                                          ).toLocaleDateString()}
                                      </td>
                                      <td>{item.po_line_iten_no}</td>
                                      <td>{item.job_location}</td>
                                      <td>{item.yard_no}</td>
                                      <td>
                                        {item?.actual_start_date &&
                                          new Date(
                                            item.actual_start_date * 1000
                                          ).toLocaleDateString()}
                                      </td>
                                      <td>
                                        {item?.actual_completion_date &&
                                          new Date(
                                            item.actual_completion_date * 1000
                                          ).toLocaleDateString()}
                                      </td>
                                      <td>{item.unit}</td>
                                      <td>{item.messurment}</td>
                                      <td>{item.quantity}</td>
                                      <td>{item.entry_by_production}</td>
                                      <td>{item.stage_datiels}</td>
                                      <td>{item.actual_payable_amount}</td>
                                      <td>{item.remarks}</td>
                                      <td>{item.status}</td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
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

      <div className={isPopup ? "popup active" : "popup"}>
        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
          <div className="card-header border-0 pt-5 pb-3">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">UPLOAD WDC</span>
            </h3>
            <button
              className="btn fw-bold btn-danger"
              onClick={() => setIsPopup(false)}
            >
              Close
            </button>
          </div>
          <form>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    WDC File <span className="red">*</span>{" "}
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        file: e.target.files[0],
                      })
                    }
                    ref={fileInputRef}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    WDC Ref No <span className="red">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData?.wdc_ref_no}
                    onChange={(e) =>
                      setFormData({ ...formData, wdc_ref_no: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    WDC Ref Date <span className="red">*</span>{" "}
                  </label>
                  <ReactDatePicker
                    selected={formData?.wdc_date}
                    value={formData?.wdc_date}
                    onChange={(date) =>
                      setFormData({
                        ...formData,
                        wdc_date: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    PO Line Item No <span className="red">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData?.po_line_iten_no}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        po_line_iten_no: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    JOB Location <span className="red">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData?.job_location}
                    onChange={(e) =>
                      setFormData({ ...formData, job_location: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Yard No <span className="red">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData?.yard_no}
                    onChange={(e) =>
                      setFormData({ ...formData, yard_no: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Actual Start Date <span className="red">*</span>{" "}
                  </label>
                  <ReactDatePicker
                    selected={formData?.actual_start_date}
                    value={formData?.actual_start_date}
                    onChange={(date) =>
                      setFormData({
                        ...formData,
                        actual_start_date: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Actual Completion Date <span className="red">*</span>{" "}
                  </label>
                  <ReactDatePicker
                    selected={formData?.actual_completion_date}
                    value={formData?.actual_completion_date}
                    onChange={(date) =>
                      setFormData({
                        ...formData,
                        actual_completion_date: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    placeholderText="DD/MM/YYYY"
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Unit <span className="red">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData?.unit}
                    onChange={(e) =>
                      setFormData({ ...formData, unit: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Measurement <span className="red">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData?.messurment}
                    onChange={(e) =>
                      setFormData({ ...formData, messurment: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Quantity <span className="red">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData?.quantity}
                    onChange={(e) =>
                      setFormData({ ...formData, quantity: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Entry By Production <span className="red">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData?.entry_by_production}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        entry_by_production: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Stage Details <span className="red">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData?.stage_datiels}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        stage_datiels: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Actual Payable Amount <span className="red">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData?.actual_payable_amount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        actual_payable_amount: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Remarks <span className="red">*</span>{" "}
                  </label>
                  <textarea
                    name=""
                    id=""
                    rows="4"
                    className="form-control"
                    value={formData?.remarks}
                    onChange={(e) =>
                      setFormData({ ...formData, remarks: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3 d-flex justify-content-between">
                  <button
                    onClick={() => submitHandler("PENDING")}
                    className="btn fw-bold btn-primary"
                    type="button"
                  >
                    SUBMIT
                  </button>

                  {userType !== 1 && (
                    <button
                      onClick={() =>
                        reConfirm(
                          { file: true },
                          () => submitHandler("ACKNOWLEDGED"),
                          "You're approving the WDC. Please confirm!"
                        )
                      }
                      className="btn fw-bold btn-success"
                      type="button"
                    >
                      ACKNOWLEDGE
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WDCSub;
