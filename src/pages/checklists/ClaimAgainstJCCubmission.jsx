import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { USER_VENDOR } from "../../constants/userConstants";
import {
  checkTypeArr,
  inputFileChange,
  inputTypeChange,
} from "../../utils/smallFun";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import { apiCallBack } from "../../utils/fetchAPIs";
import { convertToEpoch, formatDate } from "../../utils/getDateTimeNow";
import { FaCaretLeft } from "react-icons/fa";
import { D_S_INVOICE, E_INVOICE } from "../../constants/BTNContants";
import { initialDataJCC, initialDataService } from "../../data/btnData";
import DynamicButton from "../../Helpers/DynamicButton";
import { toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toast } from "react-bootstrap";

const ClaimAgainstJCCubmission = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [data, setData] = useState("");
  const [emp, setEmp] = useState([]);
  const [form, setForm] = useState(initialDataJCC);
  const [wdcNo, setWdcNo] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(data, "data abhi");

  console.log(data, "datadata");
  const getJCCListDropdown = async () => {
    const d = await apiCallBack(
      "GET",
      `po/btn/jcc?type=jcclist&poNo=${id}`,
      null,
      null
    );
    if (d?.status) {
      let options = d?.data.map((item, index) => {
        return {
          value: item.reference_no,
          label: item.reference_no,
        };
      });
      setWdcNo(options);
    } else {
      toast.info("WDC Not Found!");
    }
  };
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

  const getJCCList = async () => {
    const d = await apiCallBack(
      "GET",
      `po/btn/jcc?type=init&poNo=${id}`,
      null,
      token
    );
    if (d?.status) {
      setData({ ...data, initial: d?.data });
    }
  };

  useEffect(() => {
    getJCCList();
    getJCCListDropdown();
    getEmp();
  }, []);

  const checkWDCDetails = async () => {
    if (!form.wdc_number || form.wdc_number === "") {
      return toast.info("Select a WDC Number");
    }

    const d = await apiCallBack(
      "GET",
      `po/btn/jcc?type=jccinfo&reference_no=${form?.wdc_number}`,
      null,
      token
    );

    if (d?.status) {
      setData({ ...data, wdcDetails: d?.data });
      toast.success(d?.message);
    } else {
      toast.warning(d?.message || "An error occurred");
    }
  };

  console.log(data);

  const actionHandlerJCCBTN = async () => {
    try {
      setIsSubmitting(true); // Start loading

      const {
        btn_num,
        purchasing_doc_no,
        vendor_code,
        invoice_no,
        invoice_value,
        yard,
        jcc_filename,
        invoice_filename,
        invoice_type,
        invoice_date,
        bill_certifing_authority,
        net_claim_amount,
        jcc_ref_number,
        hsn_gstn_icgrn,
        remarks,
        suppoting_invoice_filename,
      } = form;

      // Validation checks
      if (!bill_certifing_authority || bill_certifing_authority === "") {
        return toast.warn("Please choose a GRSE officer.");
      }
      if (!invoice_type || invoice_type.trim() === "") {
        return toast.warning("Please choose Invoice Type.");
      }
      if (!invoice_no || invoice_no === "") {
        return toast.warning("Invoice number is mandatory.");
      }
      if (!invoice_filename || invoice_filename === "") {
        return toast.warning("Invoice file is mandatory.");
      }
      if (!invoice_value || invoice_value.trim() === "") {
        return toast.warning("Basic value is mandatory.");
      }
      if (!net_claim_amount || net_claim_amount.trim() === "") {
        return toast.warning("Net Claim Amount  is mandatory.");
      }
      if (!hsn_gstn_icgrn) {
        return toast.warning(
          "Please verify the HSN code, GSTIN, and Tax rate as per the PO."
        );
      }
      console.log(wdcNo, "wdcNowdcNo");

      // Fetch JCC data from your data response
      const jccJobStartDate = data?.wdcDetails?.jcc_job_start_date;
      const jccJobEndDate = data?.wdcDetails?.jcc_job_end_date;

      // Ensure that the dates are properly formatted (assuming they are in seconds from API)
      const formattedJccJobStartDate = jccJobStartDate
        ? Math.floor(jccJobStartDate) // No need for Date conversion as it's already in seconds
        : null;

      const formattedJccJobEndDate = jccJobEndDate
        ? Math.floor(jccJobEndDate) // Already in seconds, no need for conversion
        : null;

      // FormData object for submitting form data
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      formDataToSend.append("btn_num", btn_num);
      formDataToSend.append("vendor_code", data?.initial?.vendor_code);
      formDataToSend.append("invoice_no", invoice_no);
      formDataToSend.append("invoice_value", invoice_value);
      formDataToSend.append("yard", data?.wdcDetails?.yard_no);

      // Append JCC dates
      formDataToSend.append(
        "jcc_job_start_date",
        formattedJccJobStartDate || ""
      );
      formDataToSend.append("jcc_job_end_date", formattedJccJobEndDate || "");

      formDataToSend.append("jcc_ref_number", data?.wdcDetails?.reference_no);
      formDataToSend.append("hsn_gstn_icgrn", hsn_gstn_icgrn);
      formDataToSend.append("remarks", remarks);
      formDataToSend.append(
        "bill_certifing_authority",
        bill_certifing_authority
      );
      formDataToSend.append("net_claim_amount", net_claim_amount);
      formDataToSend.append("invoice_type", invoice_type);
      formDataToSend.append("invoice_date", invoice_date);

      // Attach files if they exist
      if (invoice_filename) {
        formDataToSend.append("invoice_filename", invoice_filename);
      }
      if (suppoting_invoice_filename) {
        formDataToSend.append(
          "suppoting_invoice_filename",
          suppoting_invoice_filename
        );
      }
      if (jcc_filename) {
        formDataToSend.append("jcc_filename", jcc_filename);
      }

      // API call
      const response = await apiCallBack(
        "POST",
        "po/btn/submit-jcc",
        formDataToSend,
        token
      );

      // Handle response
      if (response?.status) {
        toast.success(response?.message);
        setForm(initialDataService); // Reset the form after submission
        navigate(`/invoice-and-payment-process/${id}`);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      console.error("Error in actionHandlerJCCBTN:", error);
      toast.error("An error occurred: " + error.message);
    } finally {
      setIsSubmitting(false); // End loading
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Checklist For Claim Against JCC"} id={id} />
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
                                      <td>Vendor Name</td>
                                      <td className="btn_value">
                                        <b>{data?.initial?.vendor_name}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Vendor Code</td>
                                      <td className="btn_value">
                                        <b>{data?.initial?.vendor_code}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GSTIN (Registration no)</td>
                                      <td className="btn_value">
                                        <b>{data?.initial?.vendor_gstno}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>JCC No:</td>
                                      <td className="btn_value">
                                        <Select
                                          className="basic-single w_250"
                                          classNamePrefix="select"
                                          isClearable={true}
                                          isSearchable={true}
                                          name="wdc_number"
                                          id="wdc_number"
                                          options={wdcNo}
                                          value={
                                            wdcNo.filter(
                                              (item) =>
                                                item.value === form?.wdc_number
                                            )[0]
                                          }
                                          onChange={(val) =>
                                            setForm({
                                              ...form,
                                              wdc_number: val
                                                ? val.value
                                                : null,
                                            })
                                          }
                                        />
                                        <DynamicButton
                                          label="CHECK"
                                          onClick={() => checkWDCDetails()}
                                          className="btn btn-primary btn-sm m-4"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Yard No:</td>
                                      <td className="btn_value">
                                        <b>{data?.wdcDetails?.yard_no}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>JOB Completion Certificate:</td>
                                      <td className="btn_value">
                                        <div className="btn_value">
                                          <div className="me-4">
                                            <label htmlFor="">
                                              Attach Approved JCC
                                            </label>
                                            <input
                                              type="file"
                                              className="form-control"
                                              name="jcc_filename"
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
                                            <label htmlFor="">Remarks</label>
                                            <input
                                              type="text"
                                              className="form-control me-3"
                                              name="remarks"
                                              value={form?.remarks}
                                              placeholder="Enter remarks"
                                              onChange={(e) =>
                                                inputTypeChange(
                                                  e,
                                                  form,
                                                  setForm
                                                )
                                              }
                                            />
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <table
                                  className="table table-striped table-bordered table_height"
                                  style={{ marginBottom: "120px" }}
                                >
                                  <tbody>
                                    <tr>
                                      <td>Choose Invoice Type</td>
                                      <td className="btn_value">
                                        <select
                                          name="invoice_type"
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
                                            <div className="me-4">
                                              <label htmlFor="">
                                                Invoice Number
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control me-3"
                                                name="invoice_no"
                                                value={form?.invoice_no}
                                                placeholder="Enter invoice number"
                                                onChange={(e) =>
                                                  inputTypeChange(
                                                    e,
                                                    form,
                                                    setForm
                                                  )
                                                }
                                              />
                                            </div>
                                            <div>
                                              <label htmlFor="">
                                                Invoice Date
                                              </label>
                                              <ReactDatePicker
                                                selected={
                                                  form.invoice_date
                                                    ? new Date(
                                                        form.invoice_date * 1000
                                                      )
                                                    : null
                                                }
                                                onChange={(date) =>
                                                  setForm((prevData) => ({
                                                    ...prevData,
                                                    invoice_date:
                                                      convertToEpoch(date), // Convert date to epoch in seconds
                                                  }))
                                                }
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                              />
                                            </div>
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
                                                name="suppoting_invoice_filename"
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
                                        <td>E-Invoice No:</td>
                                        <td>
                                          <div className="btn_value">
                                            <div className="me-4">
                                              <label htmlFor="">
                                                Invoice Number
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control me-3"
                                                name="invoice_no"
                                                value={form?.invoice_no}
                                                placeholder="Enter invoice number"
                                                onChange={(e) =>
                                                  inputTypeChange(
                                                    e,
                                                    form,
                                                    setForm
                                                  )
                                                }
                                              />
                                            </div>
                                            <div>
                                              <label htmlFor="">
                                                Invoice Date
                                              </label>
                                              <ReactDatePicker
                                                selected={
                                                  form.invoice_date
                                                    ? new Date(
                                                        form.invoice_date * 1000
                                                      )
                                                    : null
                                                }
                                                onChange={(date) =>
                                                  setForm((prevData) => ({
                                                    ...prevData,
                                                    invoice_date:
                                                      convertToEpoch(date) *
                                                      1000,
                                                  }))
                                                }
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                              />
                                            </div>
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
                                                name="suppoting_invoice_filename"
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
                                      <td>Invoice Value:</td>
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
                                      <td>Claim Amount:</td>
                                      <td className="btn_value">
                                        <input
                                          type="number"
                                          className="form-control"
                                          onWheel={inputOnWheelPrevent}
                                          name="net_claim_amount"
                                          value={form?.net_claim_amount}
                                          onChange={(e) =>
                                            inputTypeChange(e, form, setForm)
                                          }
                                        />
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Bill Certifying Authority</td>
                                      <td className="btn_value">
                                        <Select
                                          className="basic-single w-100"
                                          classNamePrefix="select"
                                          isClearable={true}
                                          isSearchable={true}
                                          name="bill_certifing_authority"
                                          options={emp}
                                          value={
                                            emp.filter(
                                              (item) =>
                                                item.value ===
                                                form?.bill_certifing_authority
                                            )[0]
                                          }
                                          onChange={(val) =>
                                            setForm({
                                              ...form,
                                              bill_certifing_authority: val
                                                ? val.value
                                                : null,
                                            })
                                          }
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
                                  </tbody>
                                </table>
                              </div>
                              <div className="text-center">
                                {user?.user_type === USER_VENDOR && (
                                  <button
                                    type="button"
                                    className={`btn fw-bold btn-primary me-3 ${
                                      isSubmitting && "disabled"
                                    }`}
                                    onClick={actionHandlerJCCBTN}
                                    disabled={isSubmitting}
                                  >
                                    {isSubmitting ? "Submitting..." : "SUBMIT"}
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

export default ClaimAgainstJCCubmission;
