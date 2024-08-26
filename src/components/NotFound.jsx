import React from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import errorImage from "../images/licensed-image (1).png"; // Ensure the path is correct

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="page-not-found-container">
      <div className="content-wrapper">
        <div className="error-text">
          <h1>Oops!</h1>
          <p>We can’t seem to find the page you’re looking for.</p>
          <p className="error-code">Error code: 404</p>
          <button className="home-button" onClick={goHome}>
            Back to Home
          </button>
        </div>
        <div className="error-image">
          <img src={errorImage} alt="Error 404" />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
