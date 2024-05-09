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
} from "../../utils/smallFun";
import { apiCallBack } from "../../utils/fetchAPIs";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import { convertToEpoch, formatDate } from "../../utils/getDateTimeNow";

const BillsMaterialHybridEdit = () => {
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();

  const [impDates, setImpDates] = useState(null);
  const [data, setData] = useState(null);
  console.log("data", data)
  let initialData = {
    invoice_no: "",
    invoice_filename: "",
    invoice_value: "",
    e_invoice_no: "",
    e_invoice_filename: "",
    debit_note: "",
    credit_note: "",
    net_claim_amount: 0,
    debit_credit_filename: "",
    gate_entry_no: "",
    gate_entry_date: "",
    get_entry_filename: "",
    grn_nos: "",
    icgrn_nos: "",
    icgrn_total: "",
    hsn_gstn_icgrn: false,
    c_sdbg_filename: "",
    demand_raise_filename: "",
    pbg_filename: "",
  };
  let inititalDOData = {
    btn_num: state,
    ld_ge_date: "",
    ld_c_date: "",
    ld_amount: "",
    p_sdbg_amount: "",
    p_drg_amount: "",
    p_qap_amount: "",
    p_ilms_amount: "",
    o_deduction: "",
    total_deduction: "",
    net_payable_amount: "",
  };
  const [form, setForm] = useState(initialData);
  const [doForm, setDoForm] = useState(inititalDOData);

  const calNetClaimAmount = (invoice_value, debit_note, credit_note) => {
    if (typeof invoice_value !== "number") {
      invoice_value = parseInt(invoice_value) || 0;
    }
    if (typeof debit_note !== "number") {
      debit_note = parseInt(debit_note) || 0;
    }
    if (typeof credit_note !== "number") {
      credit_note = parseInt(credit_note) || 0;
    }
    setForm({
      ...form,
      net_claim_amount:
        parseInt(invoice_value) + parseInt(debit_note) - parseInt(credit_note),
    });
  };

  useEffect(() => {
    const { invoice_value, debit_note, credit_note } = form;
    if (invoice_value || debit_note || credit_note) {
      calNetClaimAmount(invoice_value, debit_note, credit_note);
    }
  }, [form?.invoice_value, form?.debit_note, form?.credit_note]);

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
    let report = calculateNetPay(
      net,
      doForm?.ld_amount,
      doForm?.p_sdbg_amount,
      doForm?.p_drg_amount,
      doForm?.p_qap_amount,
      doForm?.p_ilms_amount,
      doForm?.o_deduction
    );
    console.log(report?.net_pay)
    setDoForm({
      ...doForm,
      total_deduction: report?.deduct,
      net_payable_amount: report?.net_pay,
    });
  }, [
    doForm?.ld_amount,
    doForm?.p_sdbg_amount,
    doForm?.p_drg_amount,
    doForm?.p_qap_amount,
    doForm?.p_ilms_amount,
    doForm?.o_deduction,
  ]);

  useEffect(() => {
    getBTNData();
    getDataByBTN();
  }, []);

  // useEffect(() => {
  //   const { ld_c_date, ld_ge_date } = doForm;
  //   if (ld_c_date && ld_ge_date && data?.icgrn_nos) {
  //     let p_amt = calculatePenalty(
  //       ld_c_date,
  //       ld_ge_date,
  //       data?.icgrn_nos,
  //       0.5,
  //       5
  //     );
  //     console.log("p_amt", p_amt, ld_c_date, ld_ge_date, data?.icgrn_nos);
  //     setDoForm({ ...doForm, ld_amount: p_amt });
  //   }
  // }, [doForm?.ld_c_date, doForm?.ld_ge_date, data?.icgrn_nos]);

  console.log("doForm,abhinit", doForm);

  useEffect(() => {
    const { ld_c_date, ld_ge_date } = doForm;

    

    console.log("HELLO", data?.icgrn_total)
    if (ld_c_date && ld_ge_date && data?.icgrn_total) {
      const icgrnData = data?.icgrn_total;
const cc = convertToEpoch(new Date(ld_c_date)) * 1000;
console.log(cc);
console.log("cc%^&*");
const aa = convertToEpoch(new Date(ld_ge_date)) * 1000;
console.log(aa);
console.log("aa%^&*");

      let p_amt = calculatePenalty(cc, aa, icgrnData, 0.5, 5);
      console.log("p_amt", p_amt, cc, aa, icgrnData);
      setDoForm({ ...doForm, ld_amount: p_amt });
    }
  }, [doForm?.ld_c_date, doForm?.ld_ge_date, data?.icgrn_total]);

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
console.log("hhhhhhhhhhhhhhhhhhhhh");
    if (data?.icgrn_total) {
      console.log("ppppppppppp");
      const icgrnData = data?.icgrn_total;

      if (a_sdbg_date && c_sdbg_date && icgrnData) {
        console.log("c_sdbg_date", )
        p_sdbg = calculatePenalty(convertToEpoch(new Date(c_sdbg_date)) * 1000, a_sdbg_date, icgrnData, 0.25, 2);
        console.log("p_sdbg", p_sdbg);
      }
      if (a_drawing_date && c_drawing_date && icgrnData) {
        p_drg = calculatePenalty(
          convertToEpoch(new Date(c_drawing_date)) * 1000,
          a_drawing_date,
          icgrnData,
          0.25,
          2
        );
        console.log("kkkkkkkkk",p_drg);
      }
      if (a_qap_date && c_qap_date && icgrnData) {
        p_qap = calculatePenalty(
          convertToEpoch(new Date(c_qap_date)) * 1000, a_qap_date, icgrnData, 0.25, 2);
      }
      if (a_ilms_date && c_ilms_date && icgrnData) {
        p_ilms = calculatePenalty(
          convertToEpoch(new Date(c_ilms_date)) * 1000, a_ilms_date, icgrnData, 0.25, 2);
      }
    }
    setDoForm({
      ...doForm,
      p_sdbg_amount: p_sdbg,
      p_drg_amount: p_drg,
      p_qap_amount: p_qap,
      p_ilms_amount: p_ilms,
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
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    <tr>
                                      <td>Invoice no:</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.invoice_no}
                                        </b>
                                        {data?.invoice_filename && (
                                          <a
                                            href={`${process.env.REACT_APP_PDF_URL}btns/${data?.invoice_filename}`}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            click here
                                          </a>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Invoice value:</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.invoice_value}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>E-Invoice :</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.e_invoice_no}
                                        </b>
                                        {data?.e_invoice_filename &&
                                          data?.e_invoice_filename !== "" && (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}btns/${data?.e_invoice_filename}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              click here
                                            </a>
                                          )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Debit/Credit Note:</td>
                                      <td className="btn_value">
                                        {data?.debit_credit_filename &&
                                          data?.debit_credit_filename !==
                                            "" && (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}btns/${data?.debit_credit_filename}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              click here
                                            </a>
                                          )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Debit Note value:</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.debit_note}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Credit Note value:</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.credit_note}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Net claim amount:</td>
                                      <td className="btn_value">
                                        <b>{data?.net_claim_amount}</b>
                                      </td>
                                    </tr>{" "}
                                    <tr>
                                      <td>Contractual SDBG Submission Date</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {form?.c_sdbg_date &&
                                            new Date(
                                              form?.c_sdbg_date
                                            ).toLocaleDateString()}
                                        </b>
                                        {data?.c_sdbg_filename &&
                                          data?.c_sdbg_filename !== "" && (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}btns/${data?.c_sdbg_filename}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              click here
                                            </a>
                                          )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual SDBG Submission Date</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {form?.a_sdbg_date &&
                                            new Date(
                                              form?.a_sdbg_date
                                            ).toLocaleDateString()}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Demand raised by production/PP&C if any
                                      </td>
                                      <td className="btn_value">
                                        {data?.demand_raise_filename &&
                                          data?.demand_raise_filename !==
                                            "" && (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}btns/${data?.demand_raise_filename}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              click here
                                            </a>
                                          )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Gate Entry Acknowledgement no.</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {checkTypeArr(impDates?.gate_entry) &&
                                            impDates?.gate_entry.map(
                                              (item, i) => (
                                                <span className="me-1" key={i}>
                                                  {item.acc_no}
                                                </span>
                                              )
                                            )}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Gate Entry Date</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {checkTypeArr(impDates?.gate_entry) &&
                                            impDates?.gate_entry.map(
                                              (item, i) => (
                                                <span className="me-1" key={i}>
                                                  {item.gate_date}
                                                </span>
                                              )
                                            )}
                                        </b>
                                        {data?.get_entry_filename &&
                                          data?.get_entry_filename !== "" && (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}btns/${data?.get_entry_filename}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              click here
                                            </a>
                                          )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GRN No</td>
                                      <td className="btn_value">
                                        <b className="me-3">{data?.grn_nos}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN No</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.icgrn_nos}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Total ICGRN Value</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.icgrn_total}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Contractual Drawing submission date
                                      </td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.c_drawing_date &&
                                            new Date(
                                              form?.c_drawing_date
                                            ).toLocaleDateString()}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual Drawing submission date</td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.a_drawing_date &&
                                            new Date(
                                              form?.a_drawing_date
                                            ).toLocaleDateString()}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Contractual QAP submission date</td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.c_qap_date &&
                                            new Date(
                                              form?.c_qap_date
                                            ).toLocaleDateString()}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual QAP submission date</td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.a_qap_date &&
                                            new Date(
                                              form?.a_qap_date
                                            ).toLocaleDateString()}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Contractual ILMS submission date</td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.c_ilms_date &&
                                            new Date(
                                              form?.c_ilms_date
                                            ).toDateString()}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual ILMS submission date</td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.a_ilms_date &&
                                            new Date(
                                              form?.a_ilms_date
                                            ).toDateString()}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>PBG</td>
                                      <td className="btn_value">
                                        {data?.pbg_filename &&
                                          data?.pbg_filename !== "" && (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}btns/${data?.pbg_filename}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              click here
                                            </a>
                                          )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan="2">
                                        <div className="form-check">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="hsn_gstn_icgrn"
                                            name="hsn_gstn_icgrn"
                                            defaultChecked={true}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="hsn_gstn_icgrn"
                                          >
                                            Whether HSN code, GSTIN, Tax rate is
                                            as per PO
                                          </label>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="text-center">
                                {user?.user_type === USER_VENDOR && (
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
                                )}
                              </div>
                            </div>
                          </div>
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
                                              Contractual Delivery
                                              Date:
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
