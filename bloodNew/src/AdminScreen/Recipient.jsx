import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import ANav from '../AdminComponent/ANav';
import "../Pages/Home.css";
import Footer from '../Components/Footer1';
import './Donor.css';


import axios from "axios"
let data = []


export default function Recipent() {
  const [rec, setRec] = useState();
      const [control, setControl] = useState(0);
    const getData = () => {
        axios({
          method: "GET",
          url: "/api/recipents/getrecipentRec",
        }).then((res) => {
          console.log("Recipents:", res.data.recipents);
          data = res.data.recipents;
          setControl(control + 1);
          setRec(data);
          console.log("Recipents Data: ", data);
        });
    }
    useEffect(() => { 
        getData()
    }, [control]);
  
  
        const deleteData = (id) => {
    let count = 10;
    console.log("ID: ", id)
    axios({
      method: "DELETE",
      url: "/api/recipents/deleteRRec",
      data: {
        id: id,
    
     }
    }, id).then(res => {
      count++
      setControl(count)
    })
      .catch(err => {
        console.log(err)
      })
  }


          const ApprovalData = (id) => {
    let count = 10;
    console.log("ID: ", id)
    axios(
      {
        method: "PUT",
        url: "/api/recipents/Justifybutton",
        data: {
          id: id,
          Justify: "Justified",
        },
      },
      id
    )
      .then((res) => {
        count++;
        setControl(count);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  
  

  const {t}=useTranslation()
  return (
    <>
    <ANav />
    <div className="content">
    <div style={{backgroundColor:"rgba(0,0,0,0.5)",padding:'10px'}} className='con'>
          <h4 style={{marginLeft:'12px', color: "rgb(243 243 243)"}}>Recipent's Post</h4>
          <table >
                <tr >
                <th>fullName</th>
                <th>Email</th>
                <th>Contact</th>
                <th>City</th>
                <th>Area</th>
                 <th>Blood group</th>
                <th>Needed Blood </th>
                <th>Patient Age</th>
              <th>Patient Gender</th>
              <th>Patient Disease</th>
                <th>Confirm</th>
                <th>Delete Post</th>
                    </tr>
            {data.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td>{item.FullName}</td>
                    <td>{item.Email_1}</td>
                    <td>{item.Contact_1}</td>
                    <td>{item.City}</td>
                    <td>{item.Area}</td>
                    <td>{item.BloodGroup}</td>
                    <td>{item.RequiredBloodQ}</td>
                    <td>{item.PatientAge}</td>
                    <td>{item.PatientGender}</td>
                    <td>{item.PatientDisease}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => ApprovalData(item._id)}
                      >
                        Confirm
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteData(item._id)}
                      >
                        Delete{" "}
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
               {!data?.length && (
            <p id="recordMessage" style={{ color: '#373433',   backgroundColor:"	#F5F5F5"
              , width:'100%'   , textAlign: 'center', fontSize: 15, fontFamily: 'sans-serif',  }}>
              <h3>No record Available</h3>
            </p>
              )}
          
        )
        </div>
        <Footer />
    </div>
    </>
  )
}