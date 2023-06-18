import React from "react";
import "./Message.css";
import { format } from "timeago.js";
import whyImg from "../Images/bl1.jpg";

export default function Message({ Message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={whyImg} alt="" />
        <p className="messageText">{Message.Text}</p>
      </div>
      <div className="messageBottom">{format(Message.createdAt)}</div>
    </div>
  );
}
