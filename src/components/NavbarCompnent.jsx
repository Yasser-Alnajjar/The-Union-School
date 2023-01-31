import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { user } from "../helpers/authHelp";
import { logout } from "../redux/slices/user/userSlice";
import NavLink from "./helpers-components/Nav-link";
import Theme from "./theme/Theme";

export default function NavbarCompnent() {
  const { theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div style={{ height: "70px" }}>
      <Navbar
        className={`shadow ${theme.mode}`}
        style={{
          position: "fixed",
          zIndex: "12",
          width: "100%",
          top: "0px",
          height: "70px",
          boxShadow: "10px 10",
        }}
        expand="lg"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src="images/logo2.png" style={{ width: "50px" }} alt="" />
          </Navbar.Brand>
          <Navbar.Toggle
            className={`collapse_navbar ${
              theme.mode === "dark"
                ? "border border-light"
                : "border border-dark"
            }`}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse
            className={`collapse_navbar ${
              theme.mode === "dark" ? "dark text-light" : theme.mode
            }`}
            id="basic-navbar-nav"
          >
            <Nav className="mx-auto gap-3 ">
              {user ? (
                <>
                  <NavLink path="/" styles="theme" title="Home" />
                  <NavLink path="/about" styles="theme" title="About" />
                  <NavLink path="/contact" styles="theme" title="Contact" />
                  <NavLink
                    path="/rootschedule"
                    styles="theme"
                    title="Schedule"
                  />
                </>
              ) : (
                <>
                  <NavLink path="/" styles="theme" title="Home" />
                  <NavLink path="/about" styles="theme" title="About" />
                  <NavLink path="/contact" styles="theme" title="Contact" />
                </>
              )}
              {user ? (
                user.ifTeacher ? (
                  <>
                    <NavLink path="/teachers" styles="theme" title="Teachres" />
                    <NavLink
                      path="/admin-teachers"
                      styles="theme"
                      title="Dashboard"
                    />
                  </>
                ) : null || user.ifStudent ? (
                  <>
                    <NavLink path="/teachers" styles="theme" title="Teachres" />
                  </>
                ) : null || user.admin ? (
                  <>
                    <NavLink path="/teachers" styles="theme" title="Teachres" />
                    <NavLink path="/admin" styles="theme" title="Dashboard" />
                  </>
                ) : null
              ) : (
                <>
                  <NavLink path="/login" styles="theme" title="Login" />
                </>
              )}
            </Nav>
            {user && (
              <NavDropdown
                menuVariant={theme.mode}
                className={`navbar-nav text-capitalize  basic-nav-dropdown  ${theme.mode}`}
                title={user.firstname}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item as={Link} to="profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => dispatch(logout())}>
                  Logout <FaSignOutAlt style={{ marginLeft: 10 }} />
                </NavDropdown.Item>
              </NavDropdown>
            )}
            <div className="mx-3 d-block d-lg-none">
              <Theme />
            </div>
          </Navbar.Collapse>
          <div className="mx-3 d-none d-lg-block">
            <Theme />
          </div>
        </Container>
      </Navbar>
    </div>
  );
}
