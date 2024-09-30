import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
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
import { convertToEpoch, formatDate } from "../../utils/getDateTimeNow";
import { FaCaretLeft } from "react-icons/fa";
import { D_S_INVOICE, E_INVOICE } from "../../constants/BTNContants";
import { initialDataService } from "../../data/btnData";
import DynamicButton from "../../Helpers/DynamicButton";
import { toast } from "react-toastify";
import {
  ESI_COMP,
  LEAVE_COMP,
  PF_COMP,
  WAGE_COMP,
} from "../../constants/constants";
import ReactDatePicker from "react-datepicker";

const ClaimAgainstJCCubmission = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [data, setData] = useState({
    wdcDetails: null,
    initial: null,
  });
  const [emp, setEmp] = useState([]);
  const [form, setForm] = useState(initialDataService);
  const [wdcNo, setWdcNo] = useState([]);

  const calNetClaimAmount = (invoice_value, debit_note, credit_note) => {
    invoice_value = parseInt(invoice_value) || 0;
    debit_note = parseInt(debit_note) || 0;
    credit_note = parseInt(credit_note) || 0;

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
      net_claim_amt_gst: netWithGST,
    }));
  };
  useEffect(() => {
    const { net_claim_amount, cgst, sgst, igst } = form;
    if (net_claim_amount || cgst || sgst || igst) {
      calNetClaimAmountwithGST(net_claim_amount, cgst, sgst, igst);
    }
  }, [form?.net_claim_amount, form?.cgst, form?.sgst, form?.igst]);

  useEffect(() => {
    if (checkTypeArr(data?.wdcDetails?.line_item_array)) {
      let total_price = data?.wdcDetails?.line_item_array.reduce(
        (acc, curr) => {
          return Number(curr?.po_rate) * Number(curr?.claim_qty) + acc;
        },
        0
      );
      setForm({ ...form, total_price: total_price });
    }
  }, [data?.wdcDetails?.line_item_array]);

  const getWDCList = async () => {
    const d = await apiCallBack(
      "GET",
      `po/btn/getWdcInfoServiceHybrid?type=list&purchasing_doc_no=${id}`,
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

  const getData = async () => {
    const d = await apiCallBack(
      "GET",
      `po/btn/initServiceHybrid?poNo=${id}`,
      null,
      token
    );
    if (d?.status) {
      setData({ ...data, initial: d?.data });
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

  useEffect(() => {
    getData();
    getWDCList();
    getEmp();
  }, []);

  const checkWDCDetails = async () => {
    if (!form.wdc_number || form.wdc_number === "") {
      return toast.info("Select a WDC Number");
    }
    const d = await apiCallBack(
      "GET",
      `po/btn/getWdcInfoServiceHybrid?reference_no=${form?.wdc_number}`,
      null,
      token
    );
    if (d?.status) {
      setData({ ...data, wdcDetails: d?.data });
    }
  };

  console.log(data);

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
                                      <td>WDC no:</td>
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
                                      <td>Stage:</td>
                                      <td className="btn_value">
                                        <b>{data?.wdcDetails?.stage_details}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Work Title:</td>
                                      <td className="btn_value">
                                        <b>{data?.wdcDetails?.work_title}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>WDC Certifying Authority:</td>
                                      <td className="btn_value">
                                        <b>
                                          {data?.wdcDetails?.assigned_to_name} (
                                          {data?.wdcDetails?.assigned_to})
                                        </b>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table table-striped table-bordered table_height">
                                  <thead>
                                    <tr>
                                      <th>PO Line Item No</th>
                                      <th>Service Code</th>
                                      <th>Description</th>
                                      <th>UOM</th>
                                      <th>Claim Qty</th>
                                      <th>PO Rate</th>
                                      <th>Total Claim</th>
                                      <th>Delay</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {checkTypeArr(
                                      data?.wdcDetails?.line_item_array
                                    ) &&
                                      data?.wdcDetails?.line_item_array.map(
                                        (item, i) => (
                                          <tr key={i}>
                                            <td>{item?.line_item_no}</td>
                                            <td>{item?.service_code}</td>
                                            <td>{item?.description}</td>
                                            <td>{item?.unit}</td>
                                            <td>{item?.claim_qty}</td>
                                            <td>{item?.po_rate}</td>
                                            <td>
                                              {parseFloat(
                                                Number(item?.po_rate) *
                                                  Number(item?.claim_qty)
                                              ).toFixed(2)}
                                            </td>
                                            <td>{item?.delay}</td>
                                          </tr>
                                        )
                                      )}
                                    <tr>
                                      <td colSpan={6}>Total:</td>
                                      <td colSpan={2}>
                                        <b>{form?.total_price}</b>
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
                                            <div className="me-4">
                                              <label htmlFor="">
                                                Invoice Number
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control me-3"
                                                name="invoice_no"
                                                value={form?.invoice_no}
                                                placeholder="invoice number"
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
                                                        form.invoice_date
                                                      )
                                                    : null
                                                }
                                                onChange={(date) => {
                                                  setForm((prevData) => ({
                                                    ...prevData,
                                                    invoice_date:
                                                      convertToEpoch(date) *
                                                      1000,
                                                  }));
                                                }}
                                                dateFormat="dd/MM/yyyy"
                                                className="form-control"
                                              />
                                              {/* <input
                                                type="date"
                                                className="form-control"
                                                name="invoice_date"
                                                onChange={(e) =>
                                                  inputFileChange(
                                                    e,
                                                    form,
                                                    setForm
                                                  )
                                                }
                                              /> */}
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
                                        <td>E-Invoice No :</td>
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
                                                placeholder="invoice number"
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
                                                        form.invoice_date
                                                      )
                                                    : null
                                                }
                                                onChange={(date) => {
                                                  setForm((prevData) => ({
                                                    ...prevData,
                                                    invoice_date:
                                                      convertToEpoch(date) *
                                                      1000,
                                                  }));
                                                }}
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
                                      <td>Net Claim Amount: </td>
                                      <td className="btn_value">
                                        <b>{form?.net_claim_amount}</b>
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
                                          id="emp"
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
                                    className="btn fw-bold btn-primary me-3"
                                    onClick={() =>
                                      actionHandlerServiceBTN(
                                        "ServiceBills",
                                        token,
                                        user,
                                        id,
                                        form,
                                        setForm,
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

export default ClaimAgainstJCCubmission;
