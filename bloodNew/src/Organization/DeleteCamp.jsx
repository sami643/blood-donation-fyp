import React from 'react'
import { NavLink } from 'react-router-dom'
import "../Pages/SignIn.css"
import '../Pages/Home.css'
import Footer from '../Components/Footer2' 
import ANav from '../OrganizationComponent/ANav'

export default function EditCamp(props) {
  return (
    <>
    <ANav />
    <div className='content'>
          <div className='sign-in'>
            <h2>Delete Camp</h2>
            <form>
              <label>Enter ID</label>
              <input type="number" placeholder='Enter Camp id to Delete' />  <br />
              <button className='btn btn-danger'>Delete</button>
            </form>
        </div>
        <Footer />
    </div>
    </>
  )
}
