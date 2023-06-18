/* eslint-disable no-sequences */
import React from "react";
import "./SignUpVerify.css";
import "./Home.css";
import Footer from "../Components/Footer";
import Navs from "../Components/Navs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Axios library is used for ingration and connection of frontend with backend.
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { clear } from "@testing-library/user-event/dist/clear";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Integration
export default function SignUpVerify(props) {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const validateSchema = Yup.object().shape({
    otp: Yup.string().required().label("otp"),
  });

  const [role, setRole] = React.useState("user");
  //const [toggle, setToggle] = React.useState("none");
  const [data, setData] = React.useState({});

  //Formik Save
  const signUp = (formData) => {
    console.log("Form Data: ", formData);
    axios({
      method: "post",
      url: "/api/auth/verify",
      data: {
        userId: localStorage.getItem("userId"),
        otp: formData.otp,
      },
    })
      .then((res) => {
        console.log("response is: ", res);
        if (res.data.message === "Code has expired. Please request again") {
          const response1 = res.data.message;
          document.getElementById("dulplicateEmail").innerHTML = response1;
        }

        if (res.data.message === "Invalid code passed. Enter correct code.") {
          const response2 = res.data.message;
          document.getElementById("dulplicateEmail").innerHTML = response2;
        }

        if (res.data.message === "User email verified successfully.") {
          notification();
          return navigate("/set-new-password");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Notification message
  toast.configure();
  const notification = () => {
    toast.success(t("verify_success"));
  };

  const date = new Date();
  const Date1 = date.toDateString();
  console.log(Date1);

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

      <div className="content">
        <div className="verify">
          <h2>{t("verify_account")}</h2>
          <Formik
            onReset={handleReset}
            initialValues={{
              otp: "",
            }}
            onSubmit={(formData) => signUp(formData)}
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
                  id="dulplicateEmail"
                  style={{
                    color: "red",
                    marginLeft: 65,
                    fontSize: 15,
                    fontFamily: "sans-serif",
                  }}
                >
                  {data.message}
                </p>
                <input
                  required
                  type="password"
                  id="otp"
                  placeholder={t("enter_code")}
                  style={allStyles.input}
                  onChange={handleChange("otp")}
                  onBlur={() => setFieldTouched("otp")}
                />
                {touched.otp && <p style={styling}>{errors.otp}</p>}

                <button
                  className="btn btn-primary"
                  id="submit-form"
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                    clear();
                  }}
                >
                  {t("verify_account")}
                </button>

                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => {
                    ResendOTP(t("code_sent_mssg"));
                    clear();
                  }}
                >
                  {t("resend_code")}
                </button>
              </>
            )}
          </Formik>
        </div>
        <Footer />
      </div>
    </>
  );
};

function ResendOTP(success_mssg) {
  axios({
    method: "post",
    url: "/api/auth/resendOTP",
    data: {
      userId: localStorage.getItem("userId"),
      email: localStorage.getItem("Email"),
    },
  })
    .then((res) => {
      console.log("response is: ", res);
      if (res.data.status === "PENDING") {
        notification();
      }
    })
    .catch((err) => {
      console.log(err);
    });

  // Notification message
  toast.configure();
  const notification = () => {
    toast.success(
      success_mssg
    );
  };
}

var handleReset = (values, formProps) => {
  return window.confirm("Reset?"); // still resets after you Cancel :(
};
function clear1() {
  document.getElementById("dulplicateEmail").reset();
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

SignUpVerify.defaultProps = {
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
};
