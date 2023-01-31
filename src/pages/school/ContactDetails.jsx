import axios from "axios";
import React, { useEffect } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { API_URL } from "../../api/Api_index";
import MainTitle from "../../components/Main_title";
import { fetchContact } from "../../redux/slices/schoolSlice";

export default function ContactDetails() {
  const dispatch = useDispatch();
  const { contacts } = useSelector((state) => state.getSchool);
  const { theme } = useSelector((state) => state);
  console.log(contacts);
  useEffect(() => {
    dispatch(fetchContact());
  }, [dispatch]);
  function deleteMessage(id) {
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
        axios.delete(`${API_URL}/contacts/${id}`);
        dispatch(fetchContact());
      }
    });
  }
  return (
    <div className={`w-100 ${theme.mode}`}>
      <MainTitle name="Visitor Messages" />
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Country</th>
            <th>Province</th>
            <th>City</th>
            <th>Language</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((item) => {
            return (
              <tr key={item.id}>
                <td className="text-capitalize">
                  {item.firstname} {item.lastname}
                </td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td className="text-capitalize">{item.country}</td>
                <td className="text-capitalize">{item.province}</td>
                <td className="text-capitalize">{item.city}</td>
                <td className="text-capitalize">{item.language}</td>
                <td>{item.message}</td>
                <td>
                  <Button
                    onClick={() => deleteMessage(item.id)}
                    variant="outline-danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
