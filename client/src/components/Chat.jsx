import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import Header from "./Header";
import Messages from "./Messages";
import Input from "./Input";
// Create empty var
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    {
      /* Get  */
    }
    const data = queryString.parse(location.search);
    console.log(location.search);
    {
      /* ---> ?name=name&room=room */
    }
    console.log(data);
    {
      /* ---> {name: "name", room: "room"} */
    }
    const { name, room } = data;
    setName(name);
    setRoom(room);

    // Create socket instance
    socket = io(ENDPOINT);
    console.log(socket);

    // socket.emit("join", { name, room }, ({ error }) => {
    //   alert(error);
    // });

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div>
      <div>
        <Header room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
