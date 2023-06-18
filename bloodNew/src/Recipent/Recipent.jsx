import React from "react";
import { useTranslation } from "react-i18next";
import Navs from "../RecipentComponet/Navs";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div>
      <Navs />

      <div className="content ">
        <div>
          <button
            className="btn btn-primary mt-1 m-3"
            style={{ paddingInline: "8%" }}
            onClick={() => navigate("/user/")}
          >
            {" "}
            Back
          </button>
        </div>
        <div className="contain" style={{ padding: "10% 15% 20% 15%" }}>
          <div className="button p-3 my-2">
            <Nav.Link
              className="btn btn-primary p-3 my-2"
              style={{ color: "#ffff" }}
              as={NavLink}
              to="/user/recipent/needblood"
            >
              Search blood donors
            </Nav.Link>
            <br />
            <Nav.Link
              className="btn btn-primary p-3 my-2"
              style={{ color: "#ffff" }}
              as={NavLink}
              to="/user/recipent/NewBloodReq"
            >
              blood request
            </Nav.Link>
            <br />
            <br />
            <br />
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
