import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import moment from "moment";
import { toast } from "react-toastify";
import Select from "react-select";

const options = [
  { value: "Hull", label: "Hull" },
  { value: "Electrical", label: "Electrical" },
  { value: "Machinery", label: "Machinery" },
  { value: "Plumbing", label: "Plumbing" },
];

const empOptions = [
  { value: "Mr. X Ghosh", label: "Mr. X Ghosh" },
  { value: "Mr. Y Chowdhury", label: "Mr. Y Chowdhury" },
  { value: "Mrs. M Ghosh", label: "Mrs. M Ghosh" },
  { value: "Mrs. D Das", label: "Mrs. D Das" },
];

const QAPSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [isPopupAssign, setIsPopupAssign] = useState(false);
  const [allqap, setAllqap] = useState([]);
  const { id } = useParams();
  const { user, token, userType } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    QapFile: null,
    remarks: "",
  });

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/qapList?poNo=${id}`,
        null,
        token
      );
      if (data?.status) {
        setAllqap(data?.data);
      }
    } catch (error) {
      console.error("Error fetching drawing list:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id, token]);

  const updateQAP = async (flag) => {
    try {
      let uType;
      let mailSendTo;
      if (userType === 1) {
        uType = "VENDOR";
        mailSendTo = "mrinmoygh081@gmail.com";
      } else {
        uType = "GRSE";
        mailSendTo = "aabhinit96@gmail.com";
      }
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      formDataToSend.append("file", formData.QapFile);
      formDataToSend.append("remarks", formData.remarks);
      formDataToSend.append("status", flag);
      formDataToSend.append("updated_by", uType);
      formDataToSend.append("vendor_code", user.vendor_code);
      formDataToSend.append("mailSendTo", mailSendTo);
      formDataToSend.append("action_by_name", user.name);
      formDataToSend.append("action_by_id", user.email);

      const response = await apiCallBack(
        "POST",
        "po/qap",
        formDataToSend,
        token
      );

      if (response?.status) {
        // Handle success, e.g., show a success message or update the QAP list
        toast.success("QAP uploaded successfully");
        setIsPopup(false);
        setFormData({
          QapFile: null,
          remarks: "",
        });
        getData();
      } else {
        // Handle failure, e.g., show an error message
        toast.error("Failed to upload QAP");
      }
    } catch (error) {
      toast.error("Error uploading QAP:", error);
    }
  };

  const assignQAP = async () => {};

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"QAP Submission"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="screen_header">
                        {userType !== 1 && (
                          <button
                            onClick={() => setIsPopupAssign(true)}
                            className="btn fw-bold btn-primary me-2"
                          >
                            Assign
                          </button>
                        )}
                        <button
                          onClick={() => setIsPopup(true)}
                          className="btn fw-bold btn-primary"
                        >
                          Upload QAP
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
                                  <th>QAP File</th>
                                  <th>Updated By</th>
                                  <th className="min-w-150px">Remarks</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {allqap.map((qap) => (
                                  <tr key={qap.drawing_id}>
                                    <td className="table_center">
                                      {moment(qap.created_at)
                                        .utc()
                                        .format("YYYY-MM-DD")}
                                    </td>
                                    <td className="">
                                      <a
                                        href={`${process.env.REACT_APP_BACKEND_API}po/download?id=${qap.drawing_id}&type=qap`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {qap.file_name}
                                      </a>
                                    </td>
                                    <td className="">{qap.created_by_name}</td>
                                    <td className="">{qap.remarks}</td>
                                    <td className="">
                                      {qap.status === "APPROVED"
                                        ? "APPROVED"
                                        : qap.status === "REJECTED"
                                        ? "REJECTED"
                                        : qap.status === "ACCEPTED"
                                        ? "ACCEPTED"
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
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">UPLOAD QAP</span>
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
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        QapFile: e.target.files[0],
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
                  {userType !== 1 ? (
                    <>
                      <div>
                        <button
                          onClick={() => updateQAP("SAVED")}
                          className="btn fw-bold btn-primary me-2"
                          type="button"
                        >
                          SAVE
                        </button>
                        <button
                          onClick={() => updateQAP("UPDATED")}
                          className="btn fw-bold btn-warning me-2"
                          type="button"
                        >
                          UPDATE
                        </button>
                        <button
                          onClick={() => updateQAP("ACCEPTED")}
                          className="btn fw-bold btn-success me-2"
                          type="button"
                        >
                          ACCEPT
                        </button>
                        <button
                          onClick={() => updateQAP("REJECTED")}
                          className="btn fw-bold btn-danger"
                          type="button"
                        >
                          REJECT
                        </button>
                      </div>
                      <button
                        onClick={() => updateQAP("APPROVED")}
                        className="btn fw-bold btn-success"
                        type="button"
                      >
                        APPROVE
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => updateQAP("PENDING")}
                        className="btn fw-bold btn-primary"
                        type="button"
                      >
                        UPDATE
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className={isPopupAssign ? "popup active" : "popup"}>
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
                        onClick={() => assignQAP()}
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
      </div>
    </>
  );
};

export default QAPSub;
