import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CardMagic from "../../components/card-magic/CardMagic";
import MainTitle from "../../components/Main_title";
import TableComponent from "../../components/Table-Component";
import { user } from "../../helpers/authHelp";
import { fetchSchedule } from "../../redux/slices/schoolSlice";

export default function SchedulePage() {
  const { schedule } = useSelector((state) => state.getSchool);
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  let currentDay = new Date().toLocaleString("en-us", { weekday: "long" });
  useEffect(() => {
    dispatch(fetchSchedule());
  }, []);

  return (
    <div className={`py-3 ${theme.mode}`}>
      <MainTitle name="Schedules" styles="fs-2 my-3" />
      <Container>
        <p className="py-2 fs-4 text-capitalize">{currentDay}</p>
        <Row>
          {user.ifStudent && (
            <Col className="index">
              <Table
                striped
                bordered
                className="text-center shadow-sm"
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
                    user.ifStudent &&
                    item.day === currentDay.toLocaleLowerCase() &&
                    item.gradeTarget === user.stages ? (
                      <tr key={item.id}>
                        <td className="text-capitalize">
                          {item.teacherName.slice(0, 20)}
                        </td>
                        <td className="text-capitalize">{item.language}</td>
                        <td className="text-capitalize">
                          {item.time === "00:00" ? "12:00" : item.time}
                        </td>
                        <td className="text-capitalize">{item.gradeTarget}</td>
                      </tr>
                    ) : null
                  )}
                </tbody>
              </Table>
            </Col>
          )}
          {user.ifTeacher && (
            <>
              <Col className="index">
                <CardMagic>
                  <TableComponent
                    grade="Frist"
                    theme={theme}
                    currentDay={currentDay}
                    schedule={schedule}
                  />
                </CardMagic>
              </Col>
              <Col className="index">
                <CardMagic>
                  <TableComponent
                    grade="Second"
                    theme={theme}
                    currentDay={currentDay}
                    schedule={schedule}
                  />
                </CardMagic>
              </Col>
              <Col className="index">
                <CardMagic>
                  <TableComponent
                    grade="Third"
                    theme={theme}
                    currentDay={currentDay}
                    schedule={schedule}
                  />
                </CardMagic>
              </Col>
            </>
          )}
          {user.admin && (
            <>
              <Col className="index">
                <CardMagic>
                  <TableComponent
                    grade="Frist"
                    theme={theme}
                    currentDay={currentDay}
                    schedule={schedule}
                  />
                </CardMagic>
              </Col>
              <Col className="index">
                <CardMagic>
                  <TableComponent
                    grade="Second"
                    theme={theme}
                    currentDay={currentDay}
                    schedule={schedule}
                  />
                </CardMagic>
              </Col>
              <Col className="index">
                <CardMagic>
                  <TableComponent
                    grade="Third"
                    theme={theme}
                    currentDay={currentDay}
                    schedule={schedule}
                  />
                </CardMagic>
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
}
