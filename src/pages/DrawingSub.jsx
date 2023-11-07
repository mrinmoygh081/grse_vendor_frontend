import React, { useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const DrawingSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const { id } = useParams();

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
                        <button
                          onClick={() => setIsPopup(true)}
                          className="btn fw-bold btn-primary"
                        >
                          Upload Of WDB Approved Drawing
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
                                  <th>Drawing File</th>
                                  <th>Updated By</th>
                                  <th className="min-w-150px">Remarks</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                <tr>
                                  <td className="table_center">31/10/2023</td>
                                  <td className="">
                                    {/* <a
                                      href={require("D:/office/projects/grse/grse_vendor/src/uploads/SDBG Document.pdf")}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Check File
                                    </a> */}
                                  </td>
                                  <td className="">XYZ Pvt. Ltd.</td>
                                  <td className="">Uploading Drawing</td>
                                  <td className="">Pending</td>
                                </tr>
                                <tr>
                                  <td className="table_center">31/10/2023</td>
                                  <td className="">
                                    {/* <a
                                      href={require("D:/office/projects/grse/grse_vendor/src/uploads/SDBG Document.pdf")}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Check File
                                    </a> */}
                                  </td>
                                  <td className="">GRSE</td>
                                  <td className="">
                                    Returning Drawing for Correction
                                  </td>
                                  <td className="">Pending</td>
                                </tr>
                                <tr>
                                  <td className="table_center">31/10/2023</td>
                                  <td className="">
                                    {/* <a
                                      href={require("D:/office/projects/grse/grse_vendor/src/uploads/SDBG Document.pdf")}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Check File
                                    </a> */}
                                  </td>
                                  <td className="">XYZ Pvt. Ltd.</td>
                                  <td className="">
                                    Returning Drawing after Correction
                                  </td>
                                  <td className="">Pending</td>
                                </tr>
                                <tr>
                                  <td className="table_center">31/10/2023</td>
                                  <td className="">
                                    {/* <a
                                      href={require("D:/office/projects/grse/grse_vendor/src/uploads/SDBG Document.pdf")}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Check File
                                    </a> */}
                                  </td>
                                  <td className="">GRSE</td>
                                  <td className="">
                                    Returning Drawing for WDB Approval
                                  </td>
                                  <td className="">Pending</td>
                                </tr>
                                <tr>
                                  <td className="table_center">31/10/2023</td>
                                  <td className="">
                                    {/* <a
                                      href={require("D:/office/projects/grse/grse_vendor/src/uploads/SDBG Document.pdf")}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Check File
                                    </a> */}
                                  </td>
                                  <td className="">XYZ Pvt. Ltd.</td>
                                  <td className="">
                                    Upload of WDB Approved Drawing
                                  </td>
                                  <td className="">Pending</td>
                                </tr>
                                <tr>
                                  <td className="table_center">31/10/2023</td>
                                  <td className="">
                                    {/* <a
                                      href={require("D:/office/projects/grse/grse_vendor/src/uploads/SDBG Document.pdf")}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Check File
                                    </a> */}
                                  </td>
                                  <td className="">GRSE</td>
                                  <td className="">
                                    Upload of Acknowledgement Receipt
                                  </td>
                                  <td className="">Approved</td>
                                </tr>
                              </tbody>
                            </table>
                            {/* <div className="d-flex align-items-center justify-content-between py-3">
                                  <button className="btn fw-bold btn-info">
                                    ADD NEW
                                  </button>
                                  <div>
                                    <button className="btn fw-bold btn-primary mx-3">
                                      Stop
                                    </button>
                                    <button className="btn fw-bold btn-primary">
                                      Send
                                    </button>
                                  </div>
                                </div> */}
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
                  <label className="form-label">Drawing File</label>
                  <input type="file" className="form-control" />
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
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <button className="btn fw-bold btn-primary">UPDATE</button>
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
