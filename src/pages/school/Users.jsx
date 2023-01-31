import React, { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../api/Api_index";
import { header } from "../../helpers/authHelp";
import { fetchUsers } from "../../redux/slices/schoolSlice";
import { useForm } from "react-hook-form";

export default function Users() {
  const schoolState = useSelector((state) => state.getSchool);
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState({ current: "teachers" });
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => setCurrent(data);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  const deleteUser = (id) => {
    fetch(`${API_URL}/users/${id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: header,
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(fetchUsers()));
  };
  return (
    <div
      className={`w-100 ${
        theme.mode === "dark" ? "bg-dark text-light" : theme.mode
      }`}
    >
      <div className="d-flex align-items-center justify-content-around">
        <h3 className="main-title my-2">Users 👨‍👩‍👧‍👦</h3>
        <Form
          className="text-center w-25 m-2"
          onChange={handleSubmit(onSubmit)}
        >
          <Form.Select
            className={`w-75 ${theme.mode}`}
            {...register("current")}
          >
            <option value="teachers">Teachers</option>
            <option value="students">Students</option>
          </Form.Select>
        </Form>
      </div>
      {current.current === "teachers" ? (
        <Table
          style={{ transition: ".5s ease-in-out" }}
          className="text-center p-0 m-0"
          striped
          bordered
          hover
          variant={theme.mode}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Language</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schoolState.users.map(
              (user) =>
                user.ifTeacher && (
                  <tr key={`teachers-${user.id}`}>
                    <td>{user.id}</td>
                    <td>
                      {user.firstname} {user.lastname}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.language}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Button
                        onClick={() => deleteUser(user.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      ) : (
        <Table
          style={{ transition: ".5s ease-in-out" }}
          className="text-center p-0 m-0"
          striped
          bordered
          hover
          variant={theme.mode}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Stages</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schoolState.users.map(
              (user) =>
                user.ifStudent && (
                  <tr key={`students-${user.id}`}>
                    <td>{user.id}</td>
                    <td>
                      {user.firstname} {user.lastname}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.stages}</td>
                    <td>{user.age}</td>
                    <td>{user.phone}</td>
                    <td>
                      <Button
                        onClick={() => deleteUser(user.id)}
                        variant="danger"
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
}
