import React from "react";
import "./Loading.css";
export default function Loading() {
  return (
    <div className="frame">
      <div className="center">
        <svg
          className="loder-1"
          width="100px"
          height="100px"
          viewBox="0 0 100 100"
        >
          <circle className="bg" cx="50" cy="50" r="46" />
          <circle className="loader" cx="50" cy="50" r="46" />
        </svg>
        <svg
          className="loder-2"
          width="80px"
          height="80px"
          viewBox="0 0 100 100"
        >
          <circle className="bg" cx="50" cy="50" r="46" />
          <circle className="loader" cx="50" cy="50" r="46" />
        </svg>
        <svg
          className="loder-3"
          width="60px"
          height="60px"
          viewBox="0 0 100 100"
        >
          <circle className="bg" cx="50" cy="50" r="46" />
          <circle className="loader" cx="50" cy="50" r="46" />
        </svg>
        <svg
          className="loder-4"
          width="40px"
          height="40px"
          viewBox="0 0 100 100"
        >
          <circle className="bg" cx="50" cy="50" r="46" />
          <circle className="loader" cx="50" cy="50" r="46" />
        </svg>
      </div>
    </div>
  );
}
