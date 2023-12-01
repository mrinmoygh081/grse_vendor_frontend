import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { apiCallBack } from "../utils/fetchAPIs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import moment from "moment";

const Shippingdocuments = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [shippingdocumentss, setShippingdocumentss] = useState([]);
  const { id } = useParams();

  const { user, token, userType } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    shippingdocumentssFile: null,
    remarks: "",
  });

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/ListOfShippingDocuments?poNo=${id}`,
        null,
        token
      );
      if (data?.status) {
        setShippingdocumentss(data?.data);
      }
    } catch (error) {
      console.error("Error fetching drawing list:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id, token]);

  const shippingdocumentsBtn = async (status) => {
    try {
      let isApproved = status;
      let uType;
      if (userType === 1) {
        uType = "VENDOR";
      } else {
        uType = "GRSE";
      }
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      formDataToSend.append("file", formData.shippingdocumentssFile);
      formDataToSend.append("remarks", formData.remarks);
      formDataToSend.append("status", isApproved);
      formDataToSend.append("updated_by", uType); // or use user.updated_by if available
      formDataToSend.append("vendor_code", user.vendor_code);
      formDataToSend.append("action_by_name", user.name);
      formDataToSend.append("action_by_id", user.email);

      const response = await apiCallBack(
        "POST",
        "po/shippingDocuments",
        formDataToSend,
        token
      );

      if (response?.status) {
        toast.success("Shipping Document Uploaded Successfully");
        setIsPopup(false);
        getData(); // Refresh the data after successful upload
      } else {
        // Handle failure, log error details
        console.error("Failed to upload Shipping Document:", response?.error);
        toast.error(
          `Failed to upload Shipping Document: ${response?.error?.message}`
        );
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error uploading Shipping Document:", error);
      toast.error(
        "An unexpected error occurred while uploading Shipping Document"
      );
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Shipping Documents"} id={id} />
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
                          Upload Shipping documents
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
                                  <th>DateTime</th>
                                  <th>Shipping Documents</th>
                                  <th>Document Type</th>
                                  <th>Updated By</th>
                                  <th className="min-w-150px">Remarks</th>
                                  <th className="min-w-150px">Status</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {shippingdocumentss.map((document, index) => (
                                  <tr key={index}>
                                    <td className="table_center">
                                      {moment(document.created_at)
                                        .utc()
                                        .format("YYYY-MM-DD")}
                                    </td>
                                    <td>
                                      <a
                                        href={`${process.env.REACT_APP_BACKEND_API}po/download?id=${document.file_path}&type=qap`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        Check File
                                      </a>
                                    </td>
                                    <td>{document.documentType}</td>
                                    <td>{document.created_by_name}</td>
                                    <td>{document.remarks}</td>
                                    <td className="">
                                      {document.status === "APPROVED"
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
              <span className="card-label fw-bold fs-3 mb-1">
                Upload Shipping Documents
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
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shippingdocumentssFile: e.target.files[0],
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
                    onClick={() => shippingdocumentsBtn("PENDING")}
                    className="btn fw-bold btn-primary"
                    type="button"
                  >
                    UPDATE
                  </button>
                  {userType !== 1 ? (
                    <button
                      onClick={() => shippingdocumentsBtn("APPROVED")}
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

export default Shippingdocuments;
