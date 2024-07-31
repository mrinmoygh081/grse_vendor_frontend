import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logoheader from "../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { reConfirm } from "../utils/reConfirm";
import { logoutHandler } from "../redux/slices/loginSlice";
import { poRemoveHandler } from "../redux/slices/poSlice";
import { ASSIGNER } from "../constants/userConstants";
import { toast } from "react-toastify";

const MainHeader = ({ title }) => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const logOutFun = () => {
    dispatch(logoutHandler());
    dispatch(poRemoveHandler());
  };

  const showUnauthorizedToast = () => {
    // toast.warning("This is not an authorized user dashboard!");
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
    if (user?.department_id === 3) {
      return (
        <li className="nav-item">
          <Link className="nav-link text-black" to={`/dashboard/qa`}>
            DASHBOARD
          </Link>
        </li>
      );
    } else if (user?.department_id === 15) {
      return (
        <>
          <li className="nav-item">
            <Link className="nav-link text-black" to={`/dashboard/bg`}>
              DASHBOARD
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link className="nav-link text-black" to={`/dashboard/btn`}>
              DASHBOARD
            </Link>
          </li> */}
        </>
      );
    } else {
      return (
        <li className="nav-item">
          <Link
            className="nav-link text-black"
            to="#"
            onClick={showUnauthorizedToast}
          >
            DASHBOARD
          </Link>
        </li>
      );
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
        <div className="" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {user?.user_type === 0 && (
              <li className="nav-item">
                <Link className="nav-link text-black" to={`/bg-extension`}>
                  BG EXTENSION
                </Link>
              </li>
            )}
            {renderDashboardLinks()}
            {user?.user_type !== 1 && user?.internal_role_id === ASSIGNER && (
              <li className="nav-item">
                <Link className="nav-link text-black" to={`/authorisation`}>
                  Settings
                </Link>
              </li>
            )}
            <li>
              <div className="ps-4 log_in menu-item">
                <b>
                  Logged In: <br />
                  <span className="menu-title">{user?.vendor_code}</span>
                  <span className="menu-title">
                    {user.name ? `(${user.name})` : ""}
                  </span>
                  <span
                    onClick={() =>
                      reConfirm(
                        { file: true },
                        logOutFun,
                        "You're going to Logout!"
                      )
                    }
                  >
                    (<u className="red">Logout?</u>)
                  </span>
                </b>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
