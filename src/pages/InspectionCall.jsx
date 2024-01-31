import React, { useEffect, useState } from "react";
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

  const { user, token, userType } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    InspectioncallFile: null,
    remarks: "",
  });

  const [selectedFileTypeId, setSelectedFileTypeId] = useState("");
  const [selectedFileTypeName, setSelectedFileTypeName] = useState("");

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/ListOfInspectionCallLetter?poNo=${id}`,
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

  const optionss = [
    {
      file_type_name: "WDC",
      file_type_id: 1,
    },
    {
      file_type_name: "Final Dispatch Clearance",
      file_type_id: 2,
    },
  ];

  const updateInspectionCall = async (flag) => {
    try {
      let isApproved = flag;
      let uType;
      if (userType === 1) {
        uType = "VENDOR";
      } else {
        uType = "GRSE";
      }
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      formDataToSend.append("file", formData.InspectioncallFile);
      formDataToSend.append("remarks", formData.remarks);
      formDataToSend.append("file_type_id", selectedFileTypeId);
      formDataToSend.append("file_type_name", selectedFileTypeName);
      // formDataToSend.append("status", isApproved);
      // formDataToSend.append("updated_by", uType);
      // formDataToSend.append("vendor_code", user.vendor_code);
      // formDataToSend.append("action_by_name", user.name);
      // formDataToSend.append("action_by_id", user.email);

      const response = await apiCallBack(
        "POST",
        "po/inspectionCallLetter",
        formDataToSend,
        token
      );

      if (response?.status) {
        // Handle success, e.g., show a success message or update the inspection call letter list
        toast.success("Inspection call letter uploaded successfully");
        setIsPopup(false);
        getData(); // Refresh the data after successful upload
      } else {
        // Handle failure, e.g., show an error message
        toast.error("Failed to upload inspection call letter");
      }
    } catch (error) {
      console.error("Error uploading inspection call letter:", error);
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
                        <button
                          onClick={() => setIsPopup(true)}
                          className="btn fw-bold btn-primary"
                        >
                          Upload File
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
                                  <th>DateTime </th>
                                  <th>Inspection Call Letter</th>
                                  <th>Updated By</th>
                                  <th className="min-w-150px">Remarks</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {inspectioncall.map((inspection) => (
                                  <tr key={inspection.id}>
                                    <td className="table_center">
                                      {moment(inspection.created_at)
                                        .utc()
                                        .format("YYYY-MM-DD")}
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
                                      {inspection.created_by_name}
                                    </td>
                                    <td className="">{inspection.remarks}</td>
                                    <td className="">
                                      {inspection.status === "APPROVED"
                                        ? "APPROVED"
                                        : "PENDING"}
                                    </td>
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
              <span className="card-label fw-bold fs-3 mb-1">
                Upload Inspection call letter
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
                {/* for vendor or nic */}
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
                {/* for lan or cdo (drawing officer) or qa */}
                <div className="mb-3">
                  <select
                    name=""
                    id=""
                    className="form-control"
                    onChange={(e) => {
                      setSelectedFileTypeId(e.target.value);
                      setSelectedFileTypeName(
                        e.target.options[e.target.selectedIndex].text
                      );
                    }}
                  >
                    <option value="">Choose File Type</option>
                    {optionss.map((option) => (
                      <option
                        key={option.file_type_id}
                        value={option.file_type_id}
                      >
                        {option.file_type_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        InspectioncallFile: e.target.files[0],
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Remarks</label>
                  <textarea
                    name=""
                    id=""
                    rows="4"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, remarks: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3 d-flex justify-content-between">
                  <button
                    onClick={() => updateInspectionCall("PENDING")}
                    className="btn fw-bold btn-primary"
                    type="button"
                  >
                    UPLOAD
                  </button>
                  {/* {userType !== 1 ? (
                    <button
                      onClick={() => updateInspectionCall("APPROVED")}
                      className="btn fw-bold btn-primary"
                      type="button"
                    >
                      Approved
                    </button>
                  ) : (
                    ""
                  )} */}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InspectionCall;
