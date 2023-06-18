/* eslint-disable no-sequences */
import React from "react";
import "./SignUp.css";
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
export default function SignUp(props) {
  const navigate = useNavigate();
  const validateSchema = Yup.object().shape({
    fullName: Yup.string().required().label("Name"),
    email: Yup.string().required().email().label("Email"),
    password: Yup.string().required().min(5).label("Password"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password must match"
    ),
  });

  const [role, setRole] = React.useState("user");
  //const [toggle, setToggle] = React.useState("none");
  const [data, setData] = React.useState({});

  //Formik Save
  const signUp = (formData) => {
    console.log("Form Data: ", formData);
    axios({
      method: "post",
      url: "/api/auth/signup",
      data: {
        email: formData.email,
        fullname: formData.fullName,
        password: formData.password,
        reqType: formData.reqType,
        date1: formData.date1,
        confirmPassword: formData.confirmPassword,
        role: role,
      },
    })
      .then((res) => {
        console.log("response is: ", res);
        if (
          res.data.message ===
          "User already existed please try another email address"
        ) {
          const response1 = res.data.message;
          document.getElementById("dulplicateEmail").innerHTML = response1;
        }

        if (
          res.data.message ===
          "request already sent using this email please wait for approval"
        ) {
          const response2 = res.data.message;
          document.getElementById("dulplicateEmail").innerHTML = response2;
        }

        if (
          res.data.message === "Your account has been registered successfully"
        ) {
          notification();
        }

        if (
          res.data.message ===
          "Admin signUp request sent please wait for apporval!"
        ) {
          notification1();
        }

        if (role === "user") {
          localStorage.setItem("userId", res.data.data.userId);
          localStorage.setItem("Email", res.data.data.Email);
          return navigate("/verify-email");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Notification message
  toast.configure();
  const notification = () => {
    toast.success("you signed up Successfully");
  };

  const notification1 = () => {
    toast.info("Admin signUp request sent please wait for apporval!");
  };

  const date = new Date();
  const Date1 = date.toDateString();
  console.log(Date1);

  const { t } = useTranslation();

  return (
    <>
      <Navs
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
        <div className="sign-up">
          <h2>{t("sign_up")}</h2>
          <Formik
            onReset={handleReset}
            initialValues={{
              fullName: "",
              email: "",
              password: "",
              confirmPassword: "",
              role: "",
              reqType: "adminSignUp",
              date1: Date1,
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
                  type="text"
                  id="name1"
                  placeholder={t("full_name")}
                  style={allStyles.input}
                  onChange={handleChange("fullName")}
                  onBlur={() => setFieldTouched("fullName")}
                />
                {touched.fullName && <p style={styling}>{errors.fullName}</p>}

                <input
                  required
                  type="text"
                  id="email"
                  placeholder={t("enter_email")}
                  style={allStyles.input}
                  onChange={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                />
                {touched.email && <p style={styling}>{errors.email}</p>}
                <input
                  required
                  type="password"
                  id="password"
                  placeholder={t("enter_password")}
                  style={allStyles.input}
                  onChange={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                />
                {touched.password && <p style={styling}>{errors.password}</p>}
                <input
                  required
                  type="password"
                  id="confirmPassword"
                  placeholder={t("confirm_password")}
                  style={allStyles.input}
                  onChange={handleChange("confirmPassword")}
                  onBlur={() => setFieldTouched("confirmPassword")}
                />
                {touched.confirmPassword && (
                  <p style={styling}>{errors.confirmPassword}</p>
                )}
                <div class="radioButton">
                  <span id="signUpAs">{t("sign_up_as")}:</span>
                  <div class="userdiv">
                    <label>User:</label>
                    <input
                      type="radio"
                      checked="checked"
                      name="radio"
                      className="radionbtn"
                      value="user"
                      onChange={(event) => {
                        setRole(event.target.value);
                      }}
                    />
                    <span class="checkmark"></span>
                  </div>

                  <div class="admindiv">
                    <label>Admin:</label>
                    <input
                      type="radio"
                      name="radio"
                      className="radionbtn"
                      value="admin"
                      onChange={(event) => {
                        setRole(event.target.value);
                      }}
                    />
                    <span class="checkmark"></span>
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  id="submit-form"
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                    clear();
                  }}
                >
                  {t("sign_up")}
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

var handleReset = (values, formProps) => {
  return window.confirm("Reset?"); // still resets after you Cancel
};

// styling part
const styling = {
  color: "red",
  marginLeft: 85,
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

SignUp.defaultProps = {
  page1: "Home",
  page1link: "/",
  page2: "Blood Info",
  page2link: "/blood-info",
  page3: "Financial Support",
  page3link: "/financial-support",
  page4: "Partners",
  page4link: "/partner",
  page5: "About us",
  page5link: "/about",
  page6: "Sign in",
  page6link: "/sign-in",
};
