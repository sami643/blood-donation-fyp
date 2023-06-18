import React from "react";
import "./Popup1.css";
// import { useTranslation, initReactI18next } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Axios library is used for ingration and connection of frontend with backend.
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";

// Integration
export default function PostFeedbacks(props) {
  const validateSchema = Yup.object().shape({
    name: Yup.string().required().label("name"),
    feedback: Yup.string().required().label("feedback"),
  });

  //Formik Save
  const PostFeedbacks = (formData) => {
    console.log("Form Data: ", formData);
    axios({
      method: "post",
      url: "/api/feedbacks/Feedback_post",
      data: {
        name: formData.name,
        feedback: formData.feedback,
      },
    })
      .then((res) => {
        if (res.data.message === "Feedback sent") {
          notification();

          document.getElementById("myid").disabled = true;
        }

        if (res.data.message === "error") {
          notification1();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Notification message
  toast.configure();
  const notification = () => {
    toast.success("Feedback sent! Thank you for being with Us");
  };
  const notification1 = () => {
    toast.error("Please Enter your name and feedback");
  };

  // const {t}=useTranslation()
  return props.trigger ? (
    <div className="popup">
      <Formik
        initialValues={{ name: "", feedback: "" }}
        onSubmit={(formData) => PostFeedbacks(formData)}
        validationSchema={validateSchema}
      >
        {({ handleSubmit, handleChange, errors, setFieldTouched, touched }) => (
          <>
            <form action="submit" name="myform">
              <button onClick={() => props.btntriger(false)}>X</button>
              <div className="popup-inner">
                <h3>{props.t}</h3>
                <input
                  type="text"
                  name="name"
                  placeholder="enter your name"
                  required
                  id="name1"
                  style={{
                    width: "93%",
                    marginLeft: "3%",
                    marginRight: "4%",
                    marginBottom: "15px",
                  }}
                  onChange={handleChange("name")}
                  onBlur={() => setFieldTouched("name")}
                />
                <textarea
                  name="feedback"
                  id="feedback"
                  cols="50"
                  rows="4"
                  placeholder="Write here"
                  required
                  onChange={handleChange("feedback")}
                  onBlur={() => setFieldTouched("feedback")}
                ></textarea>

                <button
                  id="myid"
                  type="submit"
                  style={{
                    position: "relative",
                    right: "-5px",
                    marginTop: "11px",
                    width: "63px",
                  }}
                  className="btn btn-primary "
                  onClick={handleSubmit}
                >
                  Send
                </button>
              </div>
            </form>
          </>
        )}
      </Formik>
    </div>
  ) : (
    ""
  );
}

// styling part
const styling = {
  color: "red",
  marginLeft: 65,
  fontSize: 15,
  fontFamily: "sans-serif",
};
