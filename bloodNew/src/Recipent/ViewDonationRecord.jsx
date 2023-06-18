import React, { useEffect, useState } from 'react'
import "../Pages/SignIn.css"
import '../Pages/Home.css'
import Footer from '../Components/Footer' 
import Navs from '../RecipentComponet/Navs'
import axios from "axios"
let data = {}
export default function ViewDonationRecord(props) {
 
  const [rec, setRec] = useState();
  const getData = () => {
    axios({
      method: "GET",
      url: "/api/recipents/getrecipentRec",
    }).then((res) => {
      console.log("Got Data: ", res.data.recipents);
      data = res.data.recipents[0];
      setRec(data);
      console.log("DATA: ", data);
    });
  }
  useEffect(()=>{
    getData()
  },[]);
  return (
    <>
    <Navs />
    <div className='content'>
          <div className='sign-in'>
            <h2>Donation Record</h2>
            <form>
              <label>Name</label>
              <input value={data.FullName} type="text" placeholder='Enter Name' /> <br />
              <label>Email</label>
              <input value={data.Email_1} type="email" placeholder='Enter Email' /> <br />
              <label>Contact</label>
              <input value={data.Contact_1} type="text" placeholder='Enter Contact' /> <br />
              <label>City</label>
              <input value={data.City} type="text" placeholder='Enter City' /> <br />
              <label>Area</label>
              <input value={data.Area} type="text" placeholder='Enter Area' /> <br />
              <label>Blood Group</label>
              <input value="A+" type="text" placeholder='Enter Blood Group' /> <br />
              <label>Blood Q</label>
              <input value={data.RequiredBloodQ} type="text" placeholder='Enter Blood Q' /> <br />
              <label>Patient  Age</label>
              <input value={data.PatientAge} type="number" placeholder='Enter Age' /> <br />
              <label>Patient Gender</label><br />
              <select value="Female">
                  <option>Male</option>
                  <option>Female</option>
              </select><br />
             
              <label>Patient Disease</label>
              <input value="Accident" type="text" placeholder='Patient Disease' /> <br />
            </form>
        </div>
        <Footer />
    </div>
    </>
  )
}