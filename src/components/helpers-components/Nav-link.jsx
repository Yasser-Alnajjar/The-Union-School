import React from "react";
import { Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavLink({ styles, path, title }) {
  const { theme } = useSelector((state) => state);
  let thememode = theme.mode === "dark" ? " text-light" : "text-dark";
  return (
    <Nav.Link
      className={styles === "theme" ? thememode : styles}
      as={Link}
      to={path}
    >
      {title}
    </Nav.Link>
  );
}
