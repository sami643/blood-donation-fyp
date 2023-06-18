import React, { useEffect, useState } from "react";
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
      url: "/api/management/getContactNo",
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

  return (
    <div>
      <footer className="footer">
        <div className="language">
          {/* <h2>Select Language</h2> */}
          <ul className="ul">
            {/* <li>
              <button
                id="nbtn"
                style={{ border: "none", padding: "12px" }}
                onClick={changeLanguage("en")}
              >
                English
              </button>
            </li> */}
            {/* <li><button id='nbtn' style={{border: "none",padding: "12px"}} onClick={changeLanguage("fr")}>German</button></li> */}
            {/* <li> */}
            {/* <button
                id="nbtn"
                style={{ border: "none", padding: "12px" }}
                onClick={changeLanguage("pt")}
              >
                Pashto
              </button> */}
            {/* </li> */}
          </ul>
        </div>

        {/* <button className='btn btn-danger'>Invite</button> */}
      </footer>
    </div>
  );
}
