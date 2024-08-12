import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { actionHandlerByDO } from "../../Helpers/BTNChecklist";
import {
  calculateNetPay,
  calculatePenalty,
  checkTypeArr,
} from "../../utils/smallFun";
import { apiCallBack } from "../../utils/fetchAPIs";
import { formatDate } from "../../utils/getDateTimeNow";
import { initialDOData, initialData } from "../../data/btnData";
import BTNMaterialVendorInfo from "../../components/BTNMaterialVendorInfo";
import { FaCaretLeft } from "react-icons/fa";

const BillsMaterialHybridView = () => {
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();

  // const [impDates, setImpDates] = useState(null);
  // const [data, setData] = useState(null);
  const [doData, setDoData] = useState(null);
  const [form, setForm] = useState(initialData);
  initialDOData.btn_num = state;
  const [doForm, setDoForm] = useState(initialDOData);

  console.log("doData", doData);

  // const calNetClaimAmount = (invoice_value, debit_note, credit_note) => {
  //   if (typeof invoice_value !== "number") {
  //     invoice_value = parseInt(invoice_value) || 0;
  //   }
  //   if (typeof debit_note !== "number") {
  //     debit_note = parseInt(debit_note) || 0;
  //   }
  //   if (typeof credit_note !== "number") {
  //     credit_note = parseInt(credit_note) || 0;
  //   }
  //   // setForm({
  //   //   ...form,
  //   //   net_claim_amount:
  //   //     parseInt(invoice_value) + parseInt(debit_note) - parseInt(credit_note),
  //   // });
  // };

  // useEffect(() => {
  //   const { invoice_value, debit_note, credit_note } = form;
  //   if (invoice_value || debit_note || credit_note) {
  //     calNetClaimAmount(invoice_value, debit_note, credit_note);
  //   }
  // }, [form?.invoice_value, form?.debit_note, form?.credit_note]);

  // const getBTNData = async () => {
  //   try {
  //     const d = await apiCallBack(
  //       "GET",
  //       `po/btn/getBTNData?id=${id}`,
  //       null,
  //       token
  //     );
  //     if (d?.status) {
  //       setImpDates(d?.data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching WDC list:", error);
  //   }
  // };

  // const getDataByBTN = async () => {
  //   try {
  //     const d = await apiCallBack(
  //       "GET",
  //       `po/btn/btn_num?id=${id}&btn_num=${state}`,
  //       null,
  //       token
  //     );
  //     if (d?.status && checkTypeArr(d?.data)) {
  //       setData(d?.data[0]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching WDC list:", error);
  //   }
  // };

  const getBTNDOData = async () => {
    try {
      const d = await apiCallBack(
        "GET",
        `po/btn/btn_do?btn_num=${state}`,
        null,
        token
      );
      if (d?.status && checkTypeArr(d?.data)) {
        setDoData(d?.data[0]);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  // useEffect(() => {
  //   let net = data?.icgrn_total;
  //   let report = calculateNetPay(
  //     net,
  //     doForm?.ld_amount,
  //     doForm?.p_sdbg_amount,
  //     doForm?.p_drg_amount,
  //     doForm?.p_qap_amount,
  //     doForm?.p_ilms_amount,
  //     doForm?.o_deduction,
  //     doForm?.p_estimate_amount
  //   );
  //   console.log(report?.net_pay);
  //   setDoForm({
  //     ...doForm,
  //     total_deduction: report?.deduct,
  //     net_payable_amount: report?.net_pay,
  //   });
  // }, [doForm?.ld_amount, doForm?.o_deduction, doForm?.p_estimate_amount]);

  useEffect(() => {
    // getBTNData();
    getBTNDOData();
    // getDataByBTN();
  }, []);

  useEffect(() => {
    const { ld_c_date, ld_ge_date, total_price } = doForm;
    if (ld_c_date && ld_ge_date) {
      let p_amt = calculatePenalty(ld_c_date, ld_ge_date, total_price, 0.5, 5);
      // console.log(ld_c_date, ld_ge_date, total_price, "total_price");
      setDoForm({ ...doForm, ld_amount: p_amt });
    }
  }, [doForm?.ld_c_date, doForm?.ld_ge_date]);

  // useEffect(() => {
  //   const {
  //     a_sdbg_date,
  //     a_drawing_date,
  //     a_ilms_date,
  //     a_qap_date,
  //     c_sdbg_date,
  //     c_drawing_date,
  //     c_ilms_date,
  //     c_qap_date,
  //   } = form;
  //   let p_sdbg = 0;
  //   let p_drg = 0;
  //   let p_qap = 0;
  //   let p_ilms = 0;
  //   if (data?.total_price) {
  //     const { total_price } = data;
  //     if (a_sdbg_date && c_sdbg_date) {
  //       p_sdbg = calculatePenalty(
  //         c_sdbg_date,
  //         a_sdbg_date,
  //         total_price,
  //         0.5,
  //         5
  //       );
  //     }
  //     if (a_drawing_date && c_drawing_date) {
  //       p_drg = calculatePenalty(
  //         c_drawing_date,
  //         a_drawing_date,
  //         total_price,
  //         0.25,
  //         2
  //       );
  //     }
  //     if (a_qap_date && c_qap_date) {
  //       p_qap = calculatePenalty(c_qap_date, a_qap_date, total_price, 0.25, 2);
  //     }
  //     if (a_ilms_date && c_ilms_date) {
  //       p_ilms = calculatePenalty(
  //         c_ilms_date,
  //         a_ilms_date,
  //         total_price,
  //         0.25,
  //         2
  //       );
  //     }
  //   }
  //   setDoForm({
  //     ...doForm,
  //     p_sdbg_amount: p_sdbg,
  //     p_drg_amount: p_drg,
  //     p_qap_amount: p_qap,
  //     p_ilms_amount: p_ilms,
  //   });
  // }, [form]);

  // useEffect(() => {
  //   if (data) {
  //     setForm(data);
  //   }
  //   if (impDates) {
  //     setForm({
  //       ...form,
  //       c_sdbg_date: impDates?.c_sdbg_date || "",
  //       c_drawing_date: impDates?.c_drawing_date || "",
  //       c_qap_date: impDates?.c_qap_date || "",
  //       c_ilms_date: impDates?.c_ilms_date || "",
  //       a_sdbg_date: impDates?.a_sdbg_date || "",
  //       a_drawing_date: impDates?.a_drawing_date || "",
  //       a_qap_date: impDates?.a_qap_date || "",
  //       a_ilms_date: impDates?.a_ilms_date || "",
  //     });
  //   }
  // }, [impDates, data]);

  // console.log("data", data);
  // console.log("doForm", doForm);
  //   console.log("doData", doData);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Bills for Material PO"} id={id} />
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
                                navigate(`/invoice-and-payment-process/${id}`)
                              }
                            >
                              <FaCaretLeft className="fs-20" />
                            </button>{" "}
                            Bills for Material PO:
                          </h3>
                          <BTNMaterialVendorInfo navigate={navigate} id={id} />
                        </div>
                      </div>
                      {doData ? (
                        <div className="col-12">
                          <div className="card">
                            <h3 className="m-3">ENTRY BY DEALING OFFICER:</h3>
                            <div className="card-body p-3">
                              <div className="tab-content">
                                <div className="table-responsive">
                                  <table className="table table-striped table-bordered table_height">
                                    <tbody style={{ maxHeight: "100%" }}>
                                      <tr>
                                        <td>BTN Number:</td>
                                        <td className="btn_value">
                                          <b>{doData?.btn_num}</b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Liquidated damage</td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlFor="GED">
                                              Gate Entry Date:
                                            </label>
                                            <br />
                                            {/* <b>{doData?.btn_num}</b> */}
                                            <b>{"25/04/2024"}</b>
                                            <b></b>
                                          </div>
                                          <div className="me-3">
                                            <label htmlFor="CLD">
                                              Contractual Delivery Date:
                                            </label>
                                            <br />
                                            {/* <b>{doData?.contractual_ld}</b> */}
                                            <b>
                                              {doData?.contractual_ld &&
                                                formatDate(
                                                  doData?.contractual_ld
                                                )}
                                            </b>
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>&#8377; {doData?.ld_amount}</p>
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
                                                {/* {form?.a_drawing_date &&
                                                  new Date(
                                                    form?.a_drawing_date
                                                  ).toLocaleDateString()} */}
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
                                                {/* {form?.c_drawing_date &&
                                                  new Date(
                                                    form?.c_drawing_date
                                                  ).toLocaleDateString()} */}
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
                                                {/* {form?.a_qap_date &&
                                                  new Date(
                                                    form?.a_qap_date
                                                  ).toLocaleDateString()} */}
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
                                                {/* {form?.c_qap_date &&
                                                  new Date(
                                                    form?.c_qap_date
                                                  ).toLocaleDateString()} */}
                                                {form?.c_qap_date &&
                                                  formatDate(form?.c_qap_date)}
                                              </b>
                                            </p>
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>
                                              &#8377; {doForm?.p_qap_amount}
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
                                                {/* {form?.a_ilms_date &&
                                                  new Date(
                                                    form?.a_ilms_date
                                                  ).toLocaleDateString()} */}
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
                                                {/* {form?.c_ilms_date &&
                                                  new Date(
                                                    form?.c_ilms_date
                                                  ).toLocaleDateString()} */}
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
                                          {doData?.other_deduction}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Total deductions</td>
                                        <td>
                                          <b>
                                            &#8377; {doData?.total_deduction}
                                          </b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Net payable amount</td>
                                        <td>
                                          <b>
                                            &#8377; {doData?.net_payable_amount}
                                          </b>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="text-center">
                                  {user?.user_type !== 1 && (
                                    <>
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
                                    </>
                                  )}
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
                      ) : (
                        <>
                          <div className="col-12">
                            Waiting for the action from GRSE.
                          </div>
                        </>
                      )}
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

export default BillsMaterialHybridView;
