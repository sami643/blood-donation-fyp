import React, { useState, useEffect } from "react";
import "./Slider.css";
import axios from "axios";
import dummy from "../Images/download.jpg";
import { useTranslation } from "react-i18next";

let data = [];
let data1;
let venue_ps;
let venue_de;

const Slider = () => {
  const [index, setIndex] = useState(0);
  const [rec, setRec] = useState();

  const getData = () => {
    axios({
      method: "GET",
      url: "/api/camping/existingCamps",
    }).then((res) => {
      // console.log("camps list:", res.data.campss);
      data = res.data.campss;
      // data1 = res.data
      setRec(data);
      venue_ps = res.data.venue_ps;
      venue_de = res.data.venue_de;
      // console.log("DATA: ", data1)
    });
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const lastIndex = data.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, data]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  const { t } = useTranslation();

  return (
    <section className="sectione">
      <div className="section-center ">
        {data.map((item, indexCamps) => {
          let Title, Vanue, Date, Time, Organizers;

          let lang = localStorage.getItem("lang");
          if (lang === "pt") {
            ({ Title, Date, Time, Organizers, Vanue } = item);
          } else if (lang === "fr") {
            ({ Title, Date, Time, Organizers, Vanue } = item);
          } else {
            ({ Title, Vanue, Date, Time, Organizers } = item);
          }

          let position = "nextSlide";
          if (indexCamps === index) {
            position = "activeSlide";
          }
          if (
            indexCamps === index - 1 ||
            (index === 0 && indexCamps === data.length - 1)
          ) {
            position = "lastSlide";
          }
          return (
            <article className={position}>
              <h3>{Title}</h3>
              <img src={dummy} alt="No Image Found" className="camp-img" />{" "}
              <br />
              <p>
                <b style={{ fontSize: "20px" }}>{t("Venue")}: </b> {Vanue}
              </p>
              <p>
                {" "}
                <b style={{ fontSize: "20px" }}>{t("time")}: </b> {Time}
              </p>
              <h6 style={{ padding: "10px", color: "#201E1D" }}>
                <b style={{ fontSize: "20px" }}>{t("date")}:</b> {Date}
              </h6>
              <p>
                {" "}
                <b style={{ fontSize: "20px" }}>{t("Organzier")}: </b>
                {Organizers}
              </p>
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <i className="fas fa-arrow-left" />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <i className="fas fa-arrow-right" />
        </button>
      </div>
    </section>
  );
};

export default Slider;
