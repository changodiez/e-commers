import React from "react";

const Cart = (props) => {
  const isOpen = props.isCartOpen;

  const Close = props.CloseCart;

  const CloseCart = () => {
    Close(!isOpen);
  };

  return (
    <div className={isOpen ? "cart-open" : "cart-closed"}>
      <div className="cart-container">
        <div><button onClick={CloseCart} id="cart-close-button">X</button></div>
        <div className="title">Cart</div>
        <div>Your cart is empty</div>
        <p>Add a product to your cart</p>
        <button>SHOP NOW</button>
      </div>
    </div>
  );
};

export default Cart;
