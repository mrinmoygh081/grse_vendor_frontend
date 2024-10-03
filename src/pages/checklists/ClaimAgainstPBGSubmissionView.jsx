import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { apiCallBack } from "../../utils/fetchAPIs";
import { useSelector } from "react-redux";
import { checkTypeArr } from "../../utils/smallFun";
import { FaCaretLeft } from "react-icons/fa";

const ClaimAgainstPBGSubmissionView = () => {
  const [data, setData] = useState(null);
  const [InvoiceData, setInvoiceData] = useState(null);
  const { state } = useLocation();
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const [datapbg, setDatapbg] = useState(null);

  // Fetch Data Function
  const getData = async () => {
    try {
      const response = await apiCallBack(
        "GET",
        `getFilteredData?$tableName=btn_pbg&$filter={"btn_num":"${state}"}`,
        null,
        token
      );
      if (response?.status) {
        setData(response?.data[0]); // Assuming the API returns an array, we'll take the first item
        // Parsing the icgrn_nos JSON string
        setInvoiceData(JSON.parse(response?.data[0]?.icgrn_nos));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDatapbg = async () => {
    try {
      const d = await apiCallBack(
        "GET",
        `po/btn/getBTNData?id=${id}`,
        null,
        token
      );
      if (d?.status) {
        setDatapbg(d?.data);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  useEffect(() => {
    getData();
    getDatapbg();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Claim Against PBG Submission"} id={id} />
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
                            Claim Against PBG Submission:
                          </h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    <tr>
                                      <td>Original Invoice No :</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.invoice_no || "N/A"}
                                        </b>

                                        {data?.invoice_filename && (
                                          <div style={{ marginTop: "8px" }}>
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${data?.invoice_filename}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              VIEW
                                            </a>
                                          </div>
                                        )}
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Balance Claim Invoice :</td>
                                      <td className="btn_value">
                                        <b className="me-3">
                                          {data?.balance_claim_invoice || "N/A"}
                                        </b>
                                        {data?.balance_claim_invoice_filename && (
                                          <div style={{ marginTop: "8px" }}>
                                            <a
                                              href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${data?.balance_claim_invoice_filename}`}
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              VIEW
                                            </a>
                                          </div>
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Claim Amount :</td>
                                      <td className="btn_value">
                                        {data?.claim_amount || "N/A"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Retension % Claim :</td>
                                      <td className="btn_value">
                                        {data?.percentage_of_claim || "N/A"}
                                        <span className="ms-1">%</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>PBG</td>
                                      <td className="btn_value">
                                        {checkTypeArr(datapbg?.pbg_filename)
                                          ? datapbg?.pbg_filename.map(
                                              (item, i) => {
                                                return (
                                                  <a
                                                    key={i}
                                                    href={`${process.env.REACT_APP_PDF_URL}submitSDBG/${item?.file_name}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    style={{
                                                      marginRight: "10px",
                                                    }}
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
                                      <td>ICGRN Nos </td>
                                      <td className="btn_value">
                                        {checkTypeArr(InvoiceData)
                                          ? InvoiceData.map((item, i) => (
                                              <b key={i} className="mx-2">
                                                {item?.grn_no || "NA"}
                                              </b>
                                            ))
                                          : "N/A"}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <button
                        className="btn btn-primary me-3"
                        type="button"
                        onClick={() =>
                          navigate(`/invoice-and-payment-process/${id}`)
                        }
                      >
                        BACK
                      </button>
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

export default ClaimAgainstPBGSubmissionView;
