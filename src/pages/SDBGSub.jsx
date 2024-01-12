import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";
import moment from "moment";
const SDBGSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [isEntryPopup, setIsEntryPopup] = useState(false);
  const [allsdbg, setAllsdbg] = useState([]);
  const [formData, setFormData] = useState({
    bankName: "",
    transactionId: "",
    sdbgFile: null,
    remarks: "",
  });
  const { id } = useParams();

  const { user, token, userType } = useSelector((state) => state.auth);

  const getSDBG = async () => {
    const data = await apiCallBack(
      "GET",
      `po/sdbgList?poNo=${id}`,
      null,
      token
    );
    if (data?.status) {
      setAllsdbg(data?.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    getSDBG();
  }, []);

  const updateSDBG = async (flag) => {
    let uType;
    if (userType === 1) {
      uType = "VENDOR";
    } else {
      uType = "GRSE";
    }
    let isApproved;
    if (flag === "Approved") {
      isApproved = "ACKNOWLEDGED";
    } else {
      isApproved = "PENDING";
    }
    try {
      const form = new FormData();
      form.append("purchasing_doc_no", id);
      form.append("file", formData.sdbgFile);
      form.append("remarks", formData.remarks);
      form.append("status", isApproved);
      form.append("updated_by", uType);
      form.append("bank_name", formData.bankName);
      form.append("transaction_id", formData.transactionId);
      form.append("vendor_code", user.vendor_code);
      // form.append("vendor_name", user.vendor_code);
      form.append("mailSendTo", "aabhinit96@gmail.com");
      form.append("action_by_name", user.name);
      form.append("action_by_id", user.email);

      const response = await apiCallBack("POST", `po/sdbg`, form, token);
      if (response.statusCode === 200) {
        const data = response.data;
        console.log(data, "abhinit");
        setIsPopup(false);
        toast.success("Form submitted successfully");
        setFormData({
          sdbgFile: null,
          remarks: "",
          bankName: "",
          transactionId: "",
        });
        getSDBG();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Form submission failed", {
        position: "top-right",
        autoClose: 3000,
      });
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
                        <button
                          onClick={() => setIsEntryPopup(true)}
                          className="btn fw-bold btn-primary me-3"
                        >
                          SDBG Entry
                        </button>
                        <button
                          onClick={() => setIsPopup(true)}
                          className="btn fw-bold btn-primary"
                        >
                          Upload SDBG
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
                                  <th>Bank name</th>
                                  <th>Transaction ID</th>
                                  <th>SDBG File</th>
                                  <th>Updated By</th>
                                  <th className="min-w-150px">Remarks</th>
                                  <th>Status</th>
                                </tr>
                              </thead>
                              <tbody style={{ maxHeight: "100%" }}>
                                {allsdbg &&
                                  allsdbg.map((item, index) => (
                                    <tr key={index}>
                                      <td className="table_center">
                                        {moment(item.created_at)
                                          .utc()
                                          .format("YYYY-MM-DD")}
                                      </td>
                                      <td>{item.bank_name}</td>
                                      <td>{item.transaction_id}</td>
                                      <td>
                                        <a
                                          href={`${process.env.REACT_APP_BACKEND_API}po/download?id=${item.id}&type=sdbg`}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          Check File
                                        </a>
                                      </td>
                                      <td> {item.created_by_name}</td>
                                      <td>{item.remarks}</td>
                                      <td>
                                        {item.status === "ACKNOWLEDGED"
                                          ? "ACKNOWLEDGED"
                                          : "PENDING"}
                                      </td>
                                    </tr>
                                  ))}
                                {/* <tr>
                                    <td className="table_center">31/10/2023</td>
                                    <td>Axis Bank</td>
                                    <td>78943878748</td>
                                    <td>
                                      <a
                                        href={require("C:/grse/grse_frontend/grse_vendor/src/uploads/testing.pdf")}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        Check File
                                      </a>
                                    </td>
                                    <td>XYZ Pvt. Ltd.</td>
                                    <td>Uploading SDBG</td>
                                    <td>Pending</td>
                                  </tr>
                                  <tr>
                                    <td className="table_center">31/10/2023</td>
                                    <td>Axis Bank</td>
                                    <td>78943878748</td>
                                    <td>
                                      <a
                                        href={require("C:/grse/grse_frontend/grse_vendor/src/uploads/testing.pdf")}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        Check File
                                      </a>
                                    </td>
                                    <td>GRSE</td>
                                    <td>Returning SDBG for correction</td>
                                    <td>Pending</td>
                                  </tr>
                                  <tr>
                                    <td className="table_center">31/10/2023</td>
                                    <td>Axis Bank</td>
                                    <td>78943878748</td>
                                    <td>
                                      <a
                                        href={require("C:/grse/grse_frontend/grse_vendor/src/uploads/testing.pdf")}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        Check File
                                      </a>
                                    </td>
                                    <td>GRSE</td>
                                    <td>SDBG receipt acknowledgement</td>
                                    <td>Approved</td>
                                  </tr> */}
                              </tbody>
                            </table>
                            {/* <div className="d-flex align-items-center justify-content-between py-3">
                                  <button className="btn fw-bold btn-info">
                                    ADD NEW
                                  </button>
                                  <div>
                                    <button className="btn fw-bold btn-primary mx-3">
                                      Stop
                                    </button>
                                    <button className="btn fw-bold btn-primary">
                                      Send
                                    </button>
                                  </div>
                                </div> */}
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
              <span className="card-label fw-bold fs-3 mb-1">UPLOAD SDBG</span>
            </h3>
            <button
              className="btn fw-bold btn-danger"
              onClick={() => setIsPopup(false)}
            >
              Close
            </button>
          </div>

          <div className="row">
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setFormData({ ...formData, bankName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Transaction ID</label>
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      transactionId: e.target.value,
                    })
                  }
                />
              </div>
            </div>
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
                  onClick={() => updateSDBG("NotApproved")}
                  className="btn fw-bold btn-primary"
                  type="submit"
                >
                  UPDATE
                </button>
                {userType !== 1 ? (
                  <button
                    onClick={() => updateSDBG("Approved")}
                    className="btn fw-bold btn-primary"
                    type="submit"
                  >
                    Approved
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
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
                <label className="form-label">Bankers Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersName"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Bankers Branch</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Bankers Address1</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersAddress1"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Bankers Address2</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersAddress2"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Bankers Address3</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersAddress3"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Bankers City</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersCity"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Pin Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="pincode"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Bank Guarantee No</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersGuarantee"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">BG Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="BG Date"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">BG Amount</label>
                <input
                  type="text"
                  className="form-control"
                  name="BGAmount"
                  onClick={handleInputChange}
                />
              </div>
            </div>

            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Purchase Order</label>
                <input
                  type="text"
                  className="form-control"
                  name="po"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">PO Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Yard No</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Validity Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Claim Period</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Checklist Reference</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Checklist Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">BG Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Vendor Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Vendor Address1</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Vendor Address2</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Vendor Address3</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Vendor City</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Vendor Pin Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Extension Date1</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Extension Date2</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Extension Date3</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Extension Date4</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Extension Date5</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Extension Date6</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Release Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Demand Notice Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="mb-3">
                <label className="form-label">Entension Letter Date</label>
                <input
                  type="text"
                  className="form-control"
                  name="BankersBranch"
                  onClick={handleInputChange}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3 d-flex justify-content-between">
                {/* for dealing officer */}
                {/* <button
                  onClick={() => updateSDBG("NotApproved")}
                  className="btn fw-bold btn-primary"
                  type="submit"
                >
                  Forward To Finance
                </button> */}

                {/* for finance officer  */}
                <button
                  onClick={() => updateSDBG("NotApproved")}
                  className="btn fw-bold btn-primary me-3"
                  type="submit"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateSDBG("NotApproved")}
                  className="btn fw-bold btn-primary"
                  type="submit"
                >
                  Return to Dealing Officer
                </button>
                <button
                  onClick={() => updateSDBG("NotApproved")}
                  className="btn fw-bold btn-primary"
                  type="submit"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SDBGSub;
