import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import moment from "moment";
import { toast } from "react-toastify";
import Select from "react-select";

const QAPSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [isPopupAssign, setIsPopupAssign] = useState(false);
  const [allqap, setAllqap] = useState([]);
  const { id } = useParams();
  const { user, token, userType } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    QapFile: null,
    remarks: "",
  });

  const [selectedFileTypeId, setSelectedFileTypeId] = useState("");
  const [selectedFileTypeName, setSelectedFileTypeName] = useState("");
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
      let options = res.data.map((item, index) => {
        return { value: item.id, label: item.name };
      });
      setEmpOption({ ...empOption, depts: options });
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
      let options = res.data.map((item, index) => {
        return {
          value: item.emp_id,
          label: `${item.empName} (${item.emp_id})`,
        };
      });
      console.log(options);
      setEmpOption({ ...empOption, emps: options });
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    getDepts();
  }, []);

  useEffect(() => {
    if (selectedDept) {
      getEmpsByDepts(selectedDept);
    }
  }, [selectedDept]);

  const optionss = [
    {
      file_type_name: "Upload QAP",
      file_type_id: 1,
    },
    {
      file_type_name: "Remarks",
      file_type_id: 2,
    },
    {
      file_type_name: "Others",
      file_type_id: 3,
    },
  ];

  const getData = async () => {
    try {
      const data = await apiCallBack(
        "GET",
        `po/qapList?poNo=${id}`,
        null,
        token
      );
      if (data?.status) {
        setAllqap(data?.data);
      }
    } catch (error) {
      console.error("Error fetching drawing list:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [id, token]);

  const updateQAP = async (flag) => {
    try {
      let uType;
      let mailSendTo;
      if (userType === 1) {
        uType = "VENDOR";
        mailSendTo = "mrinmoygh081@gmail.com";
      } else {
        uType = "GRSE";
        mailSendTo = "aabhinit96@gmail.com";
      }
      const formDataToSend = new FormData();
      formDataToSend.append("purchasing_doc_no", id);
      formDataToSend.append("file", formData.QapFile);
      formDataToSend.append("remarks", formData.remarks);
      formDataToSend.append("status", flag);
      formDataToSend.append("updated_by", uType);
      formDataToSend.append("vendor_code", user.vendor_code);
      formDataToSend.append("mailSendTo", mailSendTo);
      formDataToSend.append("action_by_name", user.name);
      formDataToSend.append("action_by_id", user.email);
      formDataToSend.append("file_type_id", selectedFileTypeId);
      formDataToSend.append("file_type_name", selectedFileTypeName);

      const response = await apiCallBack(
        "POST",
        "po/qap",
        formDataToSend,
        token
      );

      if (response?.status) {
        // Handle success, e.g., show a success message or update the QAP list
        toast.success("QAP uploaded successfully");
        setIsPopup(false);
        setFormData({
          QapFile: null,
          remarks: "",
        });
        getData();
      } else {
        // Handle failure, e.g., show an error message
        toast.error("Failed to upload QAP");
      }
    } catch (error) {
      toast.error("Error uploading QAP:", error);
    }
  };

  const assignQAP = async () => {
    const { purchasing_doc_no, assigned_from, assigned_to, remarksallqap } =
      assign;

    // Validate all required fields
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
      console.log(res);
      if (res?.status) {
        toast.success(res.message);
        setIsPopupAssign(false);
        setAssign({
          purchasing_doc_no: id,
          assigned_from: user?.vendor_code,
          assigned_to: null,
          remarksallqap: "",
        });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Error assigning QAP:", error);
      toast.error("Error assigning QAP");
    }
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
                            <button
                              onClick={() => setIsPopupAssign(true)}
                              className="btn fw-bold btn-primary me-2"
                            >
                              Assign
                            </button>
                          )}
                        <button
                          onClick={() => setIsPopup(true)}
                          className="btn fw-bold btn-primary"
                        >
                          ACTION
                        </button>
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
                                  <th>QAP File</th>
                                  <th>Updated By</th>
                                  <th className="min-w-150px">Remarks</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {allqap &&
                                  allqap.map((qap, index) => (
                                    <tr key={index}>
                                      <td className="table_center">
                                        {moment(qap.created_at)
                                          .utc()
                                          .format("YYYY-MM-DD")}
                                      </td>
                                      <td className="">
                                        <a
                                          href={`${process.env.REACT_APP_BACKEND_API}po/download?id=${qap.drawing_id}&type=qap`}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {qap.file_name}
                                        </a>
                                      </td>
                                      <td className="">
                                        {qap.created_by_name}
                                      </td>
                                      <td className="">{qap.remarks}</td>
                                      <td className="">
                                        {qap.status === "APPROVED"
                                          ? "APPROVED"
                                          : qap.status === "REJECTED"
                                          ? "REJECTED"
                                          : qap.status === "ACCEPTED"
                                          ? "ACCEPTED"
                                          : "PENDING"}
                                      </td>
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
      <div className={isPopup ? "popup active" : "popup"}>
        <div className="card card-xxl-stretch mb-5 mb-xxl-8">
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">UPLOAD QAP</span>
            </h3>
            <button
              className="btn fw-bold btn-danger"
              onClick={() => setIsPopup(false)}
            >
              Close
            </button>
          </div>
          <form>
            <div className="row">
              <div className="col-12">
                <div className="mb-3">
                  <select
                    name=""
                    id=""
                    className="form-select"
                    onChange={(e) => {
                      setSelectedFileTypeId(e.target.value);
                      setSelectedFileTypeName(
                        e.target.options[e.target.selectedIndex].text
                      );
                    }}
                  >
                    <option value="">Choose File Type</option>
                    {optionss.map((option) => (
                      <option
                        key={option.file_type_id}
                        value={option.file_type_id}
                      >
                        {option.file_type_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        QapFile: e.target.files[0],
                      })
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
                  {userType !== 1 ? (
                    <>
                      <div>
                        <button
                          onClick={() => updateQAP("SAVED")}
                          className="btn fw-bold btn-primary me-2"
                          type="button"
                        >
                          SAVE
                        </button>
                        <button
                          onClick={() => updateQAP("UPDATED")}
                          className="btn fw-bold btn-warning me-2"
                          type="button"
                        >
                          SUBMIT
                        </button>
                        <button
                          onClick={() => updateQAP("ACCEPTED")}
                          className="btn fw-bold btn-success me-2"
                          type="button"
                        >
                          ACCEPT
                        </button>
                        <button
                          onClick={() => updateQAP("REJECTED")}
                          className="btn fw-bold btn-danger"
                          type="button"
                        >
                          REJECT
                        </button>
                      </div>
                      <button
                        onClick={() => updateQAP("APPROVED")}
                        className="btn fw-bold btn-success"
                        type="button"
                      >
                        APPROVE
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => updateQAP("PENDING")}
                        className="btn fw-bold btn-primary"
                        type="button"
                      >
                        UPDATE
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
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
            <div className="row" style={{ overflow: "unset" }}>
              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="empCategory">Employee Category</label>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="empCategory"
                    id="empCategory"
                    options={empOption.depts}
                    onChange={(val) => setSelectedDept(val.value)}
                  />
                </div>
              </div>
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
                    options={empOption.emps}
                    onChange={(val) =>
                      setAssign({ ...assign, assigned_to: val.value })
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
                    value={assign?.remarksallqap}
                    onChange={(e) =>
                      setAssign({ ...assign, remarksallqap: e.target.value })
                    }
                  ></textarea>
                </div>
              </div>
              <div className="col-12">
                {console.log(user)}
                {console.log(user.internal_role_id)}
                <div className="mb-3 d-flex justify-content-between">
                  {userType !== 1 &&
                  user.department_id === 3 &&
                  user.internal_role_id === 1 ? (
                    <>
                      <button
                        onClick={() => assignQAP()}
                        className="btn fw-bold btn-primary"
                        type="button"
                      >
                        ASSIGN
                      </button>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default QAPSub;
