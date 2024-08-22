import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCaretLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import Select from "react-select";
import { apiCallBack } from "../../utils/fetchAPIs";
import ClaimAgainstPBGSubmissioninfo from "../../components/ClaimAgainstPBGSubmissioninfo";
import { toast } from "react-toastify";

const ClaimAgainstPBGSubmissionEdit = () => {
  const initialDODataPBG = {
    assign_to: "",
  };
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [rejectloading, setRejectLoading] = useState(false);
  const [emp, setEmp] = useState([]);
  const [doForm, setDoForm] = useState(initialDODataPBG);
  const [netPayableAmount, setNetPayableAmount] = useState("");

  useEffect(() => {
    const getEmp = async () => {
      try {
        const data = await apiCallBack(
          "GET",
          `po/btn/getFinanceEmpList`,
          null,
          token
        );
        if (data?.status) {
          let options = data.data.map((item) => ({
            value: item.usercode,
            label: `${item.empname} (${item.usercode})`,
          }));
          setEmp(options);
        } else {
          setEmp([]);
        }
      } catch (error) {
        console.error("Error fetching Employee list:", error);
        setEmp([]);
      }
    };

    getEmp();
  }, [token]);

  const handleSubmit = async (status) => {
    if (!doForm.assign_to) {
      toast.warning("Please select an Finance Authority.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("btn_num", state);
    formData.append("net_payable_amount", netPayableAmount);
    formData.append("assigned_to", doForm.assign_to);
    formData.append("purchasing_doc_no", id);
    formData.append("status", status);
    if (remarks) formData.append("remarks", remarks);

    try {
      const response = await apiCallBack(
        "POST",
        "po/btn/btnPbgSubmitByDO",
        formData,
        token
      );

      if (response?.status) {
        toast.success("Submission successful!");
        navigate(`/invoice-and-payment-process/${id}`);
      } else {
        toast.warning(response?.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = () => {
    handleSubmit("APPROVED");
  };

  const handleRejection = async () => {
    if (showRemarks && remarks) {
      setRejectLoading(true);
      const formData = new FormData();
      formData.append("btn_num", state);
      formData.append("net_payable_amount", netPayableAmount);
      formData.append("assigned_to", 0);
      formData.append("purchasing_doc_no", id);
      formData.append("status", "REJECTED");
      if (remarks) formData.append("remarks", remarks);

      try {
        const response = await apiCallBack(
          "POST",
          "po/btn/btnPbgSubmitByDO",
          formData,
          token
        );

        if (response?.status) {
          toast.success("Rejection submission successful!");
          navigate(`/invoice-and-payment-process/${id}`);
        } else {
          toast.warning(response?.message);
        }
      } catch (error) {
        console.error("Error submitting rejection:", error);
        toast.error("An error occurred while submitting the rejection.");
      } finally {
        setRejectLoading(false);
      }
    } else {
      setShowRemarks(true);
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Bills for Material PO"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
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
                        <ClaimAgainstPBGSubmissioninfo
                          setNetPayableAmount={setNetPayableAmount}
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
                                <table className="table table-striped table-bordered table_height_pbg">
                                  <tbody>
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
                                            emp.find(
                                              (item) =>
                                                item.value === doForm?.assign_to
                                            )
                                          }
                                          onChange={(val) =>
                                            setDoForm({
                                              ...doForm,
                                              assign_to: val ? val.value : null,
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
                                  </tbody>
                                </table>
                              </div>

                              <div className="row">
                                <div className="col-6 text-start">
                                  {/* <DynamicButton
                                      label="Approve"
                                      className="btn fw-bold btn-primary me-3"
                                      onClick={handleApproval}
                                    /> */}
                                  <button
                                    className="btn btn-sm fw-bold btn-primary me-3"
                                    onClick={handleApproval}
                                    disabled={loading}
                                  >
                                    {loading ? "Loading..." : "Approve"}{" "}
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-primary me-3"
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

                                      <button
                                        className="btn fw-bold btn-sm btn-danger"
                                        onClick={handleRejection}
                                        disabled={rejectloading}
                                      >
                                        {rejectloading
                                          ? "Loading..."
                                          : "Submit Rejection"}
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      className="btn fw-bold btn-sm btn-danger"
                                      onClick={handleRejection}
                                    >
                                      Reject
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

export default ClaimAgainstPBGSubmissionEdit;
