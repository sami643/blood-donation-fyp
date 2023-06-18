/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import ANav from "../SuperAdminComponent/ANav";
import "../Pages/Home.css";
import Footer1 from "../Components/Footer1";
import "./ChangePassword.css";
import AuthContext from "../auth/context";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/// Integration
export default function SignIn(props) {
  const [data, setData] = React.useState("");

  const { user } = useContext(AuthContext);
  console.log("SuperAdminID11111", user);

  const validateSchema = Yup.object().shape({
    old_password: Yup.string().required().label("old password"),
    new_password: Yup.string().required().min(5).label("new password"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("new_password"), null],
      "Password must match"
    ),
  });

  const SignIn = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "post",
      url: "/api/auth/userUpdate",

      data: {
        old_password: formData.old_password,
        new_password: formData.new_password,
        id: user.userID,
        role: formData.role,
      },
    }).then((res) => {
      console.log("respond is:", res);
      const response = res.data.message;
      document.getElementById("wrongCredintials").innerHTML = response;

      if (res.data.message === "password Updated") {
        notification();
      }
    });
  };
  // Notification message
  toast.configure();
  const notification = () => {
    toast.success("Your password have been changed successfully");
  };

  console.log("SuperAdminId:", user.userID);
  // -----------------
  return (
    <>
      <ANav />

      <div className="content">
        <div className="sign-In">
          <h2>Change Password</h2>
          <Formik
            initialValues={{
              old_password: "",
              new_password: "",
              confirmPassword: "",
              id: user.userID,
              role: "superAdmin",
            }}
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
                  type="password"
                  id="email"
                  placeholder="Old Password"
                  style={allStyles.input}
                  onChange={handleChange("old_password")}
                  onBlur={() => setFieldTouched("old_passowrd")}
                />
                {touched.old_password && (
                  <p style={styling}>{errors.old_password}</p>
                )}
                <input
                  required
                  type="password"
                  id="password"
                  placeholder="new password"
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
                  placeholder="confirm password"
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
                  Update
                </button>
              </>
            )}
          </Formik>
        </div>
        <Footer1 />
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
