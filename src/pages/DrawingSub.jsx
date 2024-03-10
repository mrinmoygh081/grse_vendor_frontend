import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
// import moment from "moment";
import { toast } from "react-toastify";
// import Select from "react-select";
import swal from "sweetalert";
import { reConfirm } from "../utils/reConfirm";
import { clrLegend } from "../utils/clrLegend";

// const options = [
//   { value: "Hull", label: "Hull" },
//   { value: "Electrical", label: "Electrical" },
//   { value: "Machinery", label: "Machinery" },
//   { value: "Plumbing", label: "Plumbing" },
// ];

// const empOptions = [
//   { value: "Mr. X Ghosh", label: "Mr. X Ghosh" },
//   { value: "Mr. Y Chowdhury", label: "Mr. Y Chowdhury" },
//   { value: "Mrs. M Ghosh", label: "Mrs. M Ghosh" },
//   { value: "Mrs. D Das", label: "Mrs. D Das" },
// ];

const DrawingSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const inputFileRef = useRef(null);
  // const [isPopupAssign, setIsPopupAssign] = useState(false);
  const [alldrawing, setAlldrawing] = useState([]);
  const [formData, setFormData] = useState({
    drawingFile: null,
    remarks: "",
  });
  const [selectedActionType, setSelectedActionType] = useState("");
  const { id } = useParams();
  const { user, token, userType } = useSelector((state) => state.auth);
  const { poType } = useSelector((state) => state.selectedPO);
  const [referenceNo, setreferenceNo] = useState("");
  console.log("useruser", user);
  // console.log(poType, "poType");
  // console.log(userType, "userType");
  console.log("referenceNo--", referenceNo);

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/drawing/drawingList?poNo=${id}`,
        null,
        token
      );
      // console.log(data);
      if (data?.status) {
        setAlldrawing(data?.data);
      }
    } catch (error) {
      console.error("Error fetching drawing list:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id, token]);

  const updateDrawing = async (flag) => {
    const { drawingFile, remarks } = formData;
    if (
      flag === "SUBMITTED" &&
      (selectedActionType === "" || !drawingFile || remarks.trim() === "")
    ) {
      return toast.warn("Please fill all the required fields!");
    }

    if (
      (flag === "APPROVED" || flag === "REJECTED") &&
      (selectedActionType === "" || remarks.trim() === "")
    ) {
      return toast.warn(
        "Action Type and remarks is mandatory for approval or rejection!"
      );
    }

    let isApproved = flag;
    let uType;
    let mailSendTo;
    if (userType === 1) {
      uType = "VENDOR";
      mailSendTo = "mrinmoygh081@gmail.com";
    } else {
      uType = "GRSE";
      mailSendTo = "aabhinit96@gmail.com";
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      formDataToSend.append("file", formData.drawingFile);
      formDataToSend.append("remarks", formData.remarks);
      formDataToSend.append("status", isApproved);
      formDataToSend.append("mailSendTo", mailSendTo);
      formDataToSend.append("updated_by", uType);
      formDataToSend.append("vendor_code", user.vendor_code);
      formDataToSend.append("action_by_name", user.name);
      formDataToSend.append("action_by_id", user.email);
      formDataToSend.append("actionType", selectedActionType);
      formDataToSend.append("reference_no", referenceNo);
      // formDataToSend.append("file_type_id", selectedFileTypeId);
      // formDataToSend.append("file_type_name", selectedFileTypeName);

      const response = await apiCallBack(
        "POST",
        "po/drawing/submitDrawing",
        formDataToSend,
        token
      );

      if (response?.status) {
        if (response.message.includes("This drawing aleready APPROVED")) {
          toast.warning(response.message);
        } else {
          toast.success("Drawing uploaded successfully");
          setIsPopup(false);
          setFormData({
            drawingFile: null,
            remarks: "",
          });
          setSelectedActionType("");
          inputFileRef.current.value = null;
          getData();
        }
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error("Error uploading drawing:", error);
    }
  };

  // const reConfirmcheckHandleUploadChange = () => {
  //   if (formData?.drawingFile) {
  //     swal({
  //       title: "Are you sure?",
  //       text: "You're confirming that this drawing has been approved!",
  //       icon: "warning",
  //       buttons: true,
  //       dangerMode: true,
  //     }).then((willDelete) => {
  //       if (willDelete) {
  //         updateDrawing("APPROVED");
  //       }
  //     });
  //   } else {
  //     swal({
  //       title: "Warning",
  //       text: "You forget to add a file!",
  //       icon: "warning",
  //       button: true,
  //     });
  //   }
  // };

  // const assignDrawing = async () => {};

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Drawing Submission"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="screen_header">
                        {userType === 1 && (
                          <button
                            onClick={() => {
                              setIsPopup(true);
                            }}
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
                                  <th>Reference No. </th>
                                  <th>DateTime </th>
                                  <th>Drawing File</th>
                                  <th>Updated By</th>
                                  <th className="min-w-150px">Remarks</th>
                                  <th>Status</th>
                                  {user.department_id === 2 ? (
                                    <th>Action</th>
                                  ) : (
                                    ""
                                  )}
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {alldrawing &&
                                  alldrawing.map((drawing, index) => (
                                    <tr key={index}>
                                      <td className="table_center">
                                        {drawing.reference_no}
                                      </td>
                                      <td className="table_center">
                                        {drawing?.created_at &&
                                          new Date(
                                            drawing?.created_at
                                          ).toLocaleString()}
                                      </td>
                                      <td className="table_center">
                                        {drawing.file_name && (
                                          <a
                                            href={`${process.env.REACT_APP_PDF_URL}submitDrawing/${drawing.file_name}`}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            Click Here
                                          </a>
                                        )}
                                      </td>
                                      <td className="table_center">
                                        {drawing.created_by_id}
                                      </td>
                                      <td className="align-middle">
                                        {drawing.remarks}
                                      </td>
                                      <td
                                        className={`${clrLegend(
                                          drawing?.status
                                        )} bold`}
                                      >
                                        {drawing.status}
                                      </td>
                                      {user.department_id === 2 && (
                                        <td>
                                          {drawing.status == "SUBMITTED" && (
                                            <button
                                              onClick={() => {
                                                setIsPopup(true);
                                                setreferenceNo(
                                                  drawing.reference_no
                                                );
                                              }}
                                              className="btn fw-bold btn-primary mx-3"
                                            >
                                              ACTION
                                            </button>
                                          )}
                                        </td>
                                      )}
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

      {(userType === 1 || user?.department_id === 2) && (
        <div className={isPopup ? "popup active" : "popup"}>
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5">
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
                <div className="col-12">
                  <div className="my-3">
                    <select
                      name=""
                      id=""
                      className="form-select"
                      value={selectedActionType}
                      onChange={(e) => {
                        setSelectedActionType(e.target.value);
                      }}
                    >
                      <option value="">Choose Action Type</option>
                      <option value="Upload Drawing ail Chain">
                        Upload Drawing Covering Letter
                      </option>

                      <option value="Acknowledgement/Remarks">
                        Acknowledgement / Remarks
                      </option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Drawing File</label>
                    &nbsp;&nbsp;
                    <span className="mandatorystart">*</span>
                    <input
                      type="file"
                      className="form-control"
                      ref={inputFileRef}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          drawingFile: e.target.files[0],
                        })
                      }
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">Remarks</label>
                    &nbsp;&nbsp;
                    <span className="mandatorystart">*</span>
                    <textarea
                      name=""
                      id=""
                      rows="4"
                      className="form-control"
                      onChange={(e) =>
                        setFormData({ ...formData, remarks: e.target.value })
                      }
                      value={formData?.remarks}
                    ></textarea>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 d-flex justify-content-between">
                    <button
                      onClick={() => updateDrawing("SUBMITTED")}
                      className="btn fw-bold btn-primary"
                      type="button"
                    >
                      SUBMIT
                    </button>

                    <div className="d-flex gap-3">
                      {userType === 2 &&
                        user?.department_id === 2 &&
                        user?.internal_role_id === 1 && (
                          <button
                            onClick={() =>
                              reConfirm(
                                { file: true },
                                () => updateDrawing("APPROVED"),
                                "Please confirm your approving the drawing."
                              )
                            }
                            className="btn fw-bold btn-success"
                            type="button"
                          >
                            APPROVE
                          </button>
                        )}

                      {userType === 2 &&
                        user?.department_id === 2 &&
                        user?.internal_role_id === 1 && (
                          <button
                            onClick={() =>
                              reConfirm(
                                { file: true },
                                () => updateDrawing("REJECTED"),
                                "Drawing file rejected!!"
                              )
                            }
                            className="btn fw-bold btn-danger"
                            type="button"
                          >
                            REJECT
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* <div className={isPopupAssign ? "popup active" : "popup"}>
        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">Assign</span>
            </h3>
            <button
              className="btn fw-bold btn-danger"
              onClick={() => setIsPopupAssign(false)}
            >
              Close
            </button>
          </div>
          <form>
            <div className="row" style={{ overflow: "unset" }}>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="empCategory">Employee Category</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="empCategory"
                    id="empCategory"
                    options={options}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="empName">Employee Name</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="empName"
                    id="empName"
                    options={empOptions}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3 d-flex justify-content-between">
                  {userType !== 1 ? (
                    <>
                      <button
                        onClick={() => assignDrawing()}
                        className="btn fw-bold btn-primary"
                        type="button"
                      >
                        ASSIGN
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default DrawingSub;
