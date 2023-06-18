import React, { useEffect, useState } from "react";
import { useTranslation, initReactI18next } from "react-i18next";
import MessageJazzCashOrEasyPaisa from "./MessageJazzCashOrEasyPaisa";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
let data = [];

// Integration
export default function EasyPaisa(props) {
  const validateSchema = Yup.object().shape({
    account: Yup.string().required().label("account"),
    amount: Yup.string().required().label("amount"),
  });

  //Formik Save
  const EasyPaisa = (formData) => {
    console.log("Form Data: ", formData);

    axios({
      method: "post",
      url: "/api/donatedCash/easyPaisaCashRecord",
      data: {
        amount: formData.amount,
        account: formData.account,
        method: formData.method,
      },
    })
      .then((res) => {
        console.log("response is: ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // **********************this is for getting Easy Paisa number*****************************************
  const [rec, setRec] = useState();
  const getData = () => {
    axios({
      method: "GET",
      url: "/api/management/getEasyPaidNo",
    }).then((res) => {
      console.log("EasyPaisa Number:", res.data.EasyPaisa);
      data = res.data.EasyPaisa;
      setRec(data);
      console.log("Easy Paisa number DATA: ", data);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  //************************* The End *********************************************************************************************

  const { t } = useTranslation();
  let [btn, setbtn] = useState(false);
  return props.trigger ? (
    <>
      <Formik
        initialValues={{ account: "", amount: "", method: "Easy Paisa" }}
        onSubmit={(formData) => EasyPaisa(formData)}
        validationSchema={validateSchema}
      >
        {({ handleSubmit, handleChange, errors, setFieldTouched, touched }) => (
          <>
            <div className="sub-box">
              <label htmlFor="">
                <b>{props.accName} {t("account")}</b>
              </label>
              <input
                type="text"
                placeholder={t("enter_acc")}
                onChange={handleChange("account")}
                onBlur={() => setFieldTouched("account")}
              />
              {touched.account && <p style={styling}>{errors.account}</p>}
            </div>
            <div className="sub-box">
              <label htmlFor="">
                <b>{t("amount")}</b>
              </label>
              <input
                type="number"
                placeholder={t("enter_amount")}
                onChange={handleChange("amount")}
                onBlur={() => setFieldTouched("amount")}
              />
              {touched.amount && <p style={styling}>{errors.amount}</p>}
            </div>
            <button
              className="btn btn-primary p-2 my-3"
              type="submit"
              onClick={() => {
                setbtn(true);
                handleSubmit();
              }}
            >
              {t("submit")}
            </button>
            <h5>{t("your_privacy_will_be_preserved")}</h5>
            <MessageJazzCashOrEasyPaisa
              accName={props.accName}
              accno={"+92" + data.EasyPaisa}
              setone={setbtn}
              trigger={btn}
            />
          </>
        )}
      </Formik>
    </>
  ) : (
    ""
  );
}

const styling = {
  color: "red",
  marginLeft: 65,
  fontSize: 10,
  fontFamily: "sans-serif",
};
