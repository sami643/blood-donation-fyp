import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Navs from "../DonorComponent/Navs";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import AuthContext from "../auth/context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { t } = useTranslation();

  let { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div>
      <Navs />

      <div className="content">
        <div>
          <button
            className="btn btn-primary mt-4 m-3"
            style={{ paddingInline: "8%" }}
            onClick={() => navigate("/user/")}
          >
            {" "}
            {t("back")}
          </button>
        </div>
        <div
          className="contain"
          style={{  padding: "10% 15% 20% 15%" }}
        >
          <br /> 
          <br /> <br />
          <div className="button p-3 ">
            <Nav.Link
              className="btn btn-primary p-3 my-2"
              style={{ color: "#ffff" }}
              as={NavLink}
              to="/user/donor/needblood"
            >
              {t("see_who_is_looking_for_blood")}
            </Nav.Link>
            <br />
            <Nav.Link
              className="btn btn-primary p-3 my-2"
              style={{ color: "#ffff" }}
              as={NavLink}
              to="/user/donor/needblood/checkdonation"
            >
              {t("donate_blood_and_save_life")}
            </Nav.Link>
          </div>
          <br />
          <br />
          <br />
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
}
