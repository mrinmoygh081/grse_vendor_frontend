import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { USER_VENDOR } from "../../constants/userConstants";
import {
  checkTypeArr,
  inputFileChange,
  inputTypeChange,
} from "../../utils/smallFun";
import { inputOnWheelPrevent } from "../../utils/inputOnWheelPrevent";
import { apiCallBack } from "../../utils/fetchAPIs";
import { convertToEpoch, formatDate } from "../../utils/getDateTimeNow";
import { FaCaretLeft } from "react-icons/fa";
import { D_S_INVOICE, E_INVOICE } from "../../constants/BTNContants";
import { initialDataJCC, initialDataService } from "../../data/btnData";
import DynamicButton from "../../Helpers/DynamicButton";
import { toast } from "react-toastify";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ClaimAgainstJCCubmissionEdit = () => {
  const initialDODataPBG = {
    assign_to: "",
  };
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [data, setData] = useState("");
  const [form, setForm] = useState(initialDataJCC);
  const [wdcNo, setWdcNo] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  const { isDO } = useSelector((state) => state.selectedPO);
  const [showRemarks, setShowRemarks] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false);
  const [doForm, setDoForm] = useState(initialDODataPBG);
  const [recomendPayment, setRecomendPayment] = useState("yes");
  const [rejectloading, setRejectLoading] = useState(false);
  const [emp, setEmp] = useState([]);
  console.log("abhinit", form);
  console.log("bikky", data);

  const handleSubmit = async (status) => {
    if (!doForm.assign_to) {
      toast.warning("Please select a Finance Authority.");
      return;
    }

    setLoading(true);

    // Create the JSON payload
    const payload = {
      btn_num: state,
      assign_to: doForm.assign_to,
      recomend_payment: recomendPayment,
      purchasing_doc_no: id,
      status: status,
    };

    try {
      const response = await apiCallBack(
        "POST",
        "po/btn/submit-jcc-ca",
        payload,
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

  const getJCCListDropdown = async () => {
    const d = await apiCallBack(
      "GET",
      `po/btn/jcc?type=jcclist&poNo=${id}`,
      null,
      null
    );
    if (d?.status) {
      let options = d?.data.map((item, index) => {
        return {
          value: item.reference_no,
          label: item.reference_no,
        };
      });
      setWdcNo(options);
    } else {
      toast.info("WDC Not Found!");
    }
  };
  // const getEmp = async () => {
  //   try {
  //     const data = await apiCallBack("GET", `po/wdc/grseEmpList`, null, token);
  //     if (data?.status) {
  //       let options = data.data.map((item, index) => {
  //         return {
  //           value: item.code,
  //           label: `${item.name} (${item.code})`,
  //         };
  //       });
  //       setEmp(options);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching Employee list:", error);
  //   }
  // };

  useEffect(() => {
    const getEmp = async () => {
      try {
        const data = await apiCallBack(
          "GET",
          `po/btn/getFinanceEmpList?$select=1`,
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

  const getJCCList = async () => {
    const d = await apiCallBack(
      "GET",
      `po/btn/jcc?type=init&poNo=${id}`,
      null,
      token
    );
    if (d?.status) {
      setData({ ...data, initial: d?.data });
    }
  };

  useEffect(() => {
    getJCCList();
    getJCCListDropdown();
    // getEmp();
  }, []);

  const checkWDCDetails = async () => {
    if (!form.wdc_number || form.wdc_number === "") {
      //   return toast.info("Select a WDC Number");
    }
    const d = await apiCallBack(
      "GET",
      `po/btn/jcc?type=jccinfo&reference_no=${form?.wdc_number}`,
      null,
      token
    );
    if (d?.status) {
      setData({ ...data, wdcDetails: d?.data });
    }
  };

  const getForm = async (btn) => {
    const d = await apiCallBack(
      "GET",
      `po/btn/jcc?type=details&btn_num=${btn}`
    );
    if (d?.status) {
      setForm(d?.data);
      checkWDCDetails(d?.data?.wdc_number);
    }
  };

  useEffect(() => {
    getForm(state);
  }, [state]);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Checklist For Claim Against JCC"} id={id} />
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
                            Bills for Service PO:
                          </h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    <tr>
                                      <td>BTN NO</td>
                                      <td className="btn_value">
                                        <b>{form?.btn_num}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Vendor Name</td>
                                      <td className="btn_value">
                                        <b>{data?.initial?.vendor_name}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Vendor Code</td>
                                      <td className="btn_value">
                                        <b>{data?.initial?.vendor_code}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GSTIN (Registration no)</td>
                                      <td className="btn_value">
                                        <b>{data?.initial?.vendor_gstno}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>JCC No:</td>
                                      <td className="btn_value">
                                        <b>{form?.jcc_ref_number || "N/A"}</b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Yard No:</td>
                                      <td className="btn_value">
                                        <b>
                                          {" "}
                                          <b>{form?.yard || "N/A"}</b>
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Total Amount:</td>
                                      <td className="btn_value">
                                        <b>
                                          {" "}
                                          <b>{form?.total_amount || "N/A"}</b>
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>JOB Completion Certificate:</td>
                                      <td className="btn_value">
                                        <div className="btn_value">
                                          <div className="me-4">
                                            <label htmlFor="">
                                              Attach Approved JCC
                                            </label>
                                            <p>
                                              <a
                                                href={`${process.env.REACT_APP_PDF_URL}btns/${form?.jcc_filename}`}
                                                target="_blank"
                                                rel="noreferrer"
                                              >
                                                VIEW
                                              </a>
                                            </p>
                                          </div>
                                          <div>
                                            <label htmlFor="">Remarks</label>
                                            <p>{form?.remarks}</p>
                                          </div>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>

                                <table
                                  className="table table-striped table-bordered table_height"
                                  style={{ marginBottom: "120px" }}
                                >
                                  <tbody>
                                    {/* Check if the invoice type is 'Digitally signed Invoice' */}
                                    {form?.invoice_type ===
                                      "Digitally signed Invoice" && (
                                      <tr>
                                        <td>Digitally Signed Invoice:</td>
                                        <td>
                                          <div className="btn_value">
                                            <div className="me-4">
                                              <label htmlFor="">
                                                Invoice Number
                                              </label>
                                              <p>{form?.invoice_no}</p>
                                            </div>
                                            <div>
                                              <label htmlFor="">
                                                Invoice Date:
                                              </label>
                                              <span>
                                                {formatDate(
                                                  form?.invoice_date * 1000
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="btn_value">
                                            <div className="me-4">
                                              <label htmlFor="">
                                                Invoice File
                                              </label>
                                              <p>
                                                <a
                                                  href={`${process.env.REACT_APP_PDF_URL}btns/${form?.invoice_filename}`}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  VIEW
                                                </a>
                                              </p>
                                            </div>
                                            <div>
                                              <label htmlFor="">
                                                Supporting Documents
                                              </label>
                                              <p>
                                                <a
                                                  href={`${process.env.REACT_APP_PDF_URL}btns/${form?.suppoting_invoice_filename}`}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  VIEW
                                                </a>
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}

                                    {/* Check if the invoice type is 'E-Invoice' */}
                                    {form?.invoice_type === "E-Invoice" && (
                                      <tr>
                                        <td>E-Invoice No:</td>
                                        <td>
                                          <div className="btn_value">
                                            <div className="me-4">
                                              <label htmlFor="">
                                                Invoice Number
                                              </label>
                                              <p>{form?.invoice_no}</p>
                                            </div>
                                            <div>
                                              <label htmlFor="">
                                                Invoice Date :
                                              </label>
                                              <span>
                                                {formatDate(
                                                  form?.invoice_date * 1000
                                                )}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="btn_value">
                                            <div className="me-4">
                                              <label htmlFor="">
                                                Invoice File
                                              </label>
                                              <p>
                                                <a
                                                  href={`${process.env.REACT_APP_PDF_URL}btns/${form?.invoice_filename}`}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  VIEW
                                                </a>
                                              </p>
                                            </div>
                                            <div>
                                              <label htmlFor="">
                                                Supporting Documents
                                              </label>
                                              <p>
                                                <a
                                                  href={`${process.env.REACT_APP_PDF_URL}btns/${form?.suppoting_invoice_filename}`}
                                                  target="_blank"
                                                  rel="noreferrer"
                                                >
                                                  VIEW
                                                </a>
                                              </p>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    )}

                                    <tr>
                                      <td>Claim Amount:</td>
                                      <td className="btn_value">
                                        <b>{form?.net_claim_amount || "N/A"}</b>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>Bill Certifying Authority</td>
                                      <td className="btn_value">
                                        <b>
                                          {form?.bill_certifing_authority ||
                                            "N/A"}
                                          {form?.bill_certifing_authority_name
                                            ? ` (${form.bill_certifing_authority_name})`
                                            : ""}
                                        </b>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan="2">
                                        <div className="form-check">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="hsn_gstn_icgrn"
                                            name="hsn_gstn_icgrn"
                                            defaultChecked={true}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="hsn_gstn_icgrn"
                                          >
                                            Whether HSN code, GSTIN, Tax rate is
                                            as per PO
                                          </label>
                                        </div>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td colSpan="2">
                                        <div className="form-check">
                                          <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="agree_to_declaration"
                                            name="agree_to_declaration"
                                            defaultChecked={true}
                                          />
                                          <label
                                            className="form-check-label"
                                            htmlFor="agree_to_declaration"
                                          >
                                            I hereby declare that all the
                                            entries are correct.
                                          </label>
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table table-striped table-bordered table_height">
                                  <tbody style={{ maxHeight: "100%" }}>
                                    {isDO && (
                                      <div className="col-12">
                                        <div className="card">
                                          <h3 className="m-3">
                                            ENTRY BY DEALING OFFICER:
                                          </h3>
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
                                                    <tr>
                                                      <td>
                                                        Recommended for payment:
                                                      </td>
                                                      <td className="btn_value">
                                                        <select
                                                          name="claimType"
                                                          className="form-select"
                                                          value={
                                                            recomendPayment
                                                          }
                                                          onChange={(e) =>
                                                            setRecomendPayment(
                                                              e.target.value
                                                            )
                                                          }
                                                        >
                                                          <option value="yes">
                                                            YES
                                                          </option>
                                                          <option value="no">
                                                            NO
                                                          </option>
                                                        </select>
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
                                                    {loading
                                                      ? "Loading..."
                                                      : "APPROVE"}{" "}
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
                                                {/* <div className="col-6 text-end">
                                                  {showRemarks ? (
                                                    <>
                                                      <input
                                                        type="text"
                                                        placeholder="Enter remarks"
                                                        value={remarks}
                                                        onChange={(e) =>
                                                          setRemarks(
                                                            e.target.value
                                                          )
                                                        }
                                                        className="form-control mb-2"
                                                      />

                                                      <button
                                                        className="btn fw-bold btn-sm btn-danger"
                                                        onClick={
                                                          handleRejection
                                                        }
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
                                                      REJECT
                                                    </button>
                                                  )}
                                                </div> */}
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                              {/* <div className="text-center">
                                <button
                                  className="btn fw-bold btn-primary me-3"
                                  type="button"
                                  onClick={() =>
                                    navigate(
                                      `/invoice-and-payment-process/${id}`
                                    )
                                  }
                                >
                                  BACK
                                </button>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
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

export default ClaimAgainstJCCubmissionEdit;
