import React from "react";
import SearchBar from "./SearchBar";
import Login from "./Login";
import Register from "./Register";
import Cart from "./Cart";

const NavigationBar = () => {

  // Login Button
const [ isLoginOpen, setLoginOpen ] = React.useState(false)
const LoginOpen = () => {
  setLoginOpen(!isLoginOpen)
}
const CloseLogin = (Close) => { 
  setLoginOpen(Close)
}

// Register Button
  // Login Button
  const [ isRegisterOpen, setRegisterOpen ] = React.useState(false)
  const RegisterOpen = () => {
    setRegisterOpen(!isRegisterOpen)
  }
  const CloseRegister = (Close) => { 
    setRegisterOpen(Close)
  }
  
  

  return (
    <div>
    <div className="nav-bar">
      <div className="nav-container">
        <div className="logo">LOGO</div>
        <SearchBar />
        <button onClick={LoginOpen}>Login</button>
        <button onClick={RegisterOpen}>Register</button>
        
      
        <Cart />
      </div>
    </div>
      { isLoginOpen ? <Login LoginOpen={isLoginOpen} CloseLogin={CloseLogin}/> : null }
      { isRegisterOpen ? <Register RegisterOpen={isRegisterOpen} CloseRegister={CloseRegister} /> : null }
      </div>
       
  );
};

export default NavigationBar;
