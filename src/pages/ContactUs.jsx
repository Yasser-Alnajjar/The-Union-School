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
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { object, string } from "yup";
import ErrorMessage from "../components/Forms/ErrorMessage";
import InputFC from "../components/Forms/Input";
import MainTitle from "../components/Main_title";
import { rgxPhone } from "../helpers/authHelp";
import { postContact } from "../redux/slices/schoolSlice";
import { capitalizeError } from "../utils/CapitalizeError";

export default function ContactUs() {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let schema = object({
    firstname: string().trim().required().min(4).max(20),
    lastname: string().trim().required().min(4).max(20),
    email: string().trim().email().required(),
    message: string().trim().required(),
    phone: string()
      .trim()
      .matches(rgxPhone, `Phone number is not valid && Must be egyption number`)
      .required()
      .min(11)
      .max(11),
  });

  function onError(error) {
    capitalizeError(error.email);
    capitalizeError(error.firstname);
    capitalizeError(error.lastname);
    capitalizeError(error.phone);
    capitalizeError(error.message);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const onSubmit = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: "if you accepted you will navigate to Home",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      background: theme.mode === "dark" ? "#212529" : "#f1f5f9",
      color: theme.mode === "dark" ? "#f1f5f9" : "#212529",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postContact(data));
        navigate("/");
      }
    });
  };
  return (
    <div className={`py-4 ${theme.mode}`}>
      <MainTitle name="Request Contact Us" />
      <p className={`text-center fs-5 ${theme.mode}`}>
        Complete the form below if you have questions or would like additional
        information. ⤵️
      </p>
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
      <Form className="py-3" onSubmit={handleSubmit(onSubmit, onError)}>
        <Container className="d-flex justify-content-center">
          <div className=" w-75">
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
                  label="Phone"
                  type="phone"
                  count="7"
                  inputStyle={
                    errors?.phone
                      ? `border-danger border-2 ${theme.mode}`
                      : `border-color-success ${theme.mode}`
                  }
                />
                <ErrorMessage errors={errors.phone} />
              </Col>
            </Row>
            <Row>
              <Col className="mb-3">
                <FloatingLabel
                  controlId="floatingTextarea10"
                  label="Your Message"
                >
                  <Form.Control
                    {...register("message")}
                    as="textarea"
                    style={{ height: 100 }}
                    placeholder="Leave a Description here"
                    className={
                      errors?.message
                        ? `border-danger border-2 w-100 ${theme.mode}`
                        : `border-color-success  w-100 ${theme.mode}`
                    }
                  />
                </FloatingLabel>
                <ErrorMessage errors={errors.message} />
              </Col>
            </Row>
            <div className="text-center">
              <Button
                className={`w-25 `}
                variant={`outline-${theme.mode === "dark" ? "info" : "dark"}`}
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </Container>
      </Form>
    </div>
  );
}
