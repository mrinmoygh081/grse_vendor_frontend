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
import { calDatesDiff, formatDate } from "../../utils/getDateTimeNow";
import { FaCaretLeft, FaPlus } from "react-icons/fa";
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

const ServiceContractBills = () => {
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

  const getWDCList = async () => {
    const d = await apiCallBack(
      "GET",
      "po/btn/getWdcInfoServiceHybrid?type=list",
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
      const data = await apiCallBack(
        "GET",
        `po/btn/getFinanceEmpList`,
        null,
        token
      );
      if (data?.status) {
        let options = data.data.map((item, index) => {
          return {
            value: item.usercode,
            label: `${item.empname} (${item.usercode})`,
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
                                        <b>{data?.wdcDetails?.assigned_to}</b>
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
                                        <b>
                                          {checkTypeArr(
                                            data?.wdcDetails?.line_item_array
                                          ) &&
                                            data?.wdcDetails?.line_item_array.reduce(
                                              (acc, curr) => {
                                                return (
                                                  Number(curr?.po_rate) *
                                                    Number(curr?.claim_qty) +
                                                  acc
                                                );
                                              },
                                              0
                                            )}
                                        </b>
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
                                      <td>Contractual SDBG Submission Date</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.initial?.c_sdbg_date &&
                                            formatDate(
                                              data?.initial?.c_sdbg_date
                                            )}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Actual SDBG Submission Date</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.initial?.a_sdbg_date &&
                                            formatDate(
                                              data?.initial?.a_sdbg_date
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
                                          {data?.wdcDetails
                                            ?.file_hinderence_report_cerified_by_berth ? (
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}wdc/${data?.wdcDetails?.file_hinderence_report_cerified_by_berth}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              VIEW
                                            </a>
                                          ) : (
                                            "NOT SUBMITTED"
                                          )}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>ESI Compliance Certified By HR</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {checkTypeArr(
                                            data?.initial?.hrDetais
                                          ) &&
                                          data?.initial?.hrDetais.filter(
                                            (item) =>
                                              item.action_type === ESI_COMP
                                          ).length > 0
                                            ? "ESI COMPLIANT"
                                            : "NOT COMPLIENT"}
                                        </b>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>PF Compliance Certified By HR</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {checkTypeArr(
                                            data?.initial?.hrDetais
                                          ) &&
                                          data?.initial?.hrDetais.filter(
                                            (item) =>
                                              item.action_type === PF_COMP
                                          ).length > 0
                                            ? "PF COMPLIANT"
                                            : "NOT COMPLIENT"}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Wage Compliance Certified By HR</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {checkTypeArr(
                                            data?.initial?.hrDetais
                                          ) &&
                                          data?.initial?.hrDetais.filter(
                                            (item) =>
                                              item.action_type === WAGE_COMP
                                          ).length > 0
                                            ? "WAGE COMPLIANT"
                                            : "NOT COMPLIENT"}
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
                                          {checkTypeArr(
                                            data?.initial?.hrDetais
                                          ) &&
                                          data?.initial?.hrDetais.filter(
                                            (item) =>
                                              item.action_type === LEAVE_COMP
                                          ).length > 0
                                            ? "LEAVE SALARY COMPLIANT"
                                            : "NOT COMPLIENT"}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>PBG if any</td>
                                      <td className="btn_value">
                                        {checkTypeArr(
                                          data?.initial?.pbg_filename
                                        )
                                          ? data?.initial?.pbg_filename.map(
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
                                      <td>Bill Certifying Authority</td>
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
                                                form?.bill_cerifying_au
                                            )[0]
                                          }
                                          onChange={(val) =>
                                            setForm({
                                              ...form,
                                              bill_cerifying_au: val
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
