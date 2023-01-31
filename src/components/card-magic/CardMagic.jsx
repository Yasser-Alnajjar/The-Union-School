import React from "react";
import { useSelector } from "react-redux";
import "./Card-magic.css";
export default function CardMagic({ children, styles }) {
  const { theme } = useSelector((state) => state);
  return (
    <div
      className={`shadow card-magic ${styles} ${
        theme.mode === "dark" ? "bg-dark" : "card-magic-bg"
      }`}
    >
      {children}
    </div>
  );
}
