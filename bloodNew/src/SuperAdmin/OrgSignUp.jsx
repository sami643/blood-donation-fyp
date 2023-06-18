import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ANav from "../SuperAdminComponent/ANav";
import "../Pages/Home.css";
import Footer from "../Components/Footer1";
import "./OrgSignUp.css";
import { Table } from "react-bootstrap";

import axios from "axios";
let data = [];

export default function OrgSignUp() {
  const [control, setControl] = useState(0);
  const [rec, setRec] = useState();
  const getData = () => {
    axios({
      method: "GET",
      url: "/api/requests/gettingOrgReq",
    }).then((res) => {
      console.log("admin:", res.data.OrgRequest);
      data = res.data.OrgRequest;
      setControl(control + 1);
      setRec(data);
      console.log("admin Data: ", data);
    });
  };
  useEffect(() => {
    getData();
  }, [control]);

  const deleteData = (id) => {
    let count = 0;
    console.log("ID: ", id);
    axios(
      {
        method: "DELETE",
        url: "/api/requests/requestdeclineb",
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

  const ApprovalButton = (id) => {
    let count = 0;
    console.log("ID: ", id);
    axios(
      {
        method: "post",
        url: "/api/requests/orgreqApproval",
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

  const { t } = useTranslation();
  return (
    <>
      <ANav />
      <div className="content">
        <div
          style={{ backgroundColor: "rgba(0,0,0,0.5)", padding: "6px" }}
          className="org"
        >
          <h4 style={{ marginLeft: "12px", color: "rgb(243 243 243)" }}>
            Organization Signup Request
          </h4>

          <Table>
            <thead>
              <tr>
                <th>Organization Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>City</th>
                <th>Area</th>
                <th>Accept</th>
                <th>Decline</th>
              </tr>
            </thead>

            {data.map((item) => {
              return (
                <tbody>
                  <tr>
                    <td>{item.OrgName}</td>
                    <td>{item.Email}</td>
                    <td>{item.Contact}</td>
                    <td>{item.City}</td>
                    <td>{item.Area}</td>

                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => ApprovalButton(item._id)}
                      >
                        Accept
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteData(item._id)}
                      >
                        Decline
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
