import React from "react";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function Mission({ title, desc, icon }) {
  const { theme } = useSelector((state) => state);
  let styleWithIcon = {
    minHeight: "250px",
  };
  let styleWithOutIcon = {
    minHeight: "200px",
  };
  return (
    <Card
      className={`my-3 shadow card_ainmation ${
        theme.mode === "dark" ? "dark" : theme.mode
      }`}
      style={icon ? styleWithIcon : styleWithOutIcon}
    >
      {icon && <div className="card-img-top text-center fs-1 py-2">{icon}</div>}
      <Card.Body>
        <Card.Title
          className={`text-center  fs-3 ${
            theme.mode === "dark" ? "text-light" : "text-dark"
          }`}
        >
          {title}
        </Card.Title>
        <Card.Text className="fs-6 ">{desc}</Card.Text>
      </Card.Body>
    </Card>
  );
}
