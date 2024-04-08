import React, { Fragment, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";
import { reConfirm } from "../utils/reConfirm";
import ReactDatePicker from "react-datepicker";
import { convertToEpoch } from "../utils/getDateTimeNow";
import { clrLegend } from "../utils/clrLegend";
import { checkTypeArr } from "../utils/smallFun";
import { USER_PPNC_DEPARTMENT, USER_VENDOR } from "../constants/userConstants";
import { APPROVED, REJECTED, SUBMITTED } from "../constants/BGconstants";
import { groupedByRefNo } from "../utils/groupedByReq";

const WDCSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [isPopupView, setIsPopupView] = useState(false);
  const [isSecPopup, setIsSecPopup] = useState(false);
  const [allData, setAllData] = useState([]);
  const [lineItemData, setLineItemData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [viewData, setViewData] = useState(null);

  // const [pncFormData, setPncFormData] = useState({
  //   purchasing_doc_no: "",
  //   remarks: "",
  //   status: "",
  //   reference_no: "",
  // });

  const [formData, setFormData] = useState({
    action_type: "",
    file: null,
    remarks: "",
    po_line_iten_no: "",
    job_location: "",
    yard_no: "",
    actual_start_date: "",
    actual_completion_date: "",
    unit: "",
    messurment: "",
    quantity: "",
    // entry_by_production: "",
    stage_datiels: "",
    actual_payable_amount: "",
  });
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);

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
      console.error("Error fetching WDC/JCC list:", error);
    }
  };

  const getPOLineItemData = async () => {
    try {
      const data = await apiCallBack("GET", `po/details?id=${id}`, null, token);
      if (data?.status) {
        let lineItem = data?.data[0]?.materialResult;
        setLineItemData(lineItem);
      }
    } catch (error) {
      console.error("Error fetching PO Line Items:", error);
    }
  };

  useEffect(() => {
    getData();
    getPOLineItemData();
  }, [id, token]);

  useEffect(() => {
    if (allData && allData.length > 0) {
      const gData = groupedByRefNo(allData);
      setGroupedData(gData);
    }
  }, [allData]);

  const submitHandler = async (flag, ref_no) => {
    try {
      const {
        file,
        action_type,
        remarks,
        po_line_iten_no,
        job_location,
        yard_no,
        actual_start_date,
        actual_completion_date,
        unit,
        messurment,
        quantity,
        // entry_by_production,
        stage_datiels,
        actual_payable_amount,
      } = formData;
      if (
        flag === APPROVED ||
        flag === REJECTED ||
        (file &&
          id !== "" &&
          action_type !== "" &&
          remarks !== "" &&
          po_line_iten_no !== "" &&
          job_location !== "" &&
          yard_no !== "" &&
          actual_start_date !== "" &&
          actual_completion_date !== "" &&
          unit !== "" &&
          messurment !== "" &&
          quantity !== "")
      ) {
        const fdToSend = new FormData();
        if (flag === SUBMITTED) {
          fdToSend.append("file", file);
          fdToSend.append("action_type", action_type);
          fdToSend.append("wdc_date", convertToEpoch(new Date()));
          fdToSend.append("po_line_iten_no", po_line_iten_no);
          fdToSend.append("job_location", job_location);
          fdToSend.append("yard_no", yard_no);
          fdToSend.append(
            "actual_start_date",
            convertToEpoch(actual_start_date)
          );
          fdToSend.append(
            "actual_completion_date",
            convertToEpoch(actual_completion_date)
          );
          fdToSend.append("unit", unit);
          fdToSend.append("messurment", messurment);
          fdToSend.append("quantity", quantity);
          fdToSend.append("remarks", remarks);
        }
        fdToSend.append("status", flag);
        fdToSend.append("purchasing_doc_no", id);
        if (flag === APPROVED || flag === REJECTED) {
          // fdToSend.append("action_type", action_type);
          fdToSend.append("reference_no", ref_no);
          // fdToSend.append("entry_by_production", entry_by_production);
          fdToSend.append("stage_datiels", stage_datiels);
          fdToSend.append("actual_payable_amount", actual_payable_amount);
        }
        if (flag === APPROVED) {
          fdToSend.append("remarks", "File Approved!");
        }
        if (flag === REJECTED) {
          fdToSend.append("remarks", "File Rejected!");
        }

        const response = await apiCallBack(
          "POST",
          "po/wdc/submitWdc",
          fdToSend,
          token
        );

        if (response?.status) {
          toast.success(response?.message);
          setIsPopup(false);
          setIsSecPopup(false);
          setFormData({
            file: null,
            action_type: "",
            remarks: "",
            wdc_date: "",
            po_line_iten_no: "",
            job_location: "",
            yard_no: "",
            actual_start_date: "",
            actual_completion_date: "",
            unit: "",
            messurment: "",
            quantity: "",
            // entry_by_production: "",
            stage_datiels: "",
            actual_payable_amount: "",
          });
          getData();
          if (flag === SUBMITTED) {
            fileInputRef.current.value = null;
          }
        } else {
          toast.warn(response?.message);
        }
      } else {
        toast.warn("Please fill up the required fields!");
      }
    } catch (error) {
      toast.error("Error uploading File:", error);
      console.error("error", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"WDC - JCC"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="screen_header">
                        {user?.user_type === USER_VENDOR && (
                          <button
                            onClick={() => setIsPopup(true)}
                            className="btn fw-bold btn-primary mx-3"
                          >
                            ACTION
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="card-body p-3">
                        <div className="tab-content">
                          <div className="table-responsive">
                            <table className="table table-striped table-bordered table_height">
                              <thead>
                                <tr className="border-0">
                                  {/* <th className="min-w-150px">Reference No</th> */}
                                  <th>Action Type</th>
                                  <th className="min-w-150px">DateTime </th>
                                  <th className="min-w-150px">File</th>
                                  <th className="min-w-150px">Action By</th>
                                  <th className="min-w-150px">Date</th>
                                  <th>PO LineItem</th>
                                  <th className="min-w-150px">Status</th>
                                  <th className="min-w-150px">Action</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {Object.keys(groupedData).map((it, index) => {
                                  let items = groupedData[it];
                                  return (
                                    <Fragment key={index}>
                                      <tr>
                                        <td colSpan={19}>
                                          <b>{it}</b>
                                        </td>
                                      </tr>
                                      {checkTypeArr(items) &&
                                        items.map((item, index) => (
                                          <tr key={index}>
                                            {/* <td>{item.reference_no}</td> */}
                                            <td>{item?.action_type}</td>
                                            <td>
                                              {item?.created_at &&
                                                new Date(
                                                  item.created_at
                                                ).toLocaleString()}
                                            </td>
                                            <td>
                                              {item.file_name && (
                                                <a
                                                  href={`${process.env.REACT_APP_PDF_URL}submitWdc/${item.file_name}`}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  Click Here
                                                </a>
                                              )}
                                            </td>
                                            <td>{item.created_by_id}</td>
                                            <td>
                                              {item?.wdc_date &&
                                                new Date(
                                                  item.wdc_date * 1000
                                                ).toLocaleDateString()}
                                            </td>
                                            <td>{item.po_line_iten_no}</td>
                                            <td
                                              className={`${clrLegend(
                                                item?.status
                                              )} bold`}
                                            >
                                              {item.status}
                                            </td>
                                            <td className="d-flex">
                                              <button
                                                onClick={() => {
                                                  setViewData(item);
                                                  setIsPopupView(true);
                                                }}
                                                className="btn btn-sm fw-bold btn-secondary m-1"
                                                type="button"
                                              >
                                                View
                                              </button>
                                              {item.status === "SUBMITTED" &&
                                                user.department_id ===
                                                  USER_PPNC_DEPARTMENT && (
                                                  <>
                                                    <button
                                                      onClick={() => {
                                                        setViewData(item);
                                                        setIsSecPopup(true);
                                                      }}
                                                      className="btn btn-sm fw-bold btn-primary m-1"
                                                      type="button"
                                                    >
                                                      Action
                                                    </button>
                                                  </>
                                                )}
                                            </td>
                                          </tr>
                                        ))}
                                    </Fragment>
                                  );
                                })}
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

      {user?.user_type === USER_VENDOR && (
        <div className={isPopup ? "popup active" : "popup"}>
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5 pb-3">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Take Your Action
                </span>
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
                      Action <span className="red">*</span>{" "}
                    </label>
                    <select
                      name=""
                      id=""
                      className="form-select"
                      value={formData?.action_type}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          action_type: e.target.value,
                        })
                      }
                    >
                      <option value="">Choose Your Action</option>
                      <option value="WDC">Work Done Certificate</option>
                      <option value="JCC">Job Completion Certificate</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      File Info <span className="red">*</span>{" "}
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
                      accept=".pdf"
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      PO Line Item No <span className="red">*</span>{" "}
                    </label>
                    <select
                      name=""
                      id=""
                      className="form-select"
                      value={formData?.po_line_iten_no}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          po_line_iten_no: e.target.value,
                        })
                      }
                    >
                      <option value="">Choose PO Line Item</option>
                      {checkTypeArr(lineItemData) &&
                        lineItemData.map((item, i) => {
                          return (
                            <option value={item?.material_item_number} key={i}>
                              {item?.material_item_number}
                            </option>
                          );
                        })}
                    </select>
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
                        setFormData({
                          ...formData,
                          job_location: e.target.value,
                        })
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
                      maxDate={new Date()}
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
                      minDate={new Date()}
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
                      onClick={() => submitHandler("SUBMITTED", null)}
                      className="btn fw-bold btn-primary"
                      type="button"
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {user.department_id === USER_PPNC_DEPARTMENT && (
        <div className={isSecPopup ? "popup active" : "popup"}>
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5 pb-3">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Take Your Action{" "}
                  {viewData?.reference_no && `for ${viewData?.reference_no}`}
                </span>
              </h3>
              <button
                className="btn fw-bold btn-danger"
                onClick={() => {
                  setViewData(null);
                  setIsSecPopup(false);
                }}
              >
                Close
              </button>
            </div>
            <form>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Action <span className="red">*</span>{" "}
                    </label>
                    <p>{viewData?.action_type}</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      File Info <span className="red">*</span>{" "}
                    </label>
                    <p>
                      <Link
                        to={`${process.env.REACT_APP_PDF_URL}submitWDC/${viewData?.file_name}`}
                        target="_blank"
                      >
                        Click here
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      PO Line Item No <span className="red">*</span>{" "}
                    </label>
                    <p>{viewData?.po_line_iten_no}</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      JOB Location <span className="red">*</span>{" "}
                    </label>
                    <p>{viewData?.job_location}</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Yard No <span className="red">*</span>{" "}
                    </label>
                    <p>{viewData?.yard_no}</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Actual Start Date <span className="red">*</span>{" "}
                    </label>
                    <p>
                      {viewData?.actual_start_date &&
                        new Date(
                          viewData?.actual_start_date * 1000
                        ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Actual Completion Date <span className="red">*</span>{" "}
                    </label>
                    <p>
                      {viewData?.actual_completion_date &&
                        new Date(
                          viewData?.actual_completion_date * 1000
                        ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Unit <span className="red">*</span>{" "}
                    </label>
                    <p>{viewData?.unit}</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Measurement <span className="red">*</span>{" "}
                    </label>
                    <p>{viewData?.messurment}</p>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label className="form-label">
                      Quantity <span className="red">*</span>{" "}
                    </label>
                    <p>{viewData?.quantity}</p>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Remarks <span className="red">*</span>{" "}
                    </label>
                    <p>{viewData?.remarks}</p>
                  </div>
                </div>
                {/* <div className="col-12 col-md-6">
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
                </div> */}
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
                  <div className="mb-3 d-flex justify-content-between">
                    <button
                      onClick={() =>
                        reConfirm(
                          { file: true },
                          () =>
                            submitHandler("APPROVED", viewData?.reference_no),
                          "You're approving the File. Please confirm!"
                        )
                      }
                      className="btn fw-bold btn-success"
                      type="button"
                    >
                      APPROVED
                    </button>
                    <button
                      onClick={() =>
                        reConfirm(
                          { file: true },
                          () =>
                            submitHandler("REJECTED", viewData?.reference_no),
                          "You're rejecting the File. Please confirm!"
                        )
                      }
                      className="btn fw-bold btn-danger me-2"
                      type="button"
                    >
                      REJECTED
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={isPopupView ? "popup active" : "popup"}>
        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
          <div className="card-header border-0 pt-5 pb-3">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">
                All Data for{" "}
                {viewData?.reference_no && `for ${viewData?.reference_no}`}
              </span>
            </h3>
            <button
              className="btn fw-bold btn-danger"
              onClick={() => {
                setViewData(null);
                setIsPopupView(false);
              }}
            >
              Close
            </button>
          </div>
          <form>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Action <span className="red">*</span>{" "}
                  </label>
                  <p>{viewData?.action_type}</p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    File Info <span className="red">*</span>{" "}
                  </label>
                  <p>
                    <Link
                      to={`${process.env.REACT_APP_PDF_URL}submitWDC/${viewData?.file_name}`}
                      target="_blank"
                    >
                      Click here
                    </Link>
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    PO Line Item No <span className="red">*</span>{" "}
                  </label>
                  <p>{viewData?.po_line_iten_no}</p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    JOB Location <span className="red">*</span>{" "}
                  </label>
                  <p>{viewData?.job_location}</p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Yard No <span className="red">*</span>{" "}
                  </label>
                  <p>{viewData?.yard_no}</p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Actual Start Date <span className="red">*</span>{" "}
                  </label>
                  <p>
                    {viewData?.actual_start_date &&
                      new Date(
                        viewData?.actual_start_date * 1000
                      ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Actual Completion Date <span className="red">*</span>{" "}
                  </label>
                  <p>
                    {viewData?.actual_completion_date &&
                      new Date(
                        viewData?.actual_completion_date * 1000
                      ).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Unit <span className="red">*</span>{" "}
                  </label>
                  <p>{viewData?.unit}</p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Measurement <span className="red">*</span>{" "}
                  </label>
                  <p>{viewData?.messurment}</p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Quantity <span className="red">*</span>{" "}
                  </label>
                  <p>{viewData?.quantity}</p>
                </div>
              </div>
              {/* <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Entry By Production <span className="red">*</span>{" "}
                  </label>
                  <p>{viewData?.entry_by_production}</p>
                </div>
              </div> */}
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Stage Details <span className="red">*</span>{" "}
                  </label>
                  <p>{viewData?.stage_datiels}</p>
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    Actual Payable Amount <span className="red">*</span>{" "}
                  </label>
                  <p>{viewData?.actual_payable_amount}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Remarks <span className="red">*</span>{" "}
                  </label>
                  <p>{viewData?.remarks}</p>
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
