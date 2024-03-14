import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";
import moment from "moment";
import { checkTypeArr } from "../utils/smallFun";

const Inspectionreleasenote = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [data, setData] = useState([]);
  const { id } = useParams();

  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    actionType: "",
    dataFile: null,
    remarks: "",
  });

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/inspectionReleaseNote/list?poNo=${id}`,
        null,
        token
      );
      if (data?.status) {
        setData(data?.data);
      }
    } catch (error) {
      console.error("Error fetching drawing list:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id, token]);

  const actionHandler = async (flag) => {
    const { dataFile, remarks, actionType } = formData;
    if (!dataFile || actionType === "" || remarks === "") {
      return toast.warn("Action, Data file and remarks are required!");
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      formDataToSend.append("file", dataFile);
      formDataToSend.append("remarks", remarks);
      formDataToSend.append("type", actionType);

      const response = await apiCallBack(
        "POST",
        "po/inspectionReleaseNote",
        formDataToSend,
        token
      );

      if (response?.status) {
        toast.success("Data sent successfully!");
        setIsPopup(false);
        getData();
      } else {
        toast.error("Failed to upload data!");
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
            <Header title={"Inspection Release Note"} id={id} />
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
                                  <th>File Type</th>
                                  <th className="min-w-150px">Remarks</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {checkTypeArr(data) &&
                                  data.map((item, index) => {
                                    return (
                                      <tr key={index}>
                                        <td className="table_center">
                                          {moment(item.created_at)
                                            .utc()
                                            .format("DD/MM/YY (HH:mm)")}
                                        </td>
                                        <td className="">
                                          {item.file_name && (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}inspectionCallLetter/${item.file_name}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              Click Here
                                            </a>
                                          )}
                                        </td>
                                        <td className="">
                                          {item.updated_by} (
                                          {item.created_by_id})
                                        </td>
                                        <td className="">
                                          {item.file_type_name}
                                        </td>
                                        <td className="">{item.remarks}</td>
                                      </tr>
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
      {user?.user_type === 1 && (
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
                  {/* for vendor or nic */}
                  {/* <div className="mb-3">
                  <select name="" id="" className="form-control">
                    <option value="">Choose File Type</option>
                    <option value="">Inspection realease note stage 1</option>
                    <option value="">Inspection realease note stage 2</option>
                    <option value="">Inspection realease note stage 3</option>
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
                      className="form-select"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          actionType: e.target.value,
                        });
                      }}
                    >
                      <option value="">Choose Action Type</option>
                      <option value="INSPECTION RELEASE NOTE">
                        INSPECTION RELEASE NOTE
                      </option>
                      <option value="REMARKS">REMARKS</option>

                      <option value="OTHERS">OTHERS</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">File Info</label>
                    &nbsp;&nbsp;
                    <span className="mandatorystart">*</span>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          dataFile: e.target.files[0],
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
                      onClick={() => actionHandler("SUBMITTED")}
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
    </>
  );
};

export default Inspectionreleasenote;
