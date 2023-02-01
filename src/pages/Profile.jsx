import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useLoaderData } from "react-router-dom";
import ColProfile from "../components/ColProfile";
import MainTitle from "../components/Main_title";
export default function Profile() {
  const { theme } = useSelector((state) => state);
  let dataUser = useLoaderData();

  console.log("userdata", dataUser);
  return (
    <div className={theme.mode}>
      <MainTitle name="Profile" styles="my-4" />
      <Container>
        <Row className="justify-content-center">
          <ColProfile
            rece={`${dataUser.firstname} ${dataUser.lastname}`}
            icon="🧑‍💻"
            name="Username"
            theme={theme}
          />
        </Row>
        <Row className="justify-content-center">
          <ColProfile
            rece={dataUser.birth}
            icon="🎂"
            name={dataUser.admin ? "Creation Time" : "Birthday"}
            theme={theme}
          />
        </Row>
        <Row className="justify-content-center">
          <ColProfile
            rece={dataUser.email}
            icon="📬"
            name="email"
            theme={theme}
          />
        </Row>
        <Row className="justify-content-center">
          <ColProfile
            rece={dataUser.phone}
            icon="📞"
            name="phone"
            theme={theme}
          />
        </Row>
        {dataUser.language && (
          <Row className="justify-content-center">
            <ColProfile
              rece={dataUser.language}
              icon="📖"
              name="Language"
              theme={theme}
            />
          </Row>
        )}
        <div className="d-flex justify-content-center gap-3 pb-3">
          <Button
            as={Link}
            to="/"
            variant="transparent"
            className={
              theme.mode === "dark"
                ? "bg-danger text-light"
                : "bg-dark text-light"
            }
          >
            Back To Home
          </Button>
          <Button
            as={Link}
            to="/profile/edit"
            variant={theme.mode === "dark" ? "info" : "danger"}
          >
            Edit Profile
          </Button>
        </div>
      </Container>
    </div>
  );
}
