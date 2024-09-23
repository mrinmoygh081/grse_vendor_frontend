import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaCaretLeft } from "react-icons/fa";

const ClaimIncorrectDeductions = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    ref_invoice1_no: "",
    ref_invoice1_amount: "",
    ref_invoice1_remarks: "",
    ref_invoice2_no: "",
    ref_invoice2_amount: "",
    ref_invoice2_remarks: "",
    ref_invoice3_no: "",
    ref_invoice3_amount: "",
    ref_invoice3_remarks: "",
    ref_invoice4_no: "",
    ref_invoice4_amount: "",
    ref_invoice4_remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div className="page d-flex flex-row flex-column-fluid">
          <SideBar />
          <div className="wrapper d-flex flex-column flex-row-fluid">
            <Header title={"Checklist for Any Other Claims"} id={id} />
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
                                navigate(`/bill-other-claims/${id}`)
                              }
                            >
                              <FaCaretLeft className="fs-20" />
                            </button>{" "}
                            Checklist for Any Other Claims:
                          </h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody>
                                    <tr>
                                      <td>Claim Type:</td>
                                      <td className="btn_value">
                                        <select
                                          name="stage"
                                          className="form-select"
                                          style={{
                                            width: "85%",
                                            fontSize: "10px",
                                            padding: "13px",
                                          }}
                                        >
                                          <option value="bill-incorrect-deductions">
                                            Checklist for Incorrect Deductions
                                          </option>
                                          <option value="ld-penalty-refund">
                                            Checklist for LD-Penalty Refund
                                          </option>
                                        </select>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                                <table className="table table-striped table-bordered table_height">
                                  <thead>
                                    <tr>
                                      <th>Reference Invoice No</th>
                                      <th>Claim Amount</th>
                                      <th>Remarks</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {/* Row 1 */}
                                    <tr>
                                      <td>
                                        <input
                                          type="text"
                                          name="ref_invoice1_no"
                                          className="form-control"
                                          placeholder="Enter Invoice No 1"
                                          value={formData.ref_invoice1_no}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          name="ref_invoice1_amount"
                                          className="form-control"
                                          placeholder="Enter Claim Amount 1"
                                          value={formData.ref_invoice1_amount}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="ref_invoice1_remarks"
                                          className="form-control"
                                          placeholder="Enter Remarks 1"
                                          value={formData.ref_invoice1_remarks}
                                          onChange={handleChange}
                                        />
                                      </td>
                                    </tr>

                                    {/* Row 2 */}
                                    <tr>
                                      <td>
                                        <input
                                          type="text"
                                          name="ref_invoice2_no"
                                          className="form-control"
                                          placeholder="Enter Invoice No 2"
                                          value={formData.ref_invoice2_no}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          name="ref_invoice2_amount"
                                          className="form-control"
                                          placeholder="Enter Claim Amount 2"
                                          value={formData.ref_invoice2_amount}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="ref_invoice2_remarks"
                                          className="form-control"
                                          placeholder="Enter Remarks 2"
                                          value={formData.ref_invoice2_remarks}
                                          onChange={handleChange}
                                        />
                                      </td>
                                    </tr>

                                    {/* Row 3 */}
                                    <tr>
                                      <td>
                                        <input
                                          type="text"
                                          name="ref_invoice3_no"
                                          className="form-control"
                                          placeholder="Enter Invoice No 3"
                                          value={formData.ref_invoice3_no}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          name="ref_invoice3_amount"
                                          className="form-control"
                                          placeholder="Enter Claim Amount 3"
                                          value={formData.ref_invoice3_amount}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="ref_invoice3_remarks"
                                          className="form-control"
                                          placeholder="Enter Remarks 3"
                                          value={formData.ref_invoice3_remarks}
                                          onChange={handleChange}
                                        />
                                      </td>
                                    </tr>

                                    {/* Row 4 */}
                                    <tr>
                                      <td>
                                        <input
                                          type="text"
                                          name="ref_invoice4_no"
                                          className="form-control"
                                          placeholder="Enter Invoice No 4"
                                          value={formData.ref_invoice4_no}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="number"
                                          name="ref_invoice4_amount"
                                          className="form-control"
                                          placeholder="Enter Claim Amount 4"
                                          value={formData.ref_invoice4_amount}
                                          onChange={handleChange}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          name="ref_invoice4_remarks"
                                          className="form-control"
                                          placeholder="Enter Remarks 4"
                                          value={formData.ref_invoice4_remarks}
                                          onChange={handleChange}
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>

                              <div className="text-center">
                                <button
                                  className="btn btn-sm btn-primary me-3"
                                  type="button"
                                  onClick={() =>
                                    navigate(`/bill-other-claims/${id}`)
                                  }
                                >
                                  BACK
                                </button>
                                <button
                                  className="btn btn-sm btn-success"
                                  type="submit"
                                >
                                  SUBMIT
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

export default ClaimIncorrectDeductions;
