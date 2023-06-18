import React, { useState, useEffect } from 'react'
import ANav from '../SuperAdminComponent/ANav'
import "../Pages/Home.css"
import Footer from '../Components/Footer1'
import { Table } from 'react-bootstrap'
import "./OrgSignUp.css"
import "./FeedBack.css"

import axios from "axios"
let data = []

export default function OrgSignUp(props) {

    const [rec, setRec] = useState();
    const getData = () => {
        axios({
          method: "GET",
          url: "/api/feedbacks/feedbacks",
        }).then((res) => {
          console.log("Feebacks:", res.data.feedback);
          data = res.data.feedback;
          setRec(data);
          console.log("DATA: ", data);
        });
    }
    useEffect(() => { 
        getData()
    }, []);
  
      
  
  return (
    <>
      <ANav />
      <div className="content">
        <div className="feedback">
          {data.map((item) => {
            return (
              <div className="feed-box">
                <h2>{item.userName}:</h2>
                <p>{item.Feedback}</p>
                <br />
              </div>
            );
          })}
          {!data?.length && (
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
              <h3>No record Available</h3>
            </p>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
 }

      


















                

       

    

