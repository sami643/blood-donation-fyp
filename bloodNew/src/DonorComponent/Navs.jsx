import logo from "../Images/blood.png";
import "../AdminScreen/OrgSignUp.css";
import "../Pages/Home.css";
import ChatBox from "../Donor/ChatBox";
import AuthContext from "../auth/context";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import axios, { Axios } from "axios";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTransition } from "react";

export default function Navs() {
  const { user } = useContext(AuthContext);
  let [btn, setbtn] = useState(false);
  let [data, setData] = useState();

  useEffect(() => {
    if (!user) {
      return;
    }
    const GettingStatus = () => {
      axios({
        method: "Post",
        url: "/api/donorRec/getActiveStatus",
        data: {
          id: user.email,
        },
      })
        .then((res) => {
          console.log("ress is", res.data.activeStatus);
          setData(res.data.activeStatus.Status);
        })
        .catch((error) => console.log("Error while getting the data: ", error));
    };

    GettingStatus();
  }, [user]);
  const { t } = useTranslation();

  return (
    <div className="content">
      <div className="contain">
        <div className="ov">
          <div className="cont">
            <div className="hold-menu" style={{ height: "80px" }}>
              <Navbar sticky="top" bg="dark" variant="dark" expand="md">
                <Container fluid>
                  {data ? (
                    <div className="current_status">
                      <label>{t("current_status")}</label><br />
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
                      No Donation Post Available
                    </div>
                  )}

                  <Navbar.Brand as={NavLink} to="/user/donor">
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
                      style={{
                        maxHeight: "300px",
                        width: "96%",
                        padding: "20px",
                      }}
                      navbarScroll
                    >
                      <Nav.Link as={NavLink} to="/user/donor">
                        {t("home")}
                      </Nav.Link>

                      <NavDropdown
                        title={t("donation_record")}
                        id="basic-nav-dropdown"
                      >
                        <NavDropdown.Item
                          as={NavLink}
                          to="/user/donor/needblood/donor"
                        >
                          {t("new")}
                        </NavDropdown.Item>
                        {/* <NavDropdown.Item as={NavLink} to='/donor/donationrecord'>View Record</NavDropdown.Item> */}
                        <NavDropdown.Item
                          as={NavLink}
                          to="/user/donor/Editrecord"
                        >
                          {t("edit_record")}
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                      </NavDropdown>

                      <NavDropdown
                        title={t("settings")}
                        id="basic-nav-dropdown"
                      >
                        <NavDropdown.Item
                          as={NavLink}
                          to="/user/donor/change-password"
                        >
                          {t("password")}
                        </NavDropdown.Item>
                        <NavDropdown.Item as={NavLink} to="/">
                          {t("logout")}
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                      </NavDropdown>
                    </Nav>
                  </Navbar.Collapse>

                  <Nav.Link as={NavLink} to="/user/donor/messenger">
                    <button
                      className="btn btn-primary"
                      style={{ fontSize: "15px" }}
                    >
                      {t("messages")} <i class="far fa-comment-dots"></i>
                    </button>
                  </Nav.Link>

                  <ChatBox trigger={btn} setchatbox={setbtn} />
                </Container>
              </Navbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
