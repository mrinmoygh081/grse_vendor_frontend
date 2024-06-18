import React, { useEffect, useState } from "react";
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

const Checklist = () => {
  const { id } = useParams();
  const { isDO } = useSelector((state) => state.selectedPO);
  const { user, token } = useSelector((state) => state.auth);
  const [data, setData] = useState(null);
  const { pathname } = useLocation();
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [selectedChecklistItem, setSelectedChecklistItem] = useState(null);
  const [emp, setEmp] = useState([]);

  const navigate = useNavigate();
  const [slug, setSlug] = useState("");
  const [paymentdata, setPaymentdata] = useState("");

  const NewBillHandler = () => {
    if (slug !== "") {
      let path = `/checklist/${slug}/${id}`;
      navigate(path);
    } else {
      toast.warn("Please choose what type of checklist you want to add.");
    }
  };

  const getEmp = async () => {
    try {
      const data = await apiCallBack("GET", `po/wdc/grseEmpList`, null, token);
      if (data?.status) {
        const options = data.data.map((item) => ({
          value: item.code,
          label: `${item.name} (${item.code})`,
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

  const getData = async () => {
    try {
      const data = await apiCallBack("GET", `po/btn?id=${id}`, null, token);
      if (data?.status) {
        setData(data?.data);
      }
    } catch (error) {
      console.error("Error fetching WDC list:", error);
    }
  };

  const createpayment = async () => {
    try {
      const payload = {
        poNo: id,
      };
      const response = await apiCallBack(
        "POST",
        "po/download/paymentAdvice",
        payload,
        token
      );
      if (response?.status) {
        setPaymentdata(response.data); // Assuming response.data contains the payment data
      } else {
        console.error("Error creating invoice number:", response.message);
      }
    } catch (error) {
      console.error("Error creating invoice number:", error);
    }
  };

  const handleAssignClick = (item) => {
    setSelectedChecklistItem(item);
    setShowAssignPopup(true);
  };

  const handleAssignSubmit = () => {
    setShowAssignPopup(false);
  };

  useEffect(() => {
    getData();
    createpayment();
  }, [id, token, pathname]);

  useEffect(() => {
    console.log("User:", user);
    console.log("Department ID:", user?.department_id);
    console.log("Internal Role ID:", user?.internal_role_id);
  }, [user]);

  return (
    <>
      <div className="wrapper d-flex flex-column flex-row-fluid">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="d-flex flex-column flex-row-fluid">
            <Header title={"Invoice And Payment Process"} id={id} />
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
                                onChange={(e) => {
                                  setSlug(e.target.value);
                                }}
                              >
                                <option value="">Select</option>
                                <option value="hybrid-bill-material">
                                  Checklist for Vendor Bill Material (Hybrid)
                                </option>
                                <option value="hybrid-bill-service">
                                  Checklist for Vendor Bill Service (Hybrid)
                                </option>
                                <option value="contract-bill-service">
                                  Checklist for Vendor Bill Service (Contract)
                                </option>
                                <option value="bill-incorrect-deductions">
                                  Checklist for Vendor Bill Incorrect Deductions
                                </option>
                                <option value="bill-advance-payment">
                                  Checklist for Vendor Bill Advance Payment
                                </option>
                                <option value="claim-against-pbg">
                                  Checklist for Vendor Claim Against PBG
                                </option>
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
                          <div className="table-responsive">
                            <table className="table table-striped table-bordered table_height">
                              <thead>
                                <tr className="border-0">
                                  <th>Date</th>
                                  <th>BTN Num </th>
                                  <th>Net Claim Amount</th>
                                  <th>Net Payable Amount</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {checkTypeArr(data) &&
                                  data.map((item, i) => (
                                    <tr key={i}>
                                      <td>{item?.purchasing_doc_no}</td>
                                      <td>{item?.btn_num}</td>
                                      <td>{item?.net_claim_amount}</td>
                                      <td>{item?.net_payable_amount}</td>
                                      <td
                                        className={`${clrLegend(
                                          item?.status
                                        )} bold`}
                                      >
                                        {item?.status}
                                      </td>
                                      <td>
                                        <div className="view-button-container">
                                          <button
                                            className="btn btn-sm btn-secondary m-1"
                                            onClick={() => {
                                              let type = "";

                                              if (
                                                item.btn_type ===
                                                "hybrid-bill-material"
                                              ) {
                                                type = "hybrid-bill-material";
                                              } else if (
                                                item.btn_type ===
                                                "hybrid-bill-service"
                                              ) {
                                                type = "hybrid-bill-service";
                                              } else if (
                                                item.btn_type ===
                                                "advance-bill-hybrid"
                                              ) {
                                                type = "advance-bill-hybrid";
                                              }

                                              navigate(
                                                `/checklist/${type}/view/${id}`,
                                                { state: `${item?.btn_num}` }
                                              );
                                            }}
                                          >
                                            VIEW
                                          </button>
                                          {user?.department_id === 15 &&
                                            user?.internal_role_id === 1 && (
                                              <button
                                                className="btn btn-sm btn-success m-1"
                                                onClick={() =>
                                                  handleAssignClick(item)
                                                }
                                              >
                                                Assign
                                              </button>
                                            )}
                                          {isDO && (
                                            <>
                                              <button
                                                className="btn btn-sm btn-primary m-1"
                                                onClick={() => {
                                                  let type = "";

                                                  if (
                                                    item.btn_type ===
                                                    "hybrid-bill-material"
                                                  ) {
                                                    type =
                                                      "hybrid-bill-material";
                                                  } else if (
                                                    item.btn_type ===
                                                    "hybrid-bill-service"
                                                  ) {
                                                    type =
                                                      "hybrid-bill-service";
                                                  } else if (
                                                    item.btn_type ===
                                                    "advance-bill-hybrid"
                                                  ) {
                                                    type =
                                                      "advance-bill-hybrid";
                                                  }

                                                  navigate(
                                                    `/checklist/${type}/edit/${id}`,
                                                    {
                                                      state: `${item?.btn_num}`,
                                                    }
                                                  );
                                                }}
                                              >
                                                Action
                                              </button>
                                            </>
                                          )}
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                            {showAssignPopup && (
                              <div className="modal d-block" tabIndex="-1">
                                <div className="modal-dialog">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5 className="modal-title">
                                        Assign Checklist Item
                                      </h5>
                                      <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() =>
                                          setShowAssignPopup(false)
                                        }
                                      >
                                        <span>Close</span>
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      <p>Select an assignee:</p>
                                      <Select
                                        options={emp}
                                        onChange={(selectedOption) => {
                                          // Handle selected option
                                          console.log(selectedOption);
                                        }}
                                        placeholder="Select an assignee"
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                      />
                                    </div>
                                    <div className="modal-footer">
                                      <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={handleAssignSubmit}
                                      >
                                        Assign
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() =>
                                          setShowAssignPopup(false)
                                        }
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </div>
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
                                  {checkTypeArr(paymentdata?.resustFiles) &&
                                    paymentdata?.resustFiles.map(
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
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Checklist;
