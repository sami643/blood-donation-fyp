import React, { useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import ANav from "../DonorComponent/Navs";
import "../Pages/Home.css";
import Footer from "../Components/Footer";
import "../Donor/Messenger.css";
import Conversation from "./Conversation";
import Messages from "./Message";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import AuthContext from "../auth/context";




export default function OrgSignUp() {
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const { user } = useContext(AuthContext);
  const [time, setTime] = useState(Date.now());
  const [Message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [data, setData] = useState("");

  const scrollRef = useRef();
  const socket = useRef(io("ws://localhost:8900"));
  console.log("SocketPrint", socket);



  useEffect(() => {
    socket.current.emit("addUser", user.email);
    socket.current.on("getUser", (users) => {
      console.log("Users", users);
    });
  }, [user.email]);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("mmeesaage", data.text);
      setData(data.text);
      setArrivalMessage({
        SenderId: data.SenderId,
        Text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.Member.includes(arrivalMessage.sender) &&
      setMessage((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  const getConversations = async () => {
    axios({
      method: "post",
      url: "/api/conversation1/get-conversation",
      data: {
        senderId: user.email,
      },
    })
      .then((res) => {
        // console.log("response is: ", res);
        setConversation(res.data.wantedConveration);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getConversations();
  }, [user.email]);

  const getMessages = async () => {
    axios({
      method: "post",
      url: "/api/user-messages/get-message",
      data: {
        conversationId: currentChat._id,
      },
    })
      .then((res) => {
        console.log("response is for messages: ", res);
        setMessage(res.data.Message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  const { t } = useTranslation();



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage !== "") {
      const message = {
        senderId: user.email,
        conversationId: currentChat._id,
        text: newMessage,
      };

      const receiverId =
        currentChat.Member[0] !== user.email
          ? currentChat.Member[0]
          : currentChat.Member[1];

      console.log(receiverId, "hello thi Id");

      socket.current.emit("sendMessage", {
        senderId: user.email,
        receiverId,
        text: newMessage,
      });

      try {
        const res = await axios.post(
          "/api/user-messages/post-message",
          message
        );

        setMessage([...Message, res.data.Message]);
        setNewMessage("");
        // console.log("helelo this is res", res.data.Message);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // THis is used for message scrolling
  useEffect(() => {
    scrollRef.current?.scrollIntoView({});
  }, [Message]);

  return (
    <>
      <ANav />
      <div
        className="row m-1"
        style={{ backgroundColor: "light", marginBottom: "-4px" }}
      ></div>
      <div className="messenger bg-white p-1">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              className="chatMenuInput"
              placeholder="Search for friends"
            />
            {conversation.map((item) => {
              return (
                <div onClick={() => setCurrentChat(item)}>
                  <Conversation
                    conversation={
                      item.UserName[0] !== user.name
                        ? item.UserName[0]
                        : item.UserName[1]
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {Message.map((msg) => {
                    return (
                      <div ref={scrollRef}>
                        <Messages
                          Message={msg}
                          own={msg.SenderId === user.email}
                        />
                      </div>
                    );
                  })}
                  {data}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to Start a Chat
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">Online</div>
        </div>
      </div>
    </>
  );
}
