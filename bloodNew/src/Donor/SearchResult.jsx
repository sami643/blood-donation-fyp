import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ANav from "../DonorComponent/Navs";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import "../AdminScreen/OrgSignUp.css";
import ChatBox from "./ChatBox";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthContext from "../auth/context";
import axios from "axios";
let recipents = [];
let response = [];

export default function SearchResult(props) {
  const location = useLocation();
  const { t } = useTranslation();
  const { user } = useContext(AuthContext);
  const [recipentsData, setDonorsData] = useState({});
  let [btn, setbtn] = useState(false);
  const navigate = useNavigate();

  console.log("Transfered Data from the search screen", location.state);

  const area1 = location.state.area;
  if (area1 === "") {
    var area2 = area1 + "default";
  } else {
    area2 = area1;
  }

  const searchResult = () => {
    axios({
      method: "PUT",
      url: "/api/recipents/donors-search-result",
      data: {
        bloodGroup: location.state.bloodGroup,
        status: "Active",
        city: location.state.city,
        area: area2,
      },
    })
      .then((res) => {
        console.log("response1:", res.data);
        response = res.data;
        recipents = res.data.activeDonors;
        setDonorsData(recipents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searchResult();
  }, []);

  if (localStorage.getItem("lang") === "pt") {
    recipents = response.ps_donors;
    console.log(recipents);
  } else if (localStorage.getItem("lang") === "fr") {
    recipents = response.de_donors;
  }

  const NewConversation = (FullName, Email_1) => {
    console.log("New conversation started", FullName, Email_1);
    axios({
      method: "post",
      url: "/api/conversation1/new-conversation",
      data: {
        senderId: user.email,
        receiverId: Email_1,
        senderName: user.name,
        receiverName: FullName,
      },
    });
  };

  return (
    <>
      <ANav />
      <div className="content">
        <div className="contain mt-2">
          {!recipents?.length && (
            <p
              id="recordMessage"
              style={{
                color: "#373433",
                backgroundColor: "	#F5F5F5",

                width: "100%",
                textAlign: "center",
                padding: "100px",
                fontSize: 15,
                fontFamily: "sans-serif",
              }}
            >
              <h3>No record found</h3>
            </p>
          )}

          {recipents.map((item) => {
            return (
              <div className="contain-box border rounded">
                <h2>{t("SearchResults")}</h2>
                <p>
                  <b>{t("Name")} : </b>
                  {item.FullName}
                </p>
                <p>
                  <b>{t("Email")} : </b>
                  {item.Email_1}
                </p>
                <p>
                  <b>{t("ContactNo")} : </b>
                  {item.Contact_1}
                </p>
                <p>
                  <b>{t("blood_group")} : </b>
                  {item.BloodGroup}
                </p>
                <p>
                  <b>{t("Quantity")} : </b>
                  {item.RequiredBloodQ}
                </p>
                <p>
                  <b>{t("City")} : </b>
                  {item.City}
                </p>
                <p>
                  <b>{t("Area")} : </b>
                  {item.Area}
                </p>
                <p>
                  <b>{t("PatientAge")} : </b>
                  {item.PatientAge}
                </p>
                <p>
                  <b>{t("PatientGender")} : </b>
                  {item.PatientGender}
                </p>
                <p>
                  <b>{t("PatientDisease")} : </b>
                  {item.PatientDisease}
                </p>
                <div className="butn">
                  <button
                    className="btn btn-primary mb-2"
                    onClick={() => {
                      NewConversation(item.FullName, item.Email_1);
                      navigate("/user/donor/messenger");
                    }}
                  >
                    {t("chat")}
                  </button>
                </div>
              </div>
            );
          })}

          <ChatBox trigger={btn} setchatbox={setbtn} />
        </div>
        <Footer />
      </div>
    </>
  );
}
