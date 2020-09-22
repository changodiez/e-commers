import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Login from "./Login";
import Register from "./Register";
import Cart from "./Cart";
import { Link } from "react-router-dom";

const NavigationBar = (props) => {
  //cart items
  const [cartlength, setCartLength] = useState(0);

  // Login Button
  const [isLoginOpen, setLoginOpen] = useState(false);
  const LoginOpen = () => {
    setLoginOpen(!isLoginOpen);
  };
  const CloseLogin = (Close) => {
    setLoginOpen(Close);
  };

  // Register Button
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const RegisterOpen = () => {
    setRegisterOpen(!isRegisterOpen);
  };
  const CloseRegister = (Close) => {
    setRegisterOpen(Close);
  };

  // Search Button
  const [isSearchOpen, setSearchOpen] = useState(false);
  const SearchOpen = () => {
    setSearchOpen(!isSearchOpen);
  };

  // Cart Button
  const [isCartOpen, setCartOpen] = useState(false);
  const CartOpen = () => {
    setCartOpen(!isCartOpen);
  };
  const CloseCart = (Close) => {
    setCartOpen(Close);
  };

  // Authentication and getting the user's name
  const setAuth = props.setAuth;
  const auth = props.auth;

  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:4000/auth/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const parseRes = await response.json();

      setName(parseRes.first_name);
    } catch (error) {
      console.error(error.message);
    }
  }

  //Log out button

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };
  useEffect(() => {
    getName();
  });

  var cart = `Cart ${cartlength}`;
  return (
    <div>
      <div className="nav-bar">
        <div className="nav-container">
          <div className="logo">
            <Link to="/">Hasan's Tailor</Link>
          </div>
          {!auth ? (
            <ul>
              <li onClick={LoginOpen}>Login</li>
              <li onClick={RegisterOpen}>Register</li>
              <li onClick={SearchOpen}>Search</li>
              <li onClick={CartOpen}>Cart</li>
            </ul>
          ) : (
            <ul>
              <li>Hello {name}!</li>
              <li onClick={(e) => logout(e)}>Logout</li>
              <li onClick={SearchOpen}>Search</li>
              <li onClick={CartOpen}>Cart</li>
            </ul>
          )}
        </div>
        <SearchBar isOpen={isSearchOpen} />
      </div>

      {isLoginOpen ? (
        <Login
          LoginOpen={isLoginOpen}
          CloseLogin={CloseLogin}
          setAuth={setAuth}
        />
      ) : null}
      {isRegisterOpen ? (
        <Register RegisterOpen={isRegisterOpen} CloseRegister={CloseRegister} />
      ) : null}
      <Cart
        isCartOpen={isCartOpen}
        CloseCart={CloseCart}
        setCartLength={setCartLength}
      />
    </div>
  );
};

export default NavigationBar;
