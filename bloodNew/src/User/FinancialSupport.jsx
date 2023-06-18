import React from 'react'
import { useTranslation, initReactI18next } from "react-i18next";
import Footer from '../Components/Footer';
import "./FinancialSupport.css"
import './Home.css';
import Navs from '../UserComponent/ANav';
import { useState } from 'react';
import JazzCash from '../Components/JazzCash'
import EasyPaisa from '../Components/EasyPaisa';

export default function FinancialSupport(props) {
  const {t}=useTranslation()
  let [jazz,jazzSet] = useState(false)
  let [easy,easySet] = useState(false)
  let v="Jazz Cash";
  let v1="Easy Paisa"
  return (
    <>
    <Navs first={t(props.page1)} firstlink={props.page1link} sec={t(props.page2)} seclink={props.page2link} th={t(props.page3)} thlink={props.page3link} frt={t(props.page4)} frtlink={props.page4link} fiv={t(props.page5)} fivlink={props.page5link} six={t(props.page6)} sixlink={props.page6link} />
    <div className='content'>
      <div className='c'>
          <div className='box'>
              <h4>{t("financial_support")}</h4>
              <select onChange={(e)=>{
                      if(e.target.value==="jazzcash"){
                        jazzSet(true)
                        easySet(false)
                      }
                      else if(e.target.value==="Easy paisa"){
                        easySet(true)
                        jazzSet(false)

                      }
                      else{
                        jazzSet(false)
                        easySet(false)
                      }
                  }
                }>
                <option>{t("payment_method")}</option>
                <option value="jazzcash">{t("jszz_cash")}</option>
                <option value="Easy paisa">{t("easy_paisa")}</option>
              </select>
          </div>
          
          <div className='box'>
            <JazzCash trigger={jazz} accName={v} />
            <EasyPaisa trigger={easy} accName={v1} />
          </div>
      </div>
      <Footer />

    </div>
    </>
  )
}

FinancialSupport.defaultProps = {
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