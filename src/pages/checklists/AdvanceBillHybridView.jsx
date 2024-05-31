import React, { useEffect, useState } from "react";
import { apiCallBack } from "../../utils/fetchAPIs";
import { checkTypeArr } from "../../utils/smallFun";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";

const AdvanceBillHybridView = () => {
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  console.log(data, "data");
  console.log(state, "statestatestate");
  const getDataByBTN = async () => {
    try {
      const payload = {
        btn_num: state,
      };
      const response = await apiCallBack(
        "POST",
        "po/btn/getAdvBillHybridBTN",
        payload,
        token
      );
      if (response?.status && checkTypeArr(response?.data)) {
        setData(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataByBTN();
  }, []);
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
                                    {data ? (
                                      <>
                                        <tr>
                                          <td>Invoice No:</td>
                                          <td className="btn_value">
                                            {data.invoice_no}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>E-Invoice No:</td>
                                          <td className="btn_value">
                                            {data.e_invoice_no}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Invoice Value:</td>
                                          <td className="btn_value">
                                            {data.invoice_value}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Net Claim Amount:</td>
                                          <td className="btn_value">
                                            <b>{data.net_claim_amount}</b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>CGST:</td>
                                          <td className="btn_value">
                                            {data.cgst}%
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>SGST:</td>
                                          <td className="btn_value">
                                            {data.sgst}%
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>IGST:</td>
                                          <td className="btn_value">
                                            {data.igst}%
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Net Claim Amount with GST:</td>
                                          <td className="btn_value">
                                            <b>{data.net_claim_amt_gst}</b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            Contractual SDBG Submission Date
                                          </td>
                                          <td className="btn_value">
                                            <b className="me-3">
                                              {data.c_sdbg_date &&
                                                new Date(
                                                  data.c_sdbg_date
                                                ).toDateString()}
                                            </b>
                                            {data.c_sdbg_filename ? (
                                              <a
                                                href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${data.c_sdbg_filename}`}
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
                                              {data.a_sdbg_date &&
                                                new Date(
                                                  data.a_sdbg_date
                                                ).toDateString()}
                                            </b>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            Contractual Submission of Level-1:
                                          </td>
                                          <td className="btn_value">
                                            {data.c_level1_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            Contractual Submission of Level-2:
                                          </td>
                                          <td className="btn_value">
                                            {data.c_level2_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            Contractual Submission of Level-3:
                                          </td>
                                          <td className="btn_value">
                                            {data.c_level3_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Actual Submission of Level-1:</td>
                                          <td className="btn_value">
                                            {data.a_level1_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Actual Submission of Level-2:</td>
                                          <td className="btn_value">
                                            {data.a_level2_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>Actual Submission of Level-3:</td>
                                          <td className="btn_value">
                                            {data.a_level3_doc_sub_date}
                                          </td>
                                        </tr>
                                        <tr>
                                          <td colSpan="2">
                                            <div className="form-check">
                                              <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="hsn_gstn_icgrn"
                                                checked={
                                                  data.is_hsn_code === "t" &&
                                                  data.is_gstin === "t" &&
                                                  data.is_tax_rate === "t"
                                                }
                                                readOnly
                                              />
                                              <label
                                                className="form-check-label"
                                                htmlFor="hsn_gstn_icgrn"
                                              >
                                                Whether HSN code, GSTIN, Tax
                                                rate is as per PO
                                              </label>
                                            </div>
                                          </td>
                                        </tr>
                                      </>
                                    ) : (
                                      <tr>
                                        <td colSpan="2">No data available</td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              <div className="text-center">
                                {/* {user?.user_type === USER_VENDOR && (
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
                                )} */}
                                {/* <button
                                  className="btn fw-bold btn-primary me-3"
                                  type="button"
                                  onClick={() =>
                                    navigate(
                                      `/invoice-and-payment-process/${id}`
                                    )
                                  }
                                >
                                  BACK
                                </button> */}
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

export default AdvanceBillHybridView;
