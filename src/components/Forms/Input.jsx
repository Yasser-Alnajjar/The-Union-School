import React from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";

export default function InputFC({
  register,
  label,
  type,
  inputStyle,
  count,
  visible,
  icon,
  setVisible,
}) {
  const { theme } = useSelector((state) => state);
  return (
    <>
      <FloatingLabel
        className="position-relative "
        controlId={`floatingTextarea${count}`}
        label={label}
      >
        <Form.Control
          placeholder={`Enter Your ${label}`}
          className={`${inputStyle} `}
          type={type}
          {...register(type, { require: true })}
        />
        {icon ? (
          <Button
            className={`border-0 position-absolute icon-pass ${theme.mode}`}
            variant="transparent"
            onClick={() => setVisible(!visible)}
          >
            {visible ? <FaEye /> : <FaEyeSlash />}
          </Button>
        ) : null}
      </FloatingLabel>
    </>
  );
}
