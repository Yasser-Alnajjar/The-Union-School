import { useEffect } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchool, fetchUsers } from "../../redux/slices/schoolSlice";
import { Link, useNavigate } from "react-router-dom";
import { allClassData } from "../../redux/slices/dashboardSlice";
import { header } from "../../helpers/authHelp";
import { API_URL } from "../../api/Api_index";
import Swal from "sweetalert2";
import MainTitle from "../../components/Main_title";
import { Fragment } from "react";

export default function SchoolDashborad() {
  const { dashboard } = useSelector((state) => state.dashboard);
  const getSchool = useSelector((state) => state.getSchool);
  const { theme } = useSelector((state) => state);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allClassData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchSchool());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  function deleteClass(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "if you accepted you will navigate to dashboard",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${API_URL}/classes/${id}`, {
          method: "delete",
          headers: {
            Authorization: header,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data === "jwt expired") {
              localStorage.removeItem("user");
              navigate("/login");
            }
          });
        dispatch(allClassData());
        dispatch(fetchSchool());
        dispatch(fetchUsers());
        navigate("/admin");
      }
    });
  }
  return (
    <div
      className={`dashboard w-100 ${
        theme.mode === "dark" ? "bg-dark text-light" : theme.mode
      }`}
    >
      <MainTitle name="Dashboard 📰" />
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
            <th>Lecture</th>
            <th>Place</th>
            <th>Day</th>
            <th>Time</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dashboard.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                {getSchool.users.map((user) => {
                  return (
                    user.id === item.userId && (
                      <Fragment key={user.id}>
                        <td>{user.firstname}</td>
                      </Fragment>
                    )
                  );
                })}
                <td className="text-capitalize">{item.lecture}</td>
                <td className="text-capitalize">{item.place}</td>
                <td className="text-capitalize">{item.day}</td>
                <td className="text-capitalize">
                  {item.time === "00:00" ? "12:00 " : item.time}
                </td>
                <td className="text-capitalize">{item.gradeTarget}</td>
                <td className="text-capitalize" style={{ width: 120 }}>
                  <ButtonGroup>
                    <Button
                      as={Link}
                      to={`/admin/editclass/${item.id}`}
                      variant="outline-info"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        deleteClass(item.id);
                      }}
                      variant="outline-danger"
                    >
                      Delete
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
