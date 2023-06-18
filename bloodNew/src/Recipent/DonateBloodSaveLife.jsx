import React from 'react'
import Navs from '../RecipentComponet/Navs'
import "../Pages/Home.css"
import Footer from '../Components/Footer'
import { NavLink } from 'react-router-dom'
import { Nav } from 'react-bootstrap'
import "./DBSL.css"

export default function Home() {
  return (
    <div>
        <Navs />
        <div className='content'>
           <div className='sec'>
               <h3>Enter last date of Donation</h3>
                <input style={{width: '70%',height: '45px'}} type="date" />
                <div>
                    <button className='btn btn-secondary'>Cancle</button>
                    <button className='btn btn-danger'>OK</button>
                </div>
           </div>



           <Footer></Footer>
        </div>
    </div>
  )
}
