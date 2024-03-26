import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { USER_VENDOR } from "../../constants/userConstants";
import { actionHandlerBTN } from "../../Helpers/BTNChecklist";
import {
  checkTypeArr,
  inputFileChange,
  inputTypeChange,
} from "../../utils/smallFun";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import { apiCallBack } from "../../utils/fetchAPIs";

const BillsMaterialHybrid = () => {
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [impDates, setImpDates] = useState(null);
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
  const [form, setForm] = useState(initialData);

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

  const getImpDates = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/btn/getImpDates?id=${id}`,
        null,
        token
      );
      if (data?.status) {
        console.log(data?.data);
        setImpDates(data?.data);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  useEffect(() => {
    getImpDates();
  }, []);

  useEffect(() => {
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
  }, [impDates]);

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
                                        <input
                                          type="text"
                                          className="form-control me-3"
                                          name="invoice_no"
                                          value={form?.invoice_no}
                                          onChange={(e) =>
                                            inputTypeChange(e, form, setForm)
                                          }
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="invoice_filename"
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Invoice value:</td>
                                      <td className="btn_value">
                                        <input
                                          type="number"
                                          className="form-control"
                                          onWheel={inputOnWheelPrevent}
                                          name="invoice_value"
                                          value={form?.invoice_value}
                                          onChange={(e) =>
                                            inputTypeChange(e, form, setForm)
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>E-Invoice :</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control me-2"
                                          name="e_invoice_no"
                                          value={form?.e_invoice_no}
                                          onChange={(e) =>
                                            inputTypeChange(e, form, setForm)
                                          }
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="e_invoice_filename"
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
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
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
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
                                          value={form?.debit_note}
                                          onChange={(e) =>
                                            inputTypeChange(e, form, setForm)
                                          }
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
                                          value={form?.credit_note}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Net claim amount:</td>
                                      <td className="btn_value">
                                        <b>{form?.net_claim_amount}</b>
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
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="c_sdbg_filename"
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
                                        />
                                      </td>
                                    </tr>
                                    {console.log("form", form)}
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
                                        <select
                                          name=""
                                          id=""
                                          className="form-select me-2"
                                        >
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>
                                        </select>
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="demand_raise_filename"
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Gate Entry Acknowledgement no.</td>
                                      <td className="btn_value">
                                        <select
                                          name=""
                                          id=""
                                          className="form-select me-2"
                                        >
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>
                                        </select>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="gate_entry_no"
                                          value={form?.gate_entry_no}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Gate Entry Date</td>
                                      <td className="btn_value">
                                        <select
                                          name=""
                                          id=""
                                          className="form-select me-2"
                                        >
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>
                                        </select>
                                        <input
                                          type="date"
                                          className="form-control me-2"
                                          name="gate_entry_date"
                                          value={form?.gate_entry_date}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="get_entry_filename"
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GRN No 1</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="grn_no_1"
                                          value={form?.grn_no_1}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GRN No 2</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="grn_no_2"
                                          value={form?.grn_no_2}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GRN No 3</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="grn_no_3"
                                          value={form?.grn_no_3}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GRN No 4</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="grn_no_4"
                                          value={form?.grn_no_4}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 1</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="icgrn_no_1"
                                          value={form?.icgrn_no_1}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 2</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="icgrn_no_2"
                                          value={form?.icgrn_no_2}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 3</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="icgrn_no_3"
                                          value={form?.icgrn_no_3}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ICGRN no 4</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="icgrn_no_4"
                                          value={form?.icgrn_no_4}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Total ICGRN Value</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="total_icgrn_value"
                                          value={form?.total_icgrn_value}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Contractual Drawing submission date
                                      </td>
                                      <td className="btn_value">
                                        <select
                                          name=""
                                          id=""
                                          className="form-select me-2"
                                        >
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>
                                        </select>
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
                                        <select
                                          name=""
                                          id=""
                                          className="form-select me-2"
                                        >
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>
                                        </select>
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
                                        <select
                                          name=""
                                          id=""
                                          className="form-select me-2"
                                        >
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>
                                        </select>
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
                                        <select
                                          name=""
                                          id=""
                                          className="form-select me-2"
                                        >
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>
                                        </select>
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
                                        <select
                                          name=""
                                          id=""
                                          className="form-select me-2"
                                        >
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>
                                        </select>
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
                                        <select
                                          name=""
                                          id=""
                                          className="form-select me-2"
                                        >
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>
                                        </select>
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
                                        <select
                                          name=""
                                          id=""
                                          className="form-select me-2"
                                        >
                                          <option value="applicable">
                                            Applicable
                                          </option>
                                          <option value="notapplicable">
                                            Not Applicable
                                          </option>
                                        </select>
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="pbg_filename"
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
                                        />
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
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="text-center">
                                {user?.user_type === USER_VENDOR && (
                                  <button
                                    type="button"
                                    className="btn fw-bold btn-primary me-3"
                                    onClick={() =>
                                      actionHandlerBTN(
                                        "BillsMaterialHybrid",
                                        token,
                                        id,
                                        form,
                                        setForm,
                                        initialData
                                      )
                                    }
                                  >
                                    SUBMIT
                                  </button>
                                )}
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
                                          <b>78978997</b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Liquidated damage</td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlhtmlFor="GED">
                                              Gate Entry Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control "
                                              id="GED"
                                            />
                                          </div>
                                          <div className="me-3">
                                            <label htmlhtmlFor="CLD">
                                              Contractual Delivery Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              id="CLD"
                                            />
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>&#8377; 5000</p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Penalty for Drawing submission</td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlhtmlFor="DADD">
                                              Actual Delivery Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              id="DADD"
                                            />
                                          </div>
                                          <div className="me-3">
                                            <label htmlhtmlFor="DCDD">
                                              Contractual Delivery Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              id="DCDD"
                                            />
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>&#8377; 5000</p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Penalty for QAP submission</td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlhtmlFor="QADD">
                                              Actual Delivery Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              id="QADD"
                                            />
                                          </div>
                                          <div className="me-3">
                                            <label htmlhtmlFor="QCDD">
                                              Contractual Delivery Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              id="QCDD"
                                            />
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>&#8377; 5000</p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Penalty for ILMS submission</td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlhtmlFor="LADD">
                                              Actual Delivery Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              id="LADD"
                                            />
                                          </div>
                                          <div className="me-3">
                                            <label htmlhtmlFor="LCDD">
                                              Contractual Delivery Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              id="LCDD"
                                            />
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>&#8377; 5000</p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Other deduction if any </td>
                                        <td className="btn_value">
                                          <input
                                            type="text"
                                            name=""
                                            id=""
                                            className="form-control"
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
                                  <button className="btn fw-bold btn-primary me-3">
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
      {/* <div className={isPopup ? "popup active" : "popup"}>
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
      {console.log(isSecPopup)}
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
      </div> */}
    </>
  );
};

export default BillsMaterialHybrid;
