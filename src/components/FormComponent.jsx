import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { fetchSchool } from "../redux/slices/schoolSlice";
import InputFC from "./Forms/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import ErrorMessage from "./Forms/ErrorMessage";
import { getMembers, registerAction } from "../redux/slices/user/userSlice";
import { rgxPhone } from "../helpers/authHelp";
import { capitalizeError } from "../utils/CapitalizeError";

export default function FormComponent() {
  const schoolState = useSelector((state) => state.getSchool);
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [visible, setVisible] = useState(false);

  const handleUserChange = (e) => {
    setCurrentUser(e.target.value);
  };
  let schema;
  if (currentUser === "Teacher") {
    schema = object({
      firstname: string().trim().required().min(4).max(20),
      lastname: string().trim().required().min(4).max(20),
      password: string().trim().required().min(8).max(20),
      email: string().trim().email().required(),
      language: string().trim().required(),
      description: string().trim().required(),
      phone: string()
        .trim()
        .matches(
          rgxPhone,
          `Phone number is not valid && Must be egyption number`
        )
        .required()
        .min(11)
        .max(11),
      birth: string()
        .required()
        .matches(/^(\d{1,2})-(\d{1,2})-(\d{4})$/, {
          message: "Value must be matched to (d-m-y)",
        })
        .trim(),
      address: string()
        .trim()
        .required("filed is required plase set your governorate"),
    });
  } else {
    schema = object({
      birth: string()
        .required()
        .matches(/^(\d{1,2})-(\d{1,2})-(\d{4})$/, {
          message: "Value must be matched to (d-m-y)",
        })
        .trim(),
      address: string()
        .trim()
        .required("filed is required plase set your governorate"),
      firstname: string().trim().required().max(20),
      lastname: string().trim().required().max(20),
      password: string().trim().required().max(20),
      email: string().trim().email().required(),
      phone: string()
        .trim()
        .matches(
          rgxPhone,
          `Phone number is not valid && Must be egyption number`
        )
        .required()
        .min(11)
        .max(11),
    });
  }

  function onError(error) {
    capitalizeError(error.email);
    capitalizeError(error.firstname);
    capitalizeError(error.lastname);
    capitalizeError(error.language);
    capitalizeError(error.phone);
    capitalizeError(error.password);
    capitalizeError(error.address);
    capitalizeError(error.birth);
  }

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
    if (data.stages) {
      setValue("ifStudent", true);
    } else if (data.language) {
      setValue("ifTeacher", true);
    }
    dispatch(registerAction(data));
  };
  useEffect(() => {
    getMembers().then((data) => {
      setMembers(data);
    });
  }, []);
  useEffect(() => {
    dispatch(fetchSchool());
  }, [dispatch]);
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <Container>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={true}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={true}
          theme={theme.mode}
        />
        <Row className="justify-content-center mb-3 text-center">
          <Col md={currentUser === "Student" ? 6 : 8}>
            <FloatingLabel controlId="floatingTextarea10" label="Accessibility">
              <Form.Select
                className={theme.mode}
                value={currentUser}
                onChange={handleUserChange}
              >
                {members.map((item) => {
                  return (
                    <Fragment key={`members${item.id}`}>
                      <option value={item.title}>{item.title}</option>
                    </Fragment>
                  );
                })}
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
        {currentUser === "" || currentUser === "Select" ? (
          <p
            className={` fs-5 ${
              theme.mode === "dark" ? "text-warning" : "text-danger"
            }`}
          >
            Please Choose Your Accessibility
          </p>
        ) : (
          <>
            <Row>
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
                  lableStyle={
                    errors?.lastname ? "text-danger" : "text-black-50"
                  }
                />
                <ErrorMessage errors={errors.lastname} />
              </Col>
            </Row>
            <Row>
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
              <Col sm="12" lg="6" className="mb-3">
                <InputFC
                  errors={errors}
                  register={register}
                  label="Password"
                  type={!visible ? "password" : "text"}
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
            </Row>
            <Row>
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
              <Col sm="12" lg="6" className="mb-3">
                <InputFC
                  errors={errors}
                  register={register}
                  label="Birthday example (1-1-2000)"
                  type="birth"
                  count="6"
                  inputStyle={
                    errors?.birth
                      ? `border-danger border-2 ${theme.mode}`
                      : `border-color-success ${theme.mode}`
                  }
                />
                <ErrorMessage errors={errors.birth} />
              </Col>
              <Col sm="12" lg="6" className="mb-3">
                <InputFC
                  errors={errors}
                  register={register}
                  label="Address expable (giza)"
                  type="address"
                  count="7"
                  inputStyle={
                    errors?.address
                      ? `border-danger border-2 ${theme.mode}`
                      : `border-color-success ${theme.mode}`
                  }
                />
                <ErrorMessage errors={errors.address} />
              </Col>
              {currentUser === "Teacher" && (
                <>
                  <Col sm="12" lg="6" className="mb-3">
                    <InputFC
                      errors={errors}
                      register={register}
                      label="Language"
                      type="language"
                      count="8"
                      inputStyle={
                        errors?.language
                          ? `border-danger border-2 ${theme.mode}`
                          : `border-color-success ${theme.mode}`
                      }
                    />
                    <ErrorMessage errors={errors.language} />
                  </Col>
                  <Col className="mb-3">
                    <FloatingLabel
                      controlId="floatingTextarea9"
                      label="Description"
                    >
                      <Form.Control
                        onChange={(e) => console.log(e.target.value)}
                        {...register("description")}
                        as="textarea"
                        placeholder="Leave a Description here"
                        className={
                          errors?.description
                            ? `border-danger border-2 w-100 ${theme.mode}`
                            : `border-color-success  w-100 ${theme.mode}`
                        }
                      />
                    </FloatingLabel>
                    <ErrorMessage errors={errors.description} />
                  </Col>
                </>
              )}
              {currentUser === "Student" && (
                <Col sm="12" lg="6">
                  <FloatingLabel controlId="floatingTextarea10" label="Stages">
                    <Form.Select className={theme.mode} {...register("stages")}>
                      {schoolState.school.stages.map((item) => {
                        return (
                          <Fragment key={`stages${item.id}`}>
                            <option value={item.class}>{item.class}</option>
                          </Fragment>
                        );
                      })}
                    </Form.Select>
                  </FloatingLabel>
                </Col>
              )}
            </Row>
            <Button className={`w-50 register-btn mt-3`} type="submit">
              Register
            </Button>
          </>
        )}
      </Container>
    </Form>
  );
}
