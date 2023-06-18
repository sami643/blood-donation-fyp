import React from "react";
import "./ChatBox.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ChatBox(props) {
  return props.trigger ? (
    <div
      className=" chat_cont rounded "
      style={{ top: "8%", width: "55%", height: "80%" }}
    >
      <div
        style={{ padding: "2%", backgroundColor: "#CDF0EA", height: "100%" }}
      >
        <div className="row  " style={{ height: "100%" }}>
          <div
            className="col-4 bg-light border border-2 rounded "
            style={{ backgroundColor: "#F7F7F7" }}
          >
            <p
              className=" p-3 "
              style={{ backgroundColor: "#EEEEEE", marginInline: "-5.3%" }}
            >
              Contacts{" "}
            </p>
            <h1>hello </h1>
          </div>
          <div
            className="col-8 border border-1 rounded  "
            style={{
              backgroundColor: "#F7F7F7",
              border: "1%",
            }}
          >
            <p
              className=" p-3  "
              style={{ backgroundColor: "#EEEEEE", marginInline: "-2.5%" }}
            >
              ChatBox
            </p>

            <p
              className="x"
              style={{ color: "black" }}
              onClick={() => props.setchatbox(false)}
            >
              X
            </p>

            <div className="row" style={{ backgroundColor: "blue" }}>
              <div className="col-8 ">
                <p className="bg-info border rounded p-1">
                  Hi Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </p>
              </div>

              <div
                className="col-8 border rounded "
                style={{ backgroundColor: "#00BFFF", marginLeft: "30%" }}
              >
                <p>Ok I will call you as soon as posible</p>
              </div>
              <div
                className="col-8 border rounded "
                style={{ backgroundColor: "#00BFFF", marginLeft: "30%" }}
              >
                <p>Ok I will call you as soon as posible</p>
              </div>
              <div
                className="col-8 border rounded "
                style={{ backgroundColor: "#00BFFF", marginLeft: "30%" }}
              >
                <p>Ok I will call you as soon as posible</p>
              </div>
            </div>

            <div
              className=" row border rounded "
              style={{
                padding: "12px",

                backgroundColor: "#EEEEEE",
                marginInline: "-2.5%",
              }}
            >
              <div className="col-10">
                <input
                  type="text"
                  class="form-control"
                  id="formGroupExampleInput2"
                  style={{ width: "90%", marginLeft: "1%" }}
                  placeholder="Type here"
                />
              </div>

              <div className="col-2">
                <button className="btn btn-info ">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
