import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoheader from "../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { reConfirm } from "../utils/reConfirm";
import { logoutHandler } from "../redux/slices/loginSlice";
import { poRemoveHandler } from "../redux/slices/poSlice";
import {
  ASSIGNER,
  DEPT_DESIGN,
  DEPT_FI,
  DEPT_IT,
  DEPT_QAP,
  USER_VENDOR,
} from "../constants/userConstants";
import { toast } from "react-toastify";
import DynamicButton from "../Helpers/DynamicButton";
import { apiCallBack } from "../utils/fetchAPIs";
import { FaCog, FaFileAlt, FaKey, FaTachometerAlt } from "react-icons/fa";

const MainHeader = ({ title }) => {
  const dispatch = useDispatch();
  const { user, isLoggedIn, token } = useSelector((state) => state.auth);
  const [ischangepasswordPopup, setIschangepasswordPopup] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    old_pw: "",
    new_pw: "",
    confirm_pw: "",
  });

  const logOutFun = () => {
    dispatch(logoutHandler());
    dispatch(poRemoveHandler());
  };

  const showUnauthorizedToast = () => {
    toast.warning(
      "This user does not have permission to access the dashboard!"
    );
  };

  useEffect(() => {
    if (!isLoggedIn) {
      showUnauthorizedToast();
    }
  }, [isLoggedIn]);

  const renderDashboardLinks = () => {
    return (
      <>
        {(user?.department_id === DEPT_IT ||
          user?.department_id === DEPT_QAP ||
          user?.vendor_code === "600233") && (
          <>
            <li className="nav-item">
              <Link className="nav-link text-black" to={`/dashboard/qa`}>
                <FaTachometerAlt className="me-2" /> QA DASHBOARD
              </Link>
            </li>
          </>
        )}
        {(user?.department_id === DEPT_IT ||
          user?.department_id === DEPT_FI ||
          user?.vendor_code === "600233") && (
          <>
            <li className="nav-item">
              <Link className="nav-link text-black" to={`/dashboard/bg`}>
                <FaTachometerAlt className="me-2" /> BG DASHBOARD
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to={`/dashboard/btn`}>
                <FaTachometerAlt className="me-2" /> BTN DASHBOARD
              </Link>
            </li>
          </>
        )}
        {(user?.department_id === DEPT_IT ||
          user?.department_id === DEPT_DESIGN ||
          user?.vendor_code === "600233") && (
          <>
            <li className="nav-item">
              <Link className="nav-link text-black" to={`/dashboard/drawing`}>
                <FaTachometerAlt className="me-2" /> DESIGN DASHBOARD
              </Link>
            </li>
          </>
        )}
      </>
    );
  };

  const handleInputChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const PasswordchangeBtn = async (e) => {
    if (passwordForm.new_pw !== passwordForm.confirm_pw) {
      toast.warn("New Password and Confirm Password do not match.");
      return;
    }

    try {
      const res = await apiCallBack(
        "POST",
        `auth2/updatePassword`,
        {
          user_code: user?.vendor_code, // include vendor code in payload
          old_pw: passwordForm.old_pw,
          new_pw: passwordForm.new_pw,
        },
        token
      );
      if (res?.status) {
        setIschangepasswordPopup(false);
        toast.success("Password changed successfully!");
      } else {
        toast.warn(res?.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("An error occurred while changing the password.");
    }
  };

  return (
    <nav className="custom-navbar navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logoheader} alt="Logo" height="60" />
          <span className="navbar-text custom-text">GRSE</span>
        </Link>
        <div className="my-3">
          <h2>{title}</h2>
        </div>
        <div className="dropdown-container">
          <div className="ps-4 log_in menu-item dropdown-trigger">
            <span className="settings-trigger">
              <FaCog className="me-0 settings-icon" /> <b>Setting</b>
            </span>
            <ul className="dropdown-menu">
              {user?.user_type === 0 && (
                <li className="nav-item">
                  <Link className="nav-link text-black" to={`/bg-extension`}>
                    <FaFileAlt className="me-2" /> BG EXTENSION
                  </Link>
                </li>
              )}
              {user?.user_type !== USER_VENDOR && renderDashboardLinks()}
              {/* {user?.user_type !== USER_VENDOR &&
                user?.internal_role_id === ASSIGNER && (
                  <li className="nav-item">
                    <Link className="nav-link text-black" to={`/authorisation`}>
                      <FaCog className="me-2" />
                      AUTHORIZATION
                    </Link>
                  </li>
                )} */}
              {(user?.vendor_code === "600233" ||
                user?.vendor_code === "602717") && (
                <li className="nav-item">
                  <Link className="nav-link text-black" to={`/authorisation`}>
                    <FaCog className="me-2" />
                    AUTHORIZATION
                  </Link>
                </li>
              )}

              <li className="nav-item">
                <Link
                  className="nav-link text-black"
                  to="#"
                  onClick={() => setIschangepasswordPopup(true)}
                >
                  <FaKey className="me-2" /> CHANGE PASSWORD
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="ps-4 log_in menu-item dropdown-trigger">
          <b>
            Logged In: <br />
            <span className="menu-title">{user?.vendor_code}</span>
            <span className="menu-title">
              {user.name ? `(${user.name})` : ""}
            </span>
            <span
              onClick={() =>
                reConfirm({ file: true }, logOutFun, "You're going to Logout!")
              }
            >
              (<u className="red">Logout?</u>)
            </span>
          </b>
          <ul className="dropdown-menu"></ul>
        </div>

        {ischangepasswordPopup && (
          <div className="popup active">
            <div className="card card-xxl-stretch mb-5 mb-xxl-8">
              <div className="card-header border-0 pt-5">
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">
                    Change Password
                  </span>
                </h3>
                <button
                  className="btn fw-bold btn-danger"
                  onClick={() => setIschangepasswordPopup(false)}
                >
                  Close
                </button>
              </div>

              <div className="row" style={{ overflow: "unset" }}>
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="oldpassword">Old Password</label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="password"
                      name="old_pw"
                      value={passwordForm.old_pw}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="newpassword">New Password</label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="password"
                      name="new_pw"
                      value={passwordForm.new_pw}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="password"
                      name="confirm_pw"
                      value={passwordForm.confirm_pw}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-3 d-flex justify-content-between">
                    <DynamicButton
                      label="SUBMIT"
                      onClick={PasswordchangeBtn}
                      className="btn fw-bold btn-primary"
                      type="submit"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainHeader;
