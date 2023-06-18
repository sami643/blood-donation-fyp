import React, { useContext, useEffect } from "react";
import ANav from "../UserComponent/ANav";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import AuthContext from "../auth/context";
import { useTranslation } from "react-i18next"

export default function Home() {
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  console.log("user", user);
  return (
    <div>
      <ANav />
      <div className="content">
        <div className="button" id="container">
          <h1>{t("welcome")}</h1>
          <p>{t("blood_home_mssg")}</p>
          <Nav.Link
            style={{
              color: "#ffff",
              backgroundColor: "#24a0ed",
              paddingInline: "20%",
              paddingBlock: "1%",
              margin: "2%",
            }}
            // id="link"
            as={NavLink}
            to="/user/donor"
          >
            {t("blood_donor")}
          </Nav.Link>
          <Nav.Link
            style={{
              color: "#ffff",
              backgroundColor: "#24a0ed",
              paddingInline: "20%",
              paddingBlock: "1%",
            }}
            as={NavLink}
            to="/user/recipent"
          >
            {t("blood_recipent")}
          </Nav.Link>
          <br /> <br /> <br /> <br /> <br /> <br />
        </div>
        <Footer />
      </div>
    </div>
  );
}
