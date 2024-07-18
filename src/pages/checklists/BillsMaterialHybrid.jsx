import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { USER_VENDOR } from "../../constants/userConstants";
import {
  actionHandlerBTN,
  getGrnIcgrnByInvoice,
} from "../../Helpers/BTNChecklist";
import { FaPlus } from "react-icons/fa";
import {
  checkTypeArr,
  inputFileChange,
  inputTypeChange,
} from "../../utils/smallFun";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import { apiCallBack } from "../../utils/fetchAPIs";
import { formatDate } from "../../utils/getDateTimeNow";
import { toast } from "react-toastify";
import { initialData } from "../../data/btnData";
import DynamicButton from "../../Helpers/DynamicButton";

const BillsMaterialHybrid = () => {
  const navigate = useNavigate();
  // const { isDO, poType } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [form, setForm] = useState(initialData);
  const [invType, setInvType] = useState({
    inv_type: "",
  });

  const calNetClaimAmount = (invoice_value, debit_note, credit_note) => {
    invoice_value = parseFloat(invoice_value) || 0;
    debit_note = parseFloat(debit_note) || 0;
    credit_note = parseFloat(credit_note) || 0;

    const net_claim_amount = invoice_value + debit_note - credit_note;

    setForm((prevForm) => ({
      ...prevForm,
      net_claim_amount: net_claim_amount,
    }));
  };
  useEffect(() => {
    const { invoice_value, debit_note, credit_note } = form;
    if (invoice_value || debit_note || credit_note) {
      calNetClaimAmount(invoice_value, debit_note, credit_note);
    }
  }, [form?.invoice_value, form?.debit_note, form?.credit_note]);

  const calNetClaimAmountwithGST = (net_claim_amount, cgst, sgst, igst) => {
    cgst = parseFloat(cgst) || 0;
    sgst = parseFloat(sgst) || 0;
    igst = parseFloat(igst) || 0;

    const totalGST = (cgst + sgst + igst) / 100;
    let netWithGST = net_claim_amount * (1 + totalGST);
    netWithGST = parseFloat(netWithGST.toFixed(2));
    setForm((prevForm) => ({
      ...prevForm,
      net_with_gst: netWithGST,
    }));
  };
  useEffect(() => {
    const { net_claim_amount, cgst, sgst, igst } = form;
    if (net_claim_amount || cgst || sgst || igst) {
      calNetClaimAmountwithGST(net_claim_amount, cgst, sgst, igst);
    }
  }, [form?.net_claim_amount, form?.cgst, form?.sgst, form?.igst]);
  const getData = async () => {
    try {
      const d = await apiCallBack(
        "GET",
        `po/btn/getBTNData?id=${id}`,
        null,
        token
      );
      if (d?.status) {
        console.log(d);
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
      });
    }
  }, [data]);

  const getGrnIcgrnHandler = async () => {
    let inv_no = form.invoice_no || form.e_invoice_no;
    console.log("inv_no", inv_no);
    let response = await getGrnIcgrnByInvoice(id, inv_no, token);
    if (response?.status) {
      const { gate_entry_no, grn_nos, icgrn_nos, invoice_date, total_price } =
        response.data;
      setForm({
        ...form,
        gate_entry_no: gate_entry_no,
        gate_entry_date: formatDate(invoice_date),
        grn_nos: grn_nos,
        icgrn_nos: icgrn_nos,
        total_price: total_price,
      });
    } else {
      toast.warn(response.message);
    }
  };

  useEffect(() => {
    setForm({
      ...form,
      invoice_no: "",
      invoice_filename: "",
      invoice_value: "",
      e_invoice_no: "",
      e_invoice_filename: "",
      gate_entry_no: "",
      gate_entry_date: "",
      get_entry_filename: "",
      total_icgrn_value: "",
      grn_nos: "",
      icgrn_nos: "",
    });
  }, [invType?.inv_type]);

  // console.log("form", form);

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
                                      <td>Choose Invoice Type</td>
                                      <td className="btn_value">
                                        <select
                                          name="inv_type"
                                          id=""
                                          className="form-select"
                                          onChange={(e) =>
                                            inputTypeChange(
                                              e,
                                              invType,
                                              setInvType
                                            )
                                          }
                                        >
                                          <option value="">
                                            Choose Invoice Type
                                          </option>
                                          <option value="inv">
                                            Digitally signed Invoice
                                          </option>
                                          <option value="e_inv">
                                            E-Invoice
                                          </option>
                                        </select>
                                      </td>
                                    </tr>
                                    {invType?.inv_type === "inv" && (
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
                                            <button
                                              type="button"
                                              className="btn btn-primary btn-sm m-4"
                                              onClick={getGrnIcgrnHandler}
                                            >
                                              CHECK
                                            </button>
                                          </div>
                                          {/* <p>
                                            In case of ink -signed invoice
                                            vendor should mandatorily send Hard
                                            Copy of Invoice to Dealing within 2
                                            working days
                                          </p> */}
                                        </td>
                                      </tr>
                                    )}
                                    {invType?.inv_type === "e_inv" && (
                                      <tr>
                                        <td>E-Invoice No :</td>
                                        <td className="btn_value">
                                          <input
                                            type="text"
                                            className="form-control me-2"
                                            name="e_invoice_no"
                                            placeholder="E-Invoice number"
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
                                          <button
                                            type="button"
                                            className="btn btn-primary btn-sm m-4"
                                            onClick={getGrnIcgrnHandler}
                                          >
                                            CHECK
                                          </button>
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
                                      <td>Net Basic amount:</td>
                                      <td className="btn_value">
                                        <b>{form?.net_claim_amount}</b>
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
                                      <td>Contractual SDBG Submission Date</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {form?.c_sdbg_date &&
                                            formatDate(form?.c_sdbg_date)}
                                          {!form?.c_sdbg_date
                                            ? "NA"
                                            : form?.c_sdbg_date &&
                                              !form?.a_sdbg_date
                                            ? "(NOT SUBMITTED)"
                                            : ""}
                                        </b>
                                        {checkTypeArr(data?.sdbg_filename)
                                          ? data?.sdbg_filename.map(
                                              (item, i) => {
                                                return (
                                                  <a
                                                    href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${item?.file_name}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    key={i}
                                                  >
                                                    VIEW
                                                  </a>
                                                );
                                              }
                                            )
                                          : ""}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual SDBG Submission Date</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {form?.a_sdbg_date &&
                                            formatDate(form?.a_sdbg_date)}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Demand raised by production/PP&C if any
                                      </td>
                                      <td className="btn_value">
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
                                        {form.gate_entry_no
                                          ? form.gate_entry_no
                                          : "NA"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Gate Entry Date</td>
                                      <td className="btn_value">
                                        {form.gate_entry_date
                                          ? form.gate_entry_date
                                          : "NA"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GRN No </td>
                                      <td className="btn_value">
                                        <p>
                                          {checkTypeArr(form?.grn_nos) &&
                                            form?.grn_nos.map((item, i) => (
                                              <b key={i} className="mx-2">
                                                {item?.grn_no}
                                              </b>
                                            ))}
                                        </p>
                                      </td>
                                      {/* <td className="btn_value">
                                        {form.grn_nos ? form.grn_nos : "NA"}
                                      </td> */}
                                    </tr>
                                    <tr>
                                      <td>ICGRN no </td>
                                      <td className="btn_value">
                                        <p>
                                          {checkTypeArr(form?.icgrn_nos) &&
                                            form?.icgrn_nos?.map((item, i) => (
                                              <b key={i} className="mx-2">
                                                {item?.icgrn_no}
                                              </b>
                                            ))}
                                        </p>
                                        {/* {form.icgrn_nos ? form.icgrn_nos : "NA"} */}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Total ICGRN Value</td>
                                      <td className="btn_value">
                                        <b>
                                          {form.total_price
                                            ? form.total_price
                                            : "NA"}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Contractual Drawing submission date
                                      </td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.c_drawing_date
                                            ? formatDate(form.c_drawing_date)
                                            : "NA"}
                                        </b>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Actual Drawing submission date</td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.a_drawing_date
                                            ? formatDate(form.a_drawing_date)
                                            : "NA"}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Contractual QAP submission date</td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.c_qap_date
                                            ? formatDate(form.c_qap_date)
                                            : "NA"}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual QAP submission date</td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.a_qap_date
                                            ? formatDate(form.a_qap_date)
                                            : "NA"}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Contractual ILMS submission date</td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.c_ilms_date
                                            ? formatDate(form.c_ilms_date)
                                            : "NA"}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual ILMS submission date</td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.a_ilms_date
                                            ? formatDate(form.a_ilms_date)
                                            : "NA"}
                                        </b>
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
                                      <td colSpan="2">
                                        <div className="form-check">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="agree_to_declaration"
                                            name="agree_to_declaration"
                                            value={form?.agree_to_declaration}
                                            required
                                            onClick={(e) =>
                                              setForm({
                                                ...form,
                                                agree_to_declaration:
                                                  e.target.checked,
                                              })
                                            }
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="agree_to_declaration"
                                          >
                                            I hereby declare that all the
                                            entries are correct.
                                          </label>
                                        </div>
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
                                            required
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
                                  // <button
                                  //   type="button"
                                  //   className="btn fw-bold btn-primary me-3"
                                  //   onClick={() =>
                                  //     actionHandlerBTN(
                                  //       "BillsMaterialHybrid",
                                  //       token,
                                  //       id,
                                  //       form,
                                  //       setForm,
                                  //       initialData,
                                  //       navigate
                                  //     )
                                  //   }
                                  // >
                                  //   SUBMIT
                                  // </button>
                                  <DynamicButton
                                    label="SUBMIT"
                                    onClick={() =>
                                      actionHandlerBTN(
                                        "BillsMaterialHybrid",
                                        token,
                                        id,
                                        form,
                                        setForm,
                                        initialData,
                                        navigate
                                      )
                                    }
                                    className="btn fw-bold btn-primary me-3"
                                  />
                                )}
                                <button
                                  className="btn btn-sm btn-primary me-3"
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

export default BillsMaterialHybrid;
