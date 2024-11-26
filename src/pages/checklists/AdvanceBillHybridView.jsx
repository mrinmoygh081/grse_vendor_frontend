import React, { useEffect, useState } from "react";
import { apiCallBack } from "../../utils/fetchAPIs";
import { checkTypeArr } from "../../utils/smallFun";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import BTNAdvanceVendorInfo from "../../components/BTNAdvanceVendorInfo";
import { formatDate } from "../../utils/getDateTimeNow";

const AdvanceBillHybridView = () => {
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();
  const [data, setData] = useState(null);
  const [doData, setdoData] = useState(null);

  const getDataByBTN = async () => {
    try {
      const response = await apiCallBack(
        "GET",
        `po/btn/abh?type=details&btn_num=${state}`,
        null,
        token
      );
      console.log("response", response);
      if (response?.status) {
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getDataByBTNDO = async () => {
    try {
      const response = await apiCallBack(
        "GET",
        `po/btn/abh?type=details&btn_num=${state}`,
        null,
        token
      );
      console.log("response", response);
      if (response?.status) {
        setdoData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getDataByBTN();
    getDataByBTNDO();
  }, []);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Advance Bill"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <form>
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card">
                          <h3 className="m-3">Advance Bill:</h3>
                          <BTNAdvanceVendorInfo
                            navigate={navigate}
                            id={id}
                            data={data}
                          />
                        </div>
                      </div>
                      {(doData?.recomend_payment === "YES" ||
                        doData?.recomend_payment === "NO") && (
                        <div className="col-12">
                          <div className="card">
                            <h3 className="m-3">ENTRY BY DEALING OFFICER:</h3>
                            <div className="card-body p-3">
                              <div className="tab-content">
                                <div className="table-responsive">
                                  <table className="table table-striped table-bordered table_height">
                                    <tbody style={{ maxHeight: "100%" }}>
                                      <tr>
                                        <td>Finance Authority</td>
                                        <td className="btn_value">
                                          <b>{doData?.assign_to}</b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>BTN Number:</td>
                                        <td className="btn_value">
                                          <b>{state}</b>
                                        </td>
                                      </tr>

                                      <tr>
                                        <td>
                                          Penalty Percentage
                                          <div className="d-flex gap-2 align-items-center">
                                            <span>Max Penalty :</span>
                                            <b>{doData?.penalty_rate}</b>
                                          </div>
                                        </td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlFor="DADD">
                                              Actual Delivery Date:
                                            </label>
                                            <p aria-label="Contractual Delivery Date">
                                              <b>
                                                {" "}
                                                {formatDate(
                                                  doData?.a_drawing_date
                                                )}
                                              </b>
                                            </p>
                                          </div>
                                          <div className="me-3">
                                            <label htmlFor="DCDD">
                                              Contractual Delivery Date:
                                            </label>
                                            <p aria-label="Contractual Delivery Date">
                                              <b>
                                                <b>
                                                  {formatDate(
                                                    doData?.c_drawing_date
                                                  )}
                                                </b>
                                              </b>
                                            </p>
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p> &#8377; {doData.drg_penalty}</p>
                                          </div>
                                        </td>
                                      </tr>

                                      <tr>
                                        <td>Total deductions</td>
                                        <td>
                                          <b>
                                            &#8377;{" "}
                                            {isNaN(doData?.penalty_ammount)
                                              ? 0
                                              : doData?.penalty_ammount}
                                          </b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Net payable amount</td>
                                        <td>
                                          <b>
                                            &#8377;{" "}
                                            {isNaN(doData?.net_payable_amount)
                                              ? 0
                                              : doData?.net_payable_amount}
                                          </b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Recommended for payment </td>
                                        <td className="btn_value">
                                          <b>{doData?.recomend_payment}</b>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>

                                <div className="text-center">
                                  <button
                                    className="btn fw-bold btn-primary"
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
                      )}
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
