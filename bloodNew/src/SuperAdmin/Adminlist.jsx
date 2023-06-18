import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ANav from "../SuperAdminComponent/ANav";
import "../Pages/Home.css";
import Footer from "../Components/Footer1";
import { Table } from "react-bootstrap";
import "./Adminlist.css";

import axios from "axios";
let data = [];

export default function OrgSignUp() {
  const [control, setControl] = useState(0);
  const [rec, setRec] = useState();
  const getData = () => {
    axios({
      method: "GET",
      url: "/api/auth/getadminlist",
    }).then((res) => {
      console.log("admin:", res.data.Admin);
      data = res.data.Admin;
      setControl(control + 1);
      setRec(data);
      console.log("admin Data: ", data);
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
        url: "/api/auth/removeAdmin",
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

  return (
    <>
      <ANav />
      <div className="content">
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "6px" }}
          className="org"
        >
          <h4 style={{ marginLeft: "12px", color: "rgb(243 243 243)" }}>
            List of Admins
          </h4>

          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Remove Admin</th>
              </tr>
            </thead>

            {data.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td>{item.fullName}</td>
                    <td>{item.Email}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => deleteData(item._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </Table>
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
