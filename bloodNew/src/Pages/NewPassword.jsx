/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import ANav from "../UserComponent/ANav";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import "../User/ChangePassword.css";
import AuthContext from "../auth/context";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Integration
export default function SetPassword(props) {
  const navigate = useNavigate();

  const [data, setData] = React.useState("");
  const userId = localStorage.getItem("userId");

  const validateSchema = Yup.object().shape({
    new_password: Yup.string().required().min(5).label("new password"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("new_password"), null],
      "Password must match"
    ),
  });

  const setPassword = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "post",
      url: "/api/auth/passwordchange",

      data: {
        new_password: formData.new_password,
        id: userId,
      },
    }).then((res) => {
      console.log("respond is:", res);

      if (res.data.message === "password Updated") {
        notification();
        localStorage.clear();
        return navigate("/sign-in");
      }
    });
  };
  // Notification message
  toast.configure();
  const notification = () => {
    toast.success("Your password have been changed successfully");
  };

  console.log("This is GivenId:", userId);
  // -----------------
  const { t } = useTranslation();

  return (
    <>
      <ANav />

      <div className="content">
        <div className="sign-In">
          <h2>{t("set_new_pass")}</h2>
          <Formik
            initialValues={{
              new_password: "",
              confirmPassword: "",
              id: userId,
            }}
            onSubmit={(formData) => setPassword(formData)}
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
                  type="password"
                  id="password"
                  placeholder={t("new_password")}
                  style={allStyles.input}
                  onChange={handleChange("new_password")}
                  onBlur={() => setFieldTouched("new_password")}
                />
                {touched.new_password && (
                  <p style={styling}>{errors.new_password}</p>
                )}
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

                <button
                  className="btn btn-primary"
                  id="submit-form"
                  type="submit"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  {t("update")}
                </button>
              </>
            )}
          </Formik>
        </div>
        <Footer />
      </div>
    </>
  );
  // ---------------------------
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