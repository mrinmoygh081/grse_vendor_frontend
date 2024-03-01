import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";

const PaymentAdvisesSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [paymentAdvisesData, setPaymentAdvisesData] = useState([]);
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
        setPaymentAdvisesData(data?.data);
      }
    } catch (error) {
      console.error("Error fetching ICGRN list:", error);
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
            <Header title={"Payment Advises"} id={id} />
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
                                  <th>Updated By</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                <tr>
                                  <td className="table_center">29-12-2023</td>
                                  <td>
                                    <a
                                      href={`#`}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Check File
                                    </a>
                                  </td>
                                  <td>Payment Advice</td>
                                  <td>Mrinmoy Ghosh</td>
                                </tr>
                                {/* {paymentAdvisesData.map(
                                  (paymentItem, index) => (
                                    <tr key={index}>
                                      <td className="table_center">
                                        {moment(paymentItem.created_at)
                                          .utc()
                                          .format("YYYY-MM-DD")}
                                      </td>
                                      <td>
                                        <a
                                          href={`${process.env.REACT_APP_BACKEND_API}po/download?id=${paymentItem.id}&type=qap`}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          Check File
                                        </a>
                                      </td>
                                      <td>{paymentItem.document_type}</td>
                                      <td>{paymentItem.id}</td>
                                      <td>{paymentItem.updated_by}</td>
                                    </tr>
                                  )
                                )} */}
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
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Shipping File Type <span className="star">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">
                    Shipping File <span className="star">*</span>
                  </label>
                  <input type="file" className="form-control" />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Remarks</label>
                  <textarea
                    name=""
                    id=""
                    rows="4"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <button className="btn fw-bold btn-primary">UPDATE</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PaymentAdvisesSub;
