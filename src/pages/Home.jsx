import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
// import image3 from "../images/blog.jpg";
import { fetchSchool } from "../redux/slices/schoolSlice";
import { FaUserGraduate, FaUserTie } from "react-icons/fa";
import { FcDataBackup } from "react-icons/fc";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import Mission from "../components/homePage/Mission";
import CarouselComponent from "../components/carousel";
import { userData } from "../redux/slices/user/userSlice";
import MainTitle from "../components/Main_title";

export default function Home() {
  const schoolState = useSelector((state) => state.getSchool);
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchSchool());
  }, []);
  return (
    <div className={`home ${theme.mode}`}>
      <div className="custom-h">
        <div className="overlay">
          <Container className="mt-5">
            <Row className="mt-5">
              <Col className="mt-5" md="6">
                <div className="text-white mt-3 p-5 text-center">
                  <h1 className="">{schoolState.school.title}</h1>
                  <p className="fs-5">{schoolState.school.description}</p>
                </div>
              </Col>
              <Col md="6" className="d-none d-lg-block">
                <img
                  src="images/header_Homepage-1.png"
                  height={"100%"}
                  width={"100%"}
                  className="img-fluid img-responsive"
                  alt=""
                />
              </Col>
            </Row>
          </Container>
        </div>
        <img
          src="images/header_Homepage_background.png"
          height={"100%"}
          width={"100%"}
          className="img-fluid img-responsive"
          alt=""
        />
      </div>
      <div className="spike"></div>
      <div className="mission my-5">
        <Container>
          <Row className="justify-content-center">
            <Col className="my-5" lg="8">
              <div className="mission-hedaer w-100">
                <h1 className="fs-3 text-center">
                  Mission-critical Mission-critical classroom management
                  software for Chromebooks. Powering learning anywhere, anytime
                </h1>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg="6" md="6" sm="12">
              <Mission
                title="Are you ready !!"
                desc=" for seamless learning face to face or remote? Do your tech tools impact learning? Do your teachers have the tools they need to evolve their digital practice? Is your school district teaching students in the way they want to learn?"
              />
            </Col>
            <Col lg="6" md="6" sm="12">
              <Mission
                title="Classroom"
                desc="We have the classroom management software teachers and educational leaders need to transform learning. Hāpara makes digital instruction and learning flexible, engaging and safe."
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className="featuer my-5 w-100">
        <Container>
          <Row className="justify-content-center">
            <Col className="my-5" lg="8">
              <MainTitle name="Features" />
            </Col>
          </Row>
          <Row>
            <Col lg="4" sm="12">
              <Mission
                icon={<FcDataBackup />}
                title="Home Base"
                desc=" our home base with rich lessons and activities, deeper learning experiences, and a place that makes all of these apps make sense"
              />
            </Col>
            <Col lg="4" sm="12">
              <Mission
                icon={<FaUserGraduate style={{ color: "#c43062" }} />}
                title="Students "
                desc="Union offers a rich classroom management system that allows students to see all their classes and schedules."
              />
            </Col>
            <Col lg="4" sm="12">
              <Mission
                icon={<FaUserTie className="text-warning" />}
                title="Teachers "
                desc="All teachers can add classes to them or modify the classes that already exist, and everyone can modify their personal files"
              />
            </Col>
          </Row>
        </Container>
      </div>
      <CarouselComponent />
    </div>
  );
}
