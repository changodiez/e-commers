import React from "react";
import { Link } from "react-router-dom";
import ProductsCart from "./ProductsCart";

const Cart = (props) => {

  const isOpen = props.isCartOpen;

  const Close = props.CloseCart;
  const order = props.order
  const setReloadCart = props.setReloadCart
  const quantity = props.quantity

  const CloseCart = () => {
    Close(!isOpen);
  };

  // Add products function



  return (
    <div className={isOpen ? "cart-open" : "cart-closed"}>
      <div className="cart-container">
        <div><button onClick={CloseCart} id="cart-close-button">X</button></div>
        <div className="title">Cart</div>
        <div className="body-cart">
  {order.length > 0 ? order.map((product, index) => (
                  <ProductsCart
                    product={product}
                    index={index}
                    setReloadCart={setReloadCart}
                    
                  />
                  
                )) : <div><div>Your cart is empty</div>
        <p>Add a product to your cart</p></div> }
        </div>
        <Link to="/checkout:id"><button className="search-button" onClick={CloseCart}>Proceed to checkout ({quantity}) items</button></Link>
      </div>
    </div>
  );
};

export default Cart;
