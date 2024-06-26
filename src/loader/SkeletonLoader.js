import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="skeleton-loaderone">
      <div className="skeleton-item">
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
      </div>
      <div className="skeleton-item">
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
      </div>
      {/* Add more skeleton items as needed */}
    </div>
  );
};

export default SkeletonLoader;
