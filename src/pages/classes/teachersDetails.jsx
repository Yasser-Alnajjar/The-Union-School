import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import MainTitle from "../../components/Main_title";
import { user } from "../../helpers/authHelp";
import { allClassData } from "../../redux/slices/dashboardSlice";
import ListClass from "./List-Class";

export default function ClassesDetails() {
  const { id } = useParams();
  const { theme } = useSelector((state) => state);
  const { dashboard } = useSelector((state) => state.dashboard);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allClassData());
  }, [dispatch]);
  return (
    <>
      <div className={`py-5 ${theme.mode}`}>
        <MainTitle name="Class Details" />
        <Container>
          <Row className="gap-2 justify-content-center">
            {dashboard.map((item) => {
              return +id === item.userId && user.stages === item.gradeTarget ? (
                <Col
                  sm="12"
                  md="6"
                  lg="3"
                  className={`hover_card_class rounded mb-4 shadow ${theme.mode}`}
                  key={item.id}
                >
                  <ListClass item={item.lecture} name="Lecture" />
                  <ListClass item={item.day} name="Day" />
                  <ListClass item={item.time} name="Time" />
                  <ListClass item={item.place} name="Place" />
                  <ListClass item={item.gradeTarget} name="Grade" />
                </Col>
              ) : +id === item.userId && user.ifStudent === false ? (
                <Col
                  sm="12"
                  md="6"
                  lg="3"
                  className={`rounded shadow ${theme.mode}`}
                  key={item.id}
                >
                  <ListClass item={item.lecture} name="Lecture" />
                  <ListClass item={item.place} name="Place" />
                  <ListClass item={item.day} name="Day" />
                  <ListClass item={item.time} name="Time" />
                  <ListClass item={item.gradeTarget} name="Grade" />
                </Col>
              ) : (
                +id === item.userId &&
                user.ifTeacher && (
                  <Col
                    sm="12"
                    md="6"
                    lg="3"
                    className={`rounded shadow ${theme.mode}`}
                    key={item.id}
                  >
                    <ListClass item={item.lecture} name="Lecture" />
                    <ListClass item={item.place} name="Place" />
                    <ListClass item={item.day} name="Day" />
                    <ListClass item={item.time} name="Time" />
                    <ListClass item={item.gradeTarget} name="Grade" />
                  </Col>
                )
              );
            })}
          </Row>
        </Container>
      </div>
    </>
  );
}
