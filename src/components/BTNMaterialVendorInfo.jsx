import React, { useEffect, useState } from "react";
import { USER_VENDOR } from "../constants/userConstants";
import { checkTypeArr } from "../utils/smallFun";
import { formatDate } from "../utils/getDateTimeNow";
import { apiCallBack } from "../utils/fetchAPIs";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getGrnIcgrnByInvoice } from "../Helpers/BTNChecklist";
import { toast } from "react-toastify";

const BTNMaterialVendorInfo = ({ navigate, id }) => {
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [impDates, setImpDates] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const [form, setForm] = useState(null);

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

  const getGrnIcgrnHandler = async (invoice_no) => {
    let response = await getGrnIcgrnByInvoice(id, invoice_no, token);
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
    getDataByBTN();
    getBTNData();
  }, []);

  useEffect(() => {
    if (data?.invoice_no) {
      getGrnIcgrnHandler(data?.invoice_no);
    }
  }, [data?.invoice_no]);

  return (
    <>
      <div className="card-body p-3">
        <div className="tab-content">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table_height">
              <tbody style={{ maxHeight: "100%" }}>
                <tr>
                  <td>Yard Number:</td>
                  <td className="btn_value">
                    <b className="me-3">{data?.yard}</b>
                  </td>
                </tr>
                <tr>
                  <td>Stage:</td>
                  <td className="btn_value">
                    <b className="me-3">{data?.stage}</b>
                  </td>
                </tr>
                <tr>
                  <td>Digitally Signed Invoice:</td>
                  <td className="btn_value">
                    <b className="me-3">{data?.invoice_no}</b>
                    {data?.invoice_filename && (
                      <a
                        href={`${process.env.REACT_APP_PDF_URL}btns/${data?.invoice_filename}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        VIEW
                      </a>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Basic value:</td>
                  <td className="btn_value">
                    <b className="me-3">{data?.invoice_value}</b>
                  </td>
                </tr>
                <tr>
                  <td>E-Invoice :</td>
                  <td className="btn_value">
                    <b className="me-3">{data?.e_invoice_no}</b>
                    {data?.e_invoice_filename &&
                      data?.e_invoice_filename !== "" && (
                        <a
                          href={`${process.env.REACT_APP_PDF_URL}btns/${data?.e_invoice_filename}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          VIEW
                        </a>
                      )}
                  </td>
                </tr>
                <tr>
                  <td>Debit/Credit Note:</td>
                  <td className="btn_value">
                    {data?.debit_credit_filename &&
                      data?.debit_credit_filename !== "" && (
                        <a
                          href={`${process.env.REACT_APP_PDF_URL}btns/${data?.debit_credit_filename}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          VIEW
                        </a>
                      )}
                  </td>
                </tr>
                <tr>
                  <td>Debit Note value:</td>
                  <td className="btn_value">
                    <b className="me-3">{data?.debit_note}</b>
                  </td>
                </tr>
                <tr>
                  <td>Credit Note value:</td>
                  <td className="btn_value">
                    <b className="me-3">{data?.credit_note}</b>
                  </td>
                </tr>
                <tr>
                  <td>Net claim amount:</td>
                  <td className="btn_value">
                    <b>{data?.net_claim_amount}</b>
                  </td>
                </tr>
                <tr>
                  <td>CGST:</td>
                  <td className="btn_value">
                    <b>{data?.cgst}</b>
                  </td>
                </tr>
                <tr>
                  <td>SGST:</td>
                  <td className="btn_value">
                    <b>{data?.sgst}</b>
                  </td>
                </tr>
                <tr>
                  <td>IGST:</td>
                  <td className="btn_value">
                    <b>{data?.igst}</b>
                  </td>
                </tr>
                <tr>
                  <td>Net Claim Amount with GST:</td>
                  <td className="btn_value">
                    <b>{data?.net_with_gst}</b>
                  </td>
                </tr>
                <tr>
                  <td>Contractual SDBG Submission Date</td>
                  <td className="btn_value">
                    <b className="me-3">
                      {impDates?.c_sdbg_date &&
                        formatDate(impDates?.c_sdbg_date)}
                    </b>
                    {data?.c_sdbg_filename && data?.c_sdbg_filename !== "" && (
                      <a
                        href={`${process.env.REACT_APP_PDF_URL}btns/${data?.c_sdbg_filename}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        VIEW
                      </a>
                    )}
                  </td>
                </tr>
                <tr>
                  <td>Actual SDBG Submission Date</td>
                  <td className="btn_value">
                    <b className="me-3">
                      {impDates?.a_sdbg_date &&
                        formatDate(impDates?.a_sdbg_date)}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Demand raised by production/PP&C if any</td>
                  <td className="btn_value">
                    {data?.demand_raise_filename &&
                      data?.demand_raise_filename !== "" && (
                        <a
                          href={`${process.env.REACT_APP_PDF_URL}btns/${data?.demand_raise_filename}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          VIEW
                        </a>
                      )}
                  </td>
                </tr>
                <tr>
                  <td>Gate Entry Acknowledgement no.</td>
                  <td className="btn_value">
                    <b className="me-3">
                      {/* {checkTypeArr(impDates?.gate_entry) &&
                        impDates?.gate_entry.map((item, i) => (
                          <span className="me-1" key={i}>
                            {item.acc_no}
                          </span>
                        ))} */}
                      {form?.gate_entry_no}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Gate Entry Date</td>
                  <td className="btn_value">
                    <b className="me-3">
                      {/* {checkTypeArr(impDates?.gate_entry) &&
                        impDates?.gate_entry.map((item, i) => (
                          <span className="me-1" key={i}>
                            {item.gate_date}
                          </span>
                        ))} */}
                      {form?.gate_entry_date}
                    </b>
                    {data?.get_entry_filename &&
                      data?.get_entry_filename !== "" && (
                        <a
                          href={`${process.env.REACT_APP_PDF_URL}btns/${data?.get_entry_filename}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          VIEW
                        </a>
                      )}
                  </td>
                </tr>
                <tr>
                  <td>GRN No</td>
                  <td className="btn_value">
                    {/* {checkTypeArr(data?.grn_nos) &&
                      data?.grn_nos.map((item, i) => {
                        return (
                          <b className="me-3" key={i}>
                            {item?.grn_nos}
                          </b>
                        );
                      })} */}
                    <b>{form?.grn_nos}</b>
                  </td>
                </tr>
                <tr>
                  <td>ICGRN No</td>
                  <td className="btn_value">
                    {checkTypeArr(data?.icgrn_nos) &&
                      data?.icgrn_nos.map((item, i) => {
                        return (
                          <b className="me-3" key={i}>
                            {item?.icgrn_nos}
                          </b>
                        );
                      })}
                  </td>
                </tr>
                <tr>
                  <td>Total ICGRN Value</td>
                  <td className="btn_value">
                    <b className="me-3">{data?.icgrn_total}</b>
                  </td>
                </tr>
                <tr>
                  <td>Contractual Drawing submission date</td>
                  <td className="btn_value">
                    <b>
                      {impDates?.c_drawing_date &&
                        formatDate(impDates?.c_drawing_date)}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Actual Drawing submission date</td>
                  <td className="btn_value">
                    <b>
                      {impDates?.a_drawing_date &&
                        formatDate(impDates?.a_drawing_date)}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Contractual QAP submission date</td>
                  <td className="btn_value">
                    <b>
                      {impDates?.c_qap_date && formatDate(impDates?.c_qap_date)}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Actual QAP submission date</td>
                  <td className="btn_value">
                    <b>
                      {impDates?.a_qap_date && formatDate(impDates?.a_qap_date)}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Contractual ILMS submission date</td>
                  <td className="btn_value">
                    <b>
                      {impDates?.c_ilms_date &&
                        formatDate(impDates?.c_ilms_date)}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>Actual ILMS submission date</td>
                  <td className="btn_value">
                    <b>
                      {impDates?.a_ilms_date &&
                        formatDate(impDates?.a_ilms_date)}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td>PBG</td>
                  <td className="btn_value">
                    {data?.pbg_filename && data?.pbg_filename !== "" && (
                      <a
                        href={`${process.env.REACT_APP_PDF_URL}btns/${data?.pbg_filename}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        VIEW
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
                        Whether HSN code, GSTIN, Tax rate is as per PO
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
                onClick={() => navigate(`/invoice-and-payment-process/${id}`)}
              >
                BACK
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BTNMaterialVendorInfo;
