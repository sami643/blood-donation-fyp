import React, { useState, useEffect } from "react";
import i18n from "i18next";
//import { useTranslation, initReactI18next } from "react-i18next";
import Footer from "../Components/Footer";
import "./About.css";
import Slider from "../Components/Slider";
import Image from "../Images/45.webp";
import "./Home.css";
import Navs from "../Components/Navs";
import { useTranslation, initReactI18next } from "react-i18next";
import axios from "axios";
import "./About.css";
import "./Home.css";

let data = [];
// let data1 = {
//   aboutus: {
//     AboutUsDescription: [
//       "Including volunteers and many organisations, the Hadia Blood Organization is a countrywide non-profit, non-political organisation. The organization's primary goal is to raise public awareness and increase the number of potential blood donors. Our mission is to spread awareness about secure, long-lasting blood programmes across the nation. To raise awareness about blood transfusions, we are a group of university graduates who are concerned non-medical workers founded the Hadia blood organisation. Patients with Thalassemia, Hemophilia, and other blood disorders will receive quality, comprehensive care from Hadia Blood Organization free of cost. In addition to resolving the medical and social problems that Thalassemia and Hemophilia sufferers face, we also follow our moral obligation to raise awareness of the condition and prevent it from spreading to newly born children.",
//     ],
//     AboutUsTitle: ["About Us"],
//   },
// };

let about_us_data = [];

export default function Home(props) {
  const [rec, setRec] = useState();
  const [rec1, setRec1] = useState();
  const getData1 = () => {
    axios({
      method: "GET",
      url: "/api/management/getAboutUs",
    }).then((res) => {
      console.log("ABout Us:", res.data);
      // data1 = res.data;
      about_us_data = res.data.aboutus;
      setRec(data);
    });
  };
  useEffect(() => {
    getData1();
  }, []);

  const getData = () => {
    axios({
      method: "GET",
      url: "/api/camping/existingCamps",
    }).then((res) => {
      // console.log("camps list:", res.data.campss);
      data = res.data.campss;
      setRec(data);
      // console.log("DATA: ", data)
    });
  };
  useEffect(() => {
    getData();
    localStorage.clear();
  }, []);

  // if (localStorage.getItem("lang") === "pt") {
  //   about_us_data = data1.ps_trans;
  // } else if (localStorage.getItem("lang") === "fr") {
  //   about_us_data = data1.de_trans;
  // } else if (localStorage.getItem("lang") === "en") {
  //   about_us_data = data1.aboutus;
  // }

  const { t } = useTranslation();

  return (
    <div>
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

      <div className="content">
        <div className="title">
          <h1>{t("title")}</h1>
          <h2>{t("subtitle")}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div class="aboutText col-10  border rounded  p-5">
          <div class="titlepage ">
            <h3>{t("about_title")}</h3>
          </div>
          <p>{t("about_data")}</p>
        </div>
        <div className="col-1"></div>
      </div>

      <div
        className="col-12 "
        style={{
          textAlign: "center",
          marginTop: "2%",
          backgroundColor: "white",
        }}
      >
        <p className="title-1">{t("our_active_camps")}</p>
        <Slider />
      </div>

      <img src={Image} alt="" style={{ width: "100%" }} />
      <Footer />
    </div>
  );
}

Home.defaultProps = {
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
  page6link: "/sign-in",
};
