import axios from "axios";
import React, { useEffect } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../api/Api_index";
import MainTitle from "../components/Main_title";
import { header, user } from "../helpers/authHelp";
import { allClassData, userClasses } from "../redux/slices/dashboardSlice";
// ? Dashboard Teachers
export default function Dashboard() {
  const { dashboard } = useSelector((state) => state);
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userClasses(user.id));
  }, [dispatch]);
  console.log(dashboard.userClasses);
  function deleteClass(id) {
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
        axios
          .delete(`${API_URL}/classes/${id}`, {
            headers: { Authorization: header },
          })
          .then((res) => {
            dispatch(userClasses(user.id));
          });
      }
    });
  }

  return (
    <div className={`dashboard w-100 ${theme.mode}`}>
      <MainTitle name="Dashborad - Teachers 📰" />
      <Table
        style={{ transition: ".5s ease-in-out" }}
        className="text-center p-0 m-0"
        striped
        bordered
        responsive
        hover
        variant={theme.mode}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Lecture</th>
            <th>Place</th>
            <th>Day</th>
            <th>Time</th>
            <th>Grade Targe</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dashboard.userClasses.map((item, index) => {
            return (
              user.id === item.userId && (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.lecture}</td>
                  <td>{item.place}</td>
                  <td>{item.day}</td>
                  <td>{item.time === "00:00" ? "12:00 " : item.time}</td>
                  <td>{item.gradeTarget}</td>
                  <td style={{ width: 120 }}>
                    <ButtonGroup>
                      <Button
                        as={Link}
                        to={`/admin-teachers/editclass/${item.id}`}
                        variant="outline-info"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => deleteClass(item.id)}
                        variant="outline-danger"
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              )
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
