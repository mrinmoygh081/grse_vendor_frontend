import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";

const QAPSub = () => {
  const [isPopup, setIsPopup] = useState(false);
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
      let isApproved = flag;
      let uType;
      if (userType === 1) {
        uType = "VENDOR";
      } else {
        uType = "GRSE";
      }
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      formDataToSend.append("file", formData.QapFile);
      formDataToSend.append("remarks", formData.remarks);
      formDataToSend.append("status", isApproved);
      formDataToSend.append("updated_by", uType);
      formDataToSend.append("vendor_code", user.vendor_code);
      formDataToSend.append(
        "mailSendTo",
        "VENDOR MAIL ID / GRSE OFFICERS MAIL ID"
      );
      formDataToSend.append("action_by_name", user.name);
      formDataToSend.append("action_by_id", user.email);

      console.log("Form data to send:", formDataToSend);

      const response = await apiCallBack(
        "POST",
        "po/qap",
        formDataToSend,
        token
      );

      console.log("Response from API:", response);

      if (response?.status) {
        // Handle success, e.g., show a success message or update the QAP list
        console.log("QAP uploaded successfully");
        setIsPopup(false);
        setFormData({
          QapFile: null,
          remarks: "",
        });
        getData();
      } else {
        // Handle failure, e.g., show an error message
        console.error("Failed to upload QAP");
      }
    } catch (error) {
      console.error("Error uploading QAP:", error);
    }
  };

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
                                      {qap.created_at}
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
                  <button
                    onClick={() => updateQAP("PENDING")}
                    className="btn fw-bold btn-primary"
                    type="button"
                  >
                    UPDATE
                  </button>
                  {userType !== 1 ? (
                    <button
                      onClick={() => updateQAP("APPROVED")}
                      className="btn fw-bold btn-primary"
                      type="button"
                    >
                      Approved
                    </button>
                  ) : (
                    ""
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
