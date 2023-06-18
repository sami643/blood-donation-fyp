import React from 'react'
import "../Pages/SignIn.css"
import '../Pages/Home.css'
import Footer from '../Components/Footer1' 
import ANav from '../AdminComponent/ANav'
import { clear } from "@testing-library/user-event/dist/clear";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Axios library is used for ingration and connection of frontend with backend.
import axios from "axios"
import { Formik } from 'formik'
import * as Yup from "yup";

// Integration
export default function newCamp(props) {
  const validateSchema = Yup.object().shape({
    title: Yup.string().required().label("title"),
    venue: Yup.string().required().label("venue"),
    date: Yup.date().required().label("date"),
    time: Yup.string().required().label("time"),
    organizers: Yup.string().required().label("organizers"),
  })



   //Formik Save
   const newCamp= (formData) => {
    console.log("Form Data: ", formData);
    axios({
      method: "post",
      url: "/api/camping/newCamp",
      data: {
        title: formData.title,
        venue: formData.venue,
        date: formData.date,
        time: formData.time,
        organizers: formData.organizers,
      },
    })
      .then((res) => {
        if (res.data.message === "New camp created") {
          notification();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
    // Notification message 
    toast.configure()
    const notification = () =>{
      toast.success("Camping post created successfully");
    }
 

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
            }}
            onSubmit={(formData) => newCamp(formData)}
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
                  min="01/04/2022"
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
                  className="btn btn-primary"
                  onClick={() => { handleSubmit(); clear(); }}
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
    </>
  );
}



// styling part
const styling = {
  color: 'red' , marginLeft: 65, fontSize:15, fontFamily:'sans-serif'
}
const allStyles={
  input: {
    width: "80%", height: 40,
    borderWidth: 1, borderColor: "green", borderRadius: 15
  }
}


