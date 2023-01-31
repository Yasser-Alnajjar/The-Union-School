import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "../api/Api_index";
import ColProfile from "../components/ColProfile";
import MainTitle from "../components/Main_title";
import { user } from "../helpers/authHelp";

export default function Profile() {
  const { theme } = useSelector((state) => state);
  const [userdata, setUserdata] = useState({});
  useEffect(() => {
    axios
      .get(`${API_URL}/users/${user.id}`)
      .then((res) => setUserdata(res.data));
  }, []);
  console.log("userdata", userdata);
  return (
    <div className={theme.mode}>
      <MainTitle name="Profile" styles="my-4" />
      <Container>
        <Row className="justify-content-center">
          <ColProfile
            rece={`${userdata.firstname} ${userdata.lastname}`}
            icon="🧑‍💻"
            name="Username"
            theme={theme}
          />
        </Row>
        <Row className="justify-content-center">
          <ColProfile
            rece={userdata.birth}
            icon="🎂"
            name={userdata.admin ? "Creation Time" : "Birthday"}
            theme={theme}
          />
        </Row>
        <Row className="justify-content-center">
          <ColProfile
            rece={userdata.email}
            icon="📬"
            name="email"
            theme={theme}
          />
        </Row>
        <Row className="justify-content-center">
          <ColProfile
            rece={userdata.phone}
            icon="📞"
            name="phone"
            theme={theme}
          />
        </Row>
        {userdata.language && (
          <Row className="justify-content-center">
            <ColProfile
              rece={userdata.language}
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
