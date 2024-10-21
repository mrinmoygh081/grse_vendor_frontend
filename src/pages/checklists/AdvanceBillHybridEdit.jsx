import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { apiCallBack } from "../../utils/fetchAPIs";
import { calculatePenalty, checkTypeArr } from "../../utils/smallFun";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import BTNAdvanceVendorInfo from "../../components/BTNAdvanceVendorInfo";
import { formatDate } from "../../utils/getDateTimeNow";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import {
  actionHandlerByDO,
  actionHandlerByDOhybrid,
} from "../../Helpers/BTNChecklist";
import Select from "react-select";
import { initialDataAdvance, initialDODataAdvance } from "../../data/btnData";
import { toast } from "react-toastify";
import DynamicButton from "../../Helpers/DynamicButton";

const AdvanceBillHybridEdit = () => {
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();

  const [impDates, setImpDates] = useState(null);
  const [data, setData] = useState(null);
  const [doData, setDoData] = useState(null);
  const [emp, setEmp] = useState([]);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");

  const [doForm, setDoForm] = useState(initialDODataAdvance);

  const getDataByBTN = async () => {
    try {
      const response = await apiCallBack(
        "GET",
        `po/btn/abh?type=details&btn_num=${state}`,
        null,
        token
      );
      if (response?.status) {
        setData(response.data);
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

  useEffect(() => {
    if (data) {
      setDoForm((prevForm) => ({
        ...prevForm,
        a_drawing_date: data.a_drawing_date
          ? new Date(data.a_drawing_date).toISOString().slice(0, 10)
          : prevForm.a_drawing_date,
        c_drawing_date: data.c_drawing_date || prevForm.c_drawing_date,
        max_ld: data.max_ld || prevForm.max_ld,
      }));
    }
  }, [data]);

  // Calculate penalty amount whenever relevant fields change
  useEffect(() => {
    const { a_drawing_date, c_drawing_date, max_ld } = doForm;

    if (a_drawing_date && c_drawing_date && data?.net_claim_amount) {
      const penaltyAmount = calculatePenalty(
        c_drawing_date,
        a_drawing_date,
        data.net_claim_amount,
        0.25,
        max_ld
      );
      setDoForm((prevForm) => ({
        ...prevForm,
        p_drg_amount: penaltyAmount,
      }));
    }
  }, [
    doForm.a_drawing_date,
    doForm.c_drawing_date,
    doForm.max_ld,
    data?.net_claim_amount,
  ]);

  console.log(data, "data");
  console.log("doForm", doForm);
  // calculate total_deduction
  useEffect(() => {
    const { c_drawing_date, p_drg_amount } = doForm;

    if (data?.net_claim_amount) {
      let net = Number(data?.net_claim_amount);
      let max_deduct = (net * doForm.max_ld) / 100;

      let total_deduction = parseInt(
        Math.min(doForm?.p_drg_amount, max_deduct)
      );
      if (!c_drawing_date || c_drawing_date == "") {
        total_deduction = 0;
      }
      let net_payable_amount = parseInt(net - total_deduction);

      setDoForm((prev) => ({ ...prev, total_deduction, net_payable_amount }));
    }
  }, [data?.net_claim_amount, doForm?.p_drg_amount, doForm.max_ld]);

  //submision do form

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check required fields before submission
    if (!doForm.assign_to) {
      toast.error("Please select a Finance Authority.");
      return;
    }
    if (!doForm.recomend_payment) {
      toast.error("Please select a Recomend Payment.");
      return;
    }

    const payload = {
      btn_num: state,
      drg_penalty: doForm.p_drg_amount,
      net_payable_amount: doForm.net_payable_amount,
      penalty_rate: doForm.max_ld,
      penalty_ammount: doForm.total_deduction,
      recomend_payment: doForm.recomend_payment,
      assign_to: doForm.assign_to,
      a_drawing_date: new Date(doForm.a_drawing_date).getTime(),
      purchasing_doc_no: id,
    };

    try {
      const response = await apiCallBack(
        "POST",
        "po/btn/submit-abh-do",
        payload,
        token
      );
      if (response?.status) {
        toast.success(response?.message);
        setDoForm(initialDODataAdvance);
        navigate(`/invoice-and-payment-process/${id}`);
      } else {
        toast.error(response?.message || "Submission failed.");
      }
    } catch (error) {
      toast.error("An error occurred during submission.");
      console.error("Error submitting form:", error);
    }
  };

  const rejectBTN = async () => {
    try {
      let payload = {
        btn_num: state,
        status: "REJECTED",
        rejectedMessage: remarks,
        purchasing_doc_no: id,
      };
      const response = await apiCallBack(
        "POST",
        "po/btn/submit-abh-do",
        payload,
        token
      );
      if (response.status) {
        toast.success(response.message || "Rejected successfully");
        navigate(`/invoice-and-payment-process/${id}`);
      } else {
        toast.error(response.message || "Error rejecting the BTN");
      }
    } catch (error) {
      console.error("Error rejecting the BTN:", error);
      toast.error("Error rejecting the BTN");
    }
  };

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
                      {isDO && (
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
                                              emp.filter(
                                                (item) =>
                                                  item.value ===
                                                  doForm?.assign_to
                                              )[0]
                                            }
                                            onChange={(val) =>
                                              setDoForm({
                                                ...doForm,
                                                assign_to: val.value,
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
                                        <td>
                                          Penalty Percentage
                                          <div className="d-flex gap-2 align-items-center">
                                            <span>Max Penalty </span>
                                            <select
                                              name="max_ld"
                                              id=""
                                              className="form-select"
                                              style={{ maxWidth: "100px" }}
                                              onChange={(e) =>
                                                setDoForm({
                                                  ...doForm,
                                                  max_ld: e.target.value,
                                                })
                                              }
                                            >
                                              <option value="1">1%</option>
                                              <option value="2">2%</option>
                                            </select>
                                          </div>
                                        </td>
                                        <td className="btn_value">
                                          <div className="me-3">
                                            <label htmlFor="DADD">
                                              Actual Delivery Date:
                                            </label>
                                            <input
                                              type="date"
                                              id="DADD"
                                              className="form-control"
                                              value={doForm.a_drawing_date}
                                              onChange={(e) =>
                                                setDoForm({
                                                  ...doForm,
                                                  a_drawing_date:
                                                    e.target.value,
                                                })
                                              }
                                            />
                                          </div>
                                          <div className="me-3">
                                            <label htmlFor="DCDD">
                                              Contractual Delivery Date:
                                            </label>
                                            <p aria-label="Contractual Delivery Date">
                                              <b>
                                                <b>
                                                  {formatDate(
                                                    doForm.c_drawing_date
                                                  )}
                                                </b>
                                              </b>
                                            </p>
                                          </div>
                                          <div>
                                            <label>Amount:</label>
                                            <p>
                                              {" "}
                                              &#8377;{" "}
                                              {doForm.p_drg_amount
                                                ? doForm.p_drg_amount
                                                : 0}
                                            </p>
                                          </div>
                                        </td>
                                      </tr>
                                      {/* <tr>
                                        <td>Net payable amount </td>
                                        <td className="btn_value">
                                          <p>
                                            {" "}
                                            &#8377; {doForm?.p_estimate_amount}
                                          </p>
                                        </td>
                                      </tr> */}

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
                                            {console.log(
                                              "doForm?.net_payable_amount",
                                              doForm?.net_payable_amount
                                            )}
                                          </b>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>Recommended for payment </td>
                                        <td className="btn_value">
                                          <select
                                            name="recomend_payment"
                                            id=""
                                            className="form-select"
                                            style={{ maxWidth: "100px" }}
                                            onChange={(e) =>
                                              setDoForm({
                                                ...doForm,
                                                recomend_payment:
                                                  e.target.value,
                                              })
                                            }
                                          >
                                            <option value="YES">YES</option>
                                            <option value="NO">NO</option>
                                          </select>
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
                                <div className="row">
                                  <div className="col-6 text-start">
                                    <button
                                      className="btn btn-primary me-3"
                                      onClick={handleSubmit}
                                    >
                                      SUBMIT
                                    </button>
                                    <button
                                      className="btn fw-bold btn-primary me-3"
                                      onClick={() =>
                                        navigate(
                                          `/invoice-and-payment-process/${id}`
                                        )
                                      }
                                    >
                                      BACK
                                    </button>
                                  </div>
                                  <div className="col-6 text-end">
                                    {showRemarks ? (
                                      <>
                                        <input
                                          type="text"
                                          placeholder="Enter remarks"
                                          value={remarks}
                                          onChange={(e) =>
                                            setRemarks(e.target.value)
                                          }
                                          className="form-control mb-2"
                                        />
                                        <DynamicButton
                                          label="Submit Rejection"
                                          className="btn fw-bold btn-danger"
                                          onClick={rejectBTN}
                                        />
                                      </>
                                    ) : (
                                      <button
                                        className="btn fw-bold btn-danger"
                                        onClick={() => setShowRemarks(true)}
                                      >
                                        REJECT
                                      </button>
                                    )}
                                  </div>
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
