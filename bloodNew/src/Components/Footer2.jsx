import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import "./Footer.css";
import Popup from "./Popup";
import Popup1 from "./Popup1";
import axios from "axios";
let data = [];

const changeLanguage = (l) => {
  return () => {
    i18n.changeLanguage(l);
    localStorage.setItem("lang", l);
  };
};
export default function Footer() {
  const [btnpopup, setbtnpopup] = useState(false);
  const [btnpopup1, setbtnpopup1] = useState(false);

  // **********************this is for getting Jazz cash number*****************************************
  const [rec, setRec] = useState();
  const getData = () => {
    axios({
      method: "GET",
      url: "/api/management/getContactUsNo",
    }).then((res) => {
      // console.log("Contact Us Number:", res.data.ContactUs);
      data = res.data.ContactUs;
      setRec(data);
      // console.log(" ContactUs number DATA: ", data)
    });
  };
  useEffect(() => {
    getData();
  }, []);

  //************************* The End *********************************************************************************************
  const { t } = useTranslation();
  return (
    <div>
      <footer className="footer">
        <div className="cus-service">
          <h2>{t("customer_service")}</h2>
          <ul className="ul">
            <li>
              <a
                className="changeDialog"
                style={{
                  cursor: "pointer",
                  textDecoration: "overline",
                }}
                onClick={() => setbtnpopup(true)}
              >
                {t("contact_us")}
              </a>
            </li>
          
            <li>
              <a
                className="changeDialog"
                style={{
                  cursor: "pointer",
                  textDecoration: "overline",
                }}
                onClick={() => setbtnpopup1(true)}
              >
                {t("give_us_feedback")}
              </a>
            </li>
          </ul>
        </div>
{/*           
        <div className="language">
          <h2>{t("select_language")}</h2>
          <ul className="ul">
            <li>
              <button
                id="nbtn"
                style={{ border: "none", padding: "12px" }}
                onClick={changeLanguage("en")}
              >
                {t("eng")}
              </button>
            </li>
            <li>
              <button
                id="nbtn"
                style={{ border: "none", padding: "12px" }}
                onClick={changeLanguage("fr")}
              >
                {t("de")}
              </button>
            </li>
            <li>
              <button
                id="nbtn"
                style={{ border: "none", padding: "12px" }}
                onClick={changeLanguage("pt")}
              >
                {t("ps")}
              </button>
            </li> 
          </ul>
        </div> */}
        <Popup
          trigger={btnpopup}
          val={t("contact_us_text") + data.ContactUs}
          t={t("contact_us")}
          btntriger={setbtnpopup}
        ></Popup>
        <Popup1
          trigger={btnpopup1}
          t={t("give_feed_text")}
          btntriger={setbtnpopup1}
        ></Popup1>

        {/* <button className='btn btn-danger'>Invite</button> */}
      </footer>
    </div>
  );
}
