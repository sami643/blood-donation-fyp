import React, { useEffect, useState, useContext } from "react";
import ANav from "../Components/Navs";
import axios from "axios";
import { Formik } from "formik";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import "./ForgotPassword.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ForgotPassword(props) {
  const navigate = useNavigate();

  const validateSchema = Yup.object().shape({
    email: Yup.string().email().required().label("email"),
  });

  const verifymail = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "post",
      url: "/api/auth/forgotpassword",
      data: {
        email: formData.email,
      },
    }).then((res) => {
      // console.log("respond is:", res.data);
      toast.configure();
      const notification = () => {
        toast.success(res.data.message);
      };

      notification();
      if (res.data.message === "Verification otp email sent") {
        localStorage.setItem("userId", res.data.data.userId);
        localStorage.setItem("Email", res.data.data.Email);
        return navigate("/forgot-password/verify");
      }
    });
  };

  const { t } = useTranslation();

  return (
    <>
      <ANav
        first={t(props.page1)}
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

      <div className="content">
        <div className="sign-in">
          <h2 id="title">{t("Forgot_Password")}</h2>
          <p>{t("enter_emai_address")}</p>

          <Formik
            initialValues={{ email: "" }}
            onSubmit={(formData) => verifymail(formData)}
            validationSchema={validateSchema}
          >
            {({
              handleSubmit,
              handleChange,
              errors,
              setFieldTouched,
              touched,
            }) => (
              <>
                <p
                  id="wrongCredintials"
                  style={{
                    color: "red",
                    marginLeft: 65,
                    fontSize: 15,
                    fontFamily: "sans-serif",
                  }}
                >
                  {" "}
                  {}{" "}
                </p>

                <input
                  required
                  type="email"
                  id="email"
                  placeholder={t("enter_email")}
                  style={allStyles.input}
                  onChange={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                />
                {touched.email && <p style={styling}>{errors.email}</p>}
                <button
                  className="btn btn-primary"
                  id="submit-form"
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  {" "}
                  {t("send_code")}{" "}
                </button>
              </>
            )}
          </Formik>
        </div>
        <Footer />
      </div>
    </>
  );
}

// styling part
const styling = {
  color: "red",
  marginLeft: 65,
  fontSize: 15,
  fontFamily: "sans-serif",
};
const allStyles = {
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 15,
  },
};

ForgotPassword.defaultProps = {
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
