import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ProductsCart from './ProductsCart';

const CheckOut = (props) => {
    const order = props.order
    const setReloadCart = props.setReloadCart

    let totalImport = 0;
  props.order.forEach((a) => {
    totalImport += parseFloat(a.unit_price * a.quantity);
  });

    return ( 
        <Fragment>
        <div className="navbar-space"></div>
        <div className="cart-container basic-container">
        <h1>Check out </h1>
        <div className="shiping-info">
            get shiping info from customer 
        </div>
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
        <button><Link to="/products">Add more products</Link></button>
  <div>TOTAL IMPORT: {totalImport} €</div>
        <button className="button2">BUY NOW</button>
      </div>
        </Fragment>
     );
}
 
export default CheckOut;