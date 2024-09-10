import React from "react";
import "./Header.css";
import Login from "./Login";

const Header = (props) => {
  return (
    <header>
      <h1>Spotify Playlist Creator</h1>
      <Login handleLogin={props.handleLogin} token={props.token} />
    </header>
  );
};

export default Header;