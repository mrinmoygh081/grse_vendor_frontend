import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import {
  checkTypeArr,
  inputFileChange,
  inputTypeChange,
} from "../../utils/smallFun";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import { apiCallBack } from "../../utils/fetchAPIs";
import { useSelector } from "react-redux";
import { actionHandlerAdvancebillHybrid } from "../../Helpers/BTNChecklist";
import { USER_VENDOR } from "../../constants/userConstants";

const AdvanceBillHybrid = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [isSecPopup, setIsSecPopup] = useState(false);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
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
  const [form, setForm] = useState(initialData);
  const [data, setData] = useState(null);

  //calclation
  const calNetClaimAmount = (invoice_value) => {
    invoice_value = parseFloat(invoice_value) || 0;

    const net_claim_amount = invoice_value;

    setForm((prevForm) => ({
      ...prevForm,
      net_claim_amount: net_claim_amount,
    }));
  };
  useEffect(() => {
    const { invoice_value } = form;
    if (invoice_value) {
      calNetClaimAmount(invoice_value);
    }
  }, [form?.invoice_value]);

  console.log(form, "form");

  const getData = async () => {
    try {
      const payload = {
        poNo: id,
      };
      const d = await apiCallBack(
        "POST",
        `po/btn/getAdvBillHybrid`,
        payload,
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
      const firstEntry = data[0];
      setForm({
        ...form,
        purchasing_doc_no: firstEntry.purchasing_doc_no,
        vendor_code: firstEntry.vendor_code,
        vendor_name: firstEntry.vendor_name,
        a_sdbg_date: firstEntry.a_sdbg_sub_date,
        c_sdbg_date: firstEntry.c_sdbg_sub_date,
        c_sdbg_filename: firstEntry.c_sdbg_filename,
        c_sdbg_file_path: firstEntry.c_sdbg_file_path,
      });
    }
  }, [data]);

  // calculate gst function
  useEffect(() => {
    calculateNetClaimAmountWithGST();
  }, [form.invoice_value, form.cgst, form.sgst, form.igst]);

  const calculateNetClaimAmountWithGST = () => {
    const invoiceValue = parseFloat(form.invoice_value) || 0;
    const cgst = parseFloat(form.cgst) || 0;
    const sgst = parseFloat(form.sgst) || 0;
    const igst = parseFloat(form.igst) || 0;

    const totalGST = ((cgst + sgst + igst) / 100) * invoiceValue;
    const netClaimAmountWithGST = invoiceValue + totalGST;

    setForm((prevForm) => ({
      ...prevForm,
      net_claim_amt_gst: netClaimAmountWithGST.toFixed(2),
    }));
  };

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
                                    <tr>
                                      <td>Invoice No:</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          className="form-control me-3"
                                          name="invoice_no"
                                          value={form?.invoice_no}
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
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
                                        />
                                        {/* <button
                                          type="button"
                                          className="btn btn-primary btn-sm m-4"
                                          onClick={createInvoiceNo}
                                        >
                                          CHECK
                                        </button> */}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>E-Invoice No :</td>
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
                                        {/* <button
                                          type="button"
                                          className="btn btn-primary btn-sm m-4"
                                          onClick={createInvoiceNo}
                                        >
                                          CHECK
                                        </button> */}
                                      </td>
                                    </tr>
                                    {/* <tr>
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
                                    </tr> */}

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
                                      <td>Net claim amount:</td>
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
                                        <b>{form?.net_claim_amt_gst}</b>
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
                                        {form?.c_sdbg_filename ? (
                                          <a
                                            href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${form.c_sdbg_filename}`}
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
                                          {form?.a_sdbg_date &&
                                            new Date(
                                              form?.a_sdbg_date
                                            ).toDateString()}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Contractual Submission of Level-1:
                                      </td>
                                      <td className="btn_value">
                                        <input
                                          type="date"
                                          className="form-control me-3"
                                          id="GED"
                                          value={form?.c_level1_doc_sub_date}
                                          onChange={(e) =>
                                            setForm({
                                              ...form,
                                              c_level1_doc_sub_date:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="c_level1_doc_name"
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        Contractual Submission of Level-2:
                                      </td>
                                      <td className="btn_value">
                                        <input
                                          type="date"
                                          className="form-control me-3"
                                          id="GED"
                                          value={form?.c_level2_doc_sub_date}
                                          onChange={(e) =>
                                            setForm({
                                              ...form,
                                              c_level2_doc_sub_date:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="c_level2_doc_name"
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
                                        />
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>
                                        Contractual Submission of Level-3:
                                      </td>
                                      <td className="btn_value">
                                        <input
                                          type="date"
                                          className="form-control me-3"
                                          id="GED"
                                          value={form?.c_level3_doc_sub_date}
                                          onChange={(e) =>
                                            setForm({
                                              ...form,
                                              c_level3_doc_sub_date:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="c_level3_doc_name"
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual Submission of Level-1:</td>
                                      <td className="btn_value">
                                        <input
                                          type="date"
                                          className="form-control me-3"
                                          id="GED"
                                          value={form?.a_level1_doc_sub_date}
                                          onChange={(e) =>
                                            setForm({
                                              ...form,
                                              a_level1_doc_sub_date:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="a_level1_doc_name"
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual Submission of Level-2:</td>
                                      <td className="btn_value">
                                        <input
                                          type="date"
                                          className="form-control me-3"
                                          id="GED"
                                          value={form?.a_level2_doc_sub_date}
                                          onChange={(e) =>
                                            setForm({
                                              ...form,
                                              a_level2_doc_sub_date:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="a_level2_doc_name"
                                          onChange={(e) =>
                                            inputFileChange(e, form, setForm)
                                          }
                                          accept=".pdf"
                                        />
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Actual Submission of Level-3:</td>
                                      <td className="btn_value">
                                        <input
                                          type="date"
                                          className="form-control me-3"
                                          id="GED"
                                          value={form?.a_level3_doc_sub_date}
                                          onChange={(e) =>
                                            setForm({
                                              ...form,
                                              a_level3_doc_sub_date:
                                                e.target.value,
                                            })
                                          }
                                        />
                                        <input
                                          type="file"
                                          className="form-control"
                                          name="a_level3_doc_name"
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
                                            id="hsn_gstn_tax"
                                            name="hsn_gstn_tax"
                                            value={form?.hsn_gstn_tax}
                                            onClick={(e) =>
                                              setForm({
                                                ...form,
                                                hsn_gstn_tax: e.target.checked,
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
      <div className={isPopup ? "popup active" : "popup"}>
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
      {/* {console.log(isSecPopup)} */}
    </>
  );
};

export default AdvanceBillHybrid;
