import "./login.css";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../redux/slices/user/userSlice";
import MainTitle from "../components/Main_title";
import InputFC from "../components/Forms/Input";
import ErrorMessage from "../components/Forms/ErrorMessage";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { object, string } from "yup";
import { capitalizeError } from "../utils/CapitalizeError";

export default function Login() {
  const { theme } = useSelector((state) => state);
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  let schema = object({
    email: string().trim().email().required(),
    password: string().trim().required().min(8).max(20),
  });

  function onError(error) {
    capitalizeError(error.email);
    capitalizeError(error.password);
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues:{
      email:"admin@mail.com",
      password:"yasser111"
    }
  });
  const onSubmit = (data) => {
    if (data.stages) {
      setValue("ifStudent", true);
    } else if (data.language) {
      setValue("ifTeacher", true);
    }
    dispatch(loginAction(data));
  };

  return (
    <div className={`main login ${theme.mode}`}>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={true}
        theme={theme.mode}
      />
      <Container>
        <Row className="justify-content-center">
          <Col md="6" className="index">
            <div className={`content  shadow-lg ${theme.mode} `}>
              <MainTitle name="Login" styles="fs-2 pb-2 pt-1 mb-2" />
              <Form
                className="w-100"
                onSubmit={handleSubmit(onSubmit, onError)}
              >
                <Container>
                  <Row className="justify-content-center">
                    <Col lg="10" className="mb-3">
                      <InputFC
                        errors={errors}
                        register={register}
                        label="Email"
                        type="email"
                        count="3"
                        inputStyle={
                          errors?.email
                            ? `border-danger border-2 ${theme.mode}`
                            : `border-color-success ${theme.mode}`
                        }
                      />
                      <ErrorMessage errors={errors.email} />
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg="10" className="mb-3">
                      <InputFC
                        errors={errors}
                        register={register}
                        label="Password"
                        type={visible ? "text" : "password"}
                        count="4"
                        visible={visible}
                        setVisible={setVisible}
                        icon={true}
                        inputStyle={
                          errors?.password
                            ? `border-danger border-2 ${theme.mode}`
                            : `border-color-success ${theme.mode}`
                        }
                      />
                      <ErrorMessage errors={errors.password} />
                    </Col>
                    <Button
                      type="submit"
                      className="w-50 text-center mt-3 login-btn"
                    >
                      Login
                    </Button>
                    <div className="text-end">
                      <p className="text-muted my-2 p-0 m-0">Not a member?</p>
                      <Button
                        as={Link}
                        to={"/register"}
                        className="register-btn"
                      >
                        Register
                      </Button>
                    </div>
                  </Row>
                </Container>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
