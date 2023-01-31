import React from "react";
import { Table } from "react-bootstrap";
import { user } from "../helpers/authHelp";

export default function TableComponent({ grade, schedule, theme, currentDay }) {
  return (
    <>
      {user.ifTeacher && (
        <Table
          striped
          bordered
          className="text-center shadow"
          variant={theme.mode}
          hover
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Lectuer</th>
              <th>Appointment</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item) =>
              user.ifTeacher &&
              item.gradeTarget === grade &&
              item.day === currentDay.toLocaleLowerCase() ? (
                <tr key={item.id}>
                  <td>{item.teacherName}..</td>
                  <td>{item.language}</td>
                  <td>{item.time === "00:00" ? "12:00" : item.time}</td>
                  <td>{item.gradeTarget}</td>
                </tr>
              ) : user.admin && item.day === currentDay.toLocaleLowerCase() ? (
                <tr key={item.id}>
                  <td>{item.teacherName}</td>
                  <td>{item.language}</td>
                  <td>{item.time === "00:00" ? "12:00" : item.time}</td>
                  <td>{item.gradeTarget}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
      )}
      {user.admin && (
        <Table
          striped
          bordered
          className="text-center shadow"
          variant={theme.mode}
          hover
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Lectuer</th>
              <th>Appointment</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item) =>
              user.admin &&
              item.gradeTarget === grade &&
              item.day === currentDay.toLocaleLowerCase() ? (
                <tr key={item.id}>
                  <td>{item.teacherName}</td>
                  <td>{item.language}</td>
                  <td>{item.time === "00:00" ? "12:00" : item.time}</td>
                  <td>{item.gradeTarget}</td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
      )}
    </>
  );
}
