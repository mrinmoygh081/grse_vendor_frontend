import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { USER_VENDOR } from "../../constants/userConstants";
import { actionHandlerByDO } from "../../Helpers/BTNChecklist";
import {
  calculateNetPay,
  calculatePenalty,
  checkTypeArr,
  inputTypeChange,
} from "../../utils/smallFun";
import { apiCallBack } from "../../utils/fetchAPIs";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import { convertToEpoch, formatDate } from "../../utils/getDateTimeNow";
import Select from "react-select";
import BTNMaterialVendorInfo from "../../components/BTNMaterialVendorInfo";
import { initialDOData, initialData } from "../../data/btnData";

const BillsMaterialHybridEdit = () => {
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();

  const [impDates, setImpDates] = useState(null);
  const [data, setData] = useState(null);
  initialDOData.btn_num = state;
  const [form, setForm] = useState(initialData);
  const [doForm, setDoForm] = useState(initialDOData);
  // const [options, setOptions] = useState([]);
  const [emp, setEmp] = useState(null);

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
  //   setForm({
  //     ...form,
  //     net_claim_amount:
  //       parseInt(invoice_value) + parseInt(debit_note) - parseInt(credit_note),
  //   });
  // };

  // useEffect(() => {
  //   const { invoice_value, debit_note, credit_note } = form;
  //   if (invoice_value || debit_note || credit_note) {
  //     calNetClaimAmount(invoice_value, debit_note, credit_note);
  //   }
  // }, [form?.invoice_value, form?.debit_note, form?.credit_note]);

  const getBTNData = async () => {
    try {
      const d = await apiCallBack(
        "GET",
        `po/btn/getBTNData?id=${id}`,
        null,
        token
      );
      if (d?.status) {
        setImpDates(d?.data);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  const getDataByBTN = async () => {
    try {
      const d = await apiCallBack(
        "GET",
        `po/btn/btn_num?id=${id}&btn_num=${state}`,
        null,
        token
      );
      if (d?.status && checkTypeArr(d?.data)) {
        setData(d?.data[0]);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  useEffect(() => {
    let net = data?.icgrn_total;
    if (net) {
      let report = calculateNetPay(
        net,
        doForm?.ld_amount,
        doForm?.p_sdbg_amount,
        doForm?.drg_penalty,
        doForm?.qap_penalty,
        doForm?.ilms_penalty,
        doForm?.other_deduction,
        doForm?.p_estimate_amount
      );
      console.log("net_pay", report?.net_pay);
      setDoForm({
        ...doForm,
        total_deduction: report?.deduct,
        net_payable_amount: report?.net_pay,
      });
    }
  }, [
    data?.icgrn_total,
    doForm?.ld_amount,
    doForm?.other_deduction,
    doForm?.p_estimate_amount,
  ]);

  const getEmp = async () => {
    try {
      const data = await apiCallBack("GET", `po/wdc/grseEmpList`, null, token);
      if (data?.status) {
        let options = data.data.map((item, index) => {
          return {
            value: item.code,
            label: `${item.name} (${item.code})`,
          };
        });
        setEmp(options);
      }
    } catch (error) {
      console.error("Error fetching Employee list:", error);
    }
  };

  useEffect(() => {
    getBTNData();
    getDataByBTN();
    getEmp();
  }, []);

  // useEffect(() => {
  //   const { contractual_ld, ld_ge_date } = doForm;
  //   if (contractual_ld && ld_ge_date && data?.icgrn_nos) {
  //     let p_amt = calculatePenalty(
  //       contractual_ld,
  //       ld_ge_date,
  //       data?.icgrn_nos,
  //       0.5,
  //       5
  //     );
  //     console.log("p_amt", p_amt, contractual_ld, ld_ge_date, data?.icgrn_nos);
  //     setDoForm({ ...doForm, ld_amount: p_amt });
  //   }
  // }, [doForm?.contractual_ld, doForm?.ld_ge_date, data?.icgrn_nos]);

  useEffect(() => {
    const { contractual_ld, ld_ge_date } = doForm;
    if (contractual_ld && ld_ge_date && data?.icgrn_total) {
      const icgrnData = data?.icgrn_total;
      const cc = convertToEpoch(new Date(contractual_ld)) * 1000;
      const aa = convertToEpoch(new Date(ld_ge_date)) * 1000;
      let p_amt = calculatePenalty(cc, aa, icgrnData, 0.5, 5);
      console.log("p_amt", p_amt, cc, aa, icgrnData);
      setDoForm({ ...doForm, ld_amount: p_amt });
    }
  }, [doForm?.contractual_ld, doForm?.ld_ge_date, data?.icgrn_total]);

  useEffect(() => {
    const {
      a_sdbg_date,
      a_drawing_date,
      a_ilms_date,
      a_qap_date,
      c_sdbg_date,
      c_drawing_date,
      c_ilms_date,
      c_qap_date,
    } = form;
    let p_sdbg = 0;
    let p_drg = 0;
    let p_qap = 0;
    let p_ilms = 0;
    let p_estimate = 0;

    if (data?.icgrn_total) {
      const icgrnData = data?.icgrn_total;

      if (a_sdbg_date && c_sdbg_date && icgrnData) {
        console.log("c_sdbg_date");
        p_sdbg = calculatePenalty(
          convertToEpoch(new Date(c_sdbg_date)) * 1000,
          a_sdbg_date,
          icgrnData,
          0.25,
          2
        );
        console.log("p_sdbg", p_sdbg);
      }
      if (a_drawing_date && c_drawing_date && icgrnData) {
        p_drg = calculatePenalty(
          convertToEpoch(new Date(c_drawing_date)) * 1000,
          a_drawing_date,
          icgrnData,
          0.25,
          1
        );
        console.log("kkkkkkkkk", p_drg);
      }
      if (a_qap_date && c_qap_date && icgrnData) {
        p_qap = calculatePenalty(
          convertToEpoch(new Date(c_qap_date)) * 1000,
          a_qap_date,
          icgrnData,
          0.25,
          2
        );
      }
      if (a_ilms_date && c_ilms_date && icgrnData) {
        p_ilms = calculatePenalty(
          convertToEpoch(new Date(c_ilms_date)) * 1000,
          a_ilms_date,
          icgrnData,
          0.25,
          2
        );
      }
      p_estimate = Math.max(p_drg, p_qap, p_ilms);
    }
    setDoForm({
      ...doForm,
      p_sdbg_amount: p_sdbg,
      drg_penalty: p_drg,
      qap_penalty: p_qap,
      ilms_penalty: p_ilms,
      p_estimate_amount: p_estimate,
    });
  }, [form, data?.icgrn_total]);

  useEffect(() => {
    if (data) {
      setForm(data);
    }
    if (impDates) {
      setForm({
        ...form,
        c_sdbg_date: impDates?.c_sdbg_date || "",
        c_drawing_date: impDates?.c_drawing_date || "",
        c_qap_date: impDates?.c_qap_date || "",
        c_ilms_date: impDates?.c_ilms_date || "",
        a_sdbg_date: impDates?.a_sdbg_date || "",
        a_drawing_date: impDates?.a_drawing_date || "",
        a_qap_date: impDates?.a_qap_date || "",
        a_ilms_date: impDates?.a_ilms_date || "",
      });
    }
  }, [impDates, data]);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Bills for Material Hybrid PO"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <form>
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card">
                          <h3 className="m-3">Bills for Material Hybrid PO:</h3>
                          <BTNMaterialVendorInfo navigate={navigate} id={id} />
                        </div>
                      </div>
                      {isDO && (
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
                                                  doForm?.assign_to
                                              )[0]
                                            }
                                            onChange={(val) =>
                                              setDoForm({
                                                ...doForm,
                                                assign_to: val.value,
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
                                              value={doForm?.contractual_ld}
                                              onChange={(e) =>
                                                setDoForm({
                                                  ...doForm,
                                                  contractual_ld:
                                                    e.target.value,
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
                                            <p>&#8377; {doForm?.drg_penalty}</p>
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
                                            <p>&#8377; {doForm?.qap_penalty}</p>
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
                                              &#8377; {doForm?.ilms_penalty}
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Estimated Penalty </td>
                                        <td className="btn_value">
                                          <p>
                                            &#8377; {doForm?.p_estimate_amount}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Other deduction if any </td>
                                        <td className="btn_value">
                                          <input
                                            type="number"
                                            name="other_deduction"
                                            id=""
                                            className="form-control"
                                            value={doForm?.other_deduction}
                                            onChange={(e) =>
                                              inputTypeChange(
                                                e,
                                                doForm,
                                                setDoForm
                                              )
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
                                  subject to satutatory deduction.
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

export default BillsMaterialHybridEdit;
