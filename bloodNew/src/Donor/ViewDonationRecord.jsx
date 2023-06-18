import React from 'react'
import "../Pages/SignIn.css"
import '../Pages/Home.css'
import Footer from '../Components/Footer' 
import Navs from '../DonorComponent/Navs'

export default function ViewDonationRecord(props) {
  return (
    <>
    <Navs first={props.page1} firstlink={props.page1link}  sec={props.page2} seclink={props.page2link} th={props.page3} thlink={props.page3link} frt={props.page4} frtlink={props.page4link} fiv={props.page5} fivlink={props.page5link} six={props.page6} sixlink={props.page6link} />
    <div className='content'>
          <div className='sign-in'>
            <h2>Donation Record</h2>
            <form>
              <label>Fullname</label>
              <input type="text" value="Asif Ali" placeholder='Enter Name' /> <br />
              <label>Gender</label><br />
              <select value="Male">
                  <option>Male</option>
                  <option>Female</option>
              </select><br />
              <label>Email</label>
              <input value="asif11@gmail.com" type="email" placeholder='Enter Email' /> <br />
              <label>Contact</label>
              <input value="0323212300" type="text" placeholder='Enter Contact' /> <br />
              <label>City</label>
              <input value="Lahore" type="text" placeholder='Enter City' /> <br />
              <label>Area</label>
              <input type="text" placeholder='Enter Area' /> <br />
              <label>Blood Group</label>
              <input value="A+" type="text" placeholder='Enter Blood Group' /> <br />
              <label>Blood Q</label>
              <input value="33CC" type="text" placeholder='Enter Blood Q' /> <br />
              <label>Medical History</label>
              <input value="Nill" type="text" placeholder='Enter Medical History' /> <br />
             
            </form>
        </div>
        <Footer />
    </div>
    </>
  )
}