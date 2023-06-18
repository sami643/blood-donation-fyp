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
import { navigate, useNavigate } from "react-router-dom";

let data = [];

export default function Camping(props) {
  const { t } = useTranslation();
  const [control, setControl] = useState(0);
  const [rec, setRec] = useState();
  const navigate = useNavigate();
  const [id, setCity] = useState();

  const linkDataToSearchResult = (id) => {
    console.log("idd is:", id);
    navigate("/api/admin/edit-camp", {
      state: { id: id },
    });
  };

  const getData = () => {
    axios({
      method: "GET",
      url: "/api/camping/existingCamps",
    }).then((res) => {
      console.log("Camps lists:", res.data.campss);
      data = res.data.campss;
      setControl();
      setRec(data);
      console.log("DATA: ", data);
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
        url: "/api/camping/deleteCamp",
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
          {!data?.length && (
            <p
              id="recordMessage"
              style={{
                color: "#373433",
                backgroundColor: "	#F5F5F5",
                width: "100%",
                textAlign: "center",
                fontSize: 15,
                fontFamily: "sans-serif",
              }}
            >
              <h3>No record Available</h3>
            </p>
          )}

          {data.map((item) => {
            return (
              <div className="containbox">
                <h2 style={style1.h2}>Camp details:</h2>
                <p style={style1.p}>
                  <b>Camp Name: </b> {item.Title}
                </p>
                <p style={style1.p}>
                  <b>Venue : </b>
                  {item.Venue}
                </p>
                <p style={style1.p}>
                  <b>{t("date")} : </b>
                  {item.Date}
                </p>
                <p style={style1.p}>
                  <b>{t("time")} : </b>
                  {item.Time}
                </p>
                <p style={style1.p}>
                  <b>{t("financial_supporter")} : </b>
                  {item.Organizers}
                </p>
                <div className="butn">
                  <button
                    className="btn btn-primary"
                    style={style1.button}
                    onClick={() => {
                      linkDataToSearchResult(item._id);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    style={style1.button}
                    onClick={() => deleteData(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
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
