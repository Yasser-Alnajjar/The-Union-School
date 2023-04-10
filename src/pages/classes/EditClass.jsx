import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { object, string } from "yup";
import { API_URL } from "../../api/Api_index";
import ErrorMessage from "../../components/Forms/ErrorMessage";
import InputFC from "../../components/Forms/Input";
import MainTitle from "../../components/Main_title";
import { header, user } from "../../helpers/authHelp";
import { capitalizeError } from "../../utils/CapitalizeError";

export default function EditClassSchool() {
  const { id: idParams } = useParams();
  const [editClassData, setEditClassData] = useState({});
  const { theme } = useSelector((state) => state);

  const navigate = useNavigate();
  let schema = object({
    lecture: string().trim().required(),
    place: string().trim().required(),
    gradeTarget: string().trim().required(),
    time: string().required(),
  });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

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
        axios.patch(`${API_URL}/classes/${idParams}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: header,
          },
        });
        navigate("/admin-teachers");
      }
    });

    console.log(data);
  };
  function onError(error) {
    capitalizeError(error.lecture);
    capitalizeError(error.place);
    capitalizeError(error.gradeTarget);
    capitalizeError(error.time);
  }

  async function getSingleClass(id) {
    const res = await axios.get(`${API_URL}/classes/${id}`, {
      headers: { Authorization: header },
    });
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    getSingleClass(idParams).then((data) => setEditClassData(data));
  }, [idParams]);
  useEffect(() => {
    setValue("lecture", user.language);
    setValue("place", editClassData.place);
    setValue("gradeTarget", editClassData.gradeTarget);
    setValue("day", editClassData.day);
    setValue("time", editClassData.time);
    setValue("userId", editClassData.userId);
  }, [editClassData, setValue]);
  console.log(editClassData.userId);
  return (
    <div
      className={`w-100 ${
        theme.mode === "dark" ? "bg-dark text-light" : theme.mode
      }`}
    >
      <MainTitle name="Admin Edit Class 🖋️" />
      <Container>
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
                    <option value="First">First Grade</option>
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
              Save
            </Button>
          </Container>
        </Form>
      </Container>
    </div>
  );
}
