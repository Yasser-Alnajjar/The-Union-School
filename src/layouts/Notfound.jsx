import { Button, Col, Container, Row } from "react-bootstrap";
// import notFoundImg from "../images/not found.png";
import { FaArrowLeft } from "react-icons/fa";
import "./Errorpage.css";
import { Link } from "react-router-dom";
export default function Notfound() {
  return (
    <>
      <section className="page_404">
        <Container>
          <Row>
            <Col sm="12">
              <div className="text-center">
                <div
                  className="four_zero_four_bg"
                  style={{
                    backgroundImage: "url(images/dribbble_1.gif)",
                    backgroundPosition: "center",
                  }}
                >
                  <h1 className="text-center text-dark">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>
                  <p>The page you are looking for not available!</p>
                  <Button as={Link} to="/" className="link_404  text-center">
                    <FaArrowLeft /> Go Home
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
