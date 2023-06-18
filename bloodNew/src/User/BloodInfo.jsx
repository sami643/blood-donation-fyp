import React, { useEffect, useState } from 'react'
import "./Home.css"
import Footer from '../Components/Footer'
import "./BloodInfo.css"
import { useTranslation } from "react-i18next";
import whatImg from '../Images/gallery_1.jpg'
import whyImg from '../Images/bl1.jpg'
import whoImg from '../Images/who.jfif'
import Navs from '../UserComponent/ANav';

import axios from "axios"
let data = []
export default function BloodInfo(props) {


    const [rec, setRec] = useState();
  const getData = () => {
        axios({
          method: "GET",
          url: "/api/management/gettingbloodInfo",
        }).then((res) => {
          console.log("bloodINof:", res.data.BloodInfo);
          data = res.data.BloodInfo;
          setRec(data);
          console.log("bloodinfo DATA: ", data);
        });
    }
    useEffect(() => { 
        getData()
    }, []);
  
    const { t } = useTranslation()

  return (
    <>

  
    <Navs first={props.page1} firstlink={props.page1link}  sec={props.page2} seclink={props.page2link} th={props.page3} thlink={props.page3link} frt={props.page4} frtlink={props.page4link} fiv={props.page5} fivlink={props.page5link} six={props.page6} sixlink={props.page6link} />
    


    <div className='content'>
        <div className='part-1'>
          <h1 style={{ fontSize: '50px' }}>{t("about_heading")}</h1>
          <span>{t("about_span1")}</span>
          <span>{t("about_span2")}</span>
          <br /><br /><br /><br /> <br />
        </div>

        <div className='grid-container-1' >
          <h2>{data.Title}
            <p >{data.AboutUsDescription}</p>
          </h2>
          <img src={whatImg} alt="No Img Found" />
        </div>

        <h3 style={{ color: "#000000", width: "auto%", backgroundColor: " #c40606" }}>{t("Donate_blood_and_save_life")}</h3>

        <div className='grid-container-1'>
          <img src={whyImg} alt="No Img Found" />
          <h2>{t("why_donate_blood")}
            <p>{t("why_donate_blood_des")}</p>
          </h2>

        </div>
        <div className='grid-container-1 column'>
          <h2>{t("who_can_donate_blood")}
            <p>{t("who_can_donate_desc1")}<br />
              <br />

              <b>{t("age")}</b>  <br />
              {t("who_can_donate_desc2")} <br /><br />


              <b>{t("weight")}</b> <br />
              {t("who_can_donate_desc3")}
              <br /><br />



              <b>{t("donation_eligibility")}</b> <br />
              {t("who_can_donate_desc4")}</p>
          </h2>

          <img src={whoImg} style={{ width: '77%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '13px', marginBottom: '7px', border: '2px solid red' }} alt="No Img Found" />
        </div>
      <Footer />
    </div>
    </>
  )
}

BloodInfo.defaultProps = {
  page1:"Home",
  page1link:"/",
  page2:"Blood Info",
  page2link:"/blood-info",
  page3:"Financial Support",
  page3link:"/financial-support",
  page4:"Partners",
  page4link:"/partner",
  page5:"About us",
  page5link:"/about",
  page6:"Sign in",
  page6link:"/sign-in"
}

