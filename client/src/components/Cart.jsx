import React, {useState, useEffect} from "react";
import ProductsCart from "./ProductsCart";

const Cart = (props) => {

  const isOpen = props.isCartOpen;

  const Close = props.CloseCart;
  const reloadCart = props.reloadCart
  const setReloadCart = props.setReloadCart

  const CloseCart = () => {
    Close(!isOpen);
  };

  // Add products function

  const [ order, setOrder ] = useState([])

  useEffect(() => {
    fetch(`/carts`)
      .then((res) => res.json())
      .then((json) => {
        setOrder(json);
      });
 
  }, [reloadCart]);

  return (
    <div className={isOpen ? "cart-open" : "cart-closed"}>
      <div className="cart-container">
        <div><button onClick={CloseCart} id="cart-close-button">X</button></div>
        <div className="title">Cart</div>
  {order.length > 0 ? order.map((product, index) => (
                  <ProductsCart
                    product={product}
                    index={index}
                    setReloadCart={setReloadCart}
                    
                  />
                )) : <div><div>Your cart is empty</div>
        <p>Add a product to your cart</p></div> }
        
      </div>
    </div>
  );
};

export default Cart;
