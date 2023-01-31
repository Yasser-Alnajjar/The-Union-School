import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDarkTheme, setDefaultTheme } from "../../redux/slices/theme-slice";
import { Button } from "react-bootstrap";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Theme() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <>
      {theme.mode === "dark" ? (
        <Button
          variant="transparent"
          className={
            theme.mode === "dark" ? "bg-transparent text-light" : theme.mode
          }
          onClick={() => dispatch(setDefaultTheme())}
        >
          <FaSun />
        </Button>
      ) : (
        <Button variant={theme.mode} onClick={() => dispatch(setDarkTheme())}>
          <FaMoon />
        </Button>
      )}
    </>
  );
}
