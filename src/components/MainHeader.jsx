import React from "react";
import { Link } from "react-router-dom";
import logoheader from "../images/logo.png";
import { useSelector } from "react-redux";

const MainHeader = ({ title }) => {
  const { user } = useSelector((state) => state.auth);
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
            <li className="nav-item">
              <Link className="nav-link text-black" to="/">
                Purchase Orders
              </Link>
            </li>
            {user?.user_type !== 1 && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-black" to={`/log-report`}>
                    LOGS
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link text-black" to="/bg-extension">
                BG Extension
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/checklist">
                Checklists
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
