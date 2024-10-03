import React, { useEffect, useState } from "react";
import { USER_VENDOR } from "../constants/userConstants";
import { checkTypeArr } from "../utils/smallFun";
import { formatDate } from "../utils/getDateTimeNow";
import { apiCallBack } from "../utils/fetchAPIs";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getGrnIcgrnByInvoice } from "../Helpers/BTNChecklist";
import { toast } from "react-toastify";
import { TailSpin } from "react-loader-spinner";

const BTNAdvanceVendorInfo = ({ navigate, id }) => {
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [impDates, setImpDates] = useState(null);
  const { user, token } = useSelector((state) => state.auth);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDataByBTN = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="card-body p-3">
          <div className="tab-content">
            <div className="table-responsive">
              <table className="table table-striped table-bordered table_height">
                <tbody style={{ maxHeight: "100%" }}>
                  <tr>
                    <td>Yard Number:</td>
                    <td className="btn_value">
                      <b className="me-3">{data?.yard || "NA"}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Stage:</td>
                    <td className="btn_value">
                      <b className="me-3">{data?.stage || "NA"}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor</td>
                    <td>
                      <b>
                        {data?.vendor_code
                          ? `${data?.vendor_name} (${data?.vendor_code})`
                          : "NA"}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Vendor GSTIN No</td>
                    <td>
                      <b>{data?.gst || "NA"}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>{data?.invoice_type || "Digitally Signed Invoice:"}</td>
                    <td className="btn_value">
                      <b className="me-3">
                        {data?.invoice_no ? data.invoice_no : "NA"}
                      </b>
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
                    <td>Supporting Documents :</td>
                    <td className="btn_value">
                      {data?.invoice_supporting_doc ? (
                        <a
                          href={`${process.env.REACT_APP_PDF_URL}btns/${data?.invoice_supporting_doc}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          VIEW
                        </a>
                      ) : (
                        "Not Submitted"
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Additional PO:</td>
                    <td className="btn_value">
                      <b className="me-3">
                        {checkTypeArr(data?.associated_po)
                          ? data.associated_po.map((item) => item?.a_po)
                          : "NA"}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Basic value:</td>
                    <td className="btn_value">
                      <b className="me-3">{data?.invoice_value || "NA"}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Net claim amount:</td>
                    <td className="btn_value">
                      <b>
                        {" "}
                        {data?.net_claim_amount ? data.net_claim_amount : "NA"}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>CGST:</td>
                    <td className="btn_value">
                      <b>{data?.cgst ? data.cgst : "NA"}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>SGST:</td>
                    <td className="btn_value">
                      <b>{data?.sgst ? data.sgst : "NA"}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>IGST:</td>
                    <td className="btn_value">
                      <b>{data?.igst ? data.igst : "NA"}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Net Claim Amount with GST:</td>
                    <td className="btn_value">
                      <b>{data?.net_with_gst ? data.net_with_gst : "NA"}</b>
                    </td>
                  </tr>
                  <tr>
                    <td>Contractual Submission of Drawing:</td>
                    <td className="btn_value">
                      <b>
                        {impDates?.c_drawing_date
                          ? formatDate(impDates.c_drawing_date)
                          : "NA"}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Actual Submission of Drawing:</td>
                    <td className="btn_value">
                      <b>
                        {impDates?.a_drawing_date
                          ? formatDate(impDates.a_drawing_date)
                          : "NA"}
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Submission of Advance BG / IB / Other Document:</td>
                    <td className="btn_value">
                      {data?.pbg_filename && data.pbg_filename !== "" ? (
                        <a
                          href={`${process.env.REACT_APP_PDF_URL}btns/${data.pbg_filename}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          VIEW
                        </a>
                      ) : (
                        <b>NA</b>
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
      )}
    </>
  );
};

export default BTNAdvanceVendorInfo;
