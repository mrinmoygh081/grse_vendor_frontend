import React, { Fragment, useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";
import Select from "react-select";
import { reConfirm } from "../utils/reConfirm";
import { clrLegend } from "../utils/clrLegend";
import { SUBMITTED, ACCEPTED } from "../constants/BGconstants";
import { groupedByRefNo } from "../utils/groupedByReq";
import { formatDate } from "../utils/getDateTimeNow";
import DynamicButton from "../Helpers/DynamicButton";
import SkeletonLoader from "../loader/SkeletonLoader";

const QAPSub = () => {
  const inputRef = useRef(null);
  const { id } = useParams();
  const { user, token, userType } = useSelector((state) => state.auth);

  const [isPopup, setIsPopup] = useState(false);
  const [isPopupAssign, setIsPopupAssign] = useState(false);
  const [allqap, setAllqap] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(allqap, "allqap");
  console.log(groupedData, "groupedData");

  const [formData, setFormData] = useState({
    action_type: "",
    QapFile: null,
    remarks: "",
    reference_no: null,
    supporting_doc: [],
  });
  console.log(formData, "formData");

  const [assign, setAssign] = useState({
    purchasing_doc_no: id,
    assigned_from: user?.vendor_code,
    assigned_to: null,
    remarksallqap: "",
  });

  const [empOption, setEmpOption] = useState({
    depts: [],
    emps: [],
  });

  const [selectedDept, setSelectedDept] = useState(null);

  const getDepts = async () => {
    const res = await apiCallBack(
      "GET",
      "po/internalDepartmentList",
      null,
      token
    );
    if (res?.status) {
      const options = res.data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setEmpOption((prev) => ({ ...prev, depts: options }));
    } else {
      toast.error(res?.message);
    }
  };

  const getEmpsByDepts = async (selectedDept) => {
    const res = await apiCallBack(
      "GET",
      `po/internalDepartmentEmpList?sub_dept_id=${selectedDept}`,
      null,
      token
    );
    if (res?.status) {
      const options = res.data.map((item) => ({
        value: item.emp_id,
        label: `${item.empname} (${item.emp_id})`,
      }));
      setEmpOption((prev) => ({ ...prev, emps: options }));
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    getDepts();
  }, []);

  useEffect(() => {
    if (allqap && allqap.length > 0) {
      const gData = groupedByRefNo(allqap);
      setGroupedData(gData);
    }
  }, [allqap]);

  useEffect(() => {
    if (selectedDept) {
      getEmpsByDepts(selectedDept);
    }
  }, [selectedDept]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const data = await apiCallBack(
        "GET",
        `po/qapList?poNo=${id}`,
        null,
        token
      );
      if (data?.status) {
        setAllqap(data?.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching drawing list:", error);
      setIsLoading(false);
    }
  };

  // const getQapSave = async () => {
  //   try {
  //     const { status, data } = await apiCallBack(
  //       "GET",
  //       `po/getQapSave?reference_no=${formData.reference_no}`,
  //       null,
  //       token
  //     );
  //     if (status && data) {
  //       console.log("shree ram", data);
  //       const { remarks } = data[0];
  //       setFormData((prev) => ({ ...prev, remarks }));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching drawing list:", error);
  //   }
  // };

  // useEffect(() => {
  //   if (formDatainput?.reference_no) {
  //     getSDBGEntry(formDatainput?.reference_no);
  //   }
  // }, [formDatainput?.reference_no]);

  const getQapSave = async () => {
    try {
      // API call to fetch saved QAP data
      const { status, data } = await apiCallBack(
        "GET",
        `po/getQapSave?reference_no=${formData.reference_no}`,
        null,
        token
      );

      if (status && data?.length > 0) {
        const { remarks, action_type, QapFile, supporting_doc } = data[0];

        setFormData((prev) => ({
          ...prev,
          remarks: remarks || "",
          action_type: action_type || "",
          QapFile: QapFile || null,
          supporting_doc: supporting_doc || [],
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          remarks: "",
          action_type: "",
          QapFile: null,
          supporting_doc: [],
        }));
      }
    } catch (error) {
      console.error("Error fetching QAP data:", error);

      // Reset form fields on error to avoid stale data
      setFormData((prev) => ({
        ...prev,
        remarks: "",
        action_type: "",
        QapFile: null,
        supporting_doc: [],
      }));
    }
  };

  // useEffect to call getQapSave when reference_no changes
  useEffect(() => {
    if (formData?.reference_no) {
      getQapSave();
    }
  }, [formData?.reference_no]);

  const deleteSavedQAP = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/deleteQapSave?reference_no=${formData.reference_no}`,
        null,
        token
      );
      if (data?.status) {
        setFormData({
          action_type: "",
          QapFile: null,
          remarks: "",
          supporting_doc: [],
        });
      }
    } catch (error) {
      console.error("Error deleting saved QAP:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id, token]);

  useEffect(() => {
    if (formData?.reference_no) {
      getQapSave();
    }
  }, [formData?.reference_no]);

  const updateQAP = async (flag) => {
    const { action_type, QapFile, remarks, supporting_doc, reference_no } =
      formData;

    if (
      flag === "SUBMITTED" &&
      (action_type.trim() === "" || remarks.trim() === "")
    ) {
      return toast.warn("Action type, remarks are mandatory fields!");
    }

    if (remarks.trim() === "") {
      return toast.warn("Remarks are mandatory fields!");
    }

    try {
      await deleteSavedQAP();
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      if (reference_no) {
        formDataToSend.append("reference_no", reference_no);
      }
      formDataToSend.append("file", QapFile);
      formDataToSend.append("remarks", remarks);
      formDataToSend.append("status", flag);
      formDataToSend.append("updated_by", userType === 1 ? "VENDOR" : "GRSE");
      formDataToSend.append("vendor_code", user.vendor_code);
      formDataToSend.append(
        "mailSendTo",
        userType === 1 ? "mrinmoygh081@gmail.com" : "aabhinit96@gmail.com"
      );
      formDataToSend.append("action_by_name", user.name);
      formDataToSend.append("action_by_id", user.email);
      formDataToSend.append("action_type", action_type);

      supporting_doc.forEach((file) => {
        formDataToSend.append("supporting_doc", file);
      });

      const response = await apiCallBack(
        "POST",
        "po/qap",
        formDataToSend,
        token
      );

      if (response?.status) {
        toast.success("QAP uploaded successfully");
        setIsPopup(false);
        setFormData({
          reference_no: null,
          action_type: "",
          QapFile: null,
          remarks: "",
          supporting_doc: [],
        });
        inputRef.current.value = null;
        document.getElementById("supporting-doc-input").value = null;
        getData();
      } else {
        toast.warn(response?.message);
      }
    } catch (error) {
      toast.error("Error uploading QAP:", error);
    }
  };

  const assignQAP = async () => {
    const { purchasing_doc_no, assigned_from, assigned_to, remarksallqap } =
      assign;

    if (
      !purchasing_doc_no ||
      !assigned_from ||
      !assigned_to ||
      !remarksallqap
    ) {
      toast.error("All fields are required");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("purchasing_doc_no", purchasing_doc_no);
    formDataToSend.append("assigned_from", assigned_from);
    formDataToSend.append("assigned_to", assigned_to);
    formDataToSend.append("remarks", remarksallqap);
    formDataToSend.append("status", "ASSIGNED");

    try {
      const res = await apiCallBack("POST", "po/qap", formDataToSend, token);
      if (res?.status) {
        toast.success(res.message);
        setIsPopupAssign(false);
        setAssign({
          purchasing_doc_no: id,
          assigned_from: user?.vendor_code,
          assigned_to: null,
          remarksallqap: "",
        });
        getData();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error assigning QAP:", error);
      toast.error("Error assigning QAP");
    }
  };

  const savedQAPHandler = async () => {
    const { remarks, action_type, QapFile, supporting_doc, reference_no } =
      formData;

    // Validate mandatory fields
    if (!id) {
      toast.error("PO Number is required!");
      return;
    }
    if (!action_type || action_type.trim() === "") {
      toast.warn("Action Type is a mandatory field!");
      return;
    }
    if (!remarks || remarks.trim() === "") {
      toast.warn("Remarks are mandatory fields!");
      return;
    }

    // Delete saved QAP before updating
    await deleteSavedQAP();

    // Prepare form data
    const formDataToSend = new FormData();
    formDataToSend.append("purchasing_doc_no", id);
    formDataToSend.append("remarks", remarks);
    formDataToSend.append("reference_no", reference_no ? reference_no : "");
    formDataToSend.append("action_type", action_type);

    // Append QAP File
    if (QapFile) {
      formDataToSend.append("file", QapFile);
    }

    // Append supporting documents (same format as updateQAP)
    supporting_doc.forEach((file) => {
      formDataToSend.append("supporting_doc", file);
    });

    try {
      // Make API call
      const res = await apiCallBack(
        "POST",
        "po/insertQapSave",
        formDataToSend,
        token
      );

      if (res?.status) {
        // Success handling
        toast.success("Remarks have been saved successfully!");

        // Reset file fields
        setFormData((prevState) => ({
          ...prevState,
          QapFile: null,
          supporting_doc: [],
          reference_no: "",
          action_type: "", // Reset action_type after submission
        }));

        // Close popup and refresh data
        setIsPopup(false);
        getData();
        getQapSave();
      } else {
        // Error handling from API response
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error saving QAP:", error);
      toast.error("Error saving QAP");
    }
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setFormData({
      ...formData,
      supporting_doc: [...formData.supporting_doc, ...filesArray],
    });
  };

  const removeFile = (index) => {
    const updatedFiles = formData.supporting_doc.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      supporting_doc: updatedFiles,
    });
  };
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"QAP Submission"} id={id} />
            <div className="content d-flex flex-column flex-column-fluid">
              <div className="post d-flex flex-column-fluid">
                <div className="container">
                  <div className="row g-5 g-xl-8">
                    <div className="col-12">
                      <div className="screen_header">
                        {userType !== 1 &&
                          user.department_id === 3 &&
                          user.internal_role_id === 1 && (
                            <>
                              <p className="m-0 p-2">
                                {allqap
                                  ? !allqap[allqap?.length - 1]?.assigned_to
                                    ? "(Not Assigned!)"
                                    : `Assigned to ${
                                        allqap[allqap?.length - 1]?.assigned_to
                                      }`
                                  : ""}
                              </p>
                              <button
                                onClick={() => setIsPopupAssign(true)}
                                className="btn btn-sm fw-bold btn-primary me-3"
                              >
                                ASSIGN
                              </button>
                            </>
                          )}
                        {userType === 1 && (
                          <button
                            onClick={() => {
                              setFormData({ ...formData, reference_no: null });
                              setIsPopup(true);
                            }}
                            className="btn btn-sm fw-bold btn-primary"
                          >
                            ACTION
                          </button>
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
                                  <th>DateTime </th>
                                  <th>Action Type </th>
                                  <th>File Info</th>
                                  <th>Supporting Documents</th>
                                  <th>Action By</th>
                                  <th className="min-w-150px">Remarks</th>
                                  <th>Status</th>
                                  {(user?.department_id === 3 ||
                                    userType === 1) && (
                                    <th className="min-w-150px">Action</th>
                                  )}
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {isLoading ? (
                                  <>
                                    <tr></tr>
                                    <tr>
                                      <td colSpan={10}>
                                        <SkeletonLoader col={7} row={6} />
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <>
                                    {Object.keys(groupedData).map(
                                      (it, index) => {
                                        let items = groupedData[it];
                                        const allApproved = items.every(
                                          (item) => item.status === "ASSIGNED"
                                        );
                                        return (
                                          <Fragment key={index}>
                                            <tr>
                                              <td colSpan={8}>
                                                <b>{it}</b>
                                                {console.log("it", it)}
                                              </td>
                                            </tr>
                                            {items &&
                                              items.map((qap, index) => (
                                                <tr key={index}>
                                                  {/* <td className="table_centerr">
                                              {qap.reference_no}
                                            </td> */}

                                                  <td className="table_center">
                                                    {/* {qap?.created_at &&
                                                new Date(
                                                  qap?.created_at
                                                ).toLocaleString()} */}
                                                    <td
                                                      style={{
                                                        border: "none",
                                                        background: "none",
                                                      }}
                                                    >
                                                      {formatDate(
                                                        qap?.created_at
                                                      )}
                                                    </td>
                                                  </td>
                                                  <td>{qap.action_type}</td>
                                                  <td>
                                                    {qap.file_name && (
                                                      <a
                                                        href={`${process.env.REACT_APP_PDF_URL}qap/${qap.file_name}`}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                      >
                                                        click Here
                                                      </a>
                                                    )}
                                                  </td>
                                                  <td>
                                                    {qap.supporting_doc &&
                                                      JSON.parse(
                                                        qap.supporting_doc
                                                      ).map((doc, idx) => (
                                                        <div key={idx}>
                                                          <a
                                                            href={`${process.env.REACT_APP_PDF_URL}qap/supporting_doc/${doc.file_name}`}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                          >
                                                            click Here
                                                          </a>
                                                        </div>
                                                      ))}
                                                  </td>
                                                  <td>{qap.created_by_id}</td>
                                                  <td>{qap.remarks}</td>
                                                  <td
                                                    className={`${clrLegend(
                                                      qap?.status
                                                    )} bold`}
                                                  >
                                                    {qap.status}
                                                  </td>
                                                  <td>
                                                    {(userType === 1 ||
                                                      user?.department_id ===
                                                        3) &&
                                                      !allApproved && (
                                                        <td className="border-0">
                                                          <button
                                                            onClick={() => {
                                                              setIsPopup(true);
                                                              setFormData({
                                                                ...formData,
                                                                reference_no:
                                                                  it,
                                                              });
                                                            }}
                                                            className="btn fw-bold btn-sm btn-primary me-3"
                                                          >
                                                            ACTION
                                                          </button>
                                                        </td>
                                                      )}
                                                  </td>

                                                  {/* { && (
                                              <td>
                                                {qap?.status === SUBMITTED && (
                                                  <button
                                                    onClick={() => {
                                                      setIsPopup(true);
                                                      
                                                    }}
                                                    className="btn fw-bold btn-primary me-3"
                                                  >
                                                    ACTION
                                                  </button>
                                                )}
                                              </td>
                                            )} */}
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

      {(userType === 1 || user.department_id === 3) && (
        <div className={isPopup ? "popup active" : "popup"}>
          <div className="card card-xxl-stretch mb-5 mb-xxl-8">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  QAP Status{" "}
                  {formData?.reference_no && `for ${formData?.reference_no}`}
                </span>
              </h3>
              <button
                className="btn fw-bold btn-danger"
                onClick={() => setIsPopup(false)}
              >
                Close
              </button>
            </div>
            {console.log("formData?.reference_no", formData?.reference_no)}
            <form>
              <div className="row">
                <div className="col-12">
                  <div className="my-3">
                    <select
                      name="action_type"
                      className="form-select"
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          action_type: e.target.value,
                        });
                      }}
                      value={formData?.action_type}
                    >
                      <option value="">Choose Action Type</option>
                      <option value="UPLOAD QAP File">UPLOAD QAP File</option>
                      <option value="Remarks">Remarks</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">File Info</label>
                    <input
                      type="file"
                      className="form-control"
                      ref={inputRef}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          QapFile: e.target.files[0],
                        })
                      }
                      accept=".pdf"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Supporting Documents</label>
                    <input
                      type="file"
                      id="supporting-doc-input"
                      className="form-control"
                      multiple
                      onChange={handleFileChange}
                      accept=".pdf"
                    />
                    <div className="mt-2">
                      {Array.isArray(formData.supporting_doc) &&
                        formData.supporting_doc.map((file, index) => (
                          <div
                            key={index}
                            className="d-flex justify-content-between align-items-center mt-1"
                          >
                            <div>{file.name}</div>
                            <button
                              className="btn btn-danger btn-sm"
                              type="button"
                              onClick={() => removeFile(index)}
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label className="form-label">
                      Remarks <span className="red">*</span>
                    </label>
                    <textarea
                      name=""
                      id=""
                      rows="4"
                      className="form-control"
                      value={formData?.remarks || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, remarks: e.target.value })
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 d-flex justify-content-between">
                    {userType !== 1 ? (
                      <>
                        <div>
                          {/* <button
                            onClick={() => savedQAPHandler()}
                            className="btn fw-bold btn-primary me-2"
                            type="button"
                          >
                            SAVE
                          </button> */}
                          <DynamicButton
                            label="SAVE"
                            onClick={() => savedQAPHandler()}
                            className="btn fw-bold btn-primary me-2"
                          />
                          {/* <button
                            onClick={() =>
                              reConfirm(
                                { file: true },
                                () => updateQAP("SUBMITTED"),
                                "Please confirm your sending info to Vendor."
                              )
                            }
                            className="btn fw-bold btn-warning me-2"
                            type="button"
                          >
                            SUBMIT
                          </button> */}
                          <DynamicButton
                            label="SUBMIT"
                            onClick={() => updateQAP("SUBMITTED")}
                            className="btn fw-bold btn-warning me-2"
                            confirmMessage="Please confirm your sending info to Vendor."
                          />
                          {/* <button
                            onClick={() =>
                              reConfirm(
                                { file: true },
                                () => updateQAP("ACCEPTED"),
                                "Please confirm your accepting the QAP. You're not approving it now."
                              )
                            }
                            className="btn fw-bold btn-success me-2"
                            type="button"
                          >
                            ACCEPT
                          </button> */}
                          <DynamicButton
                            label="ACCEPT"
                            onClick={() => updateQAP("ACCEPTED")}
                            className="btn fw-bold btn-success me-2"
                            confirmMessage="Please confirm your accepting the QAP. You're not approving it now."
                          />
                          {/* <button
                            onClick={() =>
                              reConfirm(
                                { file: true },
                                () => updateQAP("REJECTED"),
                                "Please confirm your rejecting the QAP."
                              )
                            }
                            className="btn fw-bold btn-danger"
                            type="button"
                          >
                            REJECT
                          </button> */}
                          <DynamicButton
                            label="REJECT"
                            onClick={() => updateQAP("REJECTED")}
                            className="btn fw-bold btn-danger"
                            confirmMessage="Please confirm your rejecting the QAP."
                          />
                        </div>
                        {/* <button
                          onClick={() =>
                            reConfirm(
                              { file: true },
                              () => updateQAP("APPROVED"),
                              "Please confirm your approving the QAP."
                            )
                          }
                          className="btn fw-bold btn-success"
                          type="button"
                        >
                          APPROVE
                        </button> */}
                        <DynamicButton
                          label="APPROVE"
                          onClick={() => updateQAP("APPROVED")}
                          className="btn fw-bold btn-success"
                          confirmMessage="Please confirm your approving the QAP."
                        />
                      </>
                    ) : (
                      <>
                        {/* <button
                          onClick={() => updateQAP("SUBMITTED")}
                          className="btn fw-bold btn-primary"
                          type="button"
                        >
                          SUBMIT
                        </button> */}
                        <DynamicButton
                          label="SUBMIT"
                          onClick={() => updateQAP("SUBMITTED")}
                          className="btn fw-bold btn-primary"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {userType !== 1 &&
        user.department_id === 3 &&
        user.internal_role_id === 1 && (
          <div className={isPopupAssign ? "popup active" : "popup"}>
            <div className="card card-xxl-stretch mb-5 mb-xxl-8">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">Assign</span>
                </h3>
                <button
                  className="btn fw-bold btn-danger"
                  onClick={() => setIsPopupAssign(false)}
                >
                  Close
                </button>
              </div>
              <form>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="empCategory">Employee Category</label>
                      &nbsp;&nbsp;
                      <span className="mandatorystart">*</span>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="empCategory"
                        id="empCategory"
                        options={empOption.depts}
                        onChange={(val) =>
                          setSelectedDept(val ? val.value : null)
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="empName">Employee Name</label>&nbsp;&nbsp;
                      <span className="mandatorystart">*</span>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="empName"
                        id="empName"
                        options={empOption.emps}
                        onChange={(val) =>
                          setAssign({
                            ...assign,
                            assigned_to: val ? val.value : null,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label className="form-label">Remarks</label>&nbsp;&nbsp;
                      <span className="mandatorystart">*</span>
                      <textarea
                        name=""
                        id=""
                        rows="4"
                        className="form-control"
                        value={assign?.remarksallqap}
                        onChange={(e) =>
                          setAssign({
                            ...assign,
                            remarksallqap: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3 d-flex justify-content-between">
                      {userType !== 1 &&
                        user.department_id === 3 &&
                        user.internal_role_id === 1 && (
                          <>
                            {/* <button
                              onClick={() => assignQAP()}
                              className="btn fw-bold btn-primary"
                              type="button"
                            >
                              ASSIGN
                            </button> */}
                            <DynamicButton
                              label="ASSIGN"
                              onClick={() => assignQAP()}
                              className="btn fw-bold btn-primary"
                            />
                          </>
                        )}
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

export default QAPSub;
