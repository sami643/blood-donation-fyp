import React from "react";
import "./PartnerCompo.css";
import Footer from "../Components/Footer";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Axios library is used for ingration and connection of frontend with backend.
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

// Integration
export default function OrgsignUp(props) {
  const { t } = useTranslation()

  const validateSchema = Yup.object().shape({
    orgName: Yup.string().required().label("orgName"),
    email: Yup.string().required().email().label("email"),
    contact: Yup.string().required().label("cantact"),
    city: Yup.string().required().label("city"),
    area: Yup.string().required().label("area"),
    password: Yup.string().required().label("password"),
    // Role: Yup.StringSchema().required().label("role"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password must match"
    ),
  });

  //Formik Save
  const OrgsignUp = (formData) => {
    console.log("Form Data: ", formData);
    axios({
      method: "post",
      url: "/api/org/orgsignUp",
      data: {
        orgName: formData.orgName,
        email: formData.email,
        contact: formData.contact,
        city: formData.city,
        area: formData.area,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        ReqType: formData.ReqType,
        // Role: formData.Role,
      },
    })
      .then((res) => {
        if (
          res.data.message ===
          "Orgazniation Registeration Request Sent to Admin"
        ) {
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
    toast.success(
      "Orgazniation Registeration Request Sent to Admin we will notify you soon!"
    );
  };

  return props.trigger ? (
    <>
      {" "}
      class
      <div className="content">
        <div className="orgSignup">
          <div className="cross" onClick={() => props.closebtn(false)}>
            X
          </div>
          <h2>{t("organization_signup")}</h2>
          <Formik
            initialValues={{
              orgName: "",
              email: "",
              contact: "",
              city: "",
              area: "",
              password: "",
              confirmPassword: "",
              ReqType: "OrgReq",
            }}
            onSubmit={(formData) => OrgsignUp(formData)}
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
                <div className="row">
                  <div className="col-6">
                    <input
                      style={allStyles.input}
                      type="text"
                      placeholder={t("enter_org_name")}
                      onChange={handleChange("orgName")}
                      onBlur={() => setFieldTouched("orgName")}
                    />
                    {touched.orgName && <p style={styling}>{errors.orgName}</p>}

                    <input
                      style={allStyles.input}
                      type="email"
                      placeholder={t("enter_email")}
                      onChange={handleChange("email")}
                      onBlur={() => setFieldTouched("email")}
                    />
                    {touched.email && <p style={styling}>{errors.email}</p>}

                    <input
                      style={allStyles.input}
                      type="number"
                      placeholder={t("enter_contact_no")}
                      onChange={handleChange("contact")}
                      onBlur={() => setFieldTouched("contact")}
                    />
                    {touched.contact && <p style={styling}>{errors.contact}</p>}

                    <input
                      style={allStyles.input}
                      type="text"
                      placeholder={t("enter_city_name")}
                      onChange={handleChange("city")}
                      onBlur={() => setFieldTouched("city")}
                    />
                    {touched.city && <p style={styling}>{errors.city}</p>}
                  </div>

                  <div className="col-6">
                    <input
                      style={allStyles.input}
                      type="text"
                      placeholder={t("enter_area")}
                      onChange={handleChange("area")}
                      onBlur={() => setFieldTouched("area")}
                    />
                    {touched.area && <p style={styling}>{errors.area}</p>}

                    <input
                      style={allStyles.input}
                      type="password"
                      placeholder={t("enter_password")}
                      onChange={handleChange("password")}
                      onBlur={() => setFieldTouched("password")}
                    />
                    {touched.password && (
                      <p style={styling}>{errors.password}</p>
                    )}

                    <input
                      style={allStyles.input}
                      type="password"
                      placeholder={t("confirm_password")}
                      onChange={handleChange("confirmPassword")}
                      onBlur={() => setFieldTouched("confirmPassword")}
                    />
                    {touched.confirmPassword && (
                      <p style={styling}>{errors.confirmPassword}</p>
                    )}

                    <button
                      className="btn btn-primary"
                      type="submit"
                      style={{ marginLeft: "25%" }}
                      onClick={handleSubmit}
                    >
                      {t("sign_up")}
                    </button>
                  </div>
                </div>
              </>
            )}
          </Formik>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}

const styling = {
  color: "red",
  marginLeft: 65,
  fontSize: 10,
  fontFamily: "sans-serif",
};
const allStyles = {
  input: {
    width: "80%",
    height: 35,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 15,
  },
};
