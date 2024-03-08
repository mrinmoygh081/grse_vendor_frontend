import React, { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";
import moment from "moment";

const InspectionCall = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [inspectioncall, setInspectioncall] = useState([]);
  const { id } = useParams();
  const inputFileRef = useRef(null);

  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    InspectioncallFile: null,
    remarks: "",
  });

  const [selectedFileType, setSelectedFileType] = useState("");

  console.log(user);

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/inspectioncallletter/list?poNo=${id}`,
        null,
        token
      );
      if (data?.status) {
        setInspectioncall(data?.data);
      }
    } catch (error) {
      console.error("Error fetching drawing list:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id, token]);

  const updateInspectionCall = async () => {
    const { user_type } = user;
    const { InspectioncallFile, remarks } = formData;
    if (user_type === 1) {
      if (!InspectioncallFile || remarks === "" || selectedFileType === "") {
        return toast.warn("All fields are required!");
      }
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      formDataToSend.append("file", InspectioncallFile);
      formDataToSend.append("remarks", remarks);
      formDataToSend.append("file_type_id", selectedFileType);
      formDataToSend.append("file_type_name", selectedFileType);

      const response = await apiCallBack(
        "POST",
        "po/inspectionCallLetter",
        formDataToSend,
        token
      );

      if (response?.status) {
        toast.success("Data added successfully");
        setIsPopup(false);
        setSelectedFileType("");
        setFormData({
          InspectioncallFile: null,
          remarks: "",
        });
        inputFileRef.current.value = null;
        getData();
      } else {
        toast.error("Failed to upload data");
      }
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Inspection Call Letter"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="screen_header">
                        {user?.user_type === 1 && (
                          <button
                            onClick={() => setIsPopup(true)}
                            className="btn fw-bold btn-primary"
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
                                  <th>DateTime </th>
                                  <th>File Info</th>
                                  <th>Updated By</th>
                                  <th>Action Type</th>
                                  <th className="min-w-150px">Remarks</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {inspectioncall.map((inspection) => (
                                  <tr key={inspection.id}>
                                    <td className="table_center">
                                      {inspection?.created_at &&
                                        new Date(
                                          inspection?.created_at
                                        ).toLocaleString()}
                                    </td>
                                    <td className="">
                                      <a
                                        href={`${process.env.REACT_APP_BACKEND_API}po/download?id=${inspection.drawing_id}&type=qap`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {inspection.file_name}
                                      </a>
                                    </td>
                                    <td className="">
                                      {inspection.updated_by} (
                                      {inspection.created_by_id})
                                    </td>
                                    <td className="">
                                      {inspection.file_type_name}
                                    </td>
                                    <td className="">{inspection.remarks}</td>
                                    {/* <td className="">
                                      {inspection.status === "APPROVED"
                                        ? "APPROVED"
                                        : "PENDING"}
                                    </td> */}
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

      {user?.user_type === 1 && (
        <>
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
                  <div className="col-12">
                    {/* <div className="mb-3">
                  <select name="" id="" className="form-control">
                    <option value="">Choose File Type</option>
                    <option value="">Inspection call letter stage 1</option>
                    <option value="">Inspection call letter stage 2</option>
                    <option value="">Inspection call letter stage 3</option>
                    <option value="">Inspection release note</option>
                    <option value="">Form-4</option>
                    <option value="">Dispatch clearance</option>
                    <option value="">Inspection report</option>
                  </select>
                </div> */}
                    <div className="mb-3">
                      <select
                        name=""
                        id=""
                        className="form-select"
                        value={selectedFileType}
                        onChange={(e) => {
                          setSelectedFileType(e.target.value);
                        }}
                      >
                        <option value="">Choose Action Type</option>

                        <option value="UPLOAD RM INSPECTION CALL LETTER">
                          UPLOAD RM INSPECTION CALL LETTER
                        </option>
                        <option value="UPLOAD TEST WITNESS INSPECTION CALL LETTER">
                          UPLOAD TEST WITNESS INSPECTION CALL LETTER
                        </option>
                        <option value="UPLOAD FINAL INSPECTION/FATS CALL LETTER">
                          UPLOAD FINAL INSPECTION/FATS CALL LETTER
                        </option>
                        <option value="REMARKS">REMARKS</option>

                        <option value="OTHERS">OTHERS</option>
                      </select>
                    </div>

                    {user?.user_type === 1 && (
                      <div className="mb-3">
                        <label className="form-label">
                          Inspection Call File
                        </label>
                        &nbsp;&nbsp;
                        <span className="mandatorystart">*</span>
                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              InspectioncallFile: e.target.files[0],
                            })
                          }
                          ref={inputFileRef}
                        />
                      </div>
                    )}
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">
                        Remarks &nbsp;
                        <span className="mandatorystart">*</span>
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
                        onClick={() => updateInspectionCall()}
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
        </>
      )}
    </>
  );
};

export default InspectionCall;
