import React from "react";
import "./Popup1.css";
export default function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <button onClick={() => props.btntriger(false)}>X</button>
      <div className="popup-inner">
        <h3>{props.t}</h3>
        <p>{props.val}</p>
      </div>
    </div>
  ) : (
    ""
  );
}
