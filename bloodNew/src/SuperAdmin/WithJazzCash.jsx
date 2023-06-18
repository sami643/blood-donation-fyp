import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ANav from '../SuperAdminComponent/ANav'
import "../Pages/Home.css"
import Footer from '../Components/Footer1'
import axios from "axios"
let data = []


export default function Donor() {
  const [rec, setRec] = useState();
    const [control, setControl] = useState(0);
    const getData = () => {
        axios({
            method: "GET",
            url: "/api/donatedCash/GetCashRec",
      
        }).then((res) => { console.log("Jazz Account:",res.data.JazzC); data = res.data.JazzC; setControl(control + 1); setRec(data); console.log("Jazz Cash data Data: ", data) })
    }
    useEffect(() => { 
        getData()
    }, [control]);
  
    const deleteData = (id) => {
    let count = 0;
    console.log("ID: ", id)
    axios(
      {
        method: "DELETE",
        url: "/api/donatedCash/deletecashdonorRecord",
        data: {
          id: id,
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
    <div style={{backgroundColor:"rgba(0,0,0,0.5)",padding:'30px'}} className='con'>
          <h4 style={{marginLeft:'12px', color: "rgb(243 243 243)"}}>Suppoters record</h4>
          <table>
            <thead >
                <tr>
                <th >Account No</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Delete Record</th>
              </tr>
              </thead>
            {data.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td>{item.Account}</td>
                    <td>{item.Amount} pkr</td>
                    <td>{item.method}</td>
                <td><button className='btn btn-danger' onClick={()=>deleteData(item._id)}>Delete</button></td>
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