import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../Pages/SignIn.css";
import "../Pages/Home.css";
import Footer from "../Components/Footer1";
import ANav from "../SuperAdminComponent/ANav";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Integration
export default function ContactUs(props) {
  const validateSchema = Yup.object().shape({
    contact: Yup.string().required().label("contact"),
  });
  const ContactUs = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "post",
      url: "/api/management/ContactUs",
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

  toast.configure();
  const notification = () => {
    toast.success("contact us number updated Sucessfully");
  };

  const { t } = useTranslation();

  return (
    <>
      <ANav />

      <div className="content">
        <div className="sign-in">
          <Formik
            initialValues={{ contact: "", id: "623e046efc9f1b2b12c0f9d0" }}
            onSubmit={(formData) => ContactUs(formData)}
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
                <h2 style={{ marginLeft: "2%" }}>Contact Us</h2>
                <br />
                <label style={{ margin: "15px" }}>Change ContactNo</label>
                <input
                  type="number"
                  onChange={handleChange("contact")}
                  onBlur={() => setFieldTouched("contact")}
                />
                {touched.contact && <p style={styling}>{errors.contact}</p>}{" "}
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
      </div>
      <Footer />
    </>
  );
}

const styling = {
  color: "red",
  marginLeft: 65,
  fontSize: 10,
  fontFamily: "sans-serif",
};
