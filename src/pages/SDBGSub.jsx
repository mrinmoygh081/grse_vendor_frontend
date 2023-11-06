import React, { useState } from "react";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";

const SDBGSub = () => {
  const [isPopup, setIsPopup] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    transactionId: "",
    sdbgFile: null,
    remarks: "",
  });
  const { id } = useParams();

  const { user, token } = useSelector((state) => state.auth);

  // console.log(user, "bikky");

  const updateSDBG = async (e) => {
    const form = new FormData();
    form.append("purchasing_doc_no", id);
    form.append("file", formData.sdbgFile);
    form.append("remarks", formData.remarks);
    form.append("updated_by", user.NAME1);
    form.append("bank_name", formData.bankName);
    form.append("transaction_id", formData.transactionId);
    form.append("vendor_code", user.vendor_code);
    form.append("action_by_name", user.name);
    form.append("action_by_id", user.email);

    try {
      // Make an API request using your 'apiCallBack' function
      const response = await apiCallBack(
        "POST",
        `po/addSDBG?type=sdbg`,
        form, // Send the form data as the payload
        token
      );
      if (response?.status === true) {
        const data = await response.json();
        console.log(data, "abhinit");
        setIsPopup(false); // Close the popup on successful submission

        // Show a success toast
        toast.success("Form submitted successfully");
        setFormData({
          sdbgFile: null,
          remarks: "",
          bankName: "",
          transactionId: "",
        });
      } else {
        // Handle the case where the request fails (non-2xx response)
        toast.error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      toast.error(`Error: ${error}`);
      // Show an error toast
      toast.error("Form submission failed", {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds (adjust as needed)
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
                                <tr>
                                  <td className="table_center">31/10/2023</td>
                                  <td>Axis Bank</td>
                                  <td>78943878748</td>
                                  <td>
                                    {/* <a
                                      href={require("D:/office/projects/grse/grse_vendor/src/uploads/SDBG Document.pdf")}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Check File
                                    </a> */}
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
                                    {/* <a
                                      href={require("D:/office/projects/grse/grse_vendor/src/uploads/SDBG Document.pdf")}
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      Check File
                                    </a> */}
                                  </td>
                                  <td>GRSE</td>
                                  <td>Returning SDBG for correction</td>
                                  <td>Pending</td>
                                </tr>
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
              <div className="mb-3">
                <button
                  onClick={updateSDBG}
                  className="btn fw-bold btn-primary"
                  type="submit"
                >
                  UPDATE
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
