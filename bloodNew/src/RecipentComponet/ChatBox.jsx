import React from 'react'
import "./ChatBox.css"

export default function ChatBox(props) {
  return (props.trigger)?(
    <div className='chat_cont' style={{top:"20%"}}>
        <h3 className='h3'>ChatBox</h3>
        <p className='x' onClick={()=>props.setchatbox(false)}>X</p>

        <div className='sender'>
            <p>Hi</p>
        </div>

        <div className='sender'>
            <p>This is me I want to donate blood to you plz contact me</p>
        </div>

        <div className='receiver'>
            <p>Ok I will call you as soon as posible</p>
        </div>

        <div className='sender'>
            <p>Ok Thank you very much</p>
        </div>

        <div style={{padding: '12px',borderTop: '3px dotted green'}}>
            <input type="text" style={{width: "53%"}} placeholder='Type here' /> 
            <button className='btn btn-success'>Send</button>
        </div>
    </div>
  ):"";
}
