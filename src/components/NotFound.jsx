import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-animation-container">
      <div className="mountain">
        <div className="boy"></div>
        <div className="girl"></div>
      </div>
      <h1 className="title">404</h1>
      <h2 className="subtitle">Page Not Found</h2>
      <p className="message">
        Sorry, the page you are looking for does not exist.
      </p>
      <div className="fade-in-delayed">
        <Link to="/" className="home-link">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
