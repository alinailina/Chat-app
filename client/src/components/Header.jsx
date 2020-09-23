import React from "react";

const Header = ({ room }) => {
  return (
    <div>
      <h2>Room name: {room}</h2>
      <a href="/">Leave chat X</a>
    </div>
  );
};

export default Header;
