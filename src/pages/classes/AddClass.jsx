import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { object, string } from "yup";
import ErrorMessage from "../../components/Forms/ErrorMessage";
import InputFC from "../../components/Forms/Input";
import MainTitle from "../../components/Main_title";
import { user } from "../../helpers/authHelp";
import { postData } from "../../redux/slices/dashboardSlice";
import { capitalizeError } from "../../utils/CapitalizeError";

export default function AddClass() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state);
  let schema = object({
    day: string().trim().required(),
    place: string().trim().required(),
    gradeTarget: string().trim().required(),
    time: string().required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "if you accepted you will navigate to Dashboard - Teachers",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      background: theme.mode === "dark" ? "#212529" : "#f1f5f9",
      color: theme.mode === "dark" ? "#f1f5f9" : "#212529",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postData(data));
        navigate("/admin-teachers");
      }
    });
  };
  function onError(error) {
    capitalizeError(error.day);
    capitalizeError(error.place);
    capitalizeError(error.gradeTarget);
    capitalizeError(error.time);
  }

  useEffect(() => {
    setValue("lecture", user.language);
    setValue("userId", user.id);
  }, [setValue]);

  return (
    <div
      className={`w-100 ${
        theme.mode === "dark" ? "bg-dark text-light" : theme.mode
      }`}
    >
      <MainTitle name="Add Class" />
      <Form
        className="my-3 text-center w-100"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <Container>
          <Row className="flex-wrap justify-content-center">
            <Col md="8" className="mb-3">
              <InputFC
                errors={errors}
                register={register}
                label="Place"
                type="place"
                count="2"
                inputStyle={
                  errors?.place
                    ? `border-danger border-2 ${theme.mode}`
                    : `border-color-success ${theme.mode}`
                }
                lableStyle={errors?.place ? "text-danger" : "text-black-50"}
              />
              <ErrorMessage errors={errors.place} />
            </Col>
            <Col md="8" className="mb-3">
              <FloatingLabel controlId="floatingTextarea10" label="Day">
                <Form.Select className={theme.mode} {...register("day")}>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md="8" className="mb-3">
              <FloatingLabel controlId="floatingTextarea10" label="Grade">
                <Form.Select
                  className={theme.mode}
                  {...register("gradeTarget")}
                >
                  <option>Grade Target</option>
                  <option value="Frist">Frist Grade</option>
                  <option value="Second">Second Grade</option>
                  <option value="Third">Third Grade</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col md="8">
              <InputFC
                errors={errors}
                register={register}
                label="Time"
                type="time"
                count="2"
                inputStyle={
                  errors?.time
                    ? `border-danger border-2 ${theme.mode}`
                    : `border-color-success ${theme.mode}`
                }
                lableStyle={errors?.time ? "text-danger" : "text-black-50"}
              />
              <ErrorMessage errors={errors.time} />
            </Col>
          </Row>
          <Button variant="info" className="w-25 mt-3" type="submit">
            Add Lecture
          </Button>
        </Container>
      </Form>
    </div>
  );
}
