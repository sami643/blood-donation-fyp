import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./Home.css";
import Footer from "../Components/Footer";
import Navs from "../Components/Navs";
import "./Partners.css";
import PartnerComponent from "../Components/PartnerComponent";
import image1 from "../Images/download.png";
import image2 from "../Images/download.png";
import image3 from "../Images/download.png";

export default function Partners(props) {
  const { t } = useTranslation()
  let [btn, setbtn] = useState(false);
  return (
    <>
      <Navs
        first={t(props.page1)}
        firstlink={props.page1link}
        sec={t(props.page2)}
        seclink={props.page2link}
        th={t(props.page3)}
        thlink={props.page3link}
        frt={t(props.page4)}
        frtlink={props.page4link}
        fiv={t(props.page5)}
        fivlink={props.page5link}
        six={t(props.page6)}
        sixlink={props.page6link}
      />

      <header id="showcase" class="grid">
        <div class="content-wrap">
          <h1>{t("partner_heading")}</h1>
          <p>{t("partner_desc")}</p>
          <button
            style={{ marginLeft: "9%" }}
            className="btn btn-primary"
            onClick={() => setbtn(true)}
          >
            {t("join_us")}
          </button>
          <PartnerComponent closebtn={setbtn} trigger={btn} />
        </div>
      </header>

      <main id="main">
        <section id="section-a" class="grid">
          <div class="content-wrap">
            <h2 class="content-title">{t("partner_heading2")}</h2>
            <div class="content-text">
              <p> {t("partner_desc2")} </p>
            </div>
          </div>
        </section>

        <div class="grid-container">
          <div class="grid-item border rounded">
            {" "}
            <div class="card">
              <img src={image3} alt="" />
              <div class="card-content">
                <h3 class="card-title">{t("before")}</h3>
                <p>{t("before_desc")}</p>
              </div>
            </div>
          </div>

          <div class="grid-item border rounded">
            {" "}
            <div class="card">
              <img src={image3} alt="" />
              <div class="card-content">
                <h3 class="card-title">{t("during")}</h3>
                <p>{t("during_desc")}</p>
              </div>
            </div>
          </div>

          <div class="grid-item border rounded">
            {" "}
            <div class="card">
              <img src={image3} alt="" />
              <div class="card-content">
                <h3 class="card-title">{t("after")}</h3>
                <p>{t("after_desc")}</p>
              </div>
            </div>
          </div>
        </div>

        <section id="section-c" class="grid">
          <div class="content-wrap">
            <h2 class="content-title">{t("who_can_hold_donations")}</h2>
            <p>{t("who_can_hold_donations_desc")}</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

Partners.defaultProps = {
  page1: "home",
  page1link: "/",
  page2: "blood_info",
  page2link: "/blood-info",
  page3: "finance_supp",
  page3link: "/financial-support",
  page4: "partners",
  page4link: "/partner",
  page5: "about_us",
  page5link: "/about",
  page6: "sign_in",
  page6link: "/sign-in"
}
