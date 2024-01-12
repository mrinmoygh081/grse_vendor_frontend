import React from "react";
import { Link } from "react-router-dom";
import logoheader from "../images/logo.png";

const MainHeader = ({ title }) => {
  return (
    <nav className="custom-navbar navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logoheader} alt="Logo" height="60" />
          <span className="navbar-text custom-text">GRSE</span>
        </Link>
        <div className="my-3">
          <h1>{title}</h1>
        </div>
        <div className="" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-black" to="/pos">
                Purchase Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to={`/log-report`}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-black" to="/bg-extension">
                BG Extension
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MainHeader;
