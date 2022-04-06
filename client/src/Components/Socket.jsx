import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const EndPoint = "http://localhost:8000";
const socket2 = io.connect(EndPoint)

const Socket = () => {

    const [response, setResponse] = useState("");
    const [message, setMessage] = useState("");
    const [roomNo, setRoomNo] = useState();
    const [msgReceived, setMsgReceived] = useState()

    const messageBox = {
      margin: "20px"
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
      socket2.emit("send_message",{ message })
    }

    useEffect(() => {
      socket2.on("receive_message", (data) => {
        setMsgReceived(data.message )
      })
    }, [socket2])
    

  return (
    <>
      It's <time dateTime={response}>{response}</time>
      <div style={messageBox}>
      <input 
          placeholder="Room no..."
          onChange={e => setRoomNo(e.target.value)}  
        />
        <button onClick={joinRoom}>
          Send Message
        </button>
        <br/>
        <input 
          placeholder="Message..."
          onChange={e => setMessage(e.target.value)}  
        />
        <button onClick={sendMessage }>
          Send Message
        </button>
        <h1>{msgReceived}</h1>
      </div>
    </>
  );
}

export default Socket