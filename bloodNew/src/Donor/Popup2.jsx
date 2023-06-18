import React from 'react';
import "./donorPopup1.css";
import { useTranslation } from 'react-i18next';

export default function Popup(props) {
  const { t } = useTranslation();

  return (props.trigger) ? (
    <div className="popup0">
        <button onClick={()=>props.btntriger(false)}>X</button>
        <div className="popup0-inner">
            <h3>{props.t}</h3>
            <p>{t("once_three_months")}</p>
        </div>
    </div>  
  ) : "";
}
