import "./login.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Container } from "react-bootstrap";
import FormComponent from "../components/FormComponent";
import MainTitle from "../components/Main_title";
import { useSelector } from "react-redux";
export default function RegisterComponent() {
  const { theme } = useSelector((state) => state);
  return (
    <div className={`main ${theme.mode}`}>
      <Container>
        <Row className="justify-content-center text-center">
          <Col md="6" className="index">
            <section className="register">
              <div className={`content shadow-lg ${theme.mode}`}>
                <MainTitle name="Register" styles="fs-2 pb-2 pt-1 mb-2" />
                <FormComponent />
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
