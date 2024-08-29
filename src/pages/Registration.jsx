import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCallBack } from "../utils/fetchAPIs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

export default function Registration() {
  const [isLoading, setIsLoading] = useState(false);
  const [regData, setRegData] = useState({
    user_type: "",
    department: "",
    role: "",
    vendor_code: "",
    otp: "",
    password: "",
    confirmPassword: "", // Add confirmPassword field
    subDepartment: "",
  });
  const [showOtp, setShowOtp] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [subDepartments, setSubDepartments] = useState([]);
  const [timer, setTimer] = useState(1800); // 30 minutes timer in seconds
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (regData.department === "3") {
      fetchSubDepartments();
    }
  }, [regData.department]);

  useEffect(() => {
    if (showOtp && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => clearInterval(countdown);
    } else if (timer === 0) {
      toast.warn("OTP expired. Please request a new OTP.");
      setShowOtp(false);
    }
  }, [showOtp, timer]);
  useEffect(() => {
    fetchDepartments();
  }, []);
  const fetchDepartments = async () => {
    setIsLoading(true);
    const res = await apiCallBack(
      "GET",
      "getFilteredData?$tableName=depertment_master&$select=id,name",
      null,
      token
    );
    setIsLoading(false);
    if (res?.status) {
      setDepartments(res.data);
    } else {
      toast.warn(res?.message);
    }
  };

  const fetchSubDepartments = async () => {
    setIsLoading(true);
    const res = await apiCallBack(
      "GET",
      "po/internalDepartmentList",
      null,
      token
    );
    setIsLoading(false);
    if (res?.status) {
      setSubDepartments(res.data);
    } else {
      toast.warn(res?.message);
    }
  };

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

      if (regData.department === "3") {
        payload.sub_dept_id = regData.subDepartment;
      }
    }

    const res = await apiCallBack("POST", "auth2/sendOtp", payload, token);
    setIsLoading(false);

    if (res?.status) {
      toast.success("OTP sent via mail. Please check your inbox.");
      setShowOtp(true);
      setTimer(1800); // Reset the timer to 30 minutes
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

    const res = await apiCallBack("POST", "auth2/otpVefify", payload, token);
    setIsLoading(false);

    if (res?.status) {
      toast.success("OTP verified successfully");
      setShowPassword(true);
    } else {
      toast.warn(res?.message);
    }
  };

  const passwordSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if passwords match
    if (regData.password !== regData.confirmPassword) {
      toast.warn("Passwords do not match. Please check.");
      setIsLoading(false);
      return;
    }

    const payload = {
      user_code: regData.vendor_code,
      password: regData.password,
      otp: regData.otp,
      status: "CREATE",
    };

    const res = await apiCallBack("POST", "auth2/setPassword", payload, token);
    setIsLoading(false);

    if (res?.status) {
      toast.success("Password set successfully");
      navigate("/login"); // Redirect to login page
    } else {
      toast.warn(res?.message);
    }
  };

  const handleChange = (e) => {
    setRegData({ ...regData, [e.target.name]: e.target.value });
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
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
              onSubmit={
                showPassword ? passwordSubmit : showOtp ? otpSubmit : regSubmit
              }
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
              {!showOtp && !showPassword && (
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
                      <option value="vendor">Vendor</option>
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
                              {departments.map((dept) => (
                                <option key={dept.id} value={dept.id}>
                                  {dept.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {regData.department === "3" && (
                            <div className="fv-row mb-3">
                              <label className="form-label fs-6 fw-bolder text-dark">
                                Sub Department
                              </label>
                              <select
                                className="form-select form-control-lg form-control-solid"
                                name="subDepartment"
                                value={regData.subDepartment}
                                onChange={handleChange}
                              >
                                <option value="">Choose Sub Department</option>
                                {subDepartments.map((subDept, index) => (
                                  <option key={index} value={subDept.id}>
                                    {subDept.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}
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
                              <option value="1">Nodal Officer</option>
                              <option value="2">General User</option>
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
              {showOtp && !showPassword && (
                <>
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
                  <div className="text-center mb-3">
                    <span className="text-dark">
                      Time Remaining: {formatTime(timer)}
                    </span>
                  </div>
                </>
              )}
              {showPassword && (
                <>
                  <div className="fv-row mb-3">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      Password
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="password"
                      name="password"
                      value={regData.password}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="fv-row mb-3">
                    <label className="form-label fs-6 fw-bolder text-dark">
                      Confirm Password
                    </label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="password"
                      name="confirmPassword"
                      value={regData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
                </>
              )}
              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-lg btn-primary fw-bolder me-3 my-2 mb-5 w-100"
                  disabled={isLoading}
                >
                  {isLoading
                    ? "Loading..."
                    : showPassword
                    ? "SET PASSWORD"
                    : showOtp
                    ? "VERIFY OTP"
                    : "REGISTER"}
                </button>

                <p className="fs-16">
                  If you're already registered. Please{" "}
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
          </div>
        </div>
      </div>
    </div>
  );
}
