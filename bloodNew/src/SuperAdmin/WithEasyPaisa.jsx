import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import ANav from '../SuperAdminComponent/ANav';
import "../Pages/Home.css";
import Footer from '../Components/Footer1';
import './Donor.css';
import axios from "axios"
let data = []


export default function Donor() {
  const [rec, setRec] = useState();
    const getData = () => {
        axios({
          method: "GET",
          url: "/api/donatedCash/jazzCashRec",
        }).then((res) => {
          console.log("Donors:", res.data.JazzRec);
          data = res.data.JazzRec;
          setRec(data);
          console.log("donors Data: ", data);
        });
    }
    useEffect(() => { 
        getData()
    }, []);
  const {t}=useTranslation()
  return (
    <>
    <ANav />
    <div className="content">
    <div style={{backgroundColor:"rgba(0,0,0,0.5)",padding:'30px'}} className='con'>
          <h4 style={{marginLeft:'12px', color: "rgb(243 243 243)"}}>{t("donor_detail")}</h4>
          <table>
                <tr>
                <th >Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>City</th>
                <th>Area</th>
                <th>Blood Q</th>
                <th>Blood group</th>
                <th>Medical Report</th>
                <th>pick&drop</th>
                <th>Confirm</th>
                <th>Reject</th>
                    </tr>
            {data.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td>{item.FullName}</td>
                    <td>{item.Email}</td>
                    <td>{item.Constact}</td>
                    <td>{item.Gender}</td>
                    <td>{item.City}</td>
                    <td>{item.Area}</td>
                    <td>{item.BloodGroup}</td>
                    <td>{item.BloodQuantity}</td>
                    <td>{item.MedicalHistory}</td>
                    <td>{item.PickAndDrop}</td>
                    <td><button className='btn btn-primary'>Confirm</button></td>
                    <td><button className='btn btn-danger'>Reject</button></td>
                  </tr>
                </tbody>
            )})}
            </table>
        
        </div>
        <Footer />
    </div>
    </>
  )
}