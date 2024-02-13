import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";
import moment from "moment";

const WDCSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [allwdc, setAllwdcp] = useState([]);
  const [formData, setFormData] = useState({
    // wdcFile: null,
    remarks: "",
  });
  const { id } = useParams();
  const { user, token, userType } = useSelector((state) => state.auth);

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/ListOfWdc?poNo=${id}`,
        null,
        token
      );
      if (data?.status) {
        setAllwdcp(data?.data);
      }
    } catch (error) {
      console.error("Error fetching drawing list:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id, token]);

  const wdcBtn = async (status) => {
    try {
      let isApproved = status;
      let uType = userType === 1 ? "VENDOR" : "GRSE";
      const payload = {
        purchasing_doc_no: id,
        vendor_code: user.vendor_code,
        remarks: formData.remarks,
        status: isApproved,
        updated_by: uType,
        action_by_name: user.name,
        action_by_id: user.email,
      };

      const response = await apiCallBack("POST", "po/wdc", payload, token);

      if (response?.status) {
        toast.success("WDC Updated Successfully");
        setIsPopup(false);
        getData(); // Fetch updated data
      } else {
        toast.error("Failed to update WDC");
      }
    } catch (error) {
      console.error("Error updating WDC:", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"WDC"} id={id} />
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
                          Upload WDC
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
                                  <th>WDC File</th>
                                  <th>Updated By</th>
                                  <th className="min-w-150px">Remarks</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {allwdc.map((wdcItem, index) => (
                                  <tr key={index}>
                                    <td className="table_center">
                                      {moment(wdcItem.created_at)
                                        .utc()
                                        .format("YYYY-MM-DD")}
                                    </td>
                                    <td className="">
                                      <a
                                        href={`${process.env.REACT_APP_BACKEND_API}po/download?id=${wdcItem.file_path}&type=qap`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        Check File
                                      </a>
                                    </td>
                                    <td className="">{wdcItem.updated_by}</td>
                                    <td className="">{wdcItem.remarks}</td>
                                    <td className="">{wdcItem.status}</td>
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
              <span className="card-label fw-bold fs-3 mb-1">UPLOAD WDC</span>
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
                        wdcFile: e.target.files[0],
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
                    onClick={() => wdcBtn("PENDING")}
                    className="btn fw-bold btn-primary"
                    type="button"
                  >
                    UPDATE
                  </button>
                  {userType !== 1 && (
                    <button
                      onClick={() => wdcBtn("APPROVED")}
                      className="btn fw-bold btn-primary"
                      type="button"
                    >
                      Approved
                    </button>
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

export default WDCSub;
