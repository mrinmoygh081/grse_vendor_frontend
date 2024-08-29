import React, { useState } from "react";
import { apiCallBack } from "../utils/fetchAPIs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    vendorCode: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Handle vendor code submission to request OTP
  const handleVendorCodeSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { user_code: formData.vendorCode };
    const res = await apiCallBack(
      "POST",
      "auth2/forgotPasswordOtp",
      payload,
      token
    );
    setIsLoading(false);

    if (res?.status) {
      toast.success("OTP sent successfully. Please check your email.");
      setOtpSent(true); // Set state to show OTP input
    } else {
      toast.warn(res?.message);
    }
  };

  // Handle OTP submission to verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { user_code: formData.vendorCode, otp: formData.otp };
    const res = await apiCallBack("POST", "auth2/otpVefify", payload, token);
    setIsLoading(false);

    if (res?.status) {
      toast.success("OTP verified successfully.");
      setOtpVerified(true); // Set state to show password reset input
    } else {
      toast.warn(res?.message);
    }
  };

  // Handle password reset submission
  const handlePasswordResetSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.warning("Passwords do not match. Please check!");
      setIsLoading(false);
      return;
    }

    const payload = {
      user_code: formData.vendorCode,
      password: formData.newPassword,
      otp: formData.otp,
      status: "UPDATE",
    };
    const res = await apiCallBack("POST", "auth2/setPassword", payload, token);
    setIsLoading(false);

    if (res?.status) {
      toast.success(res.message);
      navigate("/login");
    } else {
      toast.warn(res?.message);
    }
  };

  return (
    <div className="d-flex flex-column flex-root" style={{ height: "100vh" }}>
      <div className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed">
        <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
          <h3 className="text-center">
            Garden Reach Shipbuilders & Engineers Ltd. <br /> (A GOVT. OF INDIA
            UNDERTAKING)
          </h3>
          <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto border">
            {!otpSent && (
              <form onSubmit={handleVendorCodeSubmit} className="form w-100">
                <div className="text-center mb-3">
                  <img
                    src={require("../images/logo.png")}
                    alt=""
                    className="img-fluid mb-2"
                    style={{ width: "120px" }}
                  />
                  <h3 className="text-dark">Reset Your Password</h3>
                  <div className="fv-row mb-3 text-start">
                    <label className="form-label fs-6 fw-bolder">
                      User Code
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      name="vendorCode"
                      autoComplete="off"
                      value={formData.vendorCode}
                      onChange={(e) =>
                        setFormData({ ...formData, vendorCode: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100 mb-5"
                    disabled={isLoading}
                  >
                    {!isLoading ? (
                      <span className="indicator-label">SUBMIT</span>
                    ) : (
                      <span className="indicator-label">Please wait...</span>
                    )}
                  </button>
                  <p className="fs-16">
                    If you don’t want to change your password,{" "}
                    <button
                      type="button"
                      className="btn_simple"
                      onClick={() => navigate("/login")}
                    >
                      <u>LOGIN</u>
                    </button>
                    .{" "}
                  </p>
                </div>
              </form>
            )}

            {otpSent && !otpVerified && (
              <form onSubmit={handleOtpSubmit} className="form w-100">
                <div className="fv-row mb-3">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    Enter OTP
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    name="otp"
                    autoComplete="off"
                    value={formData.otp}
                    onChange={(e) =>
                      setFormData({ ...formData, otp: e.target.value })
                    }
                  />
                  <div className="text-muted mt-2">
                    OTP is valid for 30 minutes.
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100 mb-5"
                    disabled={isLoading}
                  >
                    {!isLoading ? (
                      <span className="indicator-label">VERIFY OTP</span>
                    ) : (
                      <span className="indicator-label">Please wait...</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            {otpVerified && (
              <form onSubmit={handlePasswordResetSubmit} className="form w-100">
                <div className="fv-row mb-3">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    New Password
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="password"
                    name="newPassword"
                    autoComplete="off"
                    value={formData.newPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="fv-row mb-3">
                  <label className="form-label fs-6 fw-bolder text-dark">
                    Confirm New Password
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="password"
                    name="confirmPassword"
                    autoComplete="off"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary w-100 mb-5"
                    disabled={isLoading}
                  >
                    {!isLoading ? (
                      <span className="indicator-label">RESET PASSWORD</span>
                    ) : (
                      <span className="indicator-label">Please wait...</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgatePassword;
