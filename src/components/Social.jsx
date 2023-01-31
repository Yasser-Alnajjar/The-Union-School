import React from "react";

export default function Social({ href, classNames, icon }) {
  let styleIcon = {
    backgroundColor: "#313131",
    color: "#B9B9B9",
    width: "50px",
    height: "50px",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "6px",
  };
  return (
    <li>
      <a
        href={href}
        style={styleIcon}
        target="_blank"
        className={classNames}
        rel="noreferrer"
      >
        {icon}
      </a>
    </li>
  );
}
