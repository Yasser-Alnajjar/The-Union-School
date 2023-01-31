import React from "react";
import { Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { FcPrevious } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { setDarkTheme, setDefaultTheme } from "../redux/slices/theme-slice";

export default function LoginLayout() {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="d-flex position-absolute gap-2"
        style={{
          top: "10px",
          left: "10px",
        }}
      >
        <Button
          as={Link}
          to={"/"}
          variant={theme.mode === "dark" ? "light" : "dark"}
        >
          {<FcPrevious style={{ color: "white" }} />}
        </Button>
        {theme.mode === "dark" ? (
          <Button
            variant={theme.mode === "dark" ? "light" : ""}
            onClick={() => dispatch(setDefaultTheme())}
          >
            <FaMoon />
          </Button>
        ) : (
          <Button
            variant={theme.mode === "dark" ? "" : "warning"}
            onClick={() => dispatch(setDarkTheme())}
          >
            <FaSun />
          </Button>
        )}
      </div>
      <Outlet />
    </>
  );
}
