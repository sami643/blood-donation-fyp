import React from "react";
import "./Message.css";

export default function MessageJazzCashOrEasyPaisa(props) {
  return props.trigger ? (
    <div className="dd">
      <h4 onClick={() => props.setone(false)}>X</h4>
      <b style={{ marginBottom: "20px" }}>
        Our {props.accName} Acc No : {props.accno}
      </b>
    </div>
  ) : (
    ""
  );
}
