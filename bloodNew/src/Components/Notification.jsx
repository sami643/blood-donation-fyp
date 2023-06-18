import React from "react";
import "./Notification.css";
export default function Popup1(props) {
  return props.trigger ? (
    <div className="popup">
      <button onClick={() => props.settrigger(false)}>X</button>
      <div className="popup-inner">
        <h3>{props.t}</h3>
        <textarea
          name="feedback"
          id="feedback"
          cols="50"
          rows="8"
          placeholder="Type Feedback Notification here"
        ></textarea>
        <button
          style={{
            position: "relative",
            right: "-5px",
            marginTop: "86px",
            width: "63px",
          }}
          className="btn btn-primary bb"
        >
          Send
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}
