import axios from "axios";
import { useEffect } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "../../api/Api_index";
import MainTitle from "../../components/Main_title";
import { header } from "../../helpers/authHelp";
import { fetchSchedule } from "../../redux/slices/schoolSlice";

export default function Schedule() {
  const { schedule } = useSelector((state) => state.getSchool);
  const { theme } = useSelector((state) => state);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchSchedule());
  }, [dispatch]);
  const deleteSchedule = (id) => {
    axios
      .delete(`${API_URL}/schedule/${id}`, {
        headers: { Authorization: header },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(fetchSchedule());
      });
  };
  return (
    <div
      className={`w-100 ${
        theme.mode === "dark" ? "bg-dark text-light" : theme.mode
      }`}
    >
      <MainTitle name="Schedules 📅" />
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
            <th>Teacher Name</th>
            <th>Lecture</th>
            <th>Day</th>
            <th>Time</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((item, index) => {
            return (
              <tr key={item.id}>
                <td className="text-capitalize">{index + 1}</td>
                <td className="text-capitalize">{item.teacherName}</td>
                <td className="text-capitalize">{item.language}</td>
                <td className="text-capitalize">{item.day}</td>
                <td className="text-capitalize">
                  {item.time === "00:00" ? "12:00 " : item.time}
                </td>
                <td className="text-capitalize">{item.gradeTarget}</td>
                <td style={{ width: 120 }}>
                  <ButtonGroup>
                    <Button
                      as={Link}
                      to={`/admin/editschedule/${item.id}`}
                      variant="outline-info"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteSchedule(item.id)}
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
