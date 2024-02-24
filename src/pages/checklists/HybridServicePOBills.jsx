import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const HybridServicePOBills = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [isSecPopup, setIsSecPopup] = useState(false);
  const { id } = useParams();
  console.log(id, "id");

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Bills for Service Hybrid PO"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <form>
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card">
                          <h3 className="m-3">GENERAL PARTICULARS:</h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    {/* <tr>
                                      <td>Bill Registration No. (BRN/BTN):</td>
                                      <td>89876543</td>
                                    </tr> */}
                                    <tr>
                                      <td>Invoice no:</td>
                                      <td>
                                        <input type="text" />
                                        &nbsp;&nbsp;
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Invoice value:</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>E-Invoice :</td>
                                      <td>
                                        <select name="" id="">
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                        &nbsp;&nbsp;
                                        <input type="text" />
                                        &nbsp;&nbsp;
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Debit/Credit Note:</td>
                                      <td>
                                        <select name="" id="">
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                        &nbsp;&nbsp;
                                        <input type="text" />
                                        &nbsp;&nbsp;
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Debit Note value:</td>
                                      <td>
                                        {" "}
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Credit Note value:</td>
                                      <td>
                                        {" "}
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Net /Gross claim amount (3+6 or 3-7):
                                      </td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>PO No:</td>
                                      <td>
                                        {" "}
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Vendor Name:</td>
                                      <td>
                                        {" "}
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Vendor Code::</td>
                                      <td>
                                        {" "}
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Contractual SDBG Submission Date</td>
                                      <td>
                                        <input type="date" /> &nbsp;&nbsp;
                                        <select name="" id="">
                                          {" "}
                                          &nbsp;&nbsp;
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                        &nbsp;&nbsp;
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual SDBG Submission Date</td>
                                      <td>
                                        <input type="date" /> &nbsp;&nbsp;
                                        <select name="" id="">
                                          {" "}
                                          &nbsp;&nbsp;
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Demand raised by production/PP&C if any
                                      </td>
                                      <td>
                                        <select name="" id="">
                                          {" "}
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                        &nbsp;&nbsp;
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Gate Entry Acknowledgement no.</td>
                                      <td>
                                        <select name="" id="">
                                          {" "}
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Gate Entry Date</td>
                                      <td>
                                        <select name="" id="">
                                          {" "}
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                        &nbsp;&nbsp;
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GRN no</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GRN Date</td>
                                      <td>
                                        <input type="date" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 1</td>
                                      <td>
                                        <select className="form-control">
                                          <option value="Y">Y</option>
                                          <option value="N">N</option>
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 2</td>
                                      <td>
                                        <select className="form-control">
                                          <option value="Y">Y</option>
                                          <option value="N">N</option>
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 3</td>
                                      <td>
                                        <select className="form-control">
                                          <option value="Y">Y</option>
                                          <option value="N">N</option>
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 4</td>
                                      <td>
                                        <select className="form-control">
                                          <option value="Y">Y</option>
                                          <option value="N">N</option>
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Total ICGRN Value</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="card">
                          <h3 className="m-3">MATERIAL SUPPLY BILLS:</h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    <tr>
                                      <td>
                                        Contractual Drawing submission date
                                      </td>
                                      <td>
                                        <input type="date" />
                                        &nbsp;&nbsp;
                                        <select name="" id="">
                                          {" "}
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual Drawing submission date</td>
                                      <td>
                                        <input type="date" />
                                        &nbsp;&nbsp;
                                        <select name="" id="">
                                          {" "}
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Contractual QAP submission date</td>
                                      <td>
                                        <input type="date" />
                                        &nbsp;&nbsp;
                                        <select name="" id="">
                                          {" "}
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual QAP submission date</td>
                                      <td>
                                        <input type="date" />
                                        &nbsp;&nbsp;
                                        <select name="" id="">
                                          {" "}
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Contractual ILMS submission date</td>
                                      <td>
                                        <input type="date" />
                                        &nbsp;&nbsp;
                                        <select name="" id="">
                                          {" "}
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual ILMS submission date</td>
                                      <td>
                                        <input type="date" />
                                        &nbsp;&nbsp;
                                        <select name="" id="">
                                          {" "}
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>PBG</td>
                                      <td>
                                        <select name="" id="">
                                          {" "}
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>{" "}
                                        </select>{" "}
                                        &nbsp;&nbsp;
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Whether HSN code is as per PO</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Whether GSTIN is as per PO</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Whether Tax rate is as per PO</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="card">
                          <h3 className="m-3">ENTRY BY DEALING OFFICER:</h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    <tr>
                                      <td>
                                        Liquidated damage (if any)Auto
                                        Calculate:
                                      </td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Penalty for Drg submission:</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Penalty for QAP submission</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Other deduction if any </td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Total deductions</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Net payable amount</td>
                                      <td>
                                        <input type="text" />
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
                    <div className="text-center mt-4">
                      <button className="btn fw-bold btn-primary me-3">
                        SUBMIT
                      </button>
                    </div>
                  </form>
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
                Upload Invoice
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
                    Invoice Number <span className="star">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Invoice <span className="star">*</span>
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
      <div className={isSecPopup ? "popup active" : "popup"}>
        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">
                Upload PBG Copy (optionals)
              </span>
            </h3>
            <button
              className="btn fw-bold btn-danger"
              onClick={() => setIsSecPopup(false)}
            >
              Close
            </button>
          </div>
          <form>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Invoice Number <span className="star">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Invoice <span className="star">*</span>
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

export default HybridServicePOBills;
