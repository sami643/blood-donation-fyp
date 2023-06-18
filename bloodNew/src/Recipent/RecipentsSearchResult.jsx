import React, { useContext, useEffect, useState } from "react";
import Navs from "../RecipentComponet/Navs";
import { useTranslation } from "react-i18next";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import "../AdminScreen/OrgSignUp.css";
import ChatBox from "../RecipentComponet/ChatBox";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import AuthContext from "../auth/context";
import axios from "axios";
let donors = [];

export default function SearchResult1(props) {
  const location = useLocation();
  const { t } = useTranslation();
  const [recipentsData, setDonorsData] = useState({});
  let [btn, setbtn] = useState(false);
  const { user } = useContext(AuthContext);
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
      url: "/api/donorRec/search-result-recipents",
      data: {
        bloodGroup: location.state.bloodGroup,
        status: "Active",
        city: location.state.city,
        area: area2,
      },
    })
      .then((res) => {
        console.log("response1:", res);
        console.log("response2:", res.data);
        donors = res.data.ActiveRecipetnts;
        setDonorsData(donors);

        console.log("active donors in recipents search:", donors);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    searchResult();
  }, []);

  const NewConversation = (FullName, Email) => {
    console.log("New conversation started");
    axios({
      method: "post",
      url: "/api/conversation1/new-conversation",
      data: {
        senderId: user.email,
        receiverId: Email,
        senderName: user.name,
        receiverName: FullName,
      },
    });
  };

  useEffect(() => {
    searchResult();
  }, []);

  return (
    <>
      <Navs />
      <div className="content">
        <div className="contain">
          {!donors?.length && (
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

          {donors.map((item) => {
            return (
              <div className="contain-box border rounded">
                <h2>{t("SearchResults")}</h2>
                <p>
                  <b>{t("Name")} : </b>
                  {item.FullName}
                </p>
                <p>
                  <b>{t("Email")} : </b>
                  {item.Email}
                </p>
                <p>
                  <b>{t("ContactNo")} : </b>
                  {item.Contact}
                </p>
                <p>
                  <b>Gender: </b>
                  {item.Gender}
                </p>
                <p>
                  <b>blood Group : </b>
                  {item.BloodGroup}
                </p>
                <p>
                  <b>{t("Quantity")} : </b>
                  {item.BloodQuantity}
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
                  <b>Disabilities: </b>
                  {item.MedicalHistory}
                </p>
                <p>
                  <b> Pick And Drop Service:</b>
                  {item.PickAndDrop}
                </p>
                <div className="butn">
                  <button
                    className="btn btn-primary mb-2"
                    onClick={() => {
                      NewConversation(item.FullName, item.Email);
                      navigate("/user/recipent/messenger");
                    }}
                  >
                    Chat
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
