import React from "react";
import Navs from "../UserComponent/ANav";
import Footer from "../Components/Footer";
import "./WhoNeedBlood.css";
import { NavLink } from "react-router-dom";

export default function Message() {
  return (
    <div>
      <Navs />
      <h3>Search Who Needs Blood</h3>
      <div className="section">
        <select className="select" name="group" id="group">
          <option>Search group wise</option>
          <option name="A+">A+</option>
          <option name="A-">A-</option>
          <option name="B+">B+</option>
          <option name="B-">B-</option>
          <option name="AB+">AB+</option>
          <option name="AB-">AB-</option>
          <option name="O+">O+</option>
          <option name="O-">O-</option>
        </select>

        <select className="select" name="city" id="city">
          <option>Select the city for donation</option>
          <option name="karachi">Karachi</option>
          <option name="lahore">Lahore</option>
          <option name="kabul">Kabul</option>
          <option name="Islamabad">Islamabad</option>
          <option name="Faisalabad">Faisalbad</option>
        </select>

        <select className="select" name="city" id="city">
          <option>Neariest area to your location</option>
          <option name="gulberg">Gulberg</option>
          <option name="minar-e-pakistan">Minar e Pakistan</option>
          <option name="thokkar">Thokkar</option>
          <option name="service road">Service Road</option>
          <option name="jail road">Jail Road</option>
        </select>
      </div>
      <button
        style={{ marginLeft: "46%", marginBottom: "18px", marginTop: "16px" }}
        className="btn btn-danger btns"
      >
        <NavLink to="/user/search-result">Search</NavLink>
      </button>
      <Footer />
    </div>
  );
}
