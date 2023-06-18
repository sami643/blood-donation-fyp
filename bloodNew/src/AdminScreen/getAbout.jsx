import React, { useEffect, useState } from "react";
// import { useTranslation, initReactI18next } from "react-i18next";
import Footer from "../Components/Footer1";
import "./About.css";
import AboutImage from "../Images/430711.jpg";
import "./Home.css";
import Navs from "../Components/Navs";
import axios from "axios";
let data = [];
export default function About(props) {
  const [rec, setRec] = useState();
  const getData = () => {
    axios({
      method: "GET",
      url: "/api/management/getAboutUs",
    }).then((res) => {
      console.log("ABout Us:", res.data.aboutus);
      data = res.data.aboutus;
      setRec(data);
      console.log("DATA: ", data);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navs
        first={props.page1}
        firstlink={props.page1link}
        sec={props.page2}
        seclink={props.page2link}
        th={props.page3}
        thlink={props.page3link}
        frt={props.page4}
        frtlink={props.page4link}
        fiv={props.page5}
        fivlink={props.page5link}
        six={props.page6}
        sixlink={props.page6link}
      />

      <div class="aboutText">
        <div class="titlepage">
          <h2>{data.AboutUsTitle}</h2>
        </div>
        <p>{data.AboutUsDescription}</p>
      </div>
      {/* image */}
      <div class="grid-container">
        <div class="grid-item item5">
          {" "}
          <img src={AboutImage} alt="No Img Found" />
        </div>
      </div>
      <Footer />
    </>
  );
}
