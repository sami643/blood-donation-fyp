import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Navs from "../RecipentComponet/Navs";
import Footer from "../Components/Footer";
import "./WhoNeedBlood.css";

import { useNavigate } from "react-router-dom";

import axios from "axios";

let data = [];
let areaData = [];

export default function Donors(props) {
  const [control, setControl] = useState(0);
  const [rec, setRec] = useState();
  const navigate = useNavigate();
  const [group, setGroup] = useState("default");
  const [city, setCity] = useState("default");

  const linkDataToSearchResult = () => {
    var input = document.getElementById("inputValue");

    navigate("/recipent/needblood/results", {
      state: { city: city, area: input.value, bloodGroup: group },
    });
  };
  const getData = () => {
    axios({
      method: "GET",
      url: "/api/donorRec/activedonors",
    }).then((res) => {
      console.log("Cities array:", res.data.uniqueRegion);
      data = res.data.uniqueRegion;
      areaData = res.data.UniqueArea;
      console.log("Areas:", areaData);
      setControl();
      setRec(data);
    });
  };

  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteRef = useRef();
  useEffect(() => {
    getData();
  }, [control]);
  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = areaData.filter((area) => {
        const regex = new RegExp(`${text}`, "");
        return area.match(regex);
      });
    }

    setText(text);
    setSuggestions(matches);
  };

  const sortedCities = data.sort();
  const { t } = useTranslation();
  return (
    <div>
      <Navs />
      <div style={{ paddingTop: "4%", paddingBottom: "8%" }}>
        <h3 style={{ marginTop: "50px" }}>{t("search_blood_donors")}</h3>
        <div className="container1">
          <div className="section" style={{ height: "70px" }}>
            <select
              className="select"
              name="group"
              id="group"
              onChange={(event) => {
                setGroup(event.target.value);
              }}
            >
              <option hidden value="default">
                {t("blood_group")}
              </option>
              <option name="all" value="default">
                {t("all")}
              </option>
              <option name="A+" value="A+">
                A+
              </option>
              <option name="A-" value="A-">
                A-
              </option>
              <option name="B+" value="B+">
                B+
              </option>
              <option name="B-" value="B-">
                B-
              </option>
              <option name="AB+" value="AB+">
                AB+
              </option>
              <option name="AB-" value="AB-">
                AB-
              </option>
              <option name="O+" value="O+">
                O+
              </option>
              <option name="O-" value="O-">
                O-
              </option>
            </select>

            <select
              className="select"
              name="city"
              id="city"
              onChange={(event) => {
                setCity(event.target.value);
              }}
            >
              <option hidden>{t("City")}</option>
              {sortedCities.map((item) => {
                return (
                  <option name="city" value={item.value}>
                    {" "}
                    {item}{" "}
                  </option>
                );
              })}
            </select>

            <div className="autocomplete" ref={autocompleteRef}>
              <input
                placeholder={t("search_area")}
                onChange={(e) => onChangeHandler(e.target.value)}
                value={text}
                id="inputValue"
              />
              {suggestions &&
                suggestions.map((suggestion, i) => (
                  <div
                    key={i}
                    className="autocomplete1"
                    onClick={() => onSuggestHandler(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <button
          style={{ marginLeft: "50%", marginBottom: "50px", marginTop: "50px" }}
          className="btn btn-primary btns"
          id="btn"
          onClick={() => {
            linkDataToSearchResult();
          }}
        >
          {" "}
          {t("search")}{" "}
        </button>
      </div>
      <Footer />
    </div>
  );
}
