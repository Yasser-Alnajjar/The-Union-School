import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardMagic from "../components/card-magic/CardMagic";
import MainTitle from "../components/Main_title";
import { header } from "../helpers/authHelp";
import { goToTop } from "../utils/CapitalizeError";
export default function Classes() {
  const [usersData, setUsersData] = useState([]);
  const { theme } = useSelector((state) => state);
  useEffect(() => {
    axios
      .get("http://localhost:9000/users", {
        headers: {
          Authorization: header,
        },
      })
      .then((res) => setUsersData(res.data));
  }, []);
  return (
    <div className={`py-3 ${theme.mode}`}>
      <Container>
        <MainTitle name="Teachers" styles="fs-2" />
        <Row>
          {usersData.map((item) => {
            return (
              item.ifTeacher && (
                <Col lg="4" className="my-3  index" key={item.id}>
                  <CardMagic styles="fs-5">
                    <Card.Body>
                      <Card.Text className={` text-start p-2 rounded`}>
                        <p
                          className={` ${
                            theme.mode === "dark" ? "text-light" : "text-dark"
                          }`}
                        >
                          Name:{" "}
                          <span
                            className={`text-capitalize  ${
                              theme.mode === "dark" ? "text-info" : "text-light"
                            }`}
                          >
                            {item.firstname} {item.lastname}
                          </span>
                        </p>
                        <p
                          className={` text-capitalize  ${
                            theme.mode === "dark" ? "text-light" : "text-dark"
                          }`}
                        >
                          Language:{" "}
                          <span
                            className={` ${
                              theme.mode === "dark" ? "text-info" : "text-light"
                            }`}
                          >
                            {item.language}
                          </span>
                        </p>
                        <p
                          className={` text-center pt-3 ${
                            theme.mode === "dark" ? "" : "text-light"
                          }`}
                        >
                          <span
                            className={` w-100 d-block  ${
                              theme.mode === "dark" ? "text-light" : "text-dark"
                            }`}
                          >
                            Description
                          </span>
                          {item.description}
                        </p>
                      </Card.Text>
                      <Card.Text className="text-center pb-3">
                        <Button
                          as={Link}
                          to={`/teachers/${item.id}`}
                          variant={theme.mode === "dark" ? "light" : "dark"}
                          className="ms-auto"
                          onClick={() => goToTop()}
                        >
                          Details
                        </Button>
                      </Card.Text>
                    </Card.Body>
                  </CardMagic>
                </Col>
              )
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
