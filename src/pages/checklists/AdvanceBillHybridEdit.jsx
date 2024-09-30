import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { apiCallBack } from "../../utils/fetchAPIs";
import { checkTypeArr } from "../../utils/smallFun";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import BTNAdvanceVendorInfo from "../../components/BTNAdvancelVendorInfo";
import { formatDate } from "../../utils/getDateTimeNow";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import { actionHandlerByDO } from "../../Helpers/BTNChecklist";
import Select from "react-select";
import { initialDataAdvance, initialDODataAdvance } from "../../data/btnData";

const AdvanceBillHybridEdit = () => {
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();
  console.log(state, "statestatestatestatestate");

  const [impDates, setImpDates] = useState(null);
  const [data, setData] = useState(null);
  const [doData, setDoData] = useState(null);
  const [emp, setEmp] = useState([]);

  const [form, setForm] = useState(initialDataAdvance);
  const [doForm, setDoForm] = useState(initialDODataAdvance);

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

  const getEmp = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/btn/getFinanceEmpList`,
        null,
        token
      );
      if (data?.status) {
        let options = data.data.map((item, index) => {
          return {
            value: item.usercode,
            label: `${item.empname} (${item.usercode})`,
          };
        });
        setEmp(options);
      }
    } catch (error) {
      console.error("Error fetching Employee list:", error);
    }
  };

  useEffect(() => {
    getDataByBTN();
    getEmp();
  }, []);
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Bills for Advance Payment"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <form>
                    <div className="row g-5 g-xl-8">
                      <div className="col-12">
                        <div className="card">
                          <h3 className="m-3">Bills for Advance Payment:</h3>
                          <BTNAdvanceVendorInfo navigate={navigate} id={id} />
                        </div>
                      </div>
                      {true && (
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
                                          <Select
                                            className="basic-single w-100"
                                            classNamePrefix="select"
                                            isClearable={true}
                                            isSearchable={true}
                                            name="emp"
                                            id="emp"
                                            options={emp}
                                            value={
                                              emp &&
                                              emp.filter(
                                                (item) =>
                                                  item.value ===
                                                  doForm?.certifying_authority
                                              )[0]
                                            }
                                            onChange={(val) =>
                                              setDoForm({
                                                ...doForm,
                                                certifying_authority: val.value,
                                              })
                                            }
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>BTN Number:</td>
                                        <td className="btn_value">
                                          <b>{state}</b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Liquidated damage</td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlFor="GED">
                                              Gate Entry Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control "
                                              id="GED"
                                              value={doForm?.ld_ge_date}
                                              onChange={(e) =>
                                                setDoForm({
                                                  ...doForm,
                                                  ld_ge_date: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div className="me-3">
                                            <label htmlFor="CLD">
                                              Contractual Delivery Date:
                                            </label>
                                            <input
                                              type="date"
                                              className="form-control"
                                              id="CLD"
                                              value={doForm?.ld_c_date}
                                              onChange={(e) =>
                                                setDoForm({
                                                  ...doForm,
                                                  ld_c_date: e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>&#8377; {doForm?.ld_amount}</p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Penalty for Drawing submission</td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlFor="DADD">
                                              Actual Delivery Date:
                                            </label>
                                            <p>
                                              <b>
                                                {form?.a_drawing_date &&
                                                  formatDate(
                                                    form?.a_drawing_date
                                                  )}
                                              </b>
                                            </p>
                                          </div>
                                          <div className="me-3">
                                            <label htmlFor="DCDD">
                                              Contractual Delivery Date:
                                            </label>
                                            <p>
                                              <b>
                                                {form?.c_drawing_date &&
                                                  formatDate(
                                                    form?.c_drawing_date
                                                  )}
                                              </b>
                                            </p>
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>
                                              &#8377; {doForm?.p_drg_amount}
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Estimated Penalty </td>
                                        <td className="btn_value">
                                          <p>
                                            {" "}
                                            &#8377; {doForm?.p_estimate_amount}
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Other deduction if any </td>
                                        <td className="btn_value">
                                          <input
                                            type="number"
                                            name=""
                                            id=""
                                            className="form-control"
                                            value={doForm?.o_deduction}
                                            onChange={(e) =>
                                              setDoForm({
                                                ...doForm,
                                                o_deduction: e.target.value,
                                              })
                                            }
                                            onWheel={inputOnWheelPrevent}
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Total deductions</td>
                                        <td>
                                          <b>
                                            &#8377;{" "}
                                            {isNaN(doForm?.total_deduction)
                                              ? 0
                                              : doForm?.total_deduction}
                                          </b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Net payable amount</td>
                                        <td>
                                          <b>
                                            &#8377;{" "}
                                            {isNaN(doForm?.net_payable_amount)
                                              ? 0
                                              : doForm?.net_payable_amount}
                                          </b>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <p>
                                  Certified that Invoice has been verified w.r.t
                                  PO and recommanded for release of payment
                                  subject to satutatory deduction
                                </p>
                                <div className="text-center">
                                  <button
                                    type="button"
                                    className="btn fw-bold btn-primary me-3"
                                    onClick={() =>
                                      actionHandlerByDO(
                                        doForm,
                                        setDoForm,
                                        initialDataAdvance,
                                        navigate,
                                        id,
                                        token
                                      )
                                    }
                                  >
                                    SUBMIT
                                  </button>
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

export default AdvanceBillHybridEdit;
