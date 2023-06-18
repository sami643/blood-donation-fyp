import React from "react";
import logo from "../Images/blood.png";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./ANav.css";

const ANav = () => {
  return (
    <div className="ov">
      <div className="cont">
        <div className="hold-menu me-4">
          <Navbar sticky="top" bg="dark" variant="dark" expand="md">
            <Container fluid>
              <Navbar.Brand as={NavLink} to="/organization">
                <img
                  style={{
                    height: "50px",
                    width: "70px",
                    boxShadow: "rgb(255 255 255) 1px -1px 4px 4px",
                    marginLeft: "14px",
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
                  <NavDropdown title="Camping" id="basic-nav-dropdown">
                    <NavDropdown.Item as={NavLink} to="/organization/newcamp">
                      New Camp
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item as={NavLink} to='/organization'>View</NavDropdown.Item> */}
                    <NavDropdown.Item
                      as={NavLink}
                      to="/organization/existing-camp"
                    >
                      Existing Camp
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item as={NavLink} to='/organization/delete-camp'>Delete</NavDropdown.Item> */}
                    <NavDropdown.Divider />
                  </NavDropdown>

                  <NavDropdown title="Setting" id="basic-nav-dropdown">
                    <NavDropdown.Item
                      as={NavLink}
                      to="/organization/change-password"
                    >
                      Password
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/">
                      Logout
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
