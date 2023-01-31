import React from "react";
import { Link } from "react-router-dom";

export default function ULfooter({ title }) {
  return (
    <li
      style={{ backgroundColor: "transparent" }}
      className="list-group-item text-lg-center border-dark list-item-c"
    >
      <Link style={{ color: "white", textDecoration: "none" }} to={"/"}>
        {title}
      </Link>
    </li>
  );
}
