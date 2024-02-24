import React, { useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ServiceContractBills = () => {
  //   const [isPopup, setIsPopup] = useState(false);
  //   const [isSecPopup, setIsSecPopup] = useState(false);
  const { id } = useParams();
  console.log(id, "id");

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Service Contract Bills"} id={id} />
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
                                      <td>E-Invoice :</td>
                                      <td>
                                        <select name="" id="">
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>
                                        </select>
                                        &nbsp;&nbsp;
                                        <input type="text" />
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
                                      <td>PO line item no.:</td>
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
                                      <td>Vendor Code:</td>
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
                                        Certified Work Done Certificate
                                        no.(unique auto generated no,option for
                                        multiple entry)
                                      </td>
                                      <td>
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Contractual work start date:</td>
                                      <td>
                                        <input type="date" />
                                        &nbsp;&nbsp;
                                        <select name="" id="">
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
                                      <td>Contractual work completion date:</td>
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
                                      <td>Actual work start date:</td>
                                      <td>
                                        <input type="date" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual work completion date:</td>
                                      <td>
                                        <input type="date" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Hinderance register certified by
                                        berth/user:
                                      </td>
                                      <td>
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ESI Compliance certified by HR:</td>
                                      <td>
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>PF Compliance certified by HR:</td>
                                      <td>
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Wage Compliance certified by HR</td>
                                      <td>
                                        <select className="form-control">
                                          <option value="Y">Y</option>
                                          <option value="N">N</option>
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Leave Salary & Bonus Compliance
                                        certified by HR:
                                      </td>
                                      <td>
                                        <select className="form-control">
                                          <option value="Y">Y</option>
                                          <option value="N">N</option>
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>PBG if any:</td>
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
                                      <td>Whether SAC code is as per PO:</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Whether GSTIN is as per PO:</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Whether Tax rate is as per PO:</td>
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
                          <h3 className="m-3">ENTRY BY BERTH/BCA:</h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    <tr>
                                      <td>Service Entry Sheet no:</td>
                                      <td>
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Service Entry Value</td>
                                      <td>
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Liquidated damage Auto Calculate
                                        (applicable/not applicable):
                                      </td>
                                      <td>
                                        <input type="date" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Other deduction if any: </td>
                                      <td>
                                        <select className="form-control">
                                          <option value="Y">Y</option>
                                          <option value="N">N</option>
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Total deductions:</td>
                                      <td>
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Net payable amount:</td>
                                      <td>
                                        <input type="file" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Recommended for payment:</td>
                                      <td>
                                        <select className="form-control">
                                          <option value="Y">Y</option>
                                          <option value="N">N</option>
                                        </select>
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
                          <h3 className="m-3">ENTRY BY FINANCE:</h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    <tr>
                                      <td>
                                        Interest on delayed submision of SDBG:
                                      </td>
                                      <td>
                                        <input type="date" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Statutory deductions if any:</td>
                                      <td>
                                        <input type="text" />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Retention if any:</td>
                                      <td>
                                        <select className="form-control">
                                          <option value="Y">Y</option>
                                          <option value="N">N</option>
                                        </select>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Recommended for payment: </td>
                                      <td>
                                        <select className="form-control">
                                          <option value="Y">Y</option>
                                          <option value="N">N</option>
                                        </select>
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
    </>
  );
};

export default ServiceContractBills;
