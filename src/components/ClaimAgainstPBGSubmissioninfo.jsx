import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import { checkTypeArr } from "../utils/smallFun";
import SideBar from "./SideBar";
import Header from "./Header";
import { FaCaretLeft } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { TailSpin } from "react-loader-spinner";

const ClaimAgainstPBGSubmissioninfo = ({ setNetPayableAmount }) => {
  const [data, setData] = useState(null);
  const [InvoiceData, setInvoiceData] = useState(null);
  const [loadingtable, setLoadingtable] = useState(false);
  const { state } = useLocation();
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const navigate = useNavigate();
  const getData = async () => {
    setLoadingtable(true);
    try {
      const response = await apiCallBack(
        "GET",
        `getFilteredData?$tableName=btn_pbg&$filter={"btn_num":"${state}"}`,
        null,
        token
      );
      if (response?.status) {
        // setData(response?.data[0]);
        const fetchedData = response?.data[0];
        setData(fetchedData);
        setInvoiceData(JSON.parse(response?.data[0]?.icgrn_nos));
        setNetPayableAmount(fetchedData?.claim_amount);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoadingtable(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loadingtable ? (
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
                    <td>Original Invoice No :</td>
                    <td className="btn_value">
                      <b className="me-3">{data?.invoice_no || "N/A"}</b>

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
                    <td className="btn_value">{data?.claim_amount || "N/A"}</td>
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
                      {checkTypeArr(data?.pbg_filename)
                        ? data?.pbg_filename.map((item, i) => {
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
                          })
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
      )}
    </>
  );
};

export default ClaimAgainstPBGSubmissioninfo;
