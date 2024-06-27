import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { apiCallBack } from "../../utils/fetchAPIs";
import { checkTypeArr } from "../../utils/smallFun";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";

const AdvanceBillHybridEdit = () => {
  let initialData = {
    btn_num: "",
    purchasing_doc_no: "",
    invoice_no: "",
    invoice_filename: "",
    invoice_value: "",
    e_invoice_no: "",
    e_invoice_filename: "",
    debit_note: "",
    credit_note: "",
    debit_credit_filename: "",
    net_claim_amount: "",
    cgst: "",
    sgst: "",
    igst: "",
    net_claim_amt_gst: "",
    updated_by: "",
    created_at: "",
    created_by_id: "",
    vendor_code: "",
    btn_type: "",
    status: "",
    c_level1_doc_sub_date: "",
    c_level2_doc_sub_date: "",
    c_level3_doc_sub_date: "",
    c_level1_doc_name: "",
    c_level2_doc_name: "",
    c_level3_doc_name: "",
    a_level1_doc_sub_date: "",
    a_level2_doc_sub_date: "",
    a_level3_doc_sub_date: "",
    a_level1_doc_name: "",
    a_level2_doc_name: "",
    a_level3_doc_name: "",
    hsn_gstn_tax: "",
  };

  let inititalDOData = {
    btn_num: "",
    drg_penalty: "",
    qap_penalty: "",
    ilms_penalty: "",
    estimate_penalty: "",
    other_deduction: "",
    total_deduction: "",
    net_payable_amount: "",
    assigned_to: "",
    a_drawing_date: "",
    a_qap_date: "",
    a_ilms_date: "",
  };

  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state, "statestatestatestatestate");

  const [impDates, setImpDates] = useState(null);
  const [data, setData] = useState(null);
  const [doData, setDoData] = useState(null);

  const [form, setForm] = useState(initialData);
  const [doForm, setDoForm] = useState(inititalDOData);

  const getDataByBTN = async () => {
    try {
      const payload = {
        btn_num: state,
      };
      const response = await apiCallBack(
        "POST",
        "po/btn/getAdvBillHybridBTN",
        payload,
        token
      );
      if (response?.status && checkTypeArr(response?.data)) {
        setData(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataByBTN();
  }, []);
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Advance Bill for Hybrid PO"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <form>
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card">
                          <h3 className="m-3">Advance Bill for Hybrid PO:</h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    {data ? (
                                      <>
                                        <tr>
                                          <td>Digitally Signed Invoice:</td>
                                          <td className="btn_value">
                                            {data.invoice_no}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>E-Invoice No:</td>
                                          <td className="btn_value">
                                            {data.e_invoice_no}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Invoice Value:</td>
                                          <td className="btn_value">
                                            {data.invoice_value}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Net Claim Amount:</td>
                                          <td className="btn_value">
                                            <b>{data.net_claim_amount}</b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>CGST:</td>
                                          <td className="btn_value">
                                            {data.cgst}%
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>SGST:</td>
                                          <td className="btn_value">
                                            {data.sgst}%
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>IGST:</td>
                                          <td className="btn_value">
                                            {data.igst}%
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Net Claim Amount with GST:</td>
                                          <td className="btn_value">
                                            <b>{data.net_claim_amt_gst}</b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            Contractual SDBG Submission Date
                                          </td>
                                          <td className="btn_value">
                                            <b className="me-3">
                                              {data.c_sdbg_date &&
                                                new Date(
                                                  data.c_sdbg_date
                                                ).toDateString()}
                                            </b>
                                            {data.c_sdbg_filename ? (
                                              <a
                                                href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${data.c_sdbg_filename}`}
                                                target="_blank"
                                                rel="noreferrer"
                                              >
                                                VIEW
                                              </a>
                                            ) : (
                                              "SDBG NOT SUBMITTED."
                                            )}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Actual SDBG Submission Date</td>
                                          <td className="btn_value">
                                            <b className="me-3">
                                              {data.a_sdbg_date &&
                                                new Date(
                                                  data.a_sdbg_date
                                                ).toDateString()}
                                            </b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            Contractual Submission of Level-1:
                                          </td>
                                          <td className="btn_value">
                                            {data.c_level1_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            Contractual Submission of Level-2:
                                          </td>
                                          <td className="btn_value">
                                            {data.c_level2_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            Contractual Submission of Level-3:
                                          </td>
                                          <td className="btn_value">
                                            {data.c_level3_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Actual Submission of Level-1:</td>
                                          <td className="btn_value">
                                            {data.a_level1_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Actual Submission of Level-2:</td>
                                          <td className="btn_value">
                                            {data.a_level2_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Actual Submission of Level-3:</td>
                                          <td className="btn_value">
                                            {data.a_level3_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan="2">
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="hsn_gstn_icgrn"
                                                checked={
                                                  data.is_hsn_code === "t" &&
                                                  data.is_gstin === "t" &&
                                                  data.is_tax_rate === "t"
                                                }
                                                readOnly
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="hsn_gstn_icgrn"
                                              >
                                                Whether HSN code, GSTIN, Tax
                                                rate is as per PO
                                              </label>
                                            </div>
                                          </td>
                                        </tr>
                                      </>
                                    ) : (
                                      <tr>
                                        <td colSpan="2">No data available</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              <div className="text-center">
                                {/* {user?.user_type === USER_VENDOR && (
                                <button
                                  type="button"
                                  className="btn fw-bold btn-primary me-3"
                                  onClick={() =>
                                    actionHandlerAdvancebillHybrid(
                                      "AdvanceBillHybrid",
                                      token,
                                      user,
                                      id,
                                      form,
                                      setForm,
                                      initialData,
                                      navigate
                                    )
                                  }
                                >
                                  SUBMIT
                                </button>
                              )} */}
                                <button
                                  className="btn fw-bold btn-primary me-3"
                                  type="button"
                                  onClick={() =>
                                    navigate(
                                      `/invoice-and-payment-process/${id}`
                                    )
                                  }
                                >
                                  BACK
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* {isDO && (
                        <div className="col-12">
                          <div className="card">
                            <h3 className="m-3">ENTRY BY DEALING OFFICER:</h3>
                            <div className="card-body p-3">
                              <div className="tab-content">
                                <div className="table-responsive">
                                  <table className="table table-striped table-bordered table_height">
                                    <tbody style={{ maxHeight: "100%" }}>
                                      <tr>
                                        <td>Finance Authority</td>
                                        <td className="btn_value">
                                          <Select
                                            className="basic-single w-100"
                                            classNamePrefix="select"
                                            isClearable={true}
                                            isSearchable={true}
                                            name="emp"
                                            id="emp"
                                            options={emp}
                                            value={
                                              emp &&
                                              emp.filter(
                                                (item) =>
                                                  item.value ===
                                                  doForm?.certifying_authority
                                              )[0]
                                            }
                                            onChange={(val) =>
                                              setDoForm({
                                                ...doForm,
                                                certifying_authority: val.value,
                                              })
                                            }
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>BTN Number:</td>
                                        <td className="btn_value">
                                          <b>{state}</b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Liquidated damage</td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlFor="GED">
                                              Gate Entry Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control "
                                              id="GED"
                                              value={doForm?.ld_ge_date}
                                              onChange={(e) =>
                                                setDoForm({
                                                  ...doForm,
                                                  ld_ge_date: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div className="me-3">
                                            <label htmlFor="CLD">
                                              Contractual Delivery Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              id="CLD"
                                              value={doForm?.ld_c_date}
                                              onChange={(e) =>
                                                setDoForm({
                                                  ...doForm,
                                                  ld_c_date: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>&#8377; {doForm?.ld_amount}</p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Penalty for Drawing submission</td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlFor="DADD">
                                              Actual Delivery Date:
                                            </label>
                                            <p>
                                              <b>
                                                {form?.a_drawing_date &&
                                                  formatDate(
                                                    form?.a_drawing_date
                                                  )}
                                              </b>
                                            </p>
                                          </div>
                                          <div className="me-3">
                                            <label htmlFor="DCDD">
                                              Contractual Delivery Date:
                                            </label>
                                            <p>
                                              <b>
                                                {form?.c_drawing_date &&
                                                  formatDate(
                                                    form?.c_drawing_date
                                                  )}
                                              </b>
                                            </p>
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>
                                              &#8377; {doForm?.p_drg_amount}
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Penalty for QAP submission</td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlFor="QADD">
                                              Actual Delivery Date:
                                            </label>
                                            <p>
                                              <b>
                                                {form?.a_qap_date &&
                                                  formatDate(form?.a_qap_date)}
                                              </b>
                                            </p>
                                          </div>
                                          <div className="me-3">
                                            <label htmlFor="QCDD">
                                              Contractual Delivery Date:
                                            </label>
                                            <p>
                                              <b>
                                                {form?.c_qap_date &&
                                                  formatDate(form?.c_qap_date)}
                                              </b>
                                            </p>
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>
                                              &#8377; {doForm?.p_qap_amount}
                                              {console.log(
                                                doForm?.p_qap_amount,
                                                "doForm?.p_qap_amount"
                                              )}
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Penalty for ILMS submission</td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlFor="LADD">
                                              Actual Delivery Date:
                                            </label>
                                            <p>
                                              <b>
                                                {form?.a_ilms_date &&
                                                  formatDate(form?.a_ilms_date)}
                                              </b>
                                            </p>
                                          </div>
                                          <div className="me-3">
                                            <label htmlFor="LCDD">
                                              Contractual Delivery Date:
                                            </label>
                                            <p>
                                              <b>
                                                {form?.c_ilms_date &&
                                                  formatDate(form?.c_ilms_date)}
                                              </b>
                                            </p>
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>
                                              &#8377; {doForm?.p_ilms_amount}
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Estimated Penalty </td>
                                        <td className="btn_value">
                                          <p>
                                            {" "}
                                            &#8377; {doForm?.p_estimate_amount}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Other deduction if any </td>
                                        <td className="btn_value">
                                          <input
                                            type="number"
                                            name=""
                                            id=""
                                            className="form-control"
                                            value={doForm?.o_deduction}
                                            onChange={(e) =>
                                              setDoForm({
                                                ...doForm,
                                                o_deduction: e.target.value,
                                              })
                                            }
                                            onWheel={inputOnWheelPrevent}
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Total deductions</td>
                                        <td>
                                          <b>
                                            &#8377;{" "}
                                            {isNaN(doForm?.total_deduction)
                                              ? 0
                                              : doForm?.total_deduction}
                                          </b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Net payable amount</td>
                                        <td>
                                          <b>
                                            &#8377;{" "}
                                            {isNaN(doForm?.net_payable_amount)
                                              ? 0
                                              : doForm?.net_payable_amount}
                                          </b>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <p>
                                  Certified that Invoice has been verified w.r.t
                                  PO and recommanded for release of payment
                                  subject to satutatory deduction
                                </p>
                                <div className="text-center">
                                  <button
                                    type="button"
                                    className="btn fw-bold btn-primary me-3"
                                    onClick={() =>
                                      actionHandlerByDO(
                                        doForm,
                                        setDoForm,
                                        initialData,
                                        navigate,
                                        id,
                                        token
                                      )
                                    }
                                  >
                                    SUBMIT
                                  </button>
                                  <button
                                    className="btn fw-bold btn-primary"
                                    onClick={() =>
                                      navigate(
                                        `/invoice-and-payment-process/${id}`
                                      )
                                    }
                                  >
                                    BACK
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )} */}
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

export default AdvanceBillHybridEdit;
