import React, { Fragment, useEffect, useRef, useState } from "react";
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
import { BsChatRightText } from "react-icons/bs";
import { ASSIGNER, DEPT_FI } from "../constants/userConstants";

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
  const [searchQuery, setSearchQuery] = useState("");
  const popupRef = useRef(null);
  const remarksRef = useRef(null);
  console.log("groupedBG", groupedBG);

  useEffect(() => {
    const fetchData = async () => {
      await getEmpList();
      await getData();
      await createPayment();
      setLoading(false);
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
        } else if (assign?.btn_type === "bill-incorrect-deductions") {
          uri = "assignToFiStaff";
        } else if (assign?.btn_type === "ld-penalty-refund") {
          uri = "assignToFiStaff";
        } else if (assign?.btn_type === "other-retentions") {
          uri = "assignToFiStaff";
        } else if (assign?.btn_type === "claim-against-jcc") {
          uri = "assignToFiStaff";
        } else if (assign?.btn_type === "advance-bill") {
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

  const filteredGroupedBG = Object.keys(groupedBG)
    .filter((key) => key.toLowerCase().includes(searchQuery.toLowerCase()))
    .reduce((acc, key) => {
      acc[key] = groupedBG[key];
      return acc;
    }, {});

  //reject remarks
  const handleButtonClick = (remarks) => {
    if (popupRef.current) {
      popupRef.current.style.display = "block"; // Show the popup
      remarksRef.current.textContent = remarks; // Update the remarks text
    }
  };

  const closePopup = () => {
    if (popupRef.current) {
      popupRef.current.style.display = "none"; // Hide the popup
      remarksRef.current.textContent = ""; // Clear the remarks text
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
                              <option value="advance-bill">
                                Checklist for Advance Payment
                              </option>
                              <option value="claim-against-pbg">
                                Checklist for Claim Against PBG
                              </option>
                              <option value="claim-against-jcc">
                                Claim Against JCC
                              </option>
                              <option value="any-other">
                                Checklist for Any Other Claims
                              </option>
                              {/* <option value="ld-refund-supply-material">
                                LD Refund for Supply Material
                              </option> */}
                              <option value="ld-penalty-refund">
                                Checklist for LD-Penalty Refund
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
                        <div className="search-bar mb-4 d-flex align-items-center justify-content-end">
                          <input
                            className="searchui"
                            type="text"
                            placeholder="Search BTN No..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div
                          className="table-responsive position-relative"
                          style={{ overflowX: "auto" }}
                        >
                          <table
                            className="table table-striped table-bordered table_height"
                            style={{ whiteSpace: "nowrap" }}
                          >
                            <thead>
                              <tr className="border-0">
                                <th>Date</th>
                                <th>Assign By</th>
                                <th>Assign TO</th>
                                <th>Assign To FI</th>
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
                                  {Object.keys(filteredGroupedBG).map(
                                    (it, index) => {
                                      let items = filteredGroupedBG[it];
                                      let firstItem = items[0];
                                      items = [...items].sort(
                                        (a, b) =>
                                          Number(a.created_at) -
                                          Number(b.created_at)
                                      );

                                      return (
                                        <Fragment key={index}>
                                          <tr>
                                            <td
                                              colSpan={5}
                                              style={{
                                                whiteSpace: "pre-wrap",
                                                padding: "10px 0",
                                              }}
                                            >
                                              <b>BTN No:</b>
                                              {it}{" "}
                                              &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;{" "}
                                              <b>Invoice Number:</b>{" "}
                                              {groupedBG[it][0]
                                                ? groupedBG[it][0]?.invoice_no
                                                : "NA"}{" "}
                                              &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;
                                              <b>BTN Type:</b>{" "}
                                              {groupedBG[it][0]
                                                ? groupedBG[it][0]?.btn_type
                                                : "NA"}{" "}
                                              &nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;
                                              <b>Net Claim Amount:</b>{" "}
                                              {groupedBG[it][0]
                                                ?.net_claim_amount
                                                ? `₹ ${groupedBG[it][0]?.net_claim_amount}`
                                                : "NA"}{" "}
                                              (without GST)
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
                                                      "advance-bill"
                                                    ) {
                                                      type = "advance-bill";
                                                    } else if (
                                                      firstItem.btn_type ===
                                                      "claim-against-pbg"
                                                    ) {
                                                      type =
                                                        "claim-against-pbg";
                                                    } else if (
                                                      firstItem.btn_type ===
                                                      "bill-incorrect-deductions"
                                                    ) {
                                                      type = "any-other";
                                                    } else if (
                                                      firstItem.btn_type ===
                                                      "other-retentions"
                                                    ) {
                                                      type = "any-other";
                                                    } else if (
                                                      firstItem.btn_type ===
                                                      "claim-against-jcc"
                                                    ) {
                                                      type =
                                                        "claim-against-jcc";
                                                    } else if (
                                                      firstItem.btn_type ===
                                                      "ld-penalty-refund"
                                                    ) {
                                                      type =
                                                        "ld-penalty-refund";
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
                                                  DEPT_FI &&
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
                                                    "ld-penalty-refund",
                                                    "other-retentions",
                                                    "claim-against-jcc",
                                                    "advance-bill",
                                                  ].includes(
                                                    firstItem.btn_type
                                                  ) && (
                                                    <button
                                                      className="btn btn-sm btn-primary m-1"
                                                      onClick={() => {
                                                        let type =
                                                          firstItem.btn_type;

                                                        if (
                                                          firstItem.btn_type ===
                                                            "bill-incorrect-deductions" ||
                                                          firstItem.btn_type ===
                                                            "other-retentions"
                                                        ) {
                                                          type = "any-other";
                                                        }

                                                        if (id) {
                                                          navigate(
                                                            `/checklist/${type}/edit/${id}`,
                                                            {
                                                              state:
                                                                firstItem?.btn_num,
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
                                                  {console.log(
                                                    item?.created_at,
                                                    "OBPS"
                                                  )}
                                                </td>
                                                <td className="tdrowadd">
                                                  {item?.assign_by_name}{" "}
                                                  {item?.assign_by &&
                                                    `(${item.assign_by})`}
                                                </td>

                                                <td className="tdrowadd">
                                                  {item?.assign_to_name}{" "}
                                                  {item?.assign_to &&
                                                    `(${item.assign_to})`}
                                                </td>
                                                <td className="tdrowadd">
                                                  {item?.assign_to_fi_name}{" "}
                                                  {item?.assign_to_fi &&
                                                    `(${item.assign_to_fi})`}
                                                </td>
                                                <td
                                                  className={`${clrLegend(
                                                    item?.status
                                                  )} bold`}
                                                >
                                                  {/* Display Status with Remarks Icon */}
                                                  <div className="d-flex align-items-center">
                                                    <span>{item?.status}</span>
                                                    {item.remarks && (
                                                      <div
                                                        className="icon-container"
                                                        style={{
                                                          position: "relative",
                                                        }}
                                                      >
                                                        <BsChatRightText
                                                          className="ms-2"
                                                          size={15}
                                                          style={{
                                                            cursor: "pointer",
                                                            color: "blue",
                                                          }}
                                                          onClick={() =>
                                                            handleButtonClick(
                                                              item.remarks
                                                            )
                                                          }
                                                        />
                                                        <div className="tooltip">
                                                          Reason for Rejection
                                                        </div>{" "}
                                                        {/* Tooltip text */}
                                                      </div>
                                                    )}
                                                  </div>
                                                </td>
                                              </tr>
                                            ))}
                                        </Fragment>
                                      );
                                    }
                                  )}
                                </>
                              )}
                            </tbody>
                          </table>
                          <div
                            ref={popupRef}
                            style={{
                              display: "none",
                              position: "fixed",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              backgroundColor: "white",
                              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                              padding: "30px",
                              zIndex: 1000,
                              borderRadius: "8px",
                              width: "380px",
                              maxWidth: "90%",
                            }}
                          >
                            <h4>Reason for Rejection</h4>
                            <p ref={remarksRef}></p>
                            <button
                              className="btn btn-danger"
                              onClick={closePopup}
                              style={{
                                marginTop: "10px",
                                fontSize: "14px",
                                padding: "5px 10px",
                              }}
                            >
                              Close
                            </button>
                          </div>

                          {/* Background Overlay */}
                          <div
                            style={{
                              display: "none",
                              position: "fixed",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              zIndex: 999,
                            }}
                            onClick={closePopup}
                          />
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
                                                href={`${process.env.REACT_APP_ROOT_URL}uploads/paymentadvice/${file?.fileName}`}
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
