import React from "react";

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <li>
      <h4>{name}</h4>
      <p>{text}</p>
    </li>
  ) : (
    <li>
      <h4>{name}</h4>
      <p>{text}</p>
    </li>
  );
};

export default Message;
