import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack, postAPI } from "../utils/fetchAPIs";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import { convertToEpoch } from "../utils/getDateTimeNow";
import Select from "react-select";
import { reConfirm } from "../utils/reConfirm";
import { inputOnWheelPrevent } from "../utils/inputOnWheelPrevent";

const SDBGSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [isEntryPopup, setIsEntryPopup] = useState(false);
  const [isAssignPopup, setIsAssignPopup] = useState(false);
  const [isCheckEntryPopup, setIsCheckEntryPopup] = useState(false);
  const [allsdbg, setAllsdbg] = useState([]);
  const [sdbgEntry, setSdbgEntry] = useState([]);
  const [formData, setFormData] = useState({
    bankName: "",
    transactionId: "",
    sdbgFile: null,
    remarks: "",
  });
  const [formDatainput, setFormDatainput] = useState({
    purchasing_doc_no: "",
    bank_name: "",
    branch_name: "",
    bank_addr1: "",
    bank_addr2: "",
    bank_addr3: "",
    bank_city: "",
    bank_pin_code: "",
    bg_no: "",
    bg_date: "",
    bg_ammount: "",
    department: "",
    po_date: "",
    yard_no: "",
    validity_date: "",
    claim_priod: "",
    check_list_reference: "",
    check_list_date: new Date(),
    bg_type: "",
    vendor_name: "",
    vendor_address1: "",
    vendor_address2: "",
    vendor_address3: "",
    vendor_city: "",
    vendor_pin_code: "",
    confirmation: "",
    extension_date1: "",
    extension_date2: "",
    extension_date3: "",
    extension_date4: "",
    extension_date5: "",
    extension_date6: "",
    release_date: "",
    demand_notice_date: "",
    entension_letter_date: "",
    status: "",
    created_at: "",
    created_by: "",
    remarks: "",
    assigned_to: "",
  });
  const { id } = useParams();
  const { user, token, userType } = useSelector((state) => state.auth);
  const { isDO } = useSelector((state) => state.selectedPO);
  const [empOption, setEmpOption] = useState([]);
  const [assign, setAssign] = useState({
    purchasing_doc_no: id,
    assigned_from: user?.vendor_code,
    assigned_to: null,
    remarks: "Assigned to Finance Employee",
    status: "ASSIGNED",
  });

  const getSDBG = async () => {
    const data = await apiCallBack(
      "GET",
      `po/sdbg/getSDBGData?poNo=${id}`,
      null,
      token
    );
    if (data?.status) {
      setAllsdbg(data?.data);
    }
  };

  const getSDBGEntry = async () => {
    const data = await apiCallBack(
      "GET",
      `po/sdbg/getSdbgEntry?poNo=${id}`,
      null,
      token
    );
    if (data?.status) {
      setSdbgEntry(data?.data);
    }
  };

  const getEmpList = async () => {
    const res = await apiCallBack("GET", `po/sdbg/assigneeList`, null, token);
    if (res?.status) {
      let options =
        res?.data &&
        res.data.map((item, index) => {
          return {
            value: item.emp_id,
            label: `${item.CNAME} (${item.emp_id})`,
          };
        });
      setEmpOption(options);
    }
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    setFormDatainput((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getSDBG();
    getSDBGEntry();
    getEmpList();
  }, []);

  useEffect(() => {
    if (id) {
      setFormDatainput({ ...formDatainput, purchasing_doc_no: id });
    } else {
      toast.warn("You must provide PO Number!");
    }
  }, [id]);

  const updateSDBG = async (flag) => {
    try {
      const form = new FormData();
      form.append("purchasing_doc_no", id);
      form.append("file", formData.sdbgFile);
      form.append("remarks", formData.remarks);
      form.append("status", flag);

      const response = await apiCallBack(
        "POST",
        `po/sdbg/submitSDBG`,
        form,
        token
      );
      if (response.status) {
        setIsPopup(false);
        toast.success("Form submitted successfully");
        setFormData({
          sdbgFile: null,
          remarks: "",
          bankName: "",
          transactionId: "",
        });
        getSDBG();
      } else {
        toast.error("Please try again!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Form submission failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const uploadSDBGEntry = async () => {
    const {
      purchasing_doc_no,
      bank_name,
      branch_name,
      bank_addr1,
      bank_city,
      bank_pin_code,
      bg_no,
      bg_date,
      bg_ammount,
      department,
      po_date,
      yard_no,
      validity_date,
      claim_priod,
      check_list_reference,
      check_list_date,
      bg_type,
      vendor_name,
      vendor_address1,
      vendor_city,
      vendor_pin_code,
      confirmation,
      extension_date1,
      extension_date2,
      extension_date3,
      extension_date4,
      extension_date5,
      extension_date6,
      release_date,
      demand_notice_date,
      entension_letter_date,
    } = formDatainput;

    if (
      (purchasing_doc_no === "",
      bank_name === "",
      branch_name === "",
      bank_addr1 === "",
      bank_city === "",
      bank_pin_code === "",
      bg_no === "",
      bg_date === "",
      bg_ammount === "",
      department === "",
      po_date === "",
      yard_no === "",
      validity_date === "",
      claim_priod === "",
      check_list_reference === "",
      check_list_date === "",
      bg_type === "",
      vendor_name === "",
      vendor_address1 === "",
      vendor_city === "",
      vendor_pin_code === "",
      confirmation === "")
    ) {
      toast.warn("Please enter the required fields!");
      return;
    }

    let form = {
      ...formDatainput,
      bg_date: convertToEpoch(bg_date),
      entension_letter_date: convertToEpoch(entension_letter_date),
      demand_notice_date: convertToEpoch(demand_notice_date),
      release_date: convertToEpoch(release_date),
      check_list_date: convertToEpoch(check_list_date),
      validity_date: convertToEpoch(validity_date),
      po_date: convertToEpoch(po_date),
      extension_date1: convertToEpoch(extension_date1),
      extension_date2: convertToEpoch(extension_date2),
      extension_date3: convertToEpoch(extension_date3),
      extension_date4: convertToEpoch(extension_date4),
      extension_date5: convertToEpoch(extension_date5),
      extension_date6: convertToEpoch(extension_date6),
    };
    const d = await postAPI("/po/sdbg/sdbgSubmitByDealingOfficer", form, token);
    if (d?.status) {
      toast.success(d?.message);
      setIsPopup(false);
      setIsEntryPopup(false);
      setFormDatainput({
        purchasing_doc_no: "",
        bank_name: "",
        branch_name: "",
        bank_addr1: "",
        bank_addr2: "",
        bank_addr3: "",
        bank_city: "",
        bank_pin_code: "",
        bg_no: "",
        bg_date: "",
        bg_ammount: "",
        department: "",
        po_date: "",
        yard_no: "",
        validity_date: "",
        claim_priod: "",
        check_list_reference: "",
        check_list_date: "",
        bg_type: "",
        vendor_name: "",
        vendor_address1: "",
        vendor_address2: "",
        vendor_address3: "",
        vendor_city: "",
        vendor_pin_code: "",
        confirmation: "",
        extension_date1: "",
        extension_date2: "",
        extension_date3: "",
        extension_date4: "",
        extension_date5: "",
        extension_date6: "",
        release_date: "",
        demand_notice_date: "",
        entension_letter_date: "",
        status: "",
        created_at: "",
        created_by: "",
        remarks: "",
        assigned_to: "",
      });
      getSDBG();
      getSDBGEntry();
    } else {
      toast.error(d?.message);
    }
  };

  const assignSDBGByFinance = async () => {
    if (assign?.assigned_to) {
      const res = await apiCallBack(
        "POST",
        `po/sdbg/sdbgUpdateByFinance`,
        assign,
        token
      );
      if (res?.status) {
        setIsAssignPopup(false);
        toast.success(`Successfully assigned to ${assign?.assigned_to}`);
        getSDBG();
      }
    } else {
      toast.warn("Please choose an employee to Assign!");
    }
  };

  const financeEntry = async (flag) => {
    let remarks;

    if (flag === "ACCEPTED") {
      remarks = "Accepted by Finance Officer";
    } else if (flag === "ReturnToDO") {
      remarks = "SDBG Entry returned to dealing officer for correction";
    } else if (flag === "REJECTED") {
      remarks = "Rejected by Finance Officer";
    }

    let payload = {
      purchasing_doc_no: id,
      status: flag,
      remarks,
    };

    const data = await apiCallBack(
      "POST",
      `po/sdbg/sdbgUpdateByFinance`,
      payload,
      token
    );

    if (data?.status) {
      setIsCheckEntryPopup(false);
      getSDBG();
      if (flag === "ACCEPTED") {
        toast.success(remarks);
      } else if (flag === "ReturnToDO") {
        toast.warn(remarks);
      } else if (flag === "REJECTED") {
        toast.error(remarks);
      } else {
        toast.warn("Something went wrong!");
      }
    }
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"SDBG Submission"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="screen_header">
                        {/* Not Vendor */}
                        {user?.user_type !== 1 && (
                          <>
                            {/* Finance Head (deptid = 15 and internal_role_Id 1) */}
                            {user?.department_id === 15 &&
                              user?.internal_role_id === 1 && (
                                <>
                                  <p className="m-0 p-2">
                                    {!allsdbg[allsdbg?.length - 1]?.assigned_to
                                      ? "(Not Assigned!)"
                                      : `Assigned to ${
                                          allsdbg[allsdbg?.length - 1]
                                            ?.assigned_to
                                        }`}
                                  </p>
                                  <button
                                    onClick={() => setIsAssignPopup(true)}
                                    className="btn fw-bold btn-primary me-3"
                                  >
                                    ASSIGN
                                  </button>
                                </>
                              )}
                            {/* For DO */}
                            {isDO && (
                              <>
                                <button
                                  onClick={() => setIsEntryPopup(true)}
                                  className="btn fw-bold btn-primary me-3"
                                >
                                  SDBG Entry
                                </button>
                              </>
                            )}
                            {/* for finance officer  */}
                            {user?.department_id === 15 && (
                              <>
                                <button
                                  onClick={() => setIsCheckEntryPopup(true)}
                                  className="btn fw-bold btn-primary me-3"
                                >
                                  Check SDBG Entry
                                </button>
                              </>
                            )}
                          </>
                        )}
                        {/* Vendor  */}
                        {user?.user_type === 1 && (
                          <>
                            <button
                              onClick={() => setIsPopup(true)}
                              className="btn fw-bold btn-primary"
                            >
                              ACTION
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="card-body p-3">
                        <div className="tab-content">
                          <div className="table-responsive">
                            <table className="table table-striped table-bordered table_height">
                              <thead>
                                <tr className="border-0">
                                  <th>Ref No </th>
                                  <th>DateTime </th>
                                  <th>SDBG File</th>
                                  <th>Updated By</th>
                                  <th className="min-w-150px">Remarks</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {allsdbg &&
                                  allsdbg.length > 0 &&
                                  allsdbg.map((item, index) => (
                                    <tr key={index}>
                                      <td>{123456789}</td>
                                      <td className="table_center">
                                        {item?.created_at &&
                                          new Date(
                                            item?.created_at
                                          ).toLocaleString()}
                                      </td>
                                      {/* <td>{item.bank_name}</td>
                                      <td>{item.transaction_id}</td> */}
                                      <td>
                                        <a
                                          href={`${process.env.REACT_APP_PDF_URL}/submitSDBG/${item.file_name}`}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          Check File
                                        </a>
                                      </td>
                                      <td>
                                        {item.created_by_name} (
                                        {item.created_by_id})
                                      </td>
                                      <td>{item.remarks}</td>
                                      <td>{item.status}</td>
                                    </tr>
                                  ))}
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

      {/* vendor */}
      {user?.user_type === 1 && (
        <div className={isPopup ? "popup active" : "popup"}>
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  UPLOAD SDBG
                </span>
              </h3>
              <button
                className="btn fw-bold btn-danger"
                onClick={() => setIsPopup(false)}
              >
                Close
              </button>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">SDBG File</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, sdbgFile: e.target.files[0] })
                    }
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3">
                  <label className="form-label">Remarks</label>
                  <textarea
                    name=""
                    id=""
                    rows="4"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, remarks: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3 d-flex justify-content-between">
                  <button
                    onClick={() => updateSDBG("SUBMITED")}
                    className="btn fw-bold btn-primary"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                  {userType !== 1 && (
                    <button
                      onClick={() => updateSDBG("Approved")}
                      className="btn fw-bold btn-primary"
                      type="submit"
                    >
                      Approved
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* for DO */}
      {isDO && (
        <div className={isEntryPopup ? "popup active" : "popup"}>
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">SDBG Entry</span>
              </h3>
              <button
                className="btn fw-bold btn-danger"
                onClick={() => setIsEntryPopup(false)}
              >
                Close
              </button>
            </div>

            <div className="row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers Name</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="bank_name"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers Branch</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="branch_name"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers Address1</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="bank_addr1"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers Address2</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="bank_addr2"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers Address3</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="bank_addr3"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers City</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="bank_city"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bank Pincode</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="bank_pin_code"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bank Guarantee No</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="bg_no"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">BG Date</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <DatePicker
                    selected={formDatainput?.bg_date}
                    onChange={(date) =>
                      setFormDatainput({ ...formDatainput, bg_date: date })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">BG Amount</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="number"
                    className="form-control"
                    name="bg_ammount"
                    onChange={handleInputChange2}
                    onWheel={(e) => inputOnWheelPrevent(e)}
                  />
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Department</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="department"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">PO Date</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <DatePicker
                    selected={formDatainput?.po_date}
                    onChange={(date) =>
                      setFormDatainput({ ...formDatainput, po_date: date })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">PO No</label>
                  <input
                    type="text"
                    className="form-control"
                    name="department"
                    value={id}
                    disabled
                    // onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Yard No</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="yard_no"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Validity Date</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <DatePicker
                    selected={formDatainput?.validity_date}
                    onChange={(date) =>
                      setFormDatainput({
                        ...formDatainput,
                        validity_date: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Claim Period</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <DatePicker
                    selected={formDatainput?.claim_priod}
                    onChange={(date) =>
                      setFormDatainput({
                        ...formDatainput,
                        claim_priod: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Checklist Reference</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="check_list_reference"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Checklist Date</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <DatePicker
                    selected={formDatainput?.check_list_date}
                    // onChange={(date) =>
                    //   setFormDatainput({
                    //     ...formDatainput,
                    //     check_list_date: date,
                    //   })
                    // }
                    disabled
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">BG Type</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <select className="form-select" name="" id="">
                    <option value="sdbg">SDBG</option>
                    <option value="pbg">PBG</option>
                  </select>
                  {/* <input
                    type="text"
                    className="form-control"
                    name="bg_type"
                    onChange={handleInputChange2}
                  /> */}
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor Name</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="vendor_name"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor Address1</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="vendor_address1"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor Address2</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="vendor_address2"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor Address3</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="vendor_address3"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor City</label>&nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="vendor_city"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor Pincode</label>
                  &nbsp;&nbsp;
                  <span className="mandatorystart">*</span>
                  <input
                    type="text"
                    className="form-control"
                    name="vendor_pin_code"
                    onChange={handleInputChange2}
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date1</label>
                  <DatePicker
                    selected={formDatainput?.extension_date1}
                    onChange={(date) =>
                      setFormDatainput({
                        ...formDatainput,
                        extension_date1: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date2</label>
                  <DatePicker
                    selected={formDatainput?.extension_date2}
                    onChange={(date) =>
                      setFormDatainput({
                        ...formDatainput,
                        extension_date2: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date3</label>
                  <DatePicker
                    selected={formDatainput?.extension_date3}
                    onChange={(date) =>
                      setFormDatainput({
                        ...formDatainput,
                        extension_date3: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date4</label>
                  <DatePicker
                    selected={formDatainput?.extension_date4}
                    onChange={(date) =>
                      setFormDatainput({
                        ...formDatainput,
                        extension_date4: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date5</label>
                  <DatePicker
                    selected={formDatainput?.extension_date5}
                    onChange={(date) =>
                      setFormDatainput({
                        ...formDatainput,
                        extension_date5: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date6</label>
                  <DatePicker
                    selected={formDatainput?.extension_date6}
                    onChange={(date) =>
                      setFormDatainput({
                        ...formDatainput,
                        extension_date6: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Release Date</label>
                  <DatePicker
                    selected={formDatainput?.release_date}
                    onChange={(date) =>
                      setFormDatainput({ ...formDatainput, release_date: date })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Demand Notice Date</label>
                  <DatePicker
                    selected={formDatainput?.demand_notice_date}
                    onChange={(date) =>
                      setFormDatainput({
                        ...formDatainput,
                        demand_notice_date: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Entension Letter Date</label>
                  <DatePicker
                    selected={formDatainput?.entension_letter_date}
                    onChange={(date) =>
                      setFormDatainput({
                        ...formDatainput,
                        entension_letter_date: date,
                      })
                    }
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3 d-flex justify-content-between">
                  <button
                    onClick={() => uploadSDBGEntry("NotApproved")}
                    className="btn fw-bold btn-primary"
                    type="submit"
                  >
                    Forward To Finance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* for finance officer  */}
      {user?.department_id === 15 && (
        <div className={isCheckEntryPopup ? "popup active" : "popup"}>
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Check SDBG Entry
                </span>
              </h3>
              <button
                className="btn fw-bold btn-danger"
                onClick={() => setIsCheckEntryPopup(false)}
              >
                Close
              </button>
            </div>

            <div className="row">
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers Name</label>
                  <p>{sdbgEntry?.bank_name}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers Branch</label>
                  <p>{sdbgEntry?.branch_name}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers Address1</label>
                  <p>{sdbgEntry?.bank_addr1}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers Address2</label>
                  <p>{sdbgEntry?.bank_addr2}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers Address3</label>
                  <p>{sdbgEntry?.bank_addr3}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bankers City</label>
                  <p>{sdbgEntry?.bank_city}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bank Pincode</label>
                  <p>{sdbgEntry?.bank_pin_code}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Bank Guarantee No</label>
                  <p>{sdbgEntry?.bg_no}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">BG Date</label>
                  <p>{sdbgEntry?.bg_date}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">BG Amount</label>
                  <p>{sdbgEntry?.bg_ammount}</p>
                </div>
              </div>

              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Department</label>
                  <p>{sdbgEntry?.department}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">PO Date</label>
                  <p>{sdbgEntry?.po_date}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Yard No</label>
                  <p>{sdbgEntry?.yard_no}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Validity Date</label>
                  <p>{sdbgEntry?.validity_date}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Claim Period</label>
                  <p>{sdbgEntry?.claim_priod}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Checklist Reference</label>
                  <p>{sdbgEntry?.check_list_reference}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Checklist Date</label>
                  <p>{sdbgEntry?.check_list_date}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">BG Type</label>
                  <p>{sdbgEntry?.bg_type}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor Name</label>
                  <p>{sdbgEntry?.vendor_name}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor Address1</label>
                  <p>{sdbgEntry?.vendor_address1}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor Address2</label>
                  <p>{sdbgEntry?.vendor_address2}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor Address3</label>
                  <p>{sdbgEntry?.vendor_address3}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor City</label>
                  <p>{sdbgEntry?.vendor_city}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Vendor Pincode</label>
                  <p>{sdbgEntry?.vendor_pin_code}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date1</label>
                  <p>{sdbgEntry?.extension_date1}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date2</label>
                  <p>{sdbgEntry?.extension_date2}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date3</label>
                  <p>{sdbgEntry?.extension_date3}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date4</label>
                  <p>{sdbgEntry?.extension_date4}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date5</label>
                  <p>{sdbgEntry?.extension_date5}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Extension Date6</label>
                  <p>{sdbgEntry?.extension_date6}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Release Date</label>
                  <p>{sdbgEntry?.release_date}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Demand Notice Date</label>
                  <p>{sdbgEntry?.demand_notice_date}</p>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="mb-3">
                  <label className="form-label">Entension Letter Date</label>
                  <p>{sdbgEntry?.entension_letter_date}</p>
                </div>
              </div>
              <div className="col-12">
                <div className="mb-3 d-flex justify-content-between">
                  <button
                    onClick={() =>
                      reConfirm(
                        { file: true },
                        () => financeEntry("ACCEPTED"),
                        "You're going to Accept the SDBG Entry. Please confirm!"
                      )
                    }
                    className="btn fw-bold btn-success me-3"
                    type="button"
                  >
                    ACCEPT
                  </button>
                  <button
                    onClick={() =>
                      reConfirm(
                        { file: true },
                        () => financeEntry("ReturnToDO"),
                        "You're going to return the SDBG Entry to Dealing Officer to recheck. Please confirm!"
                      )
                    }
                    className="btn fw-bold btn-primary"
                    type="button"
                  >
                    Return to Dealing Officer
                  </button>
                  <button
                    onClick={() =>
                      reConfirm(
                        { file: true },
                        () => financeEntry("REJECTED"),
                        "You're going to Reject the SDBG Entry. Please confirm!"
                      )
                    }
                    className="btn fw-bold btn-danger"
                    type="button"
                  >
                    REJECT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* for finance officer and Assigner  */}
      {userType !== 1 &&
        user.department_id === 15 &&
        user.internal_role_id === 1 && (
          <div className={isAssignPopup ? "popup active" : "popup"}>
            <div className="card card-xxl-stretch mb-5 mb-xxl-8">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">ASSIGN</span>
                </h3>
                <button
                  className="btn fw-bold btn-danger"
                  onClick={() => setIsAssignPopup(false)}
                >
                  Close
                </button>
              </div>
              <form>
                <div className="row" style={{ overflow: "unset" }}>
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="empName">Employee Name</label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="empName"
                        id="empName"
                        options={empOption}
                        onChange={(val) =>
                          setAssign({ ...assign, assigned_to: val.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="mb-3 d-flex justify-content-between">
                      <button
                        onClick={() => assignSDBGByFinance()}
                        className="btn fw-bold btn-primary"
                        type="button"
                      >
                        ASSIGN
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
    </>
  );
};

export default SDBGSub;
