import React from 'react';


const ProductsCart = (props) => {

    const product = props.product
    const id = props.product.id
    const setReloadCart = props.setReloadCart

    const deleteProduct = async () => {
      
        try {
          const response = await fetch(
            `/carts/${id}`,
            {
              method: "DELETE",
            }
          );
          const res = await response.json();
  
        } catch (error) {
          console.error(error);
        }
      setReloadCart(Math.random())
    };

    return ( 

<div className="products-cart">
          <div className="img-container">
            <img className="product-img" src={product.image} alt="Product" />
          </div>
          <div className="product-cart-body ">
            <p className="price">{product.product_name}</p>
            <p >Quantity:{product.quantity}</p>
            <p >{product.unit_price} €</p>
            <button className="button2" onClick={deleteProduct}>Delete</button>
            </div>
            
            </div>

    );
}
 
export default ProductsCart;