import React from "react";
import { Col, Row } from "react-bootstrap";
import "./Footer.css";
import {
  FaFacebookF,
  FaHourglassStart,
  FaInstagram,
  FaLocationArrow,
  FaMailBulk,
  FaPhoneAlt,
  FaTwitter,
} from "react-icons/fa";
import Social from "./Social";
import ULfooter from "./ULfooter";

export default function Footer() {
  return (
    <div className="footer pt-3">
      <div className="text mt-5 pb-5 container">
        <Row>
          <Col lg="4">
            <p className="fs-2 text-white ">The Union</p>
            <ul className="d-flex gap-3 list-unstyled">
              <Social
                icon={<FaFacebookF />}
                classNames="facebook"
                href="https://www.facebook.com/profile.php?id=100008584862670"
              />
              <Social
                icon={<FaInstagram style={{ fontSize: "1.2rem" }} />}
                classNames="instagram"
                href="https://www.instagram.com/y.a.s.s.e.r.a.l.n.a.j.j.a.r/"
              />
              <Social
                icon={<FaTwitter style={{ fontSize: "1.2rem" }} />}
                classNames="twitter"
                href="https://twitter.com/YasserElnajjar4"
              />
              <Social
                icon={<FaMailBulk style={{ fontSize: "1.2rem" }} />}
                classNames="mail"
                href="mailto:yasseralnajjar72@gmail.com"
              />
            </ul>
            <p className=" text-white ">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Delectus, aliquam libero eligendi nobis quas officiis ipsam
              pariatur neque possimus, temporibus incidunt autem eveniet fugiat
              dolor. Doloremque consequatur necessitatibus sed saepe.
            </p>
          </Col>
          <Col lg="8">
            <Row>
              <Col lg="6">
                <ul className="list-group rounded my-sm-3 list-group-flush">
                  <ULfooter title="Important Links 1" />
                  <ULfooter title="Important Links 2" />
                  <ULfooter title="Important Links 3" />
                  <ULfooter title="Important Links 4" />
                </ul>
              </Col>
              <Col lg="6">
                <ul className="rounded my-sm-2 d-flex flex-wrap justify-centent-center my-sm-2">
                  <div className="w-100 mb-3 d-flex align-items-center gap-3">
                    <FaLocationArrow style={{ color: "white" }} />
                    <ULfooter title="Egypt, Giza, Atfih, Othman Ibn Affan Street" />
                  </div>
                  <div className="w-100 mb-3 d-flex align-items-center gap-3">
                    <FaHourglassStart style={{ color: "white" }} />
                    <ULfooter title="Business Hours: 24 hour  every day" />
                  </div>
                  <div className="w-100 mb-3 d-flex align-items-center gap-3">
                    <FaPhoneAlt style={{ color: "white" }} />
                    <ULfooter title="+201121081998  ||  +201090179792" />
                  </div>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="copyright text-light py-2 text-center">
        Made By <span className="text-danger fs-6"> Yasser Al-Najjar</span>
      </div>
    </div>
  );
}
