import React  from "react";
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
  const [ isRegisterOpen, setRegisterOpen ] = React.useState(false)
  const RegisterOpen = () => {
    setRegisterOpen(!isRegisterOpen)
  }
  const CloseRegister = (Close) => { 
    setRegisterOpen(Close)
  }

// Search Button 
const [ isSearchOpen, setSearchOpen ] = React.useState(false)
const SearchOpen = () => {
  setSearchOpen(!isSearchOpen)
}
  
  

  return (
    <div>
    <div className="nav-bar">
      <div className="nav-container">
        <div className="logo">Hasan's Tailor</div>
        <button onClick={SearchOpen}>Search</button>
        <button onClick={LoginOpen}>Login</button>
        <button onClick={RegisterOpen}>Register</button>
        
      
        <Cart />
       
      </div>
      { isSearchOpen ? <SearchBar /> : null }
    </div>
    
      { isLoginOpen ? <Login LoginOpen={isLoginOpen} CloseLogin={CloseLogin}/> : null }
      { isRegisterOpen ? <Register RegisterOpen={isRegisterOpen} CloseRegister={CloseRegister} /> : null }
      
      </div>
       
  );
};

export default NavigationBar;
