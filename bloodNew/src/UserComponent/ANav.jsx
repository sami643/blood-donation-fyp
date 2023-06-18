import React from "react";
import logo from "../Images/blood.png";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./ANav.css";

const ANav = () => {
  const { t } = useTranslation()

  return (
    <div className="ov">
      <div className="cont">
        <div className="hold-menu me-4">
          <Navbar sticky="top" bg="dark" variant="dark" expand="md">
            <Container fluid>
              <Navbar.Brand as={NavLink} to="/user">
                <img
                  style={{
                    height: "40px",
                    width: "70px",
                    boxShadow: "rgb(255 255 255) 1px 0px 4px 4px",
                    marginLeft: "15px",
                  }}
                  className="logo"
                  src={logo}
                  alt="No Logo"
                />
              </Navbar.Brand>

              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0 justify-content-end text-center me-3"
                  style={{ maxHeight: "300px", width: "96%", padding: "20px" }}
                  navbarScroll
                >
                  <Nav.Link as={NavLink} to="/user">
                    {t("home")}
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/user/blood-info">
                    {t("blood_info")}
                  </Nav.Link>
                  <Nav.Link as={NavLink} to="/user/finacial-support">
                    {t("finance_supp")}
                  </Nav.Link>

                  <NavDropdown title={t("settings")} id="basic-nav-dropdown">
                    <NavDropdown.Item as={NavLink} to="/user/change-password">
                      {t("password")}
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/">
                      {t("logout")}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default ANav;

// const style: {
//   paddingTop:'20px'
// }
