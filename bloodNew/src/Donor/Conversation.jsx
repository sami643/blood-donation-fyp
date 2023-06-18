import "./Conversation.css";
import whyImg from "../Images/bl1.jpg";

export default function Conversation({ conversation }) {
  return (
    <div className="conversation">
      <img className="conversationImg" src={whyImg} alt="" />
      <span className="conversationName">{conversation}</span>
    </div>
  )
}
