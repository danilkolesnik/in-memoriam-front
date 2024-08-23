import React from "react";
import "./loader.css";

export function Loader() {
  return (
    <div className="loader-wrapper">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
}
