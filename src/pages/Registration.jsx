import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";

export default function Registration() {
  const [isLoading, setIsLoading] = useState(false);
  const [regData, setRegData] = useState({
    user_type: "",
    department: "",
    role: "",
    vendor_code: "",
    otp: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const regSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let payload = {
      user_type: regData.user_type,
      user_code: regData.vendor_code,
    };

    if (regData.user_type === "GRSE") {
      payload = {
        ...payload,
        functional_area: regData.department,
        role: regData.role,
      };
    }

    const res = await apiCallBack("POST", `auth2/sendOtp`, payload, token);
    setIsLoading(false);

    if (res?.status) {
      toast.success(`Successfully assigned to ${regData.user_type}`);
      setShowOtp(true);
    } else {
      toast.warn(res?.message);
    }
  };

  const otpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      user_code: regData.vendor_code,
      otp: regData.otp,
    };

    const res = await apiCallBack("POST", `auth2/otpVerify`, payload, token);
    setIsLoading(false);

    if (res?.status) {
      toast.success(`OTP verified successfully`);
      // Handle successful OTP verification if needed
    } else {
      toast.warn(res?.message);
    }
  };

  const handleChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  return (
    <div className="d-flex flex-column flex-root" style={{ height: "100vh" }}>
      <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
        <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
          <h3 className="text-center">
            Garden Reach Shipbuilders & Engineers Ltd. <br /> (A GOVT.OF INDIA
            UNDERTAKING)
          </h3>
          <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto border">
            <form
              onSubmit={showOtp ? otpSubmit : regSubmit}
              className="form w-100"
            >
              <div className="text-center mb-3">
                <img
                  src={require("../images/logo.png")}
                  alt=""
                  className="img-fluid mb-2"
                  style={{ width: "120px" }}
                />
                <h3 className="text-dark">
                  Registration Request for OBPS Portal
                </h3>
              </div>
              {!showOtp && (
                <>
                  <div className="fv-row mb-3">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      User Type
                    </label>
                    <select
                      className="form-select form-control-lg form-control-solid"
                      name="user_type"
                      value={regData.user_type}
                      onChange={handleChange}
                    >
                      <option value="">Choose User Type</option>
                      <option value="Vendor">Vendor</option>
                      <option value="GRSE">GRSE Employee</option>
                    </select>
                  </div>
                  {regData.user_type !== "" && (
                    <>
                      {regData.user_type === "GRSE" && (
                        <>
                          <div className="fv-row mb-3">
                            <label className="form-label fs-6 fw-bolder text-dark">
                              Functional Area
                            </label>
                            <select
                              className="form-select form-control-lg form-control-solid"
                              name="department"
                              value={regData.department}
                              onChange={handleChange}
                            >
                              <option value="">Choose Department Type</option>
                              <option value="15">Finance Do</option>
                              <option value="1">SDBG</option>
                              <option value="2">Design</option>
                              <option value="3">Quality Assurance</option>
                              <option value="4">NO</option>
                              <option value="5">Store</option>
                              <option value="6">User</option>
                              <option value="7">OTH</option>
                              <option value="8">NCM</option>
                              <option value="9">Payment Recommendation</option>
                              <option value="10">Vendor</option>
                              <option value="11">Payment Voucher</option>
                              <option value="12">Admin</option>
                              <option value="13">Super Admin</option>
                              <option value="14">PPC</option>
                              <option value="16">RIC</option>
                              <option value="17">Purchase</option>
                              <option value="18">HR</option>
                              <option value="19">Synce</option>
                            </select>
                          </div>
                          <div className="fv-row mb-3">
                            <label className="form-label fs-6 fw-bolder text-dark">
                              Role
                            </label>
                            <select
                              className="form-select form-control-lg form-control-solid"
                              name="role"
                              value={regData.role}
                              onChange={handleChange}
                            >
                              <option value="">Choose Role</option>
                              <option value="Nodal Officer">
                                Nodal Officer
                              </option>
                              <option value="General User">General User</option>
                            </select>
                          </div>
                        </>
                      )}
                      <div className="fv-row mb-3">
                        <label className="form-label fs-6 fw-bolder text-dark">
                          {regData.user_type !== "GRSE"
                            ? "Vendor Code"
                            : "MAN Number"}
                        </label>
                        <input
                          className="form-control form-control-lg form-control-solid"
                          type="text"
                          name="vendor_code"
                          value={regData.vendor_code}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>
                    </>
                  )}
                </>
              )}
              {showOtp && (
                <div className="fv-row mb-3">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    OTP
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    name="otp"
                    value={regData.otp}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                </div>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary w-100 mb-5"
                >
                  {!isLoading ? (
                    <span className="indicator-label">
                      {showOtp ? "Submit OTP" : "Continue"}
                    </span>
                  ) : (
                    <span className="indicator-label">Please wait...</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
