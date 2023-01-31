import React, { useState, useEffect } from "react";
import { FaAngleUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { goToTop } from "../../utils/CapitalizeError";
import "./scrollTop.css";
export default function ScrollToTop() {
  const { theme } = useSelector((state) => state);
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  return (
    <div className="top-to-btm">
      {showTopBtn && (
        <FaAngleUp
          className={`icon-position icon-style ${
            theme.mode === "dark" ? "light" : "dark"
          }`}
          onClick={goToTop}
        />
      )}
    </div>
  );
}
