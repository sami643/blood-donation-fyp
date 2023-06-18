import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../Pages/SignIn.css";
import "../Pages/Home.css";
import Footer from "../Components/Footer1";
import ANav from "../AdminComponent/ANav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

// Integration
export default function Contact(props) {
  const validateSchema = Yup.object().shape({
    contact: Yup.string().required().label("contact"),
  });

  //Formik Save
  const Contact = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "put",
      url: "/api/management/updateContactUs",
      data: {
        contact: formData.contact,
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
    toast.success("contact us Number updated Successfully");
  };
  return (
    <>
      <ANav />
      <div className="content">
        <div className="sign-in">
          <h2>Change Contact</h2>
          <Formik
            initialValues={{ contact: "", id: "623e046efc9f1b2b12c0f9d0" }}
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
                <br /> <label style={{ margin: "15px" }}>Contact No</label>
                <input
                  type="number"
                  onChange={handleChange("contact")}
                  onBlur={() => setFieldTouched("contact")}
                />
                {touched.contact && <p style={styling}>{errors.contact}</p>}
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
