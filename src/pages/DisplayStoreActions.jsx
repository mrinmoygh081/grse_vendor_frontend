import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { redirect, useParams } from "react-router-dom";
import { apiCallBack } from "../utils/fetchAPIs";
import { useSelector } from "react-redux";
import moment from "moment";

const DisplayStoreActions = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [icgrnData, setIcgrnData] = useState([]);

  const [pdfPayloads, setPdfPayloads] = useState({});
  const [pdfName, setPdfName] = useState("");

  const { id } = useParams();
  const { token } = useSelector((state) => state.auth);

  const getIcgrnData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/ListOfIcgrn?poNo=${id}`,
        null,
        token
      );
      if (data?.status) {
        setIcgrnData(data?.data);
      }
    } catch (error) {
      console.error("Error fetching ICGRN list:", error);
    }
  };

  const onChangeHandler = (e)=>{
    setPdfPayloads((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
  const onSubmitHandler = (e) => {
    // e.preventDefault();
    setIsPopup(false);
    console.log("payload -sss", pdfPayloads)
    if(pdfName === "store_issue_requisition"){
      return window.open('/display-store-actions/store-issue-requisition', '_blank');
    }
    if(pdfName === "goods_issue_slip"){
      return window.open('/display-store-actions/goods-issue-slip', '_blank');
    }
    if(pdfName === "icgrn_report"){
      return window.open('/display-store-actions/icgrn-report', '_blank');
    }
    if(pdfName === "payment_advice"){
      return window.open('/display-store-actions/payment-advice', '_blank');
    }
    
  };

  useEffect(() => {
    getIcgrnData();
  }, [id, token]);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Display Store Actions"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="card-body p-3">
                        <div className="tab-content">
                          <div className="table-responsive">
                            <table className="table table-striped table-bordered table_height">
                              <thead>
                                <tr className="border-0">
                                  <th>DateTime </th>
                                  <th>Document</th>
                                  <th>Document Type</th>
                                  {/* <th>ID</th> */}
                                  <th>Updated By</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                <tr>
                                  <td className="table_center">03-01-2024</td>
                                  <td>
                                    <span
                                      className="pdf_check_file_btn"
                                      onClick={() => {
                                        setIsPopup(true);
                                        setPdfName("store_issue_requisition");
                                      }}
                                    >
                                      Check File
                                    </span>
                                  </td>
                                  <td>Store Issue Requisition</td>
                                  <td>Mrinmoy Ghosh(65432)</td>
                                </tr>
                                <tr>
                                  <td className="table_center">08-01-2024</td>
                                  <td>
                                    <span
                                      // href={
                                      //   "/display-store-actions/goods-issue-slip"
                                      // }
                                      // target="_blank"
                                      // rel="noreferrer"
                                      className="pdf_check_file_btn"
                                      onClick={() => {
                                        setIsPopup(true);
                                        setPdfName("goods_issue_slip");
                                      }}
                                    >
                                      Check File
                                    </span>
                                  </td>
                                  <td>Goods Issue Slip</td>
                                  <td>Mrinmoy Ghosh(65432)</td>
                                </tr>
                                <tr>
                                  <td className="table_center">10-01-2024</td>
                                  <td>
                                    <span
                                      // href={
                                      //   "/display-store-actions/icgrn-report"
                                      // }
                                      // target="_blank"
                                      // rel="noreferrer"
                                      className="pdf_check_file_btn"
                                      onClick={() => {
                                        setIsPopup(true);
                                        setPdfName("icgrn_report");
                                      }}
                                    >
                                      Check File
                                    </span>
                                  </td>
                                  <td>ICGRN Report</td>
                                  <td>Mrinmoy Ghosh(65432)</td>
                                </tr>
                                <tr>
                                  <td className="table_center">12-01-2024</td>
                                  <td>
                                    <span
                                      // href={
                                      //   "/display-store-actions/payment-advice"
                                      // }
                                      // target="_blank"
                                      // rel="noreferrer"
                                      className="pdf_check_file_btn"
                                      onClick={() => {
                                        setIsPopup(true);
                                        setPdfName("payment_advice");
                                      }}
                                    >
                                      Check File
                                    </span>
                                  </td>
                                  <td>Payment Advice</td>
                                  <td>Mrinmoy Ghosh(65432)</td>
                                </tr>
                                {/* {icgrnData.map((icgrnItem, index) => (
                                  <tr key={index}>
                                    <td className="table_center">
                                      {moment(icgrnItem.created_at)
                                        .utc()
                                        .format("YYYY-MM-DD")}
                                    </td>
                                    <td>
                                      <a
                                        href={`${process.env.REACT_APP_BACKEND_API}po/download?id=${icgrnItem.file_path}&type=qap`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        Check File
                                      </a>
                                    </td>
                                    <td>{icgrnItem.document_type}</td>
                                    <td>{icgrnItem.id}</td>
                                    <td>{icgrnItem.updated_by}</td>
                                  </tr>
                                ))} */}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
                Upload Shipping documents
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
              {/* Store Issue Requisition  */}
              {pdfName === "store_issue_requisition" && (
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Reservation Number <span className="star">*</span>
                    </label>
                    <input type="text" name="RSNUM" className="form-control" onChange={onChangeHandler} />
                  </div>
                </div>
              )}

              {/* Material Issue List  */}
              {pdfName === "goods_issue_slip" && (
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      BTN Number <span className="star">*</span>
                    </label>
                    <input type="text" name="MBLNR" className="form-control" onChange={onChangeHandler} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      BTN Year <span className="star">*</span>
                    </label>
                    <input type="text" name="MJAHR" className="form-control" onChange={onChangeHandler}/>
                  </div>
                </div>
              )}

              {/* ICGRN Report  */}
              {pdfName === "icgrn_report" && (
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      BTN Number <span className="star">*</span>
                    </label>
                    <input type="text" name="MBLNR" className="form-control" onChange={onChangeHandler} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      PRUEFLOS <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      name="PRUEFLOS"
                      className="form-control"
                      onChange={onChangeHandler}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Purchase Order No <span className="star">*</span>
                    </label>
                    <input type="text" name="EBELN" className="form-control" />
                  </div>
                </div>
              )}

              {/* Payment Advice  */}
              {pdfName === "payment_advice" && (
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      BTN Number <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      name="ZERGNUM"
                      className="form-control"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
              )}

              <div className="col-12">
                <div className="mb-3">
                  <button className="btn fw-bold btn-primary" onClick={onSubmitHandler}  >SUBMIT</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DisplayStoreActions;
