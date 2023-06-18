import React, { useContext, useState } from "react";
import "../Pages/SignIn.css";
import "../Pages/Home.css";
import Footer from "../Components/Footer2";
import ANav from "../OrganizationComponent/ANav";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Axios library is used for ingration and connection of frontend with backend.
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer } from "react-bootstrap";
import AuthContext from "../auth/context";

// Integration
export default function NewCamp(props) {
  const validateSchema = Yup.object().shape({
    title: Yup.string().required().label("title"),
    venue: Yup.string().required().label("venue"),
    date: Yup.date().required().label("date"),
    time: Yup.string().required().label("time"),
    organizers: Yup.string().required().label("organizers"),
  });

  const { user } = useContext(AuthContext);

  //Formik Save
  const NewCamp = (formData) => {
    console.log("Form Data: ", formData);
    axios({
      method: "post",
      url: "/api/requests/postingReq",
      data: {
        title: formData.title,
        venue: formData.venue,
        date: formData.date,
        time: formData.time,
        organizers: formData.organizers,
        orgId: user.userID,
        reqType: formData.reqType,
        arrangedBy: user.name,
        date1: formData.date1,
      },
    })
      .then((res) => {
        if (res.data.message === "Success") {
          notification();
          document.getElementById("myid").disabled = true;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Notification message
  toast.configure();
  const notification = () => {
    toast.info(
      "Camping post created successfully please wait for admin Approval!"
    );
  };

  return (
    <>
      <ANav />
      <div className="content">
        <div className="sign-up">
          <h2>new camp</h2>
          <Formik
            initialValues={{
              title: "",
              venue: "",
              date: "",
              time: "",
              organizers: "",
              reqType: "campingReq",
              date1: new Date(),
            }}
            onSubmit={(formData) => NewCamp(formData)}
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
                  placeholder="Enter Camp title"
                  style={allStyles.input}
                  onChange={handleChange("title")}
                  onBlur={() => setFieldTouched("title")}
                />
                {touched.title && <p style={styling}>{errors.title}</p>}
                {/* <textarea name="cmpinfo" id="cmpinfo" placeholder='Enter Camp Info' style={{margin:'5% 20px 10px 11%', width:'80%'}} onChange={handleChange("info")} onBlur={()=>setFieldTouched("info")}></textarea>
              {touched.venue && (
                      <p style={styling}>{errors.info}</p>
                    )} */}
                <label>Vanue</label>
                <input
                  type="text"
                  placeholder="Enter Venue"
                  style={allStyles.input}
                  onChange={handleChange("venue")}
                  onBlur={() => setFieldTouched("venue")}
                />
                {touched.venue && <p style={styling}>{errors.venue}</p>}
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  style={allStyles.input}
                  onChange={handleChange("date")}
                  onBlur={() => setFieldTouched("date")}
                />
                {touched.date && <p style={styling}>{errors.date}</p>}
                <label>Time</label>
                <input
                  type="time"
                  name="time"
                  id="time"
                  style={allStyles.input}
                  onChange={handleChange("time")}
                  onBlur={() => setFieldTouched("time")}
                />
                {touched.time && <p style={styling}>{errors.time}</p>}
                <label>Organizers</label>
                <input
                  type="text"
                  name="org"
                  id="org"
                  placeholder=" organizers"
                  style={allStyles.input}
                  onChange={handleChange("organizers")}
                  onBlur={() => setFieldTouched("organizers")}
                />
                {touched.organizers && (
                  <p style={styling}>{errors.organizers}</p>
                )}
                <button
                  id="myid"
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                  style={{ marginTop: "3%" }}
                >
                  Post
                </button>
              </>
            )}
          </Formik>
        </div>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

// styling part
const styling = {
  color: "red",
  marginLeft: 85,
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
