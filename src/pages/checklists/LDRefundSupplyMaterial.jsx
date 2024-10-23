import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import axios from "axios";
import { apiCallBack } from "../../utils/fetchAPIs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkTypeArr } from "../../utils/smallFun";
import DynamicButton from "../../Helpers/DynamicButton";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the date picker
import { formatDate, formatEpochToDate } from "../../utils/getDateTimeNow";

const LDRefundSupplyMaterial = () => {
  const [formData, setFormData] = useState({
    invoiceNo: "",
    balanceClaimInvoice: "",
    claimAmount: "",
    percentageOfClaim: "",
    invoiceFile: null,
    balanceClaimInvoiceFile: null,
  });
  const [invoiceDate, setInvoiceDate] = useState(null); // New state for invoice date
  const [data, setData] = useState(null);
  const [InvoiceData, setInvoiceData] = useState();
  const { user, token } = useSelector((state) => state.auth);

  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"LD Refund For Supply Material Summery"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <form>
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card">
                          <h3 className="m-3">
                            LD Refund For Supply Material Summery:
                          </h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <thead>
                                    <tr>
                                      <th className="min-w-150px">SL NIO</th>
                                      <th className="min-w-150px">NEW BTN</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* Row 1 */}
                                    <tr>
                                      <td>
                                        <div className="btn_value">
                                          <input
                                            type="text"
                                            name="ref_invoice1_no"
                                            className="form-control"
                                            placeholder="Enter Invoice No 1"
                                          />
                                        </div>
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          name="ref_invoice1_amount"
                                          className="form-control"
                                          placeholder="Enter Claim Amount 1"
                                        />
                                      </td>
                                      <td>
                                        <textarea
                                          type="text"
                                          name="ref_invoice1_remarks"
                                          className="form-control"
                                          placeholder="Enter Remarks 1"
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="file"
                                          name="ref_invoice1_file"
                                          className="form-control"
                                        />
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
                      <button
                        className="btn btn-primary me-3"
                        type="submit"
                        disabled={!formData.invoiceNo}
                      >
                        Submit
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() =>
                          navigate(`/invoice-and-payment-process/${id}`)
                        }
                      >
                        BACK
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

export default LDRefundSupplyMaterial;
