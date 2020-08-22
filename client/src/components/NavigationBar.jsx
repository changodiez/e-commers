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

// Cart Button 
const [ isCartOpen, setCartOpen ] = React.useState(false)
const CartOpen = () => {
  setCartOpen(!isCartOpen)
}
const CloseCart = (Close) => { 
  setCartOpen(Close)
}
  
  

  return (
    <div>
    <div className="nav-bar">
      <div className="nav-container">
        <div className="logo">Hasan's Tailor</div>
        <ul>
        <li onClick={SearchOpen}>Search</li>
        <li onClick={LoginOpen}>Login</li>
        <li onClick={RegisterOpen}>Register</li>
        <li onClick={CartOpen}>Cart</li> 
        </ul>      
      </div>
      <SearchBar isOpen={isSearchOpen} />
    </div>
    
       { isLoginOpen ? <Login LoginOpen={isLoginOpen} CloseLogin={CloseLogin}/> : null}
      { isRegisterOpen ? <Register RegisterOpen={isRegisterOpen} CloseRegister={CloseRegister} /> : null }
      <Cart isCartOpen={isCartOpen} CloseCart={CloseCart}/>
      </div>
       
  );
};

export default NavigationBar;
