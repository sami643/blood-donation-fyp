import logo from "../Images/blood.png";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import "./Menu.css";
import axios, { Axios } from "axios";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../auth/context";
import { useTranslation } from "react-i18next";

export default function Navs() {
  const { user } = useContext(AuthContext);

  const [data, setData1] = useState();

  useEffect(() => {
    if (!user) {
      return;
    }
    const GettingStatus = () => {
      axios({
        method: "Post",
        url: "/api/recipents/get-active-status-from-db",
        data: {
          id: user.email,
        },
      })
        .then((res) => {
          setData1(res.data.activeStatus.Status);
        })
        .catch((error) => console.log("Error while getting the data: ", error));
    };

    GettingStatus();
  }, [user]);

  const { t } = useTranslation();

  return (
    <div className="ov">
      <div className="cont">
        <div className="hold-menu" style={{ height: "80px" }}>
          <Navbar sticky="top" bg="dark" variant="dark" expand="md">
            <Container fluid>
              {data ? (
                <div className="current_status">
                  <label>{t("current_status")}</label>
                  <br />
                  {data}
                </div>
              ) : (
                <div
                  style={{
                    color: "white",
                    width: "10%",
                    textAlign: "center",
                  }}
                >
                  No Donation Request Available
                </div>
              )}

              <Navbar.Brand as={NavLink} to="/user">
                <img
                  style={{
                    height: "40px",
                    width: "70px",
                    boxShadow: "rgb(255 255 255) 1px 0px 4px 4px",
                    marginLeft: "51px",
                  }}
                  className="logo"
                  src={logo}
                  alt="No Logo"
                />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav
                  className="me-auto my-2 my-lg-0 justify-content-end text-center"
                  style={{ maxHeight: "300px", width: "94%" }}
                  navbarScroll
                >
                  <Nav.Link as={NavLink} to="/user/recipent">
                    {t("home")}
                  </Nav.Link>

                  <NavDropdown
                    title={t("donation_record")}
                    id="basic-nav-dropdown"
                  >
                    <NavDropdown.Item
                      as={NavLink}
                      to="/user/recipent/NewBloodReq"
                    >
                      {t("new")}
                    </NavDropdown.Item>
                    {/* <NavDropdown.Item as={NavLink} to='/recipent/donationrecord'>View Record</NavDropdown.Item> */}
                    <NavDropdown.Item as={NavLink} to="/recipent/Editrecord">
                      {t("edit_record")}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>

                  <NavDropdown title={t("settings")} id="basic-nav-dropdown">
                    <NavDropdown.Item as={NavLink} to="/user/recipent/change-password">
                      {t("password")}
                    </NavDropdown.Item>
                    <NavDropdown.Item as={NavLink} to="/">
                      {t("logout")}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
              <Nav.Link as={NavLink} to="/user/recipent/messenger">
                <button
                  className="btn btn-primary"
                  style={{ fontSize: "15px" }}
                >
                  {t("messages")} <i class="far fa-comment-dots"></i>
                </button>
              </Nav.Link>
            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
}
