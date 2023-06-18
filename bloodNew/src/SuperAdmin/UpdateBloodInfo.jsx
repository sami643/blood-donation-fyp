import React, { useEffect, useState } from "react";
// import { useTranslation } from 'react-i18next'
import "../Pages/SignIn.css";
import "../Pages/Home.css";
import Footer from "../Components/Footer1";
import ANav from "../SuperAdminComponent/ANav";
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
    infoDescription: Yup.string().required().label("infoDescription"),
  });

  //Formik Save
  const About = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "put",
      url: "/api/management/updateBloodInfo",
      data: {
        title: formData.title,
        infoDescription: formData.infoDescription,
        id: formData.id,
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
    toast.success("Blood Info is updated");
  };

  return (
    <>
      <ANav />
      <div className="content">
        <div className="sign-in">
          <h2>blood Info</h2>
          <Formik
            initialValues={{
              title: "",
              description: "",
              id: "623deccbfc9f1b2b12c0f9ce",
            }}
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
                  onChange={handleChange("infoDescription")}
                  onBlur={() => setFieldTouched("infoDescription")}
                  style={{ width: "396px", color: "#d78f8f" }}
                ></textarea>
                {touched.infoDescription && (
                  <p style={styling}>{errors.infoDescription}</p>
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
