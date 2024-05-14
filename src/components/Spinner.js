import React from "react";
import "../css/bouncer.css";
// import "./css/skeletonCard.css";

export const Spinner = () => {
  return (
    <div className="text-center">
      <div className="bouncer">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Spinner;
