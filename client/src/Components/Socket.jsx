import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const EndPoint = "http://localhost:8001";
const socket2 = io.connect(EndPoint)

const Socket = () => {

    const [response, setResponse] = useState("");
    const [message, setMessage] = useState("");
    const [roomNo, setRoomNo] = useState();
    const [orderId, setOrderId] = useState("")
    const [msgReceived, setMsgReceived] = useState()

    const messageBox = {
      margin: "20px",
      marginBottom: "50px"
    }
    useEffect(() => {
        // const socket = socketIOClient(EndPoint);
        // socket.on("FromAPI", data => {
        //     setResponse(data);
        // });
        // return () => {
        //     socket.disconnect();
        // }
    }, []);

    const joinRoom = () => { 
      if(roomNo !== "") {
        socket2.emit("join_room", roomNo)
      }
    }
    const sendMessage = () => { 
      socket2.emit("send_message",{ message, room: roomNo })
    }

    const sendOrerId = () => { 
      if(orderId !== "") {
        socket2.emit("set_orerId", orderId)
      }
    }
    const updateStatus = () => { 
      socket2.emit("send_status", { msg: "hiiiii", orderId})
    }

    useEffect(() => {
      socket2.on("receive_message", (data) => {
        setMsgReceived(data.message)
      })

      socket2.on("receive_status", (data) => {
        console.log("data-------------------->",data)
      })

    }, [socket2])
    


  return (
    <>
      {/* It's <time dateTime={response}>{response}</time> */}
      <div style={messageBox}>
        <input 
          placeholder="Room no..."
          onChange={e => setRoomNo(e.target.value)}  
        />
        <button onClick={joinRoom}>
          Set Room
        </button>
        <br/>
        <input 
          placeholder="Message..."
          onChange={e => setMessage(e.target.value)}  
        />
        <button onClick={sendMessage}>
          Send Message
        </button>
        <h3>{msgReceived}</h3>
      </div>

      <div>
        <input 
          placeholder="Order ID no..."
          onChange={e => setOrderId(e.target.value)}  
        />
        <button onClick={sendOrerId}>
          Set OrderId
        </button>
        <br/>
        <button onClick={updateStatus}>
          Update Status 
        </button>
      </div>
    </>
  );
}

export default Socket