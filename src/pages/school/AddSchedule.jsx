import { yupResolver } from "@hookform/resolvers/yup";
import React, { Fragment, useEffect } from "react";
import {
  Button,
  Form,
  Col,
  Container,
  Row,
  FloatingLabel,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { object, string } from "yup";
import InputFC from "../../components/Forms/Input";
import MainTitle from "../../components/Main_title";
import { addSchedule, fetchUsers } from "../../redux/slices/schoolSlice";
import { capitalizeError } from "../../utils/CapitalizeError";

export default function AddSchedule() {
  const { theme } = useSelector((state) => state);
  let schema = object({
    time: string().required(),
    day: string().required(),
    teacherName: string().required(),
    language: string().required(),
    gradeTarget: string().required(),
  });
  const {
    register,

    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "if you accepted you will navigate to dashboard",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      background: theme.mode === "dark" ? "#212529" : "#f1f5f9",
      color: theme.mode === "dark" ? "#f1f5f9" : "#212529",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(data);
        dispatch(addSchedule(data));
        navigate("/admin/schedule");
      }
    });
  };
  const dispatch = useDispatch();
  const state = useSelector((state) => state.getSchool);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  function onError(error) {
    capitalizeError(error.day);
    capitalizeError(error.teacherName);
    capitalizeError(error.language);
    capitalizeError(error.gradeTarget);
    capitalizeError(error.time);
  }

  return (
    <div
      className={`w-100 ${
        theme.mode === "dark" ? "bg-dark text-light" : theme.mode
      }`}
    >
      <MainTitle name={"Add Schedule ➕"} />
      <Container className="d-flex align-items-center justify-content-center">
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme.mode}
        />
        <Form
          className="text-center mt-5"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <Row className="pb-3  justify-content-center">
            <Col lg="8" className="mb-3">
              <FloatingLabel controlId="floatingTextarea1" label="Day">
                <Form.Select
                  className={`${theme.mode} ${
                    errors?.day
                      ? `border-danger  ${theme.mode}`
                      : `border-color-success ${theme.mode}`
                  }`}
                  {...register("day")}
                >
                  <option value="">Select a Option</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col lg="8" className="mb-3">
              <FloatingLabel controlId="floatingTextarea2" label="Name">
                <Form.Select
                  className={`${theme.mode} ${
                    errors?.teacherName
                      ? `border-danger  ${theme.mode}`
                      : `border-color-success ${theme.mode}`
                  }`}
                  // ? Name
                  {...register("teacherName")}
                >
                  <option value="">Select a Option</option>
                  {state.users.map((user) => {
                    return (
                      user.ifTeacher && (
                        <Fragment key={user.id}>
                          <option value={`${user.firstname}`}>
                            {user.firstname} {user.lastname}
                          </option>
                        </Fragment>
                      )
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col lg="8" className="mb-3">
              <FloatingLabel controlId="floatingTextarea3" label="Language">
                <Form.Select
                  className={`${theme.mode} ${
                    errors?.language
                      ? `border-danger  ${theme.mode}`
                      : `border-color-success ${theme.mode}`
                  }`} // ? Language
                  {...register("language")}
                >
                  <option value="">Select a Option</option>
                  {state.users.map((user) => {
                    return (
                      user.ifTeacher && (
                        <Fragment key={user.id}>
                          <option value={user.language}>{user.language}</option>
                        </Fragment>
                      )
                    );
                  })}
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col lg="8" className="mb-3">
              <FloatingLabel controlId="floatingTextarea4" label="Grade Target">
                <Form.Select
                  className={`${theme.mode} ${
                    errors?.gradeTarget
                      ? `border-danger  ${theme.mode}`
                      : `border-color-success ${theme.mode}`
                  }`} // ? gradeTarget
                  {...register("gradeTarget")}
                >
                  <option value="">Select a Option</option>
                  <option value="Frist">Frist Grade</option>
                  <option value="Second">Second Grade</option>
                  <option value="Third">Third Grade</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col lg="8" className="mb-3">
              <InputFC
                errors={errors}
                register={register}
                label="Time"
                type="time"
                count="5"
                inputStyle={
                  errors?.time
                    ? `border-danger border-2 ${theme.mode}`
                    : `border-color-success ${theme.mode}`
                }
                lableStyle={errors?.time ? "text-danger" : "text-black-50"}
              />
            </Col>
          </Row>
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </div>
  );
}
