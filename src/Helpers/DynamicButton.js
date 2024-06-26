import React, { useState } from "react";
import { reConfirm } from "../utils/reConfirm";

const DynamicButton = ({ label, onClick, className, confirmMessage }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    // if (confirmMessage) {
    //   if (!window.confirm(confirmMessage)) {
    //     return;
    //   }
    // }
    if (confirmMessage) {
      return reConfirm(
        { file: true },
        () => onClick().finally(() => setLoading(false)),
        confirmMessage
      );
    }
    setLoading(true);
    onClick().finally(() => setLoading(false));
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-sm fw-bold ${className}`}
      type="button"
      disabled={loading}
    >
      {loading ? "Loading..." : label}
    </button>
  );
};

export default DynamicButton;
