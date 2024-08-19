import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { USER_VENDOR } from "../../constants/userConstants";
import { actionHandlerServiceBTN } from "../../Helpers/BTNChecklist";
import {
  checkTypeArr,
  inputFileChange,
  inputTypeChange,
} from "../../utils/smallFun";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import { apiCallBack } from "../../utils/fetchAPIs";
import { formatDate } from "../../utils/getDateTimeNow";
import { FaCaretLeft, FaPlus } from "react-icons/fa";
import { D_S_INVOICE, E_INVOICE } from "../../constants/BTNContants";
import { initialDataService } from "../../data/btnData";

const ServiceContractBills = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [data, setData] = useState(null);

  const [form, setForm] = useState(initialDataService);

  // const calNetClaimAmount = (invoice_value, debit_note, credit_note,gst_rate) => {
  //   if (typeof invoice_value !== "number") {
  //     invoice_value = parseInt(invoice_value) || 0;
  //   }
  //   if (typeof debit_note !== "number") {
  //     debit_note = parseInt(debit_note) || 0;
  //   }
  //   if (typeof credit_note !== "number") {
  //     credit_note = parseInt(credit_note) || 0;
  //   }
  //   if (typeof credit_note !== "number") {
  //     gst_rate = parseInt(gst_rate) || 0;
  //   }
  //   setForm({
  //     ...form,
  //     net_claim_amount:
  //       parseInt(invoice_value) + parseInt(debit_note) - parseInt(credit_note),
  //   });
  // };

  const calNetClaimAmount = (
    invoice_value,
    debit_note,
    credit_note,
    gst_rate
  ) => {
    invoice_value = parseInt(invoice_value) || 0;
    debit_note = parseInt(debit_note) || 0;
    credit_note = parseInt(credit_note) || 0;
    gst_rate = parseInt(gst_rate) || 0;

    const net_gross_claim_amount =
      invoice_value + debit_note - credit_note + gst_rate;

    setForm((prevForm) => ({
      ...prevForm,
      net_gross_claim_amount: net_gross_claim_amount,
    }));
  };

  useEffect(() => {
    const { invoice_value, debit_note, credit_note, gst_rate } = form;
    if (invoice_value || debit_note || credit_note || gst_rate) {
      calNetClaimAmount(invoice_value, debit_note, credit_note, gst_rate);
    }
  }, [
    form?.invoice_value,
    form?.debit_note,
    form?.credit_note,
    form?.gst_rate,
  ]);

  const getData = async () => {
    try {
      const d = await apiCallBack(
        "GET",
        `po/btn/getBTNDataServiceHybrid?id=${id}`,
        null,
        token
      );
      if (d?.status) {
        setData(d?.data);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data) {
      setForm({
        ...form,
        c_sdbg_date: data?.c_sdbg_date || "",
        c_drawing_date: data?.c_drawing_date || "",
        c_qap_date: data?.c_qap_date || "",
        c_ilms_date: data?.c_ilms_date || "",
        a_sdbg_date: data?.a_sdbg_date || "",
        a_drawing_date: data?.a_drawing_date || "",
        a_qap_date: data?.a_qap_date || "",
        a_ilms_date: data?.a_ilms_date || "",
        vendor_name: data?.vendor?.vendor_name || "",
        vendor_code: data?.vendor?.vendor_code || "",
        esi_compliance_certified: data?.pfEsi?.esi || "",
        pf_compliance_certified: data?.pfEsi?.pf || "",
      });
    }
  }, [data]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createInvoiceNo();
    }
  };

  const createInvoiceNo = async () => {
    try {
      const response = await apiCallBack(
        "GET",
        `po/btn/getWdcInfoServiceHybrid?reference_no=${form?.wdc_number}`,
        null,
        token
      );
      console.log("createInvoiceNo", response);
      if (response?.status) {
        const { actual_start_date, actual_completion_date, total_amount } =
          response.data;

        // const startTimestamp = actual_start_date * 1000;
        // const completionTimestamp = actual_completion_date * 1000;

        // const startDate = new Date(startTimestamp).toLocaleDateString();
        // const completionDate = new Date(
        //   completionTimestamp
        // ).toLocaleDateString();
        setForm({
          ...form,
          actual_start_date,
          actual_completion_date,
          total_amount,
        });
      } else {
        console.error("Error creating invoice number:", response.message);
      }
    } catch (error) {
      console.error("Error creating invoice number:", error);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Bills for Service PO"} id={id} />
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
                            Bills for Service PO:
                          </h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    <tr>
                                      <td>Yard No:</td>
                                      <td className="btn_value">
                                        <input
                                          type="number"
                                          className="form-control"
                                          onWheel={inputOnWheelPrevent}
                                          name="yard"
                                          value={form?.yard}
                                          onChange={(e) =>
                                            inputTypeChange(e, form, setForm)
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Stage:</td>
                                      <td className="btn_value">
                                        <select
                                          name="stage"
                                          id=""
                                          className="form-select"
                                          onChange={(e) =>
                                            inputTypeChange(e, form, setForm)
                                          }
                                        >
                                          <option value="1"> 1 </option>
                                          <option value="2"> 2 </option>
                                          <option value="3"> 3 </option>
                                          <option value="4"> 4 </option>
                                          <option value="5"> 5 </option>
                                          <option value="6"> 6 </option>
                                          <option value="7"> 7 </option>
                                          <option value="8"> 8 </option>
                                          <option value="9"> 9 </option>
                                          <option value="10"> 10 </option>
                                          <option value="11"> 11 </option>
                                          <option value="12"> 12 </option>
                                          <option value="13"> 13 </option>
                                          <option value="14"> 14 </option>
                                          <option value="15"> 15 </option>
                                          <option value="16"> 16 </option>
                                          <option value="17"> 17 </option>
                                          <option value="18"> 18 </option>
                                          <option value="19"> 19 </option>
                                          <option value="20"> 20 </option>
                                          <option value="21"> 21 </option>
                                          <option value="22"> 22 </option>
                                          <option value="23"> 23 </option>
                                          <option value="24"> 24 </option>
                                          <option value="25"> 25 </option>
                                          <option value="26"> 26 </option>
                                          <option value="27"> 27 </option>
                                          <option value="28"> 28 </option>
                                          <option value="29"> 29 </option>
                                          <option value="30"> 30 </option>
                                        </select>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>WDC no:</td>
                                      <td className="btn_value">
                                        <input
                                          type="number"
                                          className="form-control"
                                          onWheel={inputOnWheelPrevent}
                                          name="wdc_no"
                                          value={form?.wdc_no}
                                          onChange={(e) =>
                                            inputTypeChange(e, form, setForm)
                                          }
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Work Title:</td>
                                      <td className="btn_value">
                                        <b></b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>WDC Certifying Authority:</td>
                                      <td className="btn_value">
                                        <b></b>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Choose Invoice Type</td>
                                      <td className="btn_value">
                                        <select
                                          name="invoice_type"
                                          id=""
                                          className="form-select"
                                          onChange={(e) =>
                                            inputTypeChange(e, form, setForm)
                                          }
                                        >
                                          <option value="">
                                            Choose Invoice Type
                                          </option>
                                          <option value={D_S_INVOICE}>
                                            Digitally signed Invoice
                                          </option>
                                          <option value={E_INVOICE}>
                                            E-Invoice
                                          </option>
                                        </select>
                                      </td>
                                    </tr>
                                    {form?.invoice_type === D_S_INVOICE && (
                                      <tr>
                                        <td>Digitally Signed Invoice:</td>
                                        <td>
                                          <div className="btn_value">
                                            <input
                                              type="text"
                                              className="form-control me-3"
                                              name="invoice_no"
                                              value={form?.invoice_no}
                                              placeholder="invoice number"
                                              onChange={(e) =>
                                                setForm({
                                                  ...form,
                                                  invoice_no: e.target.value,
                                                })
                                              }
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
                                                onChange={(e) =>
                                                  inputFileChange(
                                                    e,
                                                    form,
                                                    setForm
                                                  )
                                                }
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
                                                onChange={(e) =>
                                                  inputFileChange(
                                                    e,
                                                    form,
                                                    setForm
                                                  )
                                                }
                                                accept=".pdf"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}
                                    {form?.invoice_type === E_INVOICE && (
                                      <tr>
                                        <td>E-Invoice No :</td>
                                        <td>
                                          <div className="btn_value">
                                            <input
                                              type="text"
                                              className="form-control me-3"
                                              name="invoice_no"
                                              value={form?.invoice_no}
                                              placeholder="invoice number"
                                              onChange={(e) =>
                                                setForm({
                                                  ...form,
                                                  invoice_no: e.target.value,
                                                })
                                              }
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
                                                onChange={(e) =>
                                                  inputFileChange(
                                                    e,
                                                    form,
                                                    setForm
                                                  )
                                                }
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
                                                onChange={(e) =>
                                                  inputFileChange(
                                                    e,
                                                    form,
                                                    setForm
                                                  )
                                                }
                                                accept=".pdf"
                                              />
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}

                                    <tr>
                                      <td>Additional PO:</td>
                                      <td className="btn_value">
                                        {checkTypeArr(form?.associated_po) &&
                                          form.associated_po.map((item, i) => (
                                            <input
                                              type="text"
                                              className="form-control"
                                              name="associated_po"
                                              value={item?.a_po}
                                              onChange={(e) => {
                                                item.a_po = e.target.value;
                                                setForm({
                                                  ...form,
                                                  associated_po:
                                                    form.associated_po,
                                                });
                                              }}
                                              key={i}
                                            />
                                          ))}
                                        <button
                                          className="btn btn-sm btn-primary d-flex align-items-center ms-2"
                                          style={{ fontSize: "16px" }}
                                          type="button"
                                          onClick={() =>
                                            setForm({
                                              ...form,
                                              associated_po: [
                                                ...form?.associated_po,
                                                {
                                                  a_po: "",
                                                },
                                              ],
                                            })
                                          }
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
                                          value={form?.invoice_value}
                                          onChange={(e) =>
                                            inputTypeChange(e, form, setForm)
                                          }
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
                                      <td>Net Basic amount: </td>
                                      <td className="btn_value">
                                        <b>{form?.net_gross_claim_amount}</b>
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
                                          value={form?.cgst}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
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
                                          value={form?.sgst}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
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
                                          value={form?.igst}
                                          onChange={(e) => {
                                            inputTypeChange(e, form, setForm);
                                          }}
                                        />
                                        <span className="ms-1">%</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Net claim amount with GST:</td>
                                      <td className="btn_value">
                                        <b>{form?.net_with_gst}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>PBG</td>
                                      <td className="btn_value">
                                        {checkTypeArr(data?.pbg_filename)
                                          ? data?.pbg_filename.map(
                                              (item, i) => {
                                                return (
                                                  <a
                                                    key={i}
                                                    href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${item?.file_name}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                  >
                                                    VIEW
                                                  </a>
                                                );
                                              }
                                            )
                                          : "PBG NOT SUBMITTED"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Total:</td>
                                      <td className="btn_value">
                                        <b>{form?.total_amount}</b>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Contractual SDBG Submission Date</td>
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
                                      <td>Contractual work start date</td>
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
                                      <td>Contractual work completion date</td>
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
                                      <td>Actual work start date</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {form?.actual_start_date &&
                                            new Date(
                                              form?.actual_start_date * 1000
                                            ).toLocaleDateString()}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual work completion date</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {form?.actual_completion_date &&
                                            formatDate(
                                              form?.actual_completion_date *
                                                1000
                                            )}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Hinderance register certified by
                                        berth/user
                                      </td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {form?.actual_completion_date &&
                                            formatDate(
                                              form?.actual_completion_date *
                                                1000
                                            )}
                                        </b>
                                      </td>
                                    </tr>
                                    {/* <tr>
                                      <td>ESI Compliance Certified By HR</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {false ? (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${data?.file_name}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              VIEW
                                            </a>
                                          ) : (
                                            "ESI NOT SUBMITTED."
                                          )}
                                        </b>
                                      </td>
                                    </tr> */}
                                    <tr>
                                      <td>ESI Compliance Certified By HR</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.pfEsi?.esi !== null ? (
                                            <span>PF COMPLIANT</span>
                                          ) : (
                                            <span>PF NOT SUBMITTED</span>
                                          )}
                                        </b>
                                      </td>
                                    </tr>
                                    {/* <tr>
                                      {console.log(data, "dataBBBBBBBBBBB")}
                                      <td>PF Compliance Certified By HR</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {checkTypeArr(data?.sdbg_filename) ? (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${data?.file_name}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              VIEW
                                            </a>
                                          ) : (
                                            "PF NOT SUBMITTED."
                                          )}

                                          {false ? (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${data?.file_name}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              VIEW
                                            </a>
                                          ) : (
                                            "PF NOT SUBMITTED."
                                          )}
                                        </b>
                                      </td>
                                    </tr> */}

                                    <tr>
                                      <td>PF Compliance Certified By HR</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.pfEsi?.pf !== null ? (
                                            <span>PF COMPLIANT</span>
                                          ) : (
                                            <span>PF NOT SUBMITTED</span>
                                          )}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Wage Compliance Certified By HR</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {false ? (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${data?.file_name}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              VIEW
                                            </a>
                                          ) : (
                                            "WAGE NOT SUBMITTED."
                                          )}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Leave Salary & Bonus Compliance
                                        certified by HR
                                      </td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {false ? (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${data?.file_name}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              VIEW
                                            </a>
                                          ) : (
                                            "WAGE NOT SUBMITTED."
                                          )}
                                        </b>
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
                                      actionHandlerServiceBTN(
                                        "BillsMaterialHybrid",
                                        token,
                                        user,
                                        id,
                                        form,
                                        setForm,
                                        initialDataService,
                                        navigate
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
