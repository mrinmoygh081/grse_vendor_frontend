import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaCaretLeft } from "react-icons/fa";
import ReactDatePicker from "react-datepicker";
import { apiCallBack } from "../../utils/fetchAPIs";
import { useSelector } from "react-redux";
import { USER_VENDOR } from "../../constants/userConstants";
import { toast } from "react-toastify";
import DynamicButton from "../../Helpers/DynamicButton";
import Select from "react-select";

const ClaimAgainstJCCubmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  console.log(user, "useruser");

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
                            Checklist For Claim Against JCC:
                          </h3>
                          <div className="card-body p-3">
                            <div className="tab-content">
                              <div className="table-responsive">
                                <table className="table table-striped table-bordered table_height">
                                  <tbody>
                                    <tr>
                                      <td>Vendor Name :</td>
                                      <td className="btn_value">
                                        {user?.name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Vendor Code :</td>
                                      <td className="btn_value">
                                        {user?.vendor_code}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GSTIN (Registration no) :</td>
                                      <td className="btn_value">
                                        {"{GSTIN Number}"}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Invoice/Letter Reference No. :</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          name="invoiceReferenceNo"
                                          className="form-control"
                                          placeholder="Enter Reference No"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Invoice/Letter Date:</td>
                                      <td className="btn_value">
                                        <ReactDatePicker
                                          dateFormat="dd/MM/yyyy"
                                          className="form-control"
                                          placeholderText="DD/MM/YYYY"
                                        />
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Yard No:</td>
                                      <td className="btn_value">
                                        <input
                                          type="text"
                                          name="ref_invoice1_no"
                                          className="form-control"
                                          placeholder="Yard no"
                                        />
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>JCC no:</td>
                                      <td className="btn_value">
                                        <Select
                                          className="basic-single w_250"
                                          classNamePrefix="select"
                                          isClearable={true}
                                          isSearchable={true}
                                          name="wdc_number"
                                          id="wdc_number"
                                        />
                                        <DynamicButton
                                          label="CHECK"
                                          className="btn btn-primary btn-sm m-4"
                                        />
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="text-center">
                                {user?.user_type === USER_VENDOR && (
                                  <button
                                    type="button"
                                    className="btn fw-bold btn-primary me-3"
                                  >
                                    SUBMIT
                                  </button>
                                )}
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

                              {/* <div className="text-center">
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
                                  onClick={() => handleSubmit()}
                                >
                                  SUBMIT
                                </button>
                              </div> */}
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

export default ClaimAgainstJCCubmission;
