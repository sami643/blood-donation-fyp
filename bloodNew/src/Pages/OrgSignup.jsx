import React from 'react'
import { NavLink } from 'react-router-dom'
import "./SignUp.css"
import "./Home.css"
import Footer from '../Components/Footer'
import Navs from '../Components/Navs'
import { useTranslation } from "react-i18next";

export default function SignUp(props) {

  const { t } = useTranslation();

  return (
    <>
      <Navs first={t(props.page1)}
        firstlink={props.page1link}
        sec={t(props.page2)}
        seclink={props.page2link}
        th={t(props.page3)}
        thlink={props.page3link}
        frt={t(props.page4)}
        frtlink={props.page4link}
        fiv={t(props.page5)}
        fivlink={props.page5link}
        six={t(props.page6)}
        sixlink={props.page6link}
      />

      <div className='content'>
        <div className='sign-up'>
          <h2>{t("sign_up")}</h2>
          <form>
            <label>Org Name</label>
            <input type="text" /> <br />
            <label>Email</label>
            <input type="email" /> <br />
            <label>Contact</label>
            <input type="text" /> <br />
            <label>City</label>
            <input type="text" /> <br />
            <label>Area</label>
            <input type="text" /> <br />
            <label>Password</label>
            <input type="password" />  <br />
            <label>Confirm Password</label>
            <input type="password" />  <br />

            <button className='btn btn-danger'>Submit</button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  )
}

SignUp.defaultProps = {
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
