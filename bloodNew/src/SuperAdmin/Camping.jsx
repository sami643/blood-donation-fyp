import React, { useEffect, useState } from "react";
import "../Pages/SignIn.css";
import "../Pages/Home.css";
import Footer from "../Components/Footer1";
import ANav from "../SuperAdminComponent/ANav";
import { Table } from "react-bootstrap";
import "../AdminScreen/Camping.css";
import "./Camp.css";

import axios from "axios";
import { useTranslation } from "react-i18next";
let data = [];

export default function Camping(props) {
  const { t } = useTranslation();
  const [control, setControl] = useState(0);
  const [rec, setRec] = useState();
  const getData = () => {
    axios({
      method: "GET",
      url: "/api/requests/gettingcampReq",
    }).then((res) => {
      console.log("Camps lists:", res.data.camps);
      data = res.data.camps;
      setRec(data);
      setControl(control + 1);
      console.log("DATA: ", data);
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
        url: "/api/requests/campreqApproval",
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
        <div className="contain">
          {data.map((item) => {
            console.log("item is: ", item.Body);

            return (
              <div className="containbox">
                <h2 style={style1.h2}>Camp details:</h2>
                <p style={style1.p}>
                  <b>Camp Name: </b> {item.Body.title}
                </p>
                <p style={style1.p}>
                  <b>Venue : </b>
                  {item.Body.venue}
                </p>
                <p style={style1.p}>
                  <b>{t("date")} : </b>
                  {item.Body.date}
                </p>
                <p style={style1.p}>
                  <b>{t("time")} : </b>
                  {item.Body.time}
                </p>
                <p style={style1.p}>
                  <b>Organizer: </b>
                  {item.Body.organizers}
                </p>
                <p style={style1.p}>
                  <b>Arranged By : </b>
                  {item.ArrangedBy}
                </p>
                <div
                  className="update"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "16px",
                    backgroundColor: "yellow",
                  }}
                >
                  {item.Status}
                </div>
                <div
                  className="butn"
                  style={{ marginLeft: "35px", padding: "20px" }}
                >
                  <td>
                    {" "}
                    <button
                      className="btn btn-primary"
                      style={style1.button}
                      onClick={() => ApprovalButton(item._id)}
                    >
                      Post
                    </button>
                  </td>
                  <td style={{ padding: "20px" }}>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteData(item._id)}
                    >
                      Decline
                    </button>
                  </td>
                </div>
              </div>
            );
          })}
        </div>
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
        <Footer />
      </div>
    </>
  );
}

const style1 = {
  h2: {
    display: "inline-block",
    fontSize: "25px",
    margin: "15px",
    marginBottom: "40px",
    color: "#32211D",
  },
  p: { paddingInline: "20px", color: "#403C3B" },
  button: { marginBottom: "20px", marginTop: "20px", marginLeft: "10px" },
};
