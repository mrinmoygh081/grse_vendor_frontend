import React, { Fragment, useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { apiCallBack } from "../utils/fetchAPIs";
import { useSelector } from "react-redux";
import { checkTypeArr } from "../utils/smallFun";
import { formatDate } from "../utils/getDateTimeNow";
import { clrLegend } from "../utils/clrLegend";
import Select from "react-select";
import { groupedByActionType, groupedByBtnNum } from "../utils/groupedByReq";
import { TailSpin } from "react-loader-spinner";
import { activityOptions } from "../data/btnData";
import SkeletonLoader from "../loader/SkeletonLoader";
import DynamicButton from "../Helpers/DynamicButton";
import { ASSIGNER, USER_GRSE_FINANCE } from "../constants/userConstants";

const Checklist = () => {
  const { id } = useParams();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const [groupedBG, setGroupedBG] = useState([]);
  const { pathname } = useLocation();
  const [isAssignPopup, setIsAssignPopup] = useState(false);
  const [empOption, setEmpOption] = useState([]);
  const [assign, setAssign] = useState({
    purchasing_doc_no: id,
    assign_to_fi: null,
    btn_num: "",
    activity: "",
  });
  const navigate = useNavigate();
  const [slug, setSlug] = useState("");
  const [paymentData, setPaymentData] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("user", user);

  useEffect(() => {
    const fetchData = async () => {
      await getEmpList();
      await getData();
      await createPayment();
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, [id, token, pathname]);

  useEffect(() => {
    if (data && data.length > 0) {
      const gData = groupedByBtnNum(data);
      setGroupedBG(gData);
    }
  }, [data]);

  const NewBillHandler = () => {
    if (slug) {
      navigate(`/checklist/${slug}/${id}`);
    } else {
      toast.warn("Please choose what type of checklist you want to add.");
    }
  };

  const getEmpList = async () => {
    try {
      const res = await apiCallBack("GET", `po/wdc/grseEmpList`, null, token);
      if (res?.status) {
        const options = res?.data?.map((item) => ({
          value: item.code,
          label: `${item.name} (${item.code})`,
        }));
        setEmpOption(options);
      }
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  };

  const assignSDBGByFinance = async () => {
    if (assign.assign_to_fi) {
      try {
        let uri;
        if (assign?.btn_type === "service-contract-bills") {
          uri = "submitSBtnByFAuthorty";
        } else if (assign?.btn_type === "hybrid-bill-material") {
          uri = "assignToFiStaff";
        } else if (assign?.btn_type === "claim-against-pbg") {
          uri = "assignToFiStaff";
        }
        const res = await apiCallBack("POST", `po/btn/${uri}`, assign, token);
        if (res?.status) {
          setIsAssignPopup(false);
          toast.success(`Successfully assigned to ${assign.assign_to_fi}`);
          getData();
        } else {
          toast.warn(res?.message);
        }
      } catch (error) {
        console.error("Error assigning to FI staff:", error);
      }
    } else {
      toast.warn("Please choose an employee to assign!");
    }
  };

  const getData = async () => {
    try {
      const response = await apiCallBack("GET", `po/btn?id=${id}`, null, token);
      if (response?.status) {
        setData(response?.data);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  const createPayment = async () => {
    try {
      const payload = { poNo: id };
      const response = await apiCallBack(
        "POST",
        "po/download/paymentAdvice",
        payload,
        token
      );
      if (response?.status) {
        setPaymentData(response.data);
      } else {
        console.error("Error creating invoice number:", response.message);
      }
    } catch (error) {
      console.error("Error creating invoice number:", error);
    }
  };

  return (
    <div className="wrapper d-flex flex-column flex-row-fluid">
      <div className="page d-flex flex-row flex-column-fluid">
        <SideBar />
        <div className="d-flex flex-column flex-row-fluid">
          <Header title="Invoice And Payment Process" id={id} />
          <div className="content d-flex flex-column flex-column-fluid">
            <div className="post d-flex flex-column-fluid">
              <div className="container">
                <div className="row g-5 g-xl-8">
                  <div className="col-12">
                    <div className="card-body p-3">
                      <div className="tab-content">
                        <label htmlFor="checklistDropdown" className="mr-2">
                          Select Checklist:
                        </label>
                        <div className="d-flex align-items-center w-50">
                          <div className="mb-3 w-100">
                            <select
                              id="checklistDropdown"
                              className="form-select w-100"
                              onChange={(e) => setSlug(e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="hybrid-bill-material">
                                Checklist for Material PO
                              </option>
                              <option value="contract-bill-service">
                                Checklist for Service PO
                              </option>
                              {/* <option value="bill-incorrect-deductions">
                                Checklist for Incorrect Deductions
                              </option> */}
                              <option value="bill-advance-payment">
                                Checklist for Advance Payment
                              </option>
                              <option value="claim-against-pbg">
                                Checklist for Claim Against PBG
                              </option>
                              {/* <option value="ld-penalty-refund">
                                Checklist for LD-Penalty Refund
                              </option> */}
                              <option value="claim-against-jcc">
                                Claim Against JCC
                              </option>
                              <option value="any-other">
                                Checklist for Any Other Claims
                              </option>
                            </select>
                          </div>
                          <button
                            className="btn btn-sm btn-primary mx-3 mb-3"
                            onClick={NewBillHandler}
                          >
                            ADD
                          </button>
                        </div>
                        <div className="table-responsive position-relative">
                          <table className="table table-striped table-bordered table_height">
                            <thead>
                              <tr className="border-0">
                                <th>Date</th>
                                <th>BTN Type</th>
                                <th>Net Claim Amount</th>
                                <th>Amount Before Statutory Deduction</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody style={{ maxHeight: "100%" }}>
                              {loading ? (
                                <>
                                  <tr></tr>
                                  <tr>
                                    <td colSpan={10}>
                                      <SkeletonLoader col={4} row={6} />
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <>
                                  {Object.keys(groupedBG).map((it, index) => {
                                    let items = groupedBG[it];
                                    let firstItem = items[0];
                                    return (
                                      <Fragment key={index}>
                                        <tr>
                                          <td colSpan={5}>
                                            <b>{it}</b>
                                          </td>
                                          <td>
                                            <div className="view-button-container">
                                              <button
                                                className="btn btn-sm btn-secondary m-1"
                                                onClick={() => {
                                                  let type = "";

                                                  if (
                                                    firstItem.btn_type ===
                                                    "hybrid-bill-material"
                                                  ) {
                                                    type =
                                                      "hybrid-bill-material";
                                                  } else if (
                                                    firstItem.btn_type ===
                                                    "service-contract-bills"
                                                  ) {
                                                    type = "bill-service";
                                                  } else if (
                                                    firstItem.btn_type ===
                                                    "advance-bill-hybrid"
                                                  ) {
                                                    type =
                                                      "advance-bill-hybrid";
                                                  } else if (
                                                    firstItem.btn_type ===
                                                    "claim-against-pbg"
                                                  ) {
                                                    type = "claim-against-pbg";
                                                  } else if (
                                                    firstItem.btn_type ===
                                                    "bill-incorrect-deductions"
                                                  ) {
                                                    type = "any-other";
                                                  } else if (
                                                    firstItem.btn_type ===
                                                    "ld-penalty-refund"
                                                  ) {
                                                    type = "any-other";
                                                  } else if (
                                                    firstItem.btn_type ===
                                                    "other-retentions"
                                                  ) {
                                                    type = "any-other";
                                                  }

                                                  navigate(
                                                    `/checklist/${type}/view/${id}`,
                                                    {
                                                      state: `${firstItem?.btn_num}`,
                                                    }
                                                  );
                                                }}
                                              >
                                                VIEW
                                              </button>
                                              {user?.department_id ===
                                                USER_GRSE_FINANCE &&
                                                user?.internal_role_id ===
                                                  ASSIGNER && (
                                                  <button
                                                    onClick={() => {
                                                      setAssign({
                                                        ...assign,
                                                        btn_num:
                                                          firstItem?.btn_num,
                                                        btn_type:
                                                          firstItem?.btn_type,
                                                      });
                                                      setIsAssignPopup(true);
                                                    }}
                                                    className="btn fw-bold btn-sm btn-primary me-3 m-1"
                                                  >
                                                    ASSIGN
                                                  </button>
                                                )}
                                              {isDO &&
                                                firstItem &&
                                                [
                                                  "hybrid-bill-material",
                                                  "claim-against-pbg",
                                                  "bill-incorrect-deductions",
                                                  "other-retentions",
                                                  "ld-penalty-refund",
                                                ].includes(
                                                  firstItem.btn_type
                                                ) && (
                                                  <button
                                                    className="btn btn-sm btn-primary m-1"
                                                    onClick={() => {
                                                      if (id) {
                                                        // Ensure id exists before navigating
                                                        navigate(
                                                          `/checklist/${firstItem.btn_type}/edit/${id}`,
                                                          {
                                                            state:
                                                              firstItem?.btn_num, // Pass btn_num in state
                                                          }
                                                        );
                                                      }
                                                    }}
                                                  >
                                                    Action
                                                  </button>
                                                )}

                                              {user?.vendor_code ===
                                                firstItem?.bill_certifing_authority && (
                                                <button
                                                  className="btn btn-sm btn-primary m-1"
                                                  onClick={() => {
                                                    navigate(
                                                      `/checklist/bill-service/edit/${id}`,
                                                      {
                                                        state: {
                                                          btn_num:
                                                            firstItem?.btn_num,
                                                          bill_ca:
                                                            firstItem?.bill_certifing_authority,
                                                        },
                                                      }
                                                    );
                                                  }}
                                                >
                                                  Action
                                                </button>
                                              )}
                                            </div>
                                          </td>
                                        </tr>
                                        {items &&
                                          items.map((item, i) => (
                                            <tr key={i}>
                                              <td>
                                                {formatDate(item?.created_at)}
                                              </td>
                                              <td>{item?.btn_type}</td>
                                              <td>{item?.net_claim_amount}</td>
                                              <td>
                                                {item?.net_payable_amount}
                                              </td>
                                              <td
                                                className={`${clrLegend(
                                                  item?.status
                                                )} bold`}
                                              >
                                                {item?.status}
                                              </td>
                                              <td></td>
                                            </tr>
                                          ))}
                                      </Fragment>
                                    );
                                  })}
                                </>
                              )}
                            </tbody>
                          </table>
                          {isAssignPopup && (
                            <div className="popup active">
                              <div className="card card-xxl-stretch mb-5 mb-xxl-8">
                                <div className="card-header border-0 pt-5">
                                  <h3 className="card-title align-items-start flex-column">
                                    <span className="card-label fw-bold fs-3 mb-1">
                                      ASSIGN
                                    </span>
                                  </h3>
                                  <button
                                    className="btn fw-bold btn-danger"
                                    onClick={() => setIsAssignPopup(false)}
                                  >
                                    Close
                                  </button>
                                </div>
                                <form>
                                  <div
                                    className="row"
                                    style={{ overflow: "unset" }}
                                  >
                                    <div className="col-12">
                                      <div className="mb-3">
                                        <label htmlFor="empName">
                                          Employee Name
                                        </label>
                                        <Select
                                          className="basic-single"
                                          classNamePrefix="select"
                                          isClearable
                                          isSearchable
                                          name="empName"
                                          id="empName"
                                          options={empOption}
                                          onChange={(val) =>
                                            setAssign({
                                              ...assign,
                                              assign_to_fi: val?.value,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      <div className="mb-3">
                                        <label htmlFor="activity">
                                          Activity
                                        </label>
                                        <Select
                                          className="basic-single"
                                          classNamePrefix="select"
                                          isClearable
                                          isSearchable
                                          name="activity"
                                          id="activity"
                                          options={activityOptions}
                                          onChange={(val) =>
                                            setAssign({
                                              ...assign,
                                              activity: val?.value,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="col-12">
                                      <div className="mb-3 d-flex justify-content-between">
                                        <DynamicButton
                                          label="ASSIGN"
                                          onClick={assignSDBGByFinance}
                                          className="btn fw-bold btn-primary"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          )}
                          <div>
                            <div className="page_heading mt-5 mb-3">
                              <h3>Payment Advice</h3>
                            </div>
                            <table className="table table-striped table-bordered table_height">
                              <thead>
                                <tr className="border-0">
                                  <th>Date</th>
                                  <th>Vendor Code</th>
                                  <th>Document No</th>
                                  <th>VIEW DOCUMENT</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {loading ? (
                                  <>
                                    <tr></tr>
                                    <tr>
                                      <td colSpan={10}>
                                        <SkeletonLoader col={4} row={6} />
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    {checkTypeArr(paymentData?.resustFiles) &&
                                      paymentData?.resustFiles.map(
                                        (file, index) => (
                                          <tr key={index}>
                                            <td>
                                              {file.docuentDate &&
                                                formatDate(file.docuentDate)}
                                            </td>
                                            <td>{file.vendor_code}</td>
                                            <td>{file.documentNo}</td>
                                            <td>
                                              <a
                                                href={`${process.env.REACT_APP_ROOT_URL}sapuploads/pymtadvice/${file?.fileName}`}
                                                target="_blank"
                                                rel="noreferrer"
                                              >
                                                VIEW
                                              </a>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                  </>
                                )}
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
    </div>
  );
};

export default Checklist;
