import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import { FaCaretLeft, FaPlus } from "react-icons/fa";
import DynamicButton from "../../Helpers/DynamicButton";

const ClaimIncorrectDeductions = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [isSecPopup, setIsSecPopup] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Checklist for Any Other Claims"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <form>
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card">
                          <h3 className="d-flex align-items-center m-3">
                            <button
                              className="btn_icon me-3"
                              type="button"
                              onClick={() =>
                                navigate(`/bill-other-claims/${id}`)
                              }
                            >
                              <FaCaretLeft className="fs-20" />
                            </button>{" "}
                            Checklist for Any Other Claims:
                          </h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    <tr>
                                      <td>Claim Type:</td>
                                      <td className="btn_value">
                                        <select
                                          name="stage"
                                          id=""
                                          className="form-select"
                                          style={{
                                            width: "85%",
                                            fontSize: "10px",
                                            padding: "13px",
                                          }}
                                        >
                                          <option value="bill-incorrect-deductions">
                                            {" "}
                                            Checklist for Incorrect Deductions{" "}
                                          </option>
                                          <option value="ld-penalty-refund">
                                            Checklist for LD-Penalty Refund
                                          </option>
                                        </select>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Digitally Signed Invoice:</td>
                                      <td>
                                        <div className="btn_value">
                                          <input
                                            type="text"
                                            className="form-control me-3"
                                            name="invoice_no"
                                            placeholder="invoice number"
                                          />
                                          <DynamicButton
                                            label="CHECK"
                                            className="btn btn-primary btn-sm m-4"
                                          />
                                        </div>
                                        <div className="btn_value">
                                          <div className="me-4">
                                            <label htmlFor="">
                                              Invoice File
                                            </label>
                                            <input
                                              type="file"
                                              className="form-control"
                                              name="invoice_filename"
                                              accept=".pdf"
                                            />
                                          </div>
                                          <div>
                                            <label htmlFor="">
                                              Supporting Documents
                                            </label>
                                            <input
                                              type="file"
                                              className="form-control"
                                              name="invoice_supporting_doc"
                                              accept=".pdf"
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>E-Invoice No :</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control me-2"
                                          name="invoice_no"
                                          placeholder="E-Invoice number"
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="invoice_filename"
                                          accept=".pdf"
                                        />
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Additional PO:</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="associated_po"
                                        />

                                        <button
                                          className="btn btn-sm btn-primary d-flex align-items-center ms-2"
                                          style={{ fontSize: "16px" }}
                                          type="button"
                                        >
                                          <FaPlus />
                                        </button>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Basic value:</td>
                                      <td className="btn_value">
                                        <input
                                          type="number"
                                          className="form-control"
                                          onWheel={inputOnWheelPrevent}
                                          name="invoice_value"
                                        />
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Debit/Credit Note:</td>
                                      <td className="btn_value">
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="debit_credit_filename"
                                          accept=".pdf"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Debit Note value:</td>
                                      <td className="btn_value">
                                        <input
                                          type="number"
                                          className="form-control"
                                          onWheel={inputOnWheelPrevent}
                                          name="debit_note"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Credit Note value:</td>
                                      <td className="btn_value">
                                        <input
                                          type="number"
                                          className="form-control"
                                          onWheel={inputOnWheelPrevent}
                                          name="credit_note"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Net Basic amount:</td>
                                      <td className="btn_value">
                                        <b></b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>CGST:</td>
                                      <td className="btn_value">
                                        <input
                                          type="number"
                                          className="form-control"
                                          onWheel={inputOnWheelPrevent}
                                          name="cgst"
                                        />
                                        <span className="ms-1">%</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>SGST:</td>
                                      <td className="btn_value">
                                        <input
                                          type="number"
                                          className="form-control"
                                          onWheel={inputOnWheelPrevent}
                                          name="sgst"
                                        />
                                        <span className="ms-1">%</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>IGST:</td>
                                      <td className="btn_value">
                                        <input
                                          type="number"
                                          className="form-control"
                                          onWheel={inputOnWheelPrevent}
                                          name="igst"
                                        />
                                        <span className="ms-1">%</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Net claim amount with GST:</td>
                                      <td className="btn_value">
                                        <b>{""}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Contractual SDBG Submission Date</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="text-center">
                                <button
                                  className="btn btn-sm btn-primary me-3"
                                  type="button"
                                  onClick={() =>
                                    navigate(`/bill-other-claims/${id}`)
                                  }
                                >
                                  BACK
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default ClaimIncorrectDeductions;
