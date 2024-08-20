import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaCaretLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import Select from "react-select";
import DynamicButton from "../../Helpers/DynamicButton";
import { apiCallBack } from "../../utils/fetchAPIs";
import { initialDODataPBG } from "../../data/btnData";

const ClaimAgainstPBGSubmissionEdit = () => {
  const navigate = useNavigate();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { state } = useLocation();
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [emp, setEmp] = useState(null);
  const [doForm, setDoForm] = useState(initialDODataPBG);

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
      }
    } catch (error) {
      console.error("Error fetching Employee list:", error);
    }
  };

  useEffect(() => {
    getEmp();
  }, []);

  const handleApproval = () => {
    // Implement the approval logic here
    console.log("Approved:", doForm);
  };

  const handleRejection = () => {
    if (showRemarks && remarks) {
      // Implement the rejection logic here with remarks
      console.log("Rejected with remarks:", remarks);
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
                          {/* <BTNMaterialVendorInfo navigate={navigate} id={id} /> */}
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
                                              emp &&
                                              emp.find(
                                                (item) =>
                                                  item.value ===
                                                  doForm?.assign_to
                                              )
                                            }
                                            onChange={(val) =>
                                              setDoForm({
                                                ...doForm,
                                                assign_to: val
                                                  ? val.value
                                                  : null,
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
                                    <DynamicButton
                                      label="Approve"
                                      className="btn fw-bold btn-primary me-3"
                                      onClick={handleApproval}
                                    />
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
                                        <DynamicButton
                                          label="Submit Rejection"
                                          className="btn fw-bold btn-danger"
                                          onClick={handleRejection}
                                        />
                                      </>
                                    ) : (
                                      <DynamicButton
                                        label="Reject"
                                        className="btn fw-bold btn-danger"
                                        onClick={handleRejection}
                                      />
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

export default ClaimAgainstPBGSubmissionEdit;
