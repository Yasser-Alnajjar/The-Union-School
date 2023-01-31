import React from "react";
import { Alert, Col } from "react-bootstrap";

export default function ColProfile({ theme, rece, name, icon }) {
  return (
    <Col lg="6">
      <Alert className={`border-0 shadow ${theme.mode}`}>
        <div className="d-flex align-items-center fs-6 gap-2">
          <p className="fs-5">{icon}</p>{" "}
          <p className="text-capitalize">{name}</p> : <p>{rece}</p>
        </div>
      </Alert>
    </Col>
  );
}
