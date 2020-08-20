import React from "react";
import SearchBar from "./SearchBar";
import Login from "./Login";
import Register from "./Register";
import Cart from "./Cart";

const NavigationBar = () => {
  return (
    <div className="nav-bar">
      <div className="nav-container">
        <div className="logo">LOGO</div>
        <SearchBar />
        <Login />
        <Register />
        <Cart />
      </div>
    </div>
  );
};

export default NavigationBar;
