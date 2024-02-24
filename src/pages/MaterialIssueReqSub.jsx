import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";
import { reConfirm } from "../utils/reConfirm";

const MaterialIssueReqSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [allData, setAllData] = useState([]);
  const [formData, setFormData] = useState({
    mrsFile: null,
    remarks: "",
  });
  const [selectedActionTypeName, setSelectedActionTypeName] = useState("");
  const { id } = useParams();
  const { user, token, userType } = useSelector((state) => state.auth);
  const { poType } = useSelector((state) => state.selectedPO);
  console.log(user, "useruser");

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/Mrs/list?poNo=${id}`,
        null,
        token
      );
      if (data?.status) {
        setAllData(data?.data);
      }
    } catch (error) {
      console.error("Error fetching Material Issue Requisition list:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id, token]);

  const optionss = [
    {
      file_type_name: "Upload MRS",
    },
    {
      file_type_name: "Remarks",
    },
    {
      file_type_name: "Others",
    },
  ];

  const submitHandler = async (flag) => {
    try {
      if (selectedActionTypeName !== "") {
        const formDataToSend = new FormData();
        formDataToSend.append("purchasing_doc_no", id);
        if (formData.mrsFile) {
          formDataToSend.append("file", formData.mrsFile);
        }
        formDataToSend.append("remarks", formData.remarks);
        formDataToSend.append("status", flag);
        formDataToSend.append("type", selectedActionTypeName);

        const response = await apiCallBack(
          "POST",
          "po/mrs",
          formDataToSend,
          token
        );

        if (response?.status) {
          toast.success("Material Issue Requisition uploaded successfully");
          setIsPopup(false);
          setFormData({
            mrsFile: null,
            remarks: "",
          });
          getData();
        } else {
          toast.error("Failed to upload Material Issue Requisition");
        }
      } else {
        toast.warn("Please choose action type!");
      }
    } catch (error) {
      toast.error("Error uploading Material Issue Requisition:", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Material Issue Requisition"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="screen_header">
                        {userType === 1 && (
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
                                  <th>DateTime </th>
                                  <th>Material Issue Requisition File</th>
                                  <th>Updated By</th>
                                  <th className="min-w-150px">Remarks</th>
                                  {/* <th>Status</th> */}
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {allData &&
                                  allData.map((item, index) => (
                                    <tr key={index}>
                                      <td className="table_center">
                                        {item?.created_at &&
                                          new Date(
                                            item?.created_at
                                          ).toLocaleString()}
                                      </td>
                                      <td className="">
                                        <a
                                          href={`${process.env.REACT_APP_PDF_URL}inspectionCallLetter/${item.file_name}`}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {item?.file_name}
                                        </a>
                                      </td>
                                      <td className="">
                                        {item?.created_by_id}
                                      </td>
                                      <td className="">{item?.remarks}</td>
                                      {/* <td className="">{item?.status}</td> */}
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

      {userType === 1 && (
        <div className={isPopup ? "popup active" : "popup"}>
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  UPLOAD Material Issue Requisition
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
                      className="form-select"
                      onChange={(e) => {
                        setSelectedActionTypeName(e.target.value);
                      }}
                    >
                      <option value="">Choose Action Type</option>
                      {optionss.map((option, i) => (
                        <option key={i} value={option.file_type_name}>
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
                          mrsFile: e.target.files[0],
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
                      onClick={() => submitHandler("PENDING")}
                      className="btn fw-bold btn-primary"
                      type="button"
                    >
                      SUBMIT
                    </button>

                    {/* {userType !== 1 && (
                      <button
                        onClick={() =>
                          reConfirm(
                            { file: true },
                            () => submitHandler("ACKNOWLEDGED"),
                            "You're approving the MRS. Please confirm!"
                          )
                        }
                        className="btn fw-bold btn-success"
                        type="button"
                      >
                        ACKNOWLEDGE
                      </button>
                    )} */}
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

export default MaterialIssueReqSub;
