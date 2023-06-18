import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../Pages/SignIn.css";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import Navs from "../DonorComponent/Navs";
import AuthContext from "../auth/context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// yup library is used for form validation.
export default function SignUp(props) {
  const validateSchema = Yup.object().shape({
    // Name: Yup.string().required().label("Name"),
    // email: Yup.string().required().email().label("Email"),
    contact: Yup.number().required().label("contact"),
    gender: Yup.string().required().label("gender"),
    city: Yup.string().required().label("city"),
    area: Yup.string().required().label("area"),
    bloodGroup: Yup.string().required().label("bloodGroup"),
    bloodQuantity: Yup.string().required().label("bloodQuantity"),
    medicalHistory: Yup.string().required().label("medicalHistory"),
    pickAndDrop: Yup.string().required().label("pickAndDrop"),
    //  status1: Yup.string().required().label("status"),
  });

  const navigate = useNavigate();
  const [data, setData] = React.useState({});
  const { user } = useContext(AuthContext);
  console.log("this si ID", user.email);

  const signUp = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "post",
      url: "/api/donorRec/newDonor",
      data: {
        Name: user.name[0].toUpperCase() + user.name.substring(1),
        email: user.email,
        contact: formData.contact,
        gender: formData.gender,
        city: formData.city[0].toUpperCase() + formData.city.substring(1),
        area: formData.area,
        bloodGroup: formData.bloodGroup,
        bloodQuantity: formData.bloodQuantity,
        medicalHistory: formData.medicalHistory,
        pickAndDrop: formData.pickAndDrop,
      },
    })
      .then((res) => {
        console.log("response is: ", res);

        setData(user);
        
        if (res.data.message === "Donation post created") {
          document.getElementById("mybtn").disabled = true;
          notification();
        } else {
          notification('error');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("this si ID", user.userID);
  // Notification message
  toast.configure();
  // const notification = () => {
  //   toast.success(t("donation_req_success"));
  // };

  const notification = (type = "success") => {
    if (type === "success") {
      toast.success(t("donation_req_success"));
    } else if (type === "error") {
      toast.error(t("donation_req_failed"));
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Navs
        first={props.page1}
        firstlink={props.page1link}
        sec={props.page2}
        seclink={props.page2link}
        th={props.page3}
        thlink={props.page3link}
        frt={props.page4}
        frtlink={props.page4link}
        fiv={props.page5}
        fivlink={props.page5link}
        six={props.page6}
        sixlink={props.page6link}
      />

      <div className="content ">
        <div className="contain  m-3 mb-5" style={{ textAlign: "center" }}>
          <div className="sign-up  m-3 ">
            <h2 className="h1 mt-1 ">{t("donor_detail")}</h2>
            <Formik
              initialValues={{
                Name: user.name,
                email: user.email,
                contact: "",
                gender: "",
                city: "",
                area: "",
                bloodGroup: "",
                bloodQuantity: "",
                medicalHistory: "",
                pickAndDrop: "",
              }}
              onSubmit={(formData) => signUp(formData)}
              validationSchema={validateSchema}
              onsubmit="return false"
            >
              {({
                handleSubmit,
                handleChange,
                errors,
                setFieldTouched,
                touched,
              }) => (
                <>
                  {/* <input
                  type="text"
                  placeholder=" fullName"
                  style={allStyles.input}
                  onChange={handleChange("Name")}
                  onBlur={() => setFieldTouched("Name")}
                />
                {touched.Name && <p style={styling}>{errors.Name}</p>}

                <input
                  type="email"
                  value={user.email}
                  placeholder=" email address"
                  style={allStyles.input}
                  onChange={handleChange("email")}
                  onBlur={() => setFieldTouched("email")}
                />
                {touched.email && <p style={styling}>{errors.email}</p>} */}
                  <div className="row">
                    <div className="col-6 mt-3">
                      <input
                        type="number"
                        placeholder={t("cnt_no")}
                        style={allStyles.input}
                        onChange={handleChange("contact")}
                        onBlur={() => setFieldTouched("contact")}
                      />
                      {touched.contact && (
                        <p style={styling}>{errors.contact}</p>
                      )}

                      <input
                        type="text"
                        placeholder={t("City")}
                        style={allStyles.input}
                        onChange={handleChange("city")}
                        onBlur={() => setFieldTouched("city")}
                      />
                      {touched.city && <p style={styling}>{errors.city}</p>}

                      <input
                        type="text"
                        placeholder={t("Area")}
                        style={allStyles.input}
                        onChange={handleChange("area")}
                        onBlur={() => setFieldTouched("area")}
                      />
                      {touched.area && <p style={styling}>{errors.area}</p>}

                      <textarea
                        type="text"
                        name="textarea"
                        id=""
                        cols="30"
                        rows="2"
                        placeholder={t("med_history")}
                        style={{
                          width: "80%",
                          marginLeft: "8%",
                          fontSize: "18px",
                          borderRadius: 15,
                          marginBottom: "3%",
                          borderWidth: "1",
                        }}
                        onChange={handleChange("medicalHistory")}
                        onBlur={() => setFieldTouched("medicalHistory")}
                      ></textarea>
                      {touched.medicalHistory && (
                        <p style={styling}>{errors.medicalHistory}</p>
                      )}
                    </div>
                    <div className="col-6">
                      <select
                        className="select"
                        style={allStyles1.input}
                        onChange={handleChange("bloodQuantity")}
                        onBlur={() => setFieldTouched("bloodQuantity")}
                      >
                        <optgroup>
                          <option
                            value="bloodQuantity "
                            onChange={handleChange}
                            hidden
                          >
                            {t("blood_quanitity")}
                          </option>
                          <option value="250cc" onChange={handleChange}>
                            250cc
                          </option>
                          <option value="300cc" onChange={handleChange}>
                            300cc
                          </option>
                          <option value="350cc" onChange={handleChange}>
                            350cc
                          </option>
                          <option value="400cc" onChange={handleChange}>
                            400cc
                          </option>
                          <option value="450cc" onChange={handleChange}>
                            450cc
                          </option>
                          <option value="500cc" onChange={handleChange}>
                            500cc
                          </option>
                          <option value="550cc" onChange={handleChange}>
                            550cc
                          </option>
                          <option value="600cc" onChange={handleChange}>
                            600cc
                          </option>
                          <option value="650cc" onChange={handleChange}>
                            650cc
                          </option>
                          <option value="700cc" onChange={handleChange}>
                            700cc
                          </option>
                          <option value="750cc" onChange={handleChange}>
                            750cc
                          </option>
                          <option value="800cc" onChange={handleChange}>
                            800cc
                          </option>
                        </optgroup>
                      </select>
                      {touched.bloodQuantity && (
                        <p style={styling}>{errors.bloodQuantity}</p>
                      )}

                      <select
                        style={allStyles1.input}
                        className="select"
                        onChange={handleChange("gender")}
                        onBlur={() => setFieldTouched("gender")}
                      >
                        <optgroup>
                          <option value="" onChange={handleChange} hidden>
                            {t("gender")}
                          </option>
                          <option value="Male" onChange={handleChange}>
                            {t("male")}
                          </option>
                          <option value="Female" onChange={handleChange}>
                            {t("female")}
                          </option>
                          <option value="Other" onChange={handleChange}>
                            {t("other")}
                          </option>
                        </optgroup>
                      </select>
                      {touched.gender && <p style={styling}>{errors.gender}</p>}

                      <select
                        className="select"
                        style={allStyles1.input}
                        onChange={handleChange("bloodGroup")}
                        onBlur={() => setFieldTouched("bloodGroup")}
                      >
                        <optgroup>
                          <option
                            value="Blood Group"
                            onChange={handleChange}
                            hidden
                          >
                            {t("blood_group")}
                          </option>
                          <option value="A+" onChange={handleChange}>
                            A+
                          </option>
                          <option value="A-" onChange={handleChange}>
                            A-
                          </option>
                          <option value="B+" onChange={handleChange}>
                            B+
                          </option>
                          <option value="B-" onChange={handleChange}>
                            B-
                          </option>
                          <option value="AB+" onChange={handleChange}>
                            AB+
                          </option>
                          <option value="AB-" onChange={handleChange}>
                            AB-
                          </option>
                          <option value="O+" onChange={handleChange}>
                            O+
                          </option>
                          <option value="O-" onChange={handleChange}>
                            O-
                          </option>
                        </optgroup>
                      </select>
                      {touched.bloodGroup && (
                        <p style={styling}>{errors.bloodGroup}</p>
                      )}

                      <select
                        style={allStyles1.input}
                        className="select mb-4"
                        onChange={handleChange("pickAndDrop")}
                        onBlur={() => setFieldTouched("pickAndDrop")}
                      >
                        <optgroup>
                          <option value="" onChange={handleChange} hidden>
                            {t("pick_drop")}
                          </option>
                          <option value="Required" onChange={handleChange}>
                            {t("required")}
                          </option>
                          <option value="not Required" onChange={handleChange}>
                            {t("not_required")}
                          </option>
                        </optgroup>
                      </select>
                      {touched.pickAndDrop && (
                        <p style={styling}>{errors.pickAndDrop}</p>
                      )}
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button
                          className="btn btn-primary mt-5"
                          style={{ marginTop: "5%", float: "right" }}
                          type="submit"
                          onClick={() => navigate("/user/donor/")}
                        >
                          {t("back")}
                        </button>
                      </div>

                      <div className="col-6">
                        {" "}
                        <button
                          className="btn btn-primary  mt-5 "
                          id="mybtn"
                          style={{ marginTop: "5%", float: "left" }}
                          type="submit"
                          onClick={handleSubmit}
                        >
                          {t("submit")}
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
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
    marginBottom: "3%",
  },
};
const allStyles1 = {
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: "3%",
    marginLeft: "11%",
    fontSize: "18px",
  },
};
