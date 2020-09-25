import React, { useState, useEffect, useRef, Fragment } from "react";
import SearchBar from "./SearchBar";
import Login from "./Login";
import Register from "./Register";
import Cart from "./Cart";
import { Link, Route, Switch } from "react-router-dom";
import "./NavigationBarMovile.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'


const NavigationBar = (props) => {
  const [click, setClick] = useState(false);

  const menuOpen = () => {
    setClick(!click);
  };

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

  const searchValue = props.searchValue;

  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (!ref.current.contains(e.target)) {
      SearchOpen();
    } else if (e.target.id === "cartbutton") {
      SearchOpen();
    }
  };

  useEffect(() => {
    if (isSearchOpen) {
      document.addEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [isSearchOpen]);

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

  const order = props.order
  let quantity = 0;

  const isAnArray = Array.isArray(order)
  
  if(isAnArray) {order.forEach((a) => {
    quantity += a.quantity;
  })}

  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("/auth/dashboard", {
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

  return (
    <Fragment>
      <div className="navbar">
        <div className="navbar-container" ref={ref}>
          <div className="navbar-buttons">
            <div className="navbar-logo">
              <Link
                to={{
                  pathname: "/",
                }}
              >
                Hasan's Tailor
              </Link>
            </div>
            <div className="menu-icon" onClick={SearchOpen}>
            <FontAwesomeIcon icon={faSearch} />            </div>
            <div className="menu-icon" onClick={menuOpen}>
            <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
          {auth && quantity > 0 ?  <Link to="/checkout:id"><div className="cart-mobile"><FontAwesomeIcon icon={faShoppingCart} /> {`(${quantity})`}</div></Link> : null }
          {auth ? (
            <div className="customer-name">Hello {name}!</div>
          ) : (
            <div className="customer-name" style={{ fontSize: "0" }}>
             
              Hello!
            </div>
          )}
          <SearchBar isOpen={isSearchOpen} searchValue={searchValue} />
          {!auth ? (
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <Link to="/login">
                <li onClick={LoginOpen} onClick={menuOpen} className="nav-item">
                  Login
                </li>
              </Link>
              <Link to="/register">
                <li
                  onClick={RegisterOpen}
                  onClick={menuOpen}
                  className="nav-item"
                >
                  Register
                </li>
              </Link>
              
            </ul>
          ) : (
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <Link to="/"><li onClick={(e) => logout(e)} className="nav-item">
                Logout
              </li></Link>

              <Link to="checkout:id">
              <li id="cartbutton" className="nav-item" onClick={menuOpen}>
                Cart
              </li></Link>
            </ul>
          )}
        </div>
      </div>
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <Login
              {...props}
              LoginOpen={isLoginOpen}
              CloseLogin={CloseLogin}
              setAuth={setAuth}
            />
          )}
        />
        <Route
          path="/register"
          render={(props) => (
            <Register
              {...props}
              RegisterOpen={isRegisterOpen}
              CloseRegister={CloseRegister}
            />
          )}
        />
        <Route
          path="/cart"
          render={(props) => (
            <Cart {...props} isCartOpen={isCartOpen} CloseCart={CloseCart} />
          )}
        />
      </Switch>
    </Fragment>
  );
};

export default NavigationBar;
