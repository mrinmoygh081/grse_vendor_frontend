import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import moment from "moment";
import { toast } from "react-toastify";

const DrawingSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [alldrawing, setAlldrawing] = useState([]);
  const [formData, setFormData] = useState({
    drawingFile: null,
    remarks: "",
  });
  const { id } = useParams();
  const { user, token, userType } = useSelector((state) => state.auth);
  console.log(user, "useruser");

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/drawingList?poNo=${id}`,
        null,
        token
      );
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

      const response = await apiCallBack(
        "POST",
        "po/drawing",
        formDataToSend,
        token
      );

      if (response?.status) {
        if (response.message.includes("This drawing aleready APPROVED")) {
          // Drawing is already approved, show a specific toast message
          toast.warning(response.message);
        } else {
          // Handle success, e.g., show a success message or update the drawing list
          toast.success("Drawing uploaded successfully");
          setIsPopup(false);
          setFormData({
            drawingFile: null,
            remarks: "",
          });
          getData();
        }
      } else {
        // Handle failure, e.g., show an error message
        toast.error("Failed to upload drawing");
      }
    } catch (error) {
      toast.error("Error uploading drawing:", error);
    }
  };

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
                        <button
                          onClick={() => setIsPopup(true)}
                          className="btn fw-bold btn-primary mx-3"
                        >
                          Upload Drawing
                        </button>
                        {/* <button
                          onClick={() => setIsPopup(true)}
                          className="btn fw-bold btn-primary"
                        >
                          Upload Of WDB Approved Drawing
                        </button> */}
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
                                  <th>Drawing File</th>
                                  <th>Updated By</th>
                                  <th className="min-w-150px">Remarks</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {alldrawing.map((drawing) => (
                                  <tr key={drawing.drawing_id}>
                                    <td className="table_center">
                                      {moment(drawing.created_at)
                                        .utc()
                                        .format("YYYY-MM-DD")}
                                    </td>
                                    <td className="">
                                      <a
                                        href={`${process.env.REACT_APP_BACKEND_API}po/download?id=${drawing.drawing_id}&type=drawing`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {drawing.file_name}
                                      </a>
                                    </td>
                                    <td className="">
                                      {drawing.created_by_name}
                                    </td>
                                    <td className="">{drawing.remarks}</td>
                                    <td className="">
                                      {drawing.status === "APPROVED"
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
                UPLOAD Drawing
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
                        drawingFile: e.target.files[0],
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
                    onClick={() => updateDrawing("PENDING")}
                    className="btn fw-bold btn-primary"
                    type="button"
                  >
                    UPDATE
                  </button>
                  {userType !== 1 ? (
                    <button
                      onClick={() => updateDrawing("APPROVED")}
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

export default DrawingSub;
