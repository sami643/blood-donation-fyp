import React, { useState, useEffect, useContext } from "react";
import Navs from "../RecipentComponet/Navs";
import "../Pages/SignIn.css";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import AuthContext from "../auth/context";
import { useNavigate } from "react-router-dom";

let data = {};
// Integration
export default function GettingRecords(props) {
  const validateSchema = Yup.object().shape({
    contact: Yup.string().required().label("contact"),
    city: Yup.string().required().label("city"),
    area: Yup.string().required().label("area"),
    bloodQuantity: Yup.string().required().label("bloodQwantity"),
    patientGender: Yup.string().required().label("patientGender"),
    bloodGroup: Yup.string().required().label("bloodGroup"),
    patientDisease: Yup.string().required().label("patientDisease"),
    patientAge: Yup.string().required().label("patientAge"),
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  console.log("userIs:", user.email);
  const [rec, setRec] = useState({});
  console.log("Record:", rec);

  const getData = () => {
    axios({
      method: "post",
      url: "/api/recipents/get-recordfor-editing",
      data: {
        Id: user.email,
      },
    }).then((res) => {
      console.log("Got Data: ", res.data);
      data = res.data.recipent;
      if (data) {
        setRec(data);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  //Formik Save
  const UpdateCamp = (formData) => {
    console.log("Form Data: ", formData);
    axios({
      method: "PUT",
      url: "/api/recipents/updaterecipentRec",
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
        Id: rec._id,
        status: formData.status,
      },
    })
      .then((res) => {
        console.log("Response is:", res.data);
        if (res.data.message === "Record Successfully Updated") {
          document.getElementById("myBtn").disabled = true;
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
    toast.success("Record Updated Successfully");
  };

  const DeleteRecord = () => {
    axios({
      method: "delete",
      url: "/api/recipents/deletdonor-rec",
      data: {
        id: rec._id,
      },
    }).then((res) => {
      console.log("response is:", res.data);
      const response = res.data.message;
      if (response === "The Recipent Record deleted saccesfully") {
        document.getElementById("myBtn").disabled = true;
        notification1();
      }
    });

    toast.configure();
    const notification1 = () => {
      toast.success("The Recipent Record deleted saccesfully");
    };

    useEffect(() => {
      getData();
    }, []);
  };

  return (
    <>
      <Navs />
      <div className="content  ">
        <div className="contain ">
          {!rec._id ? (
            <p
              id="recordMessage"
              style={{
                padding: "15%",
                color: "#373433",
                width: "100%",
                textAlign: "center",
                fontSize: 15,
                fontFamily: "sans-serif",
              }}
            >
              <h3>No Recipents record Available</h3>
            </p>
          ) : (
            <Formik
              enableReinitialize
              initialValues={{
                contact: rec.Contact_1,
                city: rec.City,
                area: rec.Area,
                bloodQuantity: rec.RequiredBloodQ,
                patientAge: rec.PatientAge,
                patientGender: rec.PatientGender,
                bloodGroup: rec.BloodGroup,
                patientDisease: rec.PatientDisease,
                Id: rec._id,
                status: rec.Status,
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
                  <div
                    className="contain-box m-5 border rounded p-5 "
                    style={{ width: "70%" }}
                  >
                    <h2
                      className=" h2"
                      style={{
                        textAlign: "center",
                        padding: "12px",
                        marginTop: "20px",
                        marginLeft: "10px",
                        marginBottom: "0px",
                      }}
                    >
                      Edit Recipent record
                    </h2>

                    <p
                      style={{ background: "rgba(6, 6, 6, 0.12)" }}
                      name="campdetail"
                      id="cmddetail"
                      cols="35"
                      rows="10"
                    ></p>

                    <div className="row">
                      <div className="col-6">
                        <p style={style.p}>
                          <b>contact: </b>
                          <br />
                          <input
                            className="bg-light"
                            style={style.input}
                            type="text"
                            value={values.contact}
                            onChange={handleChange("contact")}
                            onBlur={() => setFieldTouched("contact")}
                          />
                          {touched.title && (
                            <p style={styling}>{errors.title}</p>
                          )}
                        </p>
                        <p style={style.p}>
                          <b>City: </b>
                          <br />
                          <input
                            className="bg-light"
                            style={style.input}
                            type="text"
                            value={values.city}
                            onChange={handleChange("city")}
                            onBlur={() => setFieldTouched("city")}
                          />
                          {touched.city && <p style={styling}>{errors.city}</p>}
                        </p>

                        <p style={style.p}>
                          <b>Area: </b>
                          <br />
                          <input
                            className="bg-light"
                            style={style.input}
                            type="text"
                            value={values.area}
                            onChange={handleChange("area")}
                            onBlur={() => setFieldTouched("area")}
                          />
                          {touched.area && <p style={styling}>{errors.area}</p>}
                        </p>

                        <p style={style.p}>
                          <b>Blood quantity: </b>
                          <br />
                          <input
                            className="bg-light"
                            style={style.input}
                            type="text"
                            value={values.bloodQuantity}
                            onChange={handleChange("bloodQuantity")}
                            onBlur={() => setFieldTouched("bloodQuantity")}
                          />
                          {touched.bloodQuantity && (
                            <p style={styling}>{errors.bloodQuantity}</p>
                          )}
                        </p>
                      </div>
                      <div className="col">
                        <p style={style.p}>
                          <b>Patient Age: </b>
                          <br />
                          <input
                            className="bg-light"
                            style={style.input}
                            type="text"
                            value={values.patientAge}
                            onChange={handleChange("patientAge")}
                            onBlur={() => setFieldTouched("patientAge")}
                          />
                          {touched.patientAge && (
                            <p style={styling}>{errors.patientAge}</p>
                          )}
                        </p>

                        <p style={style.p}>
                          <b>Patient Gender: </b>
                          <br />
                          <input
                            className="bg-light"
                            style={style.input}
                            type="text"
                            value={values.patientGender}
                            onChange={handleChange("patientGender")}
                            onBlur={() => setFieldTouched("patientGender")}
                          />
                          {touched.gender && (
                            <p style={styling}>{errors.patientGender}</p>
                          )}
                        </p>

                        <p style={style.p}>
                          <b>Blood group: </b>
                          <br />
                          <input
                            className="bg-light"
                            style={style.input}
                            type="text"
                            value={values.bloodGroup}
                            onChange={handleChange("bloodGroup")}
                            onBlur={() => setFieldTouched("bloodGroup")}
                          />
                          {touched.bloodGroup && (
                            <p style={styling}>{errors.bloodGroup}</p>
                          )}
                        </p>

                        <p style={style.p}>
                          <b>Patient Disease: </b>
                          <br />
                          <input
                            className="bg-light"
                            style={style.input}
                            type="text"
                            value={values.patientDisease}
                            onChange={handleChange("patientDisease")}
                            onBlur={() => setFieldTouched("patientDisease")}
                          />
                          {touched.patientDisease && (
                            <p style={styling}>{errors.patientDisease}</p>
                          )}
                        </p>
                        <p style={style.p}>
                          <select
                            className="select"
                            style={allStyles1.input}
                            onChange={handleChange("status")}
                            onBlur={() => setFieldTouched("status")}
                          >
                            <optgroup>
                              <option
                                value="status"
                                onChange={handleChange}
                                hidden
                              >
                                Current status
                              </option>
                              <option value="Active" onChange={handleChange}>
                                Acive
                              </option>
                              <option value="Deactive" onChange={handleChange}>
                                Deactive
                              </option>
                            </optgroup>
                          </select>
                        </p>
                      </div>

                      <div
                        className="row "
                        style={{ textAlign: "center", float: "right" }}
                      >
                        <div className="col-3">
                          {" "}
                          <button
                            type="button"
                            class="btn btn-primary m-2 mt-5 mb-5 pr-5 pl-5"
                            onClick={() => navigate("/user/recipent/")}
                          >
                            Back
                          </button>
                        </div>
                        <div className="col-6"></div>
                        <div className="col-1">
                          <button
                            type="button"
                            id="myBtn"
                            className="btn btn-primary m-2 mt-5 mb-5  pr-5 pl-5 myBtn"
                            onClick={handleSubmit}
                          >
                            Update
                          </button>
                        </div>
                        <div className="col-2">
                          {" "}
                          <button
                            type="button"
                            id="myBtn"
                            className="btn btn-primary m-2 mt-5  mb-4  pr-3 pl-3 myBtn"
                            onClick={() => {
                              DeleteRecord();
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Formik>
          )}
        </div>
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
  marginLeft: 65,
  fontSize: 15,
  fontFamily: "sans-serif",
};


const allStyles1 = {
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: "3%",
    marginLeft: "0.3%",
    fontSize: "18px",
    backgroundColor: "white",
  },
};
