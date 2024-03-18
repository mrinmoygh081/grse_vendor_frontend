import React, { useState } from "react";
import Footer from "../components/Footer";
// import SideBar from "../components/SideBar";
// import Header from "../components/Header";
// import { useParams } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checklist = () => {
  const navigate = useNavigate();
  const [isPopup, setIsPopup] = useState(false);
  const [slug, setSlug] = useState("");

  const NewBillHandler = () => {
    if (slug !== "") {
      let path = `/checklist/${slug}`;
      navigate(path);
    } else {
      toast.warn("Please choose what type of checklist you want to add.");
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          {/* <SideBar /> */}
          <div className="d-flex flex-column flex-row-fluid">
            <MainHeader title={"Check List"} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="card-body p-3">
                        <div className="tab-content">
                          <label htmlFor="checklistDropdown" className="mr-2">
                            Select Checklist:
                          </label>
                          <div className="d-flex align-items-center w-50">
                            <div className="mb-3 w-100">
                              <select
                                id="checklistDropdown"
                                className="form-select w-100"
                                onChange={(e) => {
                                  setSlug(e.target.value);
                                }}
                              >
                                <option value="">Select</option>
                                <option value="hybrid-bill-material">
                                  Checklist for Vendor Bill Material (Hybrid)
                                </option>
                                <option value="hybrid-bill-service">
                                  Checklist for Vendor Bill Service (Hybrid)
                                </option>
                                <option value="contract-bill-service">
                                  Checklist for Vendor Bill Service (Contract)
                                </option>
                                <option value="bill-incorrect-deductions">
                                  Checklist for Vendor Bill Incorrect Deductions
                                </option>
                                <option value="bill-advance-payment">
                                  Checklist for Vendor Bill Advance Payment
                                </option>
                                <option value="claim-against-pbg">
                                  Checklist for Vendor Claim Against PBG
                                </option>
                                <option value="ld-penalty-refund">
                                  Checklist for LD-Penalty Refund
                                </option>
                              </select>
                            </div>
                            <button
                              className="btn btn-primary mx-3 mb-3"
                              onClick={NewBillHandler}
                            >
                              ADD
                            </button>
                          </div>
                          <div className="table-responsive">
                            <table className="table table-striped table-bordered table_height">
                              <thead>
                                <tr className="border-0">
                                  <th>SL No </th>
                                  <th>BG Number </th>
                                  <th>PO</th>
                                  {/* for DO */}
                                  {/* <th>Recommandation By DO</th> */}
                                  <th>Action By FO</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                <tr>
                                  <td className="table_center">
                                    01/11/2023-10:30AM
                                  </td>
                                  <td>
                                    {/* <a
                                      href={require("C:/Users/admin/Downloads/sample.pdf")}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Check File
                                    </a> */}
                                  </td>
                                  <td>BG extension request lette</td>
                                  <td>
                                    {/* <select
                                      name=""
                                      id=""
                                      className="form-control"
                                      // disabled
                                    >
                                      <option value="">Extension</option>
                                      <option value="">Release</option>
                                    </select> */}
                                    test
                                  </td>
                                  <td>
                                    <div className="view-button-container">
                                      <button className="btn btn-primary mx-3">
                                        View
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table_center">
                                    31/10/2023-12:36PM
                                  </td>
                                  <td>
                                    {/* <a
                                      href={require("C:/Users/admin/Downloads/sample.pdf")}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Check File
                                    </a> */}
                                  </td>
                                  <td>BG release letter</td>
                                  <td>
                                    {/* disabled for FO but enable for DO */}
                                    {/* <select
                                      name=""
                                      id=""
                                      className="form-control"
                                      // disabled
                                    >
                                      <option value="">Extension</option>
                                      <option value="">Release</option>
                                    </select> */}
                                    test
                                  </td>
                                  <td>
                                    <div className="view-button-container">
                                      <button className="btn btn-primary mx-3">
                                        View
                                      </button>
                                    </div>
                                  </td>
                                </tr>
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
                Upload Shipping documents
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
                  <label className="form-label">
                    Shipping File Type <span className="star">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Shipping File <span className="star">*</span>
                  </label>
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

export default Checklist;
