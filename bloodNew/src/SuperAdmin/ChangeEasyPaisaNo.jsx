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
    easyPaisa: Yup.string().required().label("easyPaisa"),
  });

  //Formik Save
  const EasyPaisa1 = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "post",
      url: "/management/updateEasyPaisa",
      data: {
        easyPaisa: formData.easyPaisa,
        id: formData.id,
      },
    })
      .then((res) => {
        console.log("response is: ", res);

        if (res.data.message === "Success2") {
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
    toast.success("Easy Paisa account updated Successfully");
  };

  return (
    <>
      <ANav />
      <div className="content">
        <div className="sign-in">
          <h2>Update</h2>

          <Formik
            initialValues={{ easyPaisa: "", id: "62641ceaf12f786b3737e7ff" }}
            onSubmit={(formData) => EasyPaisa1(formData)}
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
                <br />
                <label style={{ margin: "15px" }}>EasyPaisa No</label>
                <input
                  type="number"
                  onChange={handleChange("easyPaisa")}
                  onBlur={() => setFieldTouched("easyPaisa")}
                />
                {touched.easyPaisa && <p style={styling}>{errors.easyPaisa}</p>}{" "}
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
