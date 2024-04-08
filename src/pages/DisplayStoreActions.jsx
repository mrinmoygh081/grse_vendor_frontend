import React, { Fragment, useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { Link, redirect, useParams, useNavigate } from "react-router-dom";
import { apiCallBack } from "../utils/fetchAPIs";
import { useSelector } from "react-redux";
import { groupByDocumentType } from "../utils/groupedByReq";
import moment from "moment";

const DisplayStoreActions = () => {
  const navigate = useNavigate();
  const [isPopup, setIsPopup] = useState(false);
  const [icgrnData, setIcgrnData] = useState([]);

  const [allPdfData, setAllPdfData] = useState([]);
  const [groupByPdfData, setGroupByPdfData] = useState([]);
  const [payloadData, setPayloadData] = useState({});

  console.log(groupByPdfData, "tttttttttttttttttt");

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
  const doc_Type_Name = {
    reservation_report: "Store Issue Requisition",
    goods_issue_slip: "Goods Issue Slip",
    icgrn_report: "ICGRN Report",
    ztfi_bil_deface: "Payment Advice",
    gate_entry: "Gate in Entry",
  };
  const doc_routes = {
    reservation_report: "/display-store-actions/store-issue-requisition",
    goods_issue_slip: "/display-store-actions/goods-issue-slip",
    icgrn_report: "/display-store-actions/icgrn-report",
    ztfi_bil_deface: "/display-store-actions/payment-advice",
    gate_entry: "/display-store-actions/goods-entry",
  };

  const getAllPdfHandler = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `sap/store/storeActionList`,
        null,
        token
      );
      if (data?.status) {
        setAllPdfData(data?.data);
      }
    } catch (error) {
      console.error("Error fetching ICGRN list:", error);
    }
  };

  const CheckFileHandler = (item) => {
    if (item.documentType === "reservation_report") {
      setPayloadData({
        reservationNumber: item.reservationNumber,
        // reservationDate: item.reservationDate,
      });
      // return navigate(doc_routes[item.documentType], {
      //   state: {
      //     reservationNumber: item.reservationNumber,
      //     // reservationDate: item.reservationDate,
      //   }
      // });
      // return window.open()
    }
    if (item.documentType === "goods_issue_slip") {
      setPayloadData({
        issueNo: item.issueNo,
        // issueYear: item.issueYear,
      });
      // return navigate(doc_routes[item.documentType], {
      //   state: {
      //     issueNo: item.issueNo,
      //     // issueYear: item.issueYear,
      //   }
      // });
    }
    if (item.documentType === "icgrn_report") {
      setPayloadData({
        docNo: item.docno,
      });
      // return navigate(doc_routes[item.documentType], {
      //   state: {
      //     docNo: item.docNo,
      //   }
      // });
    }
    if (item.documentType === "ztfi_bil_deface") {
      setPayloadData({
        btn: item.btn,
      });
      // return navigate(doc_routes[item.documentType], {
      //   state: {
      //     btn: item.btn,
      //   }
      // });
    }
    if (item.documentType === "gate_entry") {
      setPayloadData({
        btn: item.gateEntryNo,
      });
      // return navigate(doc_routes[item.documentType], {
      //   state: {
      //     btn: item.btn,
      //   }
      // });
    }
  };
  console.log("groupByPdfData-abhi", groupByPdfData);

  // const onChangeHandler = (e) => {
  //   setPdfPayloads((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };

  // const onSubmitHandler = (e) => {
  //   // e.preventDefault();
  //   setIsPopup(false);
  //   console.log("payload -sss", pdfPayloads)
  //   if(pdfName === "store_issue_requisition"){
  //     return window.open('/display-store-actions/store-issue-requisition', '_blank');
  //   }
  //   if(pdfName === "goods_issue_slip"){
  //     return window.open('/display-store-actions/goods-issue-slip', '_blank');
  //   }
  //   if(pdfName === "icgrn_report"){
  //     return window.open('/display-store-actions/icgrn-report', '_blank');
  //   }
  //   if(pdfName === "payment_advice"){
  //     return window.open('/display-store-actions/payment-advice', '_blank');
  //   }

  // };

  useEffect(() => {
    getIcgrnData();
    getAllPdfHandler();
  }, [id, token]);
  // console.log("allPdfData",allPdfData);

  useEffect(() => {
    if (allPdfData && allPdfData.length > 0) {
      const gData = groupByDocumentType(allPdfData);
      setGroupByPdfData(gData);
    }
  }, [allPdfData]);

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
                                  <th>Action By</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {Object.keys(groupByPdfData).map(
                                  (it, index) => {
                                    let items = groupByPdfData[it];
                                    return (
                                      <Fragment key={index}>
                                        <tr>
                                          <td
                                            colSpan={4}
                                            className="fw-bold p-2"
                                            style={{ fontSize: "15px" }}
                                          >
                                            {doc_Type_Name[it]}
                                          </td>
                                        </tr>
                                        {items &&
                                          items.map((item, index) => (
                                            <tr key={index}>
                                              {console.log(item, "abhinit")}
                                              <td className="table_center">
                                                {item.dateTime}
                                              </td>
                                              <td>
                                                <a
                                                  href={`${
                                                    doc_routes[
                                                      item.documentType
                                                    ]
                                                  }/${JSON.stringify(
                                                    payloadData
                                                  )}`}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                  // className="pdf_check_file_btn"
                                                  onClick={() =>
                                                    CheckFileHandler(item)
                                                  }
                                                >
                                                  Check File{" "}
                                                  {item.docno ||
                                                    item.btn ||
                                                    item.issueNo ||
                                                    item.reservationNumber ||
                                                    item.gateEntryNo}
                                                </a>
                                              </td>
                                              <td>
                                                {
                                                  doc_Type_Name[
                                                    item.documentType
                                                  ]
                                                }
                                              </td>
                                              <td>{item.updatedBy}</td>
                                            </tr>
                                          ))}
                                      </Fragment>
                                    );
                                  }
                                )}
                                {/* {allPdfData?.map((item, index) => (
                                  <tr key={index}>
                                    <td className="table_center">
                                      {item.dateTime}
                                    </td>
                                    <td>
                                      <a
                                        href={`${
                                          doc_routes[item.documentType]
                                        }/${JSON.stringify(payloadData)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        // className="pdf_check_file_btn"
                                        onClick={() => CheckFileHandler(item)}
                                      >
                                        Check File
                                      </a>
                                    </td>
                                    <td>{doc_Type_Name[item.documentType]}</td>
                                    <td>
                                      Mrinmoy Ghosh(65432) {item.updatedBy}
                                    </td>
                                  </tr>
                                ))} */}
                                {/* <tr>
                                  <td className="table_center">03-01-2024</td>
                                  <td>
                                    <a
                                      href={
                                        "/display-store-actions/goods-issue-slip"
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                      // className="pdf_check_file_btn"
                                      onClick={() => {
                                        setPdfName("store_issue_requisition");
                                      }}
                                    >
                                      Check File
                                    </a>
                                  </td>
                                  <td>Store Issue Requisition</td>
                                  <td>Mrinmoy Ghosh(65432)</td>
                                </tr>
                                <tr>
                                  <td className="table_center">08-01-2024</td>
                                  <td>
                                    <a
                                      href={
                                        "/display-store-actions/goods-issue-slip"
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                      // className="pdf_check_file_btn"
                                      onClick={() => {
                                        setPdfName("goods_issue_slip");
                                      }}
                                    >
                                      Check File
                                    </a>
                                  </td>
                                  <td>Goods Issue Slip</td>
                                  <td>Mrinmoy Ghosh(65432)</td>
                                </tr>
                                <tr>
                                  <td className="table_center">10-01-2024</td>
                                  <td>
                                    <a
                                      href={
                                        "/display-store-actions/icgrn-report"
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                      // className="pdf_check_file_btn"
                                      onClick={() => {
                                        setPdfName("icgrn_report");
                                      }}
                                    >
                                      Check File
                                    </a>
                                  </td>
                                  <td>ICGRN Report</td>
                                  <td>Mrinmoy Ghosh(65432)</td>
                                </tr>
                                <tr>
                                  <td className="table_center">12-01-2024</td>
                                  <td>
                                    <a
                                      href={
                                        "/display-store-actions/payment-advice"
                                      }
                                      target="_blank"
                                      rel="noreferrer"
                                      // className="pdf_check_file_btn"
                                      onClick={() => {
                                        setPdfName("payment_advice");
                                      }}
                                    >
                                      Check File
                                    </a>
                                  </td>
                                  <td>Payment Advice</td>
                                  <td>Mrinmoy Ghosh(65432)</td>
                                </tr> */}
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
              <span className="card-label fw-bold fs-3 mb-1">Action</span>
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
              {/* {pdfName === "store_issue_requisition" && (
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Reservation Number <span className="star">*</span>
                    </label>
                    <input type="text" name="reservationNumber" className="form-control" onChange={onChangeHandler} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                      Reservation Date
                    </label>
                    <input type="text" name="reservationDate" className="form-control" onChange={onChangeHandler} />
                  </div>
                </div>
              )} */}

              {/* Material Issue List  */}
              {/* {pdfName === "goods_issue_slip" && (
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                    Issue Number <span className="star">*</span>
                    </label>
                    <input type="text" name="issueNo" className="form-control" onChange={onChangeHandler} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">
                    Issue Year 
                    </label>
                    <input type="text" name="issueYear" className="form-control" onChange={onChangeHandler}/>
                  </div>
                </div>
              )} */}

              {/* ICGRN Report  */}
              {/* {pdfName === "icgrn_report" && (
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                    Doc No. <span className="star">*</span>
                    </label>
                    <input type="text" name="docNo" className="form-control" onChange={onChangeHandler} />
                  </div>
                </div>
              )} */}

              {/* Payment Advice  */}
              {/* {pdfName === "payment_advice" && (
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      BTN. <span className="star">*</span>
                    </label>
                    <input
                      type="text"
                      name="btn"
                      className="form-control"
                      onChange={onChangeHandler}
                    />
                  </div>
                </div>
              )} */}

              {/* <div className="col-12">
                <div className="mb-3">
                  <button className="btn fw-bold btn-primary" onClick={onSubmitHandler}  >SUBMIT</button>
                </div>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DisplayStoreActions;
