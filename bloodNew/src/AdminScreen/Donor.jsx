import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ANav from "../AdminComponent/ANav";
import "../Pages/Home.css";
import Footer from "../Components/Footer1";
import "./Donor.css";

import axios from "axios";
let data = [];

export default function Donor() {
  const [control, setControl] = useState(0);
  const [rec, setRec] = useState();
  const getData = () => {
    axios({
      method: "GET",
      url: "/api/donorRec/getDonorRec",
    }).then((res) => {
      console.log("Donors:", res.data.donors);
      data = res.data.donors;
      setControl(control + 1);
      setRec(data);
      console.log("donors Data: ", data);
    });
  };
  useEffect(() => {
    getData();
  }, [control]);

  const deleteData = (id) => {
    let count = 10;
    console.log("ID: ", id);
    axios(
      {
        method: "DELETE",
        url: "/api/donorRec/deletdonorrec",
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
  };

  const ApprovalData = (id) => {
    let count = 10;
    console.log("ID: ", id);
    axios(
      {
        method: "PUT",
        url: "/api/donorRec/justifying",
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
  };

  const { t } = useTranslation();
  return (
    <>
      <ANav />

      <div className="content">
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "30px" }}
          className="con"
        >
          <h4 style={{ marginLeft: "12px", color: "rgb(243 243 243)" }}>
            {t("donor_detail")}
          </h4>
          <table>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Gender</th>
              <th>City</th>
              <th>Area</th>
              <th>Blood Q</th>
              <th>Blood group</th>
              <th>Medical Report</th>
              <th>pick&drop</th>
              <th>Confirm</th>
              <th>Delete Donor Post</th>
            </tr>

            {data.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td>{item.FullName}</td>
                    <td>{item.Email}</td>
                    <td>{item.Contact}</td>
                    <td>{item.Gender}</td>
                    <td>{item.City}</td>
                    <td>{item.Area}</td>
                    <td>{item.BloodGroup}</td>
                    <td>{item.BloodQuantity}</td>
                    <td>{item.MedicalHistory}</td>
                    <td>{item.PickAndDrop}</td>
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
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
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
