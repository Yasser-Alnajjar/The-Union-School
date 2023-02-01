import React from "react";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { useLoaderData, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { object, string } from "yup";
import { API_URL } from "../api/Api_index";
import { header, rgxPhone, user } from "../helpers/authHelp";
import InputFC from "../components/Forms/Input";
import { useEffect } from "react";
import { userData } from "../redux/slices/user/userSlice";
import ErrorMessage from "../components/Forms/ErrorMessage";
import MainTitle from "../components/Main_title";
import Swal from "sweetalert2";
import { capitalizeError } from "../utils/CapitalizeError";

export default function EditProfile() {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let schema = object({
    firstname: string().required().min(4).max(20).trim(),
    lastname: string().required().min(4).max(20).trim(),
    phone: string()
      .trim()
      .matches(rgxPhone, `Phone number is not valid && Must be egyption number`)
      .required()
      .min(11)
      .max(11),
    email: string().email().trim().required(),
  });
  useEffect(() => {
    dispatch(userData(user.id));
  }, [dispatch]);
  let dataUser = useLoaderData();
  console.log("dataUser", dataUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: dataUser.firstname,
      lastname: dataUser.lastname,
      email: dataUser.email,
      phone: dataUser.phone,
      description: dataUser.description,
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure ?",
      text: "if you accepted you will navigate to Profile",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      background: theme.mode === "dark" ? "#212529" : "#f1f5f9",
      color: theme.mode === "dark" ? "#f1f5f9" : "#212529",
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
        axios.patch(`${API_URL}/users/${user.id}`, data, {
          headers: {
            Authorization: header,
          },
        });
      }
    });
  };

  function onError(error) {
    capitalizeError(error.email);
    capitalizeError(error.firstname);
    capitalizeError(error.lastname);
    capitalizeError(error.phone);
  }
  return (
    <div className={`py-5 ${theme.mode}`}>
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
      <Container>
        <MainTitle name="Edit Profile" styles="mb-4" />
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
          <Row className="justify-content-center">
            <Col sm="12" lg="6" className="mb-3">
              <InputFC
                errors={errors}
                register={register}
                label="First Name"
                type="firstname"
                count="1"
                inputStyle={
                  errors?.firstname
                    ? `border-danger border-2 ${theme.mode}`
                    : `border-color-success ${theme.mode}`
                }
              />
              <ErrorMessage errors={errors.firstname} />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm="12" lg="6" className="mb-3">
              <InputFC
                errors={errors}
                register={register}
                label="Last Name"
                type="lastname"
                count="2"
                inputStyle={
                  errors?.lastname
                    ? `border-danger border-2 ${theme.mode}`
                    : `border-color-success ${theme.mode}`
                }
                lableStyle={errors?.lastname ? "text-danger" : "text-black-50"}
              />
              <ErrorMessage errors={errors.lastname} />
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm="12" lg="6" className="mb-3">
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
            <Col sm="12" lg="6" className="mb-3">
              <InputFC
                errors={errors}
                register={register}
                label="Phone"
                type="phone"
                count="5"
                inputStyle={
                  errors?.phone
                    ? `border-danger border-2 ${theme.mode}`
                    : `border-color-success ${theme.mode}`
                }
              />
              <ErrorMessage errors={errors.phone} />
            </Col>
          </Row>
          {user.ifTeacher ||
            (user.admin && (
              <Row className="justify-content-center">
                <Col className="mb-3" sm="12" lg="6">
                  <FloatingLabel
                    controlId="floatingTextarea10"
                    label="Description"
                  >
                    <Form.Control
                      onChange={(e) => console.log(e.target.value)}
                      {...register("description")}
                      as="textarea"
                      placeholder="Leave a Description here"
                      style={{ height: 100 }}
                      className={
                        errors?.description
                          ? `border-danger border-2 w-100 ${theme.mode}`
                          : `border-color-success  w-100 ${theme.mode}`
                      }
                    />
                  </FloatingLabel>
                  <ErrorMessage errors={errors.description} />
                </Col>
              </Row>
            ))}
          <div className="d-flex align-items-center justify-content-center pt-3">
            <Button
              type="submit"
              variant={theme.mode === "dark" ? "info" : "primary"}
            >
              Save
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}
