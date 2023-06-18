import React, { useContext, useEffect, useState } from "react";
import "../Pages/SignIn.css";
import "../Pages/Home.css";
import Footer from "../Components/Footer2";
import ANav from "../OrganizationComponent/ANav";

import "../AdminScreen/OrgSignUp.css";
import "../AdminScreen/ExistingCamps.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "../auth/context";

let data = {};

// Integration
export default function GettingCamps(props) {
  const [rec, setRec] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const Id = location.state.id;

  const { user } = useContext(AuthContext);

  const validateSchema = Yup.object().shape({
    title: Yup.string().required().label("title"),
    venue: Yup.string().required().label("venue"),
    date: Yup.string().required().label("date"),
    time: Yup.string().required().label("time"),
    organizers: Yup.string().required().label("organizers"),
  });
  const [recID, setRecID] = useState("");

  const navToExsitingCamps = () => {
    navigate("/organization/existing-camp", {});
  };

  const getData = () => {
    axios({
      method: "post",
      url: "/api/camping/get-camp",
      data: {
        Id,
      },
    }).then((res) => {
      console.log("Got Data: ", res.data.Camp);
      data = res.data.Camp;
      setRec(data);
      console.log("DATA1: ", data);

      setRecID(data._id);
    });
  };
  useEffect(() => {
    getData();
    setRec(data);
    console.log("rec: ", rec);
    console.log("rec-----id: ", data._id);
  }, []);

  //Formik Save
  const UpdateCamp = (formData) => {
    console.log("Form Data: ", formData);
    axios({
      method: "PUT",
      url: "/api/camping/update-camp-by-org",
      data: {
        title: formData.title,
        venue: formData.venue,
        date: formData.date,
        time: formData.time,
        organizers: formData.organizers,
        Id: rec._id,
        orgId: user.userID,
        arrangedBy: user.name,
        reqType: formData.reqType,
      },
    })
      .then((res) => {
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
    toast.info("Post Updated. Please Wait for Admin Approval!");
  };

  return (
    <>
      <ANav />

      <div className="content">
        {!recID ? (
          <p
            id="recordMessage"
            style={{
              color: "#373433",
              backgroundColor: "	#F5F5F5",
              width: "100%",
              padding: "20%",
              textAlign: "center",
              fontSize: 15,
              fontFamily: "sans-serif",
            }}
          >
            <h3>No record Available!</h3>
          </p>
        ) : (
          <div className="contain">
            <Formik
              enableReinitialize
              initialValues={{
                title: rec.Title,
                venue: rec.Vanue,
                date: rec.Date,
                time: rec.Time,
                reqType: "campingReq",
                organizers: rec.Organizers,
                Id: rec._id,
              }}
              onSubmit={(formData) => UpdateCamp(formData)}
              validationSchema={validateSchema}
            >
              {({
                handleSubmit,
                handleChange,
                errors,
                setFieldTouched,
                touched,
                values,
              }) => (
                <>
                  <div className="contain-box">
                    <h2
                      style={{
                        display: "inline-block",
                        boxShadow: "2px 3px 12px #000",
                        padding: "12px",
                        marginTop: "20px",
                        marginLeft: "10px",
                        marginBottom: "0px",
                      }}
                    >
                      Camp details
                    </h2>
                    <p
                      style={{ background: "rgba(6, 6, 6, 0.12)" }}
                      name="campdetail"
                      id="cmddetail"
                      cols="35"
                      rows="10"
                    ></p>
                    <p style={style.p}>
                      <b>Camp Name: </b>
                      <br />
                      <input
                        style={style.input}
                        type="text"
                        value={values.title}
                        onChange={handleChange("title")}
                        onBlur={() => setFieldTouched("title")}
                      />
                      {touched.title && <p style={styling}>{errors.title}</p>}
                    </p>
                    <p style={style.p}>
                      <b>Venue: </b>
                      <br />
                      <input
                        style={style.input}
                        type="text"
                        value={values.venue}
                        onChange={handleChange("venue")}
                        onBlur={() => setFieldTouched("venue")}
                      />
                    </p>

                    <p style={style.p}>
                      <b>Date: </b>
                      <br />
                      <input
                        style={style.input}
                        type="text"
                        value={values.date}
                        onChange={handleChange("date")}
                        onBlur={() => setFieldTouched("date")}
                      />
                      {touched.date && <p style={styling}>{errors.date}</p>}
                    </p>

                    <p style={style.p}>
                      <b>Time: </b>
                      <br />
                      <input
                        style={style.input}
                        type="text"
                        value={values.time}
                        onChange={handleChange("time")}
                        onBlur={() => setFieldTouched("time")}
                      />
                      {touched.time && <p style={styling}>{errors.time}</p>}
                    </p>

                    <p style={style.p}>
                      <b>Organizers: </b>
                      <br />
                      <input
                        style={style.input}
                        type="text"
                        value={values.organizers}
                        onChange={handleChange("organizers")}
                      />
                      {touched.organizers && (
                        <p style={styling}>{errors.organizers}</p>
                      )}
                      <button
                        type="button"
                        class="btn btn-primary m-3 mt-4"
                        onClick={() => {
                          handleSubmit();
                          navToExsitingCamps();
                        }}
                      >
                        Update
                      </button>

                      <button
                        type="button"
                        class="btn btn-primary m-3 mt-4 "
                        onClick={() => navigate("organization/existing-camp")}
                      >
                        Back
                      </button>
                    </p>
                  </div>
                </>
              )}
            </Formik>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
}

const style = {
  input: {
    background: "rgba(6, 6, 6, 0.12)",
    width: "80%",
    marginLeft: "2%",
    marginBottom: "1px",
  },

  p: {
    textAlign: "Center",
  },
};

// styling part
const styling = {
  color: "red",
  marginLeft: 80,
  fontSize: 15,
  fontFamily: "sans-serif",
};
