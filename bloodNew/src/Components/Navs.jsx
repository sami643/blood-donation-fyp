import logo from "../Images/blood.png";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./Menu.css";

const Navs = (props) => {
  return (
    <div className="ov">
      <div className="cont">
        <div className="hold-menu" style={{ height: "81px" }}>
          <Navbar sticky="top" bg="dark" variant="dark" expand="md">
            <Container fluid>
              <Navbar.Brand as={NavLink} to="/">
                <img
                  style={{
                    height: "40px",
                    width: "70px",
                    boxShadow: "rgb(255 255 255) 1px 0px 4px 4px",
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
                  className="me-auto my-2 my-lg-0 justify-content-end text-center"
                  style={{ maxHeight: "300px", width: "97%", padding: "20px" }}
                  navbarScroll
                >
                  <Nav.Link as={NavLink} to={props.firstlink}>
                    {props.first}
                  </Nav.Link>
                  <Nav.Link as={NavLink} to={props.seclink}>
                    {props.sec}
                  </Nav.Link>
                  <Nav.Link as={NavLink} to={props.thlink}>
                    {props.th}
                  </Nav.Link>
                  <Nav.Link as={NavLink} to={props.frtlink}>
                    {props.frt}
                  </Nav.Link>
                  <Nav.Link as={NavLink} to={props.sixlink}>
                    {props.six}
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
};
export default Navs;
