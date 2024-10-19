import React, { useEffect } from "react";
import "./CheckmarkComponent.css";

const CheckmarkComponent: React.FC = () => {
  useEffect(() => {
    // Trigger animation when the component mounts
    const checkmark = document.querySelector(".checkmark");
    checkmark?.classList.add("animate-checkmark");
  }, []);

  return (
      <div className="checkmark-container">
        {/* Checkmark SVG */}
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark-circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark-check"
            fill="none"
            d="M14 27l7.5 7.5L38 19"
          />
        </svg>
      </div>


  );
};

export default CheckmarkComponent;
