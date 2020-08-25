import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
//import Men from "./../Assets/4.jpeg";
//import Women from "./../Assets/5.jpeg";

const ProductsContainer = () => {
  const [productsData, setProductsData] = useState();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((json) => {
        setProductsData(json);
        console.log(json);
      });
  }, []);

  return (
    <div className="products-container">
      <div id="mini-banner">
        <h1>All our products!</h1>
      </div>
      <div className="cards-grid">
        {productsData ? (
          productsData.map((product, index) => (
            <ProductCard value={product} key={index} />
          ))
        ) : (
          <p>Loading</p>
        )}
      </div>
    </div>
  );
};

export default ProductsContainer;
