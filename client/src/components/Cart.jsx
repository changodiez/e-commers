import { faFontAwesomeLogoFull } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";
import ProductsCart from "./ProductsCart";

const Cart = (props) => {

  const isOpen = props.isCartOpen;
  const auth = props.auth
  const Close = props.CloseCart;
  const order = props.order
  const setReloadCart = props.setReloadCart
  const quantity = props.quantity

  const CloseCart = () => {
    Close(!isOpen);
  };

  console.log(order)

  return (
    <div className={isOpen ? "cart-open" : "cart-closed"}>
      <div className="cart-container">
        <div><button onClick={CloseCart} id="cart-close-button">X</button></div>
        <div className="title">Cart</div>
        <div className="body-cart">
        {(() => {
        if (auth &&  order.length > 0 ) {
          return (order.map((product, index) => (
            <ProductsCart
              product={product}
              index={index}
              setReloadCart={setReloadCart}
              
            /> )))
          
        } else if (auth &&  order.length === 0){
          return (<div>Your cart is empty</div>)
          
        } else if (!auth) {
          return (<h2>You have to login to add products in to your cart</h2>)
        }
        
        
      })()}
  </div>
        {auth ? <Link to="/checkout:id"><button className="search-button" onClick={CloseCart}>Proceed to checkout ({quantity}) items</button></Link> : null}
        
      </div>
    </div>
  );
};

export default Cart;
