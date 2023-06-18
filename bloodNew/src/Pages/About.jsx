import React, { useEffect, useState } from 'react'
// import { useTranslation, initReactI18next } from "react-i18next";
import Footer from '../Components/Footer'
import './About.css'
import { useTranslation } from "react-i18next";
import AboutImage from '../Images/430711.jpg'
import './Home.css';
import Navs from '../Components/Navs';
import axios from "axios"
let data = []
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
  }

  useEffect(() => { 
    getData()
  }, []);


  const { t } = useTranslation()
  return (
    <>
      <Navs first={t(props.page1)} firstlink={props.page1link} sec={t(props.page2)} seclink={props.page2link} th={t(props.page3)} thlink={props.page3link} frt={t(props.page4)} frtlink={props.page4link} fiv={t(props.page5)} fivlink={props.page5link} six={t(props.page6)} sixlink={props.page6link} />
      <div class="aboutText">
        <div class="titlepage">
          <h2 >{data.AboutUsTitle}</h2>
        </div>
        <p>{data.AboutUsDescription}</p>
      </div>
      {/* image */}             
      <div className='img-1'>

      </div>
     <Footer />
    </>
  )
}







About.defaultProps = {
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