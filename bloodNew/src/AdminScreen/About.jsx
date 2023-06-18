import React, { useEffect, useState } from "react";
// import { useTranslation } from 'react-i18next'
import "../Pages/SignIn.css";
import "../Pages/Home.css";
import Footer from "../Components/Footer1";
import ANav from "../AdminComponent/ANav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Axios library is used for ingration and connection of frontend with backend.
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
let data = [];

// Integration
export default function About(props) {
  const validateSchema = Yup.object().shape({
    title: Yup.string().required().label("title"),
    description: Yup.string().required().label("description"),
  });

  //Formik Save
  const About = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "put",
      url: "/api/management/updateAboutUs",
      data: {
        title: formData.title,
        description: formData.description,
        aboutUs: formData.aboutUs,
      },
    })
      .then((res) => {
        console.log("response is: ", res);

        if (res.data.message === "Success") {
          notification();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Notification message
  toast.configure();
  const notification = () => {
    toast.success("About us updated");
  };

  return (
    <>
      <ANav />
      <div className="content">
        <div className="sign-in">
          <h2>About Us</h2>
          <Formik
            initialValues={{ title: "", description: "", aboutUs: "true" }}
            onSubmit={(formData) => About(formData)}
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
                <br /> <label>Title</label>
                <input
                  type="text"
                  onChange={handleChange("title")}
                  onBlur={() => setFieldTouched("title")}
                />
                {touched.title && <p style={styling}>{errors.title}</p>}
                <label style={{ margin: "15px" }}>Description</label>
                <textarea
                  type="text"
                  id="abouttitle"
                  onChange={handleChange("description")}
                  onBlur={() => setFieldTouched("description")}
                  style={{ width: "396px", color: "#d78f8f" }}
                ></textarea>
                {touched.description && (
                  <p style={styling}>{errors.description}</p>
                )}
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  POST
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
const styling = {
  color: "red",
  marginLeft: 65,
  fontSize: 15,
  fontFamily: "sans-serif",
};
