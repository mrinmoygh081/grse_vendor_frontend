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

const ClaimAgainstJCCubmissionView = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [data, setData] = useState("");
  const [emp, setEmp] = useState([]);
  const [form, setForm] = useState(initialDataJCC);
  const [wdcNo, setWdcNo] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { state } = useLocation();
  console.log("abhinit", form);
  console.log("bikky", data);

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
  const getEmp = async () => {
    try {
      const data = await apiCallBack("GET", `po/wdc/grseEmpList`, null, token);
      if (data?.status) {
        let options = data.data.map((item, index) => {
          return {
            value: item.code,
            label: `${item.name} (${item.code})`,
          };
        });
        setEmp(options);
      }
    } catch (error) {
      console.error("Error fetching Employee list:", error);
    }
  };

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
    getEmp();
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
                                                Invoice Date
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
                                      <td>Invoice Value:</td>
                                      <td className="btn_value">
                                        <b>
                                          {" "}
                                          <b>{form?.invoice_value || "N/A"}</b>
                                        </b>
                                      </td>
                                    </tr>
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
                              </div>
                              <div className="text-center">
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
                              </div>
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

export default ClaimAgainstJCCubmissionView;
