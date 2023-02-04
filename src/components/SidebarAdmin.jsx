import "rsuite/dist/rsuite.css";
import { Sidenav, Nav } from "rsuite";
import {
  FcBusinessman,
  FcCollaboration,
  FcContacts,
  FcDoughnutChart,
  FcHome,
  FcMultipleInputs,
  FcServices,
} from "react-icons/fc";
import {
  FaBlackberry,
  FaDelicious,
  FaMoon,
  FaSignOutAlt,
  FaSun,
} from "react-icons/fa";
import { useState } from "react";
import { Link } from "react-router-dom";
import { user } from "../helpers/authHelp";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/user/userSlice";
import { setDarkTheme, setDefaultTheme } from "../redux/slices/theme-slice";
export default function SidebarAdmin() {
  const [expanded] = useState(false);
  const [activeKey, setActiveKey] = useState("1");
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state);

  return (
    <div style={{ width: 56 }}>
      <Sidenav
        style={{
          position: "sticky",
          top: 0,
        }}
        expanded={expanded}
        defaultOpenKeys={[]}
        className={theme.mode === "dark" ? "bg-dark text-light" : theme.mode}
      >
        <Sidenav.Body>
          <Nav
            style={{
              height: "100vh",
            }}
            className={`border-end border-sm border-${!theme.mode} ${
              theme.mode === "dark" ? "bg-dark text-light" : theme.mode
            }`}
            activeKey={activeKey}
            onSelect={setActiveKey}
          >
            <Nav.Item
              as={Link}
              to={"/"}
              eventKey="2"
              icon={
                <FcHome
                  style={{
                    fontSize: "16px",
                    marginRight: "20px",
                    position: "absolute",
                    left: "20px",
                    top: "15px",
                    lineHeight: "1.25",
                    height: "16px",
                  }}
                />
              }
            >
              Home Page
            </Nav.Item>
            <Nav.Item
              as={Link}
              to={"/teachers"}
              eventKey="3"
              icon={
                <FcDoughnutChart
                  style={{
                    fontSize: "16px",
                    marginRight: "20px",
                    position: "absolute",
                    left: "20px",
                    top: "15px",
                    lineHeight: "1.25",
                    height: "16px",
                  }}
                />
              }
            >
              Teachers
            </Nav.Item>
            <Nav.Item
              as={Link}
              to={"/rootschedule"}
              eventKey="6"
              icon={
                <FaBlackberry
                  style={{
                    fontSize: "16px",
                    marginRight: "20px",
                    position: "absolute",
                    left: "20px",
                    top: "15px",
                    lineHeight: "1.25",
                    height: "16px",
                  }}
                />
              }
            >
              Schedule Page
            </Nav.Item>
            <Nav.Item
              as={Link}
              to={user.admin ? "/admin" : "/admin-teachers"}
              eventKey="1"
              icon={
                <FcServices
                  style={{
                    fontSize: "16px",
                    marginRight: "20px",
                    position: "absolute",
                    left: "20px",
                    top: "15px",
                    lineHeight: "1.25",
                    height: "16px",
                  }}
                />
              }
            >
              Dashboard
            </Nav.Item>
            {!user.admin && (
              <Nav.Item
                as={Link}
                to={"/admin/addclass"}
                eventKey="4"
                icon={
                  <FcMultipleInputs
                    style={{
                      fontSize: "16px",
                      marginRight: "20px",
                      position: "absolute",
                      left: "20px",
                      top: "15px",
                      lineHeight: "1.25",
                      height: "16px",
                    }}
                  />
                }
              >
                Add Class
              </Nav.Item>
            )}
            {user.admin && (
              <>
                <Nav.Item
                  as={Link}
                  to={"/admin/users"}
                  eventKey="5"
                  icon={
                    <FcBusinessman
                      style={{
                        fontSize: "16px",
                        marginRight: "20px",
                        position: "absolute",
                        left: "20px",
                        top: "15px",
                        lineHeight: "1.25",
                        height: "16px",
                      }}
                    />
                  }
                >
                  Users
                </Nav.Item>

                <Nav.Item
                  as={Link}
                  to={"/admin/schedule"}
                  eventKey="7"
                  icon={
                    <FaDelicious
                      style={{
                        fontSize: "16px",
                        marginRight: "20px",
                        position: "absolute",
                        left: "20px",
                        top: "15px",
                        lineHeight: "1.25",
                        height: "16px",
                      }}
                    />
                  }
                >
                  Schedule
                </Nav.Item>
                <Nav.Item
                  as={Link}
                  to={"/admin/addschedule"}
                  eventKey="8"
                  icon={
                    <FcCollaboration
                      style={{
                        fontSize: "16px",
                        marginRight: "20px",
                        position: "absolute",
                        left: "20px",
                        top: "15px",
                        lineHeight: "1.25",
                        height: "16px",
                      }}
                    />
                  }
                >
                  Add Schedule
                </Nav.Item>
                <Nav.Item
                  as={Link}
                  to={"/admin/contact"}
                  eventKey="8"
                  icon={
                    <FcContacts
                      style={{
                        fontSize: "16px",
                        marginRight: "20px",
                        position: "absolute",
                        left: "20px",
                        top: "15px",
                        lineHeight: "1.25",
                        height: "16px",
                      }}
                    />
                  }
                >
                  Messages
                </Nav.Item>
              </>
            )}
            <Nav.Item
              icon={
                theme.mode === "dark" ? (
                  <FaMoon
                    onClick={() => dispatch(setDefaultTheme())}
                    style={{
                      fontSize: "16px",
                      marginRight: "20px",
                      position: "absolute",
                      left: "20px",
                      top: "15px",
                      lineHeight: "1.25",
                      color: "#00F !important",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                  />
                ) : (
                  <FaSun
                    style={{
                      fontSize: "16px",
                      marginRight: "20px",
                      position: "absolute",
                      left: "20px",
                      top: "15px",
                      lineHeight: "1.25",
                      maxWidth: "100%",
                      maxHeight: "100%",
                    }}
                    onClick={() => dispatch(setDarkTheme())}
                  />
                )
              }
            >
              {theme.mode === "dark" ? "Dark" : "Light"}
            </Nav.Item>
            <Nav.Item
              eventKey="9"
              icon={
                <FaSignOutAlt
                  style={{
                    fontSize: "16px",
                    marginRight: "20px",
                    position: "absolute",
                    left: "20px",
                    top: "15px",
                    lineHeight: "1.25",
                    height: "16px",
                  }}
                />
              }
              onClick={() => dispatch(logout())}
            >
              LogOut
            </Nav.Item>
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
}
