import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { USER_VENDOR } from "../../constants/userConstants";
import {
  actionHandlerBTN,
  actionHandlerByDO,
} from "../../Helpers/BTNChecklist";
import {
  calculatePenalty,
  checkTypeArr,
  inputFileChange,
  inputTypeChange,
} from "../../utils/smallFun";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import { apiCallBack } from "../../utils/fetchAPIs";
import { toast } from "react-toastify";

const BillsMaterialHybridEdit = () => {
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();

  const [impDates, setImpDates] = useState(null);
  const [data, setData] = useState(null);
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
    grn_no_1: "",
    grn_no_2: "",
    grn_no_3: "",
    grn_no_4: "",
    icgrn_no_1: "",
    icgrn_no_2: "",
    icgrn_no_3: "",
    icgrn_no_4: "",
    total_icgrn_value: "",
    hsn_gstn_icgrn: false,
    ld_gate_entry_date: "",
    ld_contractual_date: "",
    c_sdbg_filename: "",
    demand_raise_filename: "",
    pbg_filename: "",
  };
  let inititalDOData = {
    btn: state,
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
    // setForm({
    //   ...form,
    //   net_claim_amount:
    //     parseInt(invoice_value) + parseInt(debit_note) - parseInt(credit_note),
    // });
  };

  useEffect(() => {
    const { invoice_value, debit_note, credit_note } = form;
    if (invoice_value || debit_note || credit_note) {
      calNetClaimAmount(invoice_value, debit_note, credit_note);
    }
  }, [form?.invoice_value, form?.debit_note, form?.credit_note]);

  const getBTNData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/btn/getBTNData?id=${id}`,
        null,
        token
      );
      if (data?.status) {
        setImpDates(data?.data);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  const getDataByBTN = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/btn/btn_num?id=${id}&btn_num=${state}`,
        null,
        token
      );
      if (data?.status && checkTypeArr(data?.data)) {
        setData(data?.data[0]);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  useEffect(() => {
    getBTNData();
    getDataByBTN();
  }, []);

  useEffect(() => {
    const { o_deduction } = doForm;
    // if (data) {
    //   setForm({ ...form, data });
    // }
  }, [doForm?.o_deduction]);

  useEffect(() => {
    const { ld_c_date, ld_ge_date } = doForm;
    if (ld_c_date && ld_ge_date) {
      let p_amt = calculatePenalty(ld_c_date, ld_ge_date, 30000, 0.5, 5);
      setDoForm({ ...doForm, ld_amount: p_amt });
    }
  }, [doForm?.ld_c_date, doForm?.ld_ge_date]);

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
    if (data?.net_claim_amount) {
      const { net_claim_amount } = data;
      if (a_sdbg_date && c_sdbg_date) {
        p_sdbg = calculatePenalty(
          c_sdbg_date,
          a_sdbg_date,
          net_claim_amount,
          0.5,
          5
        );
      }
      if (a_drawing_date && c_drawing_date) {
        p_drg = calculatePenalty(
          c_drawing_date,
          a_drawing_date,
          net_claim_amount,
          0.25,
          2
        );
      }
      if (a_qap_date && c_qap_date) {
        p_qap = calculatePenalty(
          c_qap_date,
          a_qap_date,
          net_claim_amount,
          0.25,
          2
        );
      }
      if (a_ilms_date && c_ilms_date) {
        p_ilms = calculatePenalty(
          c_ilms_date,
          a_ilms_date,
          net_claim_amount,
          0.25,
          2
        );
      }
    }
    setDoForm({
      ...doForm,
      p_sdbg_amount: p_sdbg,
      p_drg_amount: p_drg,
      p_qap_amount: p_qap,
      p_ilms_amount: p_ilms,
    });
  }, [form]);

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
                                          data?.e_invoice_filename !==
                                            "null" && (
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
                                            "null" && (
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
                                    </tr>
                                    <tr>
                                      <td>Contractual SDBG Submission Date</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {form?.c_sdbg_date &&
                                            new Date(
                                              form?.c_sdbg_date
                                            ).toDateString()}
                                        </b>
                                        {data?.c_sdbg_filename &&
                                          data?.c_sdbg_filename !== "null" && (
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
                                            ).toDateString()}
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
                                            "null" && (
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
                                          {data?.gate_entry_no}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Gate Entry Date</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.gate_entry_date}
                                        </b>
                                        {data?.get_entry_filename &&
                                          data?.get_entry_filename !==
                                            "null" && (
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
                                      <td>GRN No 1</td>
                                      <td className="btn_value">
                                        <b className="me-3">{data?.grn_no_1}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GRN No 2</td>
                                      <td className="btn_value">
                                        <b className="me-3">{data?.grn_no_2}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GRN No 3</td>
                                      <td className="btn_value">
                                        <b className="me-3">{data?.grn_no_3}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GRN No 4</td>
                                      <td className="btn_value">
                                        <b className="me-3">{data?.grn_no_4}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 1</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.icgrn_no_1}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 2</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.icgrn_no_2}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 3</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.icgrn_no_3}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 4</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.icgrn_no_4}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Total ICGRN Value</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.total_icgrn_value}
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
                                            ).toDateString()}
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
                                            ).toDateString()}
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
                                            ).toDateString()}
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
                                            ).toDateString()}
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
                                          data?.pbg_filename !== "null" && (
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
                                    {/* <tr>
                                      <td colSpan="2">
                                        <div className="form-check">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="hsn_gstn_icgrn"
                                            name="hsn_gstn_icgrn"
                                            value={form?.hsn_gstn_icgrn}
                                            onClick={(e) =>
                                              setForm({
                                                ...form,
                                                hsn_gstn_icgrn:
                                                  e.target.checked,
                                              })
                                            }
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
                                    </tr> */}
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
                                                  new Date(
                                                    form?.a_drawing_date
                                                  ).toDateString()}
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
                                                  new Date(
                                                    form?.c_drawing_date
                                                  ).toDateString()}
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
                                                  new Date(
                                                    form?.a_qap_date
                                                  ).toDateString()}
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
                                                  new Date(
                                                    form?.c_qap_date
                                                  ).toDateString()}
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
                                                {form?.a_ilms_date &&
                                                  new Date(
                                                    form?.a_ilms_date
                                                  ).toDateString()}
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
                                                  new Date(
                                                    form?.c_ilms_date
                                                  ).toDateString()}
                                              </b>
                                            </p>
                                          </div>
                                          {console.log("doForm", doForm)}
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
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Total deductions</td>
                                        <td>
                                          <b>&#8377; 300000</b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Net payable amount</td>
                                        <td>
                                          <b>&#8377; 300000</b>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="text-center">
                                  <button
                                    type="button"
                                    className="btn fw-bold btn-primary me-3"
                                    onClick={() => actionHandlerByDO()}
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
