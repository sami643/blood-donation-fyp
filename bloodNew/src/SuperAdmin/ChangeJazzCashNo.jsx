import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../Pages/SignIn.css";
import "../Pages/Home.css";
import Footer from "../Components/Footer1";
import ANav from "../SuperAdminComponent/ANav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

// Integration
export default function Contact(props) {
  const validateSchema = Yup.object().shape({
    jazzCash: Yup.string().required().label("jazzCash"),
  });

  //Formik Save
  const Contact = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "post",
      url: "/api/management/updatejazzNo",
      data: {
        jazzCash: formData.jazzCash,
        id: formData.id,
      },
    })
      .then((res) => {
        console.log("response is: ", res);

        if (res.data.message === "Success1") {
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
    toast.success("jazz cash Number updated Successfully");
  };

  return (
    <>
      <ANav />
      <div className="content">
        <div className="sign-in">
          <h2>Update</h2>

          <Formik
            initialValues={{ jazzCash: "", id: "623dfcb7fc9f1b2b12c0f9cf" }}
            onSubmit={(formData) => Contact(formData)}
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
                <br /> <label style={{ margin: "15px" }}>Jazz Cash No</label>
                <input
                  type="number"
                  onChange={handleChange("jazzCash")}
                  onBlur={() => setFieldTouched("jazzCash")}
                />
                {touched.jazzCash && <p style={styling}>{errors.jazzCash}</p>}{" "}
                <br />
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Update
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
