import React, { useState } from "react";
import Navs from "../DonorComponent/Navs";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./DBSL.css";
import "./DonateBloodSaveLife.css";
import Popup from "./Popup2";
import { useTranslation } from "react-i18next";

export default function Home() {
  const [btnpopup, setbtnpopup] = useState(false);

  const { t } = useTranslation();
  return (
    <div>
      <Navs />
      <div className="content">
        <div className="sec" id="container">
          <label htmlFor="">{t("select_donation_time")}</label>

          <select id="select1">
            <option hidden>{t("last_donation")}</option>
            <option value="Before" id="before">
             {t("morethan_three_months")}
            </option>
            <option value="Within" id="within">
              {t("three_months")}
            </option>
          </select>

          <br />
          <br />
          <br />

          <br />
          <button className="btn btn-primary" onClick={Checkdate}>
            {t("submit")}{" "}
          </button>
          <br />
          <br />
          <ul>
            <a
              className="changeDialog"
              onClick={() => setbtnpopup(true)}
              id="contact_us_link"
            ></a>
          </ul>

          <br />
          <br />
        </div>
        <Popup
          trigger={btnpopup}
          val={""}
          t={t("you_cant_donate")}
          btntriger={setbtnpopup}
        ></Popup>

        <Footer />
      </div>
    </div>
  );
}

function Checkdate() {
  const check = document.getElementById("select1");
  var option = check.options[check.selectedIndex];

  if (option.value === "Before") {
    window.location.assign("http://localhost:3000/user/donor/needblood/donor");
  } else if (option.value === "Within") {
    var clickEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: false,
    });
    const linkEl = document.querySelector("#contact_us_link");
    linkEl.dispatchEvent(clickEvent);
  } else {
    alert("Please specify last donation date!");
  }
}
