import React from "react";
import { checkTypeArr } from "../utils/smallFun";
import {
  ESI_COMP,
  LEAVE_COMP,
  PF_COMP,
  WAGE_COMP,
} from "../constants/constants";
import { formatDate } from "../utils/getDateTimeNow";
import { D_S_INVOICE, E_INVOICE } from "../constants/BTNContants";

const BTNServiceVendor = ({ data, form }) => {
  return (
    <>
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
                    <b>{form?.wdc_number}</b>
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
                {checkTypeArr(data?.wdcDetails?.line_item_array) &&
                  data?.wdcDetails?.line_item_array.map((item, i) => (
                    <tr key={i}>
                      <td>{item?.line_item_no}</td>
                      <td>{item?.service_code}</td>
                      <td>{item?.description}</td>
                      <td>{item?.unit}</td>
                      <td>{item?.claim_qty}</td>
                      <td>{item?.po_rate}</td>
                      <td>
                        {parseFloat(
                          Number(item?.po_rate) * Number(item?.claim_qty)
                        ).toFixed(2)}
                      </td>
                      <td>{item?.delay}</td>
                    </tr>
                  ))}
                <tr>
                  <td colSpan={6}>Total:</td>
                  <td colSpan={2}>
                    <b>{form?.total_price}</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="table table-striped table-bordered table_height">
              <tbody>
                <tr>
                  <td>Choose Invoice Type</td>
                  <td className="btn_value">
                    <b>{form?.invoice_type}</b>
                  </td>
                </tr>
                {form?.invoice_type === D_S_INVOICE && (
                  <tr>
                    <td>Digitally Signed Invoice:</td>
                    <td>
                      <div className="btn_value">
                        <b>{form?.invoice_no}</b>
                      </div>
                      <div className="btn_value">
                        <div className="me-4">
                          <label htmlFor="">Invoice File</label>{" "}
                          <p>
                            <a
                              href={`${process.env.REACT_APP_PDF_URL}btns/${form?.invoice_filename}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              VIEW
                            </a>
                          </p>
                        </div>
                        <div>
                          <label htmlFor="">Supporting Documents</label>
                          <p>
                            <a
                              href={`${process.env.REACT_APP_PDF_URL}btns/${form?.suppoting_invoice_filename}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              VIEW
                            </a>
                          </p>
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
                        <b>{form?.invoice_no}</b>
                      </div>
                      <div className="btn_value">
                        <div className="me-4">
                          <label htmlFor="">Invoice File</label>
                          <p>
                            <a
                              href={`${process.env.REACT_APP_PDF_URL}btns/${form?.invoice_filename}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              VIEW
                            </a>
                          </p>
                        </div>
                        <div>
                          <label htmlFor="">Supporting Documents</label>
                          <p>
                            <a
                              href={`${process.env.REACT_APP_PDF_URL}btns/${form?.suppoting_invoice_filename}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              VIEW
                            </a>
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}

                <tr>
                  <td>Basic value:</td>
                  <td className="btn_value">
                    <b>{form?.invoice_value}</b>
                  </td>
                </tr>

                <tr>
                  <td>Debit/Credit Note:</td>
                  <td className="btn_value">
                    <a
                      href={`${process.env.REACT_APP_PDF_URL}btns/${form?.debit_credit_filename}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      VIEW
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Debit Note value:</td>
                  <td className="btn_value">
                    <b>{form?.debit_note}</b>
                  </td>
                </tr>
                <tr>
                  <td>Credit Note value:</td>
                  <td className="btn_value">
                    <b>{form?.credit_note}</b>
                  </td>
                </tr>
                <tr>
                  <td>Net Claim Amount: </td>
                  <td className="btn_value">
                    <b>{form?.net_claim_amount}</b>
                  </td>
                </tr>
                <tr>
                  <td>CGST:</td>
                  <td className="btn_value">
                    <b>
                      {form?.cgst}
                      <span className="ms-1">%</span>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>SGST:</td>
                  <td className="btn_value">
                    <b>
                      {form?.sgst}
                      <span className="ms-1">%</span>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>IGST:</td>
                  <td className="btn_value">
                    <b>
                      {form?.igst}
                      <span className="ms-1">%</span>
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Net Claim Amount with GST:</td>
                  <td className="btn_value">
                    <b>{form?.net_claim_amt_gst}</b>
                  </td>
                </tr>

                <tr>
                  <td>Contractual SDBG Submission Date</td>
                  <td className="btn_value">
                    <b className="me-3">
                      {data?.initial?.c_sdbg_date &&
                        formatDate(data?.initial?.c_sdbg_date)}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Actual SDBG Submission Date</td>
                  <td className="btn_value">
                    <b className="me-3">
                      {data?.initial?.a_sdbg_date &&
                        formatDate(data?.initial?.a_sdbg_date)}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Hinderance register certified by berth/user</td>
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
                      {checkTypeArr(data?.initial?.hrDetais) &&
                      data?.initial?.hrDetais.filter(
                        (item) => item.action_type === ESI_COMP
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
                      {checkTypeArr(data?.initial?.hrDetais) &&
                      data?.initial?.hrDetais.filter(
                        (item) => item.action_type === PF_COMP
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
                      {checkTypeArr(data?.initial?.hrDetais) &&
                      data?.initial?.hrDetais.filter(
                        (item) => item.action_type === WAGE_COMP
                      ).length > 0
                        ? "WAGE COMPLIANT"
                        : "NOT COMPLIENT"}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Leave Salary & Bonus Compliance certified by HR</td>
                  <td className="btn_value">
                    <b className="me-3">
                      {checkTypeArr(data?.initial?.hrDetais) &&
                      data?.initial?.hrDetais.filter(
                        (item) => item.action_type === LEAVE_COMP
                      ).length > 0
                        ? "LEAVE SALARY COMPLIANT"
                        : "NOT COMPLIENT"}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>PBG if any</td>
                  <td className="btn_value">
                    {checkTypeArr(data?.initial?.pbg_filename)
                      ? data?.initial?.pbg_filename.map((item, i) => {
                          return (
                            <a
                              key={i}
                              href={`${process.env.REACT_APP_PDF_URL}btns/${item?.file_name}`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              VIEW
                            </a>
                          );
                        })
                      : "PBG NOT SUBMITTED"}
                  </td>
                </tr>
                <tr>
                  <td>Bill Certifying Authority</td>
                  <td className="btn_value">
                    <b>
                      {form?.bill_certifing_authority_name} (
                      {form?.bill_certifing_authority})
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
                        defaultChecked={true}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="hsn_gstn_icgrn"
                      >
                        Whether HSN code, GSTIN, Tax rate is as per PO
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
                        defaultChecked={true}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="agree_to_declaration"
                      >
                        I hereby declare that all the entries are correct.
                      </label>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default BTNServiceVendor;
