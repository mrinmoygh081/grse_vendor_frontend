import React, { useState } from "react";

const ForgatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    vendorCode: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and API call logic here
    setIsLoading(true);

    // Example validation logic
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Password changed successfully!");
    }, 2000);
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
            <form onSubmit={handleSubmit} className="form w-100">
              <div className="text-center mb-3">
                <img
                  src={require("../images/logo.png")}
                  alt=""
                  className="img-fluid mb-2"
                  style={{ width: "120px" }}
                />
                <h3 className="text-dark">Reset Your Password</h3>
              </div>
              <div className="fv-row mb-3">
                <label className="form-label fs-6 fw-bolder text-dark">
                  Vendor Code
                </label>
                <input
                  className="form-control form-control-lg form-control-solid"
                  type="text"
                  name="vendorCode"
                  autoComplete="off"
                  value={formData.vendorCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vendorCode: e.target.value,
                    })
                  }
                />
              </div>
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
                  name="confirmNewPassword"
                  autoComplete="off"
                  value={formData.confirmNewPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmNewPassword: e.target.value,
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
                    <span className="indicator-label">SUBMIT</span>
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
};

export default ForgatePassword;
