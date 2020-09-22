import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cart from "./Cart";
const ProductDetail = (props) => {
  let { id } = useParams();
  const [product, setProducts] = useState();
  const [cartItems, setCartItems] = useState([]);

  var productView = `http://localhost:4000/products/${id}`;
  useEffect(() => {
    fetch(productView)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json[0]);
      });
  }, []);

  const AddProduct = (product) => {
    setCartItems([...cartItems, product]);
    console.log("heyyyyyyyyyyyyyyy", cartItems);
  };

  return (
    <div>
      {product ? (
        <div className="product-detail">
          <div className="img-container">
            <img className="detail-img" src={product.image} alt="Product" />
          </div>
          <div className="detail-body ">
            <h1 className="detail-title">{product.product_name}</h1>
            <h3 className="detail-description">{product.description} </h3>
            <h1 className="detail-price">{product.unit_price} €</h1>
            <button
              className="detail-button"
              onClick={() => AddProduct(product)}
            >
              Add to cart
            </button>
          </div>
        </div>
      ) : (
        <div>...Loading</div>
      )}
    </div>
  );
};

export default ProductDetail;
