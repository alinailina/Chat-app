import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom>
      <ul>
        {messages.map((message, i) => (
          <Message key={i} message={message} name={name} />
        ))}
      </ul>
    </ScrollToBottom>
  );
};

export default Messages;
