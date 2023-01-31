import React from "react";
import "../pages/Home.css";
export default function MainTitle({ name, styles }) {
  return (
    <div className="d-flex align-items-center justify-content-center">
      <h3 className={`main-title my-2 ${styles}`}>{name}</h3>
    </div>
  );
}
