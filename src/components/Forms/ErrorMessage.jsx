import React from "react";

export default function ErrorMessage({ errors }) {
  return (
    <>
      {errors && (
        <span
          className={`text-capitalize ${
            errors ? "text-danger" : "text-success"
          }`}
        >
          {errors.message}
        </span>
      )}
    </>
  );
}
