import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ isPrivate, handleUpdateVisibility, label }) => {
  return (
    <div className="container">
      {label}{" "}
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox"
          name={label}
          id={label}
          checked={isPrivate}
          onChange={(e) => handleUpdateVisibility(e.target.checked)}
        />
        <label className="label" htmlFor={label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;
