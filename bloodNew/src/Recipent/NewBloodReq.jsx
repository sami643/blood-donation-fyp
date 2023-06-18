import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "../Pages/SignIn.css";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import Navs from "../RecipentComponet/Navs";

import AuthContext from "../auth/context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

// yup library is used for form validation.
export default function SignUp(props) {
  const validateSchema = Yup.object().shape({
    // Name: Yup.string().required().label("Name"),
    // email: Yup.string().required().email().label("Email"),
    contact: Yup.number().required().label("contact"),
    patientGender: Yup.string().required().label("patientGender"),
    city: Yup.string().required().label("city"),
    area: Yup.string().required().label("area"),
    bloodGroup: Yup.string().required().label("bloodGroup"),
    bloodQuantity: Yup.string().required().label("bloodQuantity"),
    patientAge: Yup.string().required().label("patientAge"),
    patientDisease: Yup.string().required().label("patientDisease"),
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
      url: "/api/recipents/newRecipent",
      data: {
        Name: user.name[0].toUpperCase() + user.name.substring(1),
        email: user.email,
        contact: formData.contact,
        patientGender: formData.patientGender,
        city: formData.city[0].toUpperCase() + formData.city.substring(1),
        area: formData.area,
        bloodGroup: formData.bloodGroup,
        bloodQuantity: formData.bloodQuantity,
        patientAge: formData.patientAge,
        patientDisease: formData.patientDisease,
      },
    })
      .then((res) => {
        console.log("response is: ", res);

        setData(user);
        const response1 = res.data.message;

        document.getElementById("dulplicateEmail").innerHTML = response1;
        if (res.data.message === "New recipent record created") {
          document.getElementById("mybtn").disabled = true;
          notification();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("this si ID", user.userID);
  // Notification message
  toast.configure();
  const notification = () => {
    toast.success("your donation request post created successfully");
  };

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
        <div className="contain">
          <div
            className="sign-up  border rounded m-3"
            style={{ textAlign: "center" }}
          >
            <h2 className="h1 mt-1 ">Recipent Details</h2>
            <div
              id="dulplicateEmail"
              className="h5"
              style={{
                fontFamily: "sans-serif",
                color: "black",
                backgroundColor: "yellow",
              }}
            >
              {data.message}
            </div>
            <Formik
              initialValues={{
                Name: user.name,
                email: user.email,
                contact: "",
                patientGender: "",
                city: "",
                area: "",
                bloodGroup: "",
                bloodQuantity: "",
                patientAge: "",
                patientDisease: "",
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
                    <div className="col-6 ">
                      <input
                        type="number"
                        placeholder="contact"
                        style={allStyles.input}
                        onChange={handleChange("contact")}
                        onBlur={() => setFieldTouched("contact")}
                      />
                      {touched.contact && (
                        <p style={styling}>{errors.contact}</p>
                      )}

                      <input
                        type="text"
                        placeholder="city"
                        style={allStyles.input}
                        onChange={handleChange("city")}
                        onBlur={() => setFieldTouched("city")}
                      />
                      {touched.city && <p style={styling}>{errors.city}</p>}

                      <input
                        type="text"
                        placeholder="area"
                        style={allStyles.input}
                        onChange={handleChange("area")}
                        onBlur={() => setFieldTouched("area")}
                      />
                      {touched.area && <p style={styling}>{errors.area}</p>}

                      <input
                        type="text"
                        placeholder="patientAge"
                        style={allStyles.input}
                        onChange={handleChange("patientAge")}
                        onBlur={() => setFieldTouched("patientAge")}
                      />

                      {touched.patientAge && (
                        <p style={styling}>{errors.patientAge}</p>
                      )}

                      <input
                        type="text"
                        placeholder="patientDisease"
                        style={allStyles.input}
                        onChange={handleChange("patientDisease")}
                        onBlur={() => setFieldTouched("patientDisease")}
                      />
                      {touched.patientDisease && (
                        <p style={styling}>{errors.patientDisease}</p>
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
                            Blood quantity
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
                        onChange={handleChange("patientGender")}
                        onBlur={() => setFieldTouched("patientGender")}
                      >
                        <optgroup>
                          <option value="" onChange={handleChange} hidden>
                            Patient Gender
                          </option>
                          <option value="Male" onChange={handleChange}>
                            Male
                          </option>
                          <option value="Female" onChange={handleChange}>
                            Female
                          </option>
                          <option value="Other" onChange={handleChange}>
                            Other..
                          </option>
                        </optgroup>
                      </select>
                      {touched.patientGender && (
                        <p style={styling}>{errors.patientGender}</p>
                      )}

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
                            Blood group
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
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button
                          className="btn btn-primary mt-5"
                          style={{ marginTop: "5%", float: "right" }}
                          type="submit"
                          onClick={() => navigate("/user/recipent")}
                        >
                          Back
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
                          Submit
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
