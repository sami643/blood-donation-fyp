import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./SignIn.css";
import "./Home.css";
import Footer from "../Components/Footer";
import Navs from "../Components/Navs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Axios library is used for ingration and connection of frontend with backend.
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import AuthContext from "../auth/context";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useTranslation } from "react-i18next";

// Integration
export default function SignIn(props) {
  const navigate = useNavigate();

  const authContext = useContext(AuthContext);
  const validateSchema = Yup.object().shape({
    email: Yup.string().required().email().label("email"),
    password: Yup.string().required().label("password"),
  });

  const [data, setData] = React.useState({});
  const [role, setRole] = useState("user");

  const SignIn = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "post",
      url: "/api/auth/signin",
      data: {
        email: formData.email,
        password: formData.password,
        role,
      },
    })
      .then((res) => {
        console.log("respond is:", res);
        if (res.data.message === "please provide email & password!") {
          const response1 = res.data.message;
          document.getElementById("wrongCredintials").innerHTML = response1;
        }

        if (res.data.message === "wrong email or password!") {
          const response2 = res.data.message;
          document.getElementById("wrongCredintials").innerHTML = response2;
        }

        if (res.data.message === "wrong email or password!") {
          const response3 = res.data.message;
          document.getElementById("wrongCredintials").innerHTML = response3;
        }
        if (res.data.message === "Success") {
          let token = res.data.token;

          localStorage.setItem("token", token);

          notification();
          const user = jwtDecode(res.data.token);
          setData(user);
          authContext.setUser(user);

          // console.log("respeonse is:", res.data.token);
          var decoded = jwt_decode(res.data.token);
          authContext.setUser(decoded);
          console.log("Logged user:", decoded);

          if (role === "user") {
            return navigate("/user");
          } else if (role === "admin") {
            return navigate("/admin");
          } else if (role === "organization") {
            return navigate("/organization");
          } else if (role === "superAdmin") {
            return navigate("/super-admin");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Notification message
  toast.configure();
  const notification = () => {
    toast.success("you signed in successfully");
  };

  const { t } = useTranslation()
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
        <div className="sign-In">
          <h2>{t("sign_in")}</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(formData) => SignIn(formData)}
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
                  {data.message}{" "}
                </p>

                <input
                  required
                  type="text"
                  id="email"
                  placeholder="email"
                  style={allStyles.input}
                  onChange={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                />
                {touched.email && <p style={styling}>{errors.email}</p>}
                <input
                  required
                  type="password"
                  id="password"
                  placeholder="password"
                  style={allStyles.input}
                  onChange={handleChange("password")}
                  onBlur={() => setFieldTouched("password")}
                />
                {touched.password && <p style={styling}>{errors.password}</p>}

                <label id="leble">{t("login_as")}:</label>
                <select
                  className="select1"
                  style={{ background: "#0606061f" }}
                  name="login-as"
                  onChange={(event) => {
                    setRole(event.target.value);
                  }}
                >
                  <option value="user">{t("user")}</option>
                  <option value="admin">{t("admin")}</option>
                  <option value="organization">{t("organization")}</option>
                  <option value="superAdmin">{t("super_admin")}</option>
                </select>
                <br />
                <button
                  className="btn btn-primary"
                  id="submit-form"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {t("sign_in")}
                </button>
                <div className="AlreadyHaveAccount">
                  <p>
                    {t("Do_you_already_have_an_account")}
                    <NavLink to="/user/sign-up" className="f">
                      {t("create_account")}
                    </NavLink>
                  </p>
                  <NavLink to="/forgot-password" className="f">
                    {t("Forgot_Password")}
                  </NavLink>
                </div>
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

SignIn.defaultProps = {
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
