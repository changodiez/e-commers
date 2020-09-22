import React, {useState, useEffect} from "react";

const Cart = (props) => {
  const isOpen = props.isCartOpen;

  const Close = props.CloseCart;

  const CloseCart = () => {
    Close(!isOpen);
  };

  // Add products function

  const [ order, setOrder ] = useState([])

  useEffect(() => {
    fetch(`/cart`)
      .then((res) => res.json())
      .then((json) => {
        setOrder(json[0]);
      });
  }, []);


  return (
    <div className={isOpen ? "cart-open" : "cart-closed"}>
      <div className="cart-container">
        <div><button onClick={CloseCart} id="cart-close-button">X</button></div>
        <div className="title">Cart</div>
{order ? <div>Show order</div> : <div><div>Your cart is empty</div>
        <p>Add a product to your cart</p></div> }
        
        <button>SHOP NOW</button>
      </div>
    </div>
  );
};

export default Cart;
