import React from "react";
import ProductCard from "./ProductCard";
import Men from "./../Assets/4.jpeg"
import Women from "./../Assets/5.jpeg"

const ProductsContainer = () => {
  return (
    <div className="products-container">
      <div id="mini-banner"><h1>All our products!</h1></div>
      <div className="products-category">
     
        <div className="img-category">
        <img src={Men} alt=""/>
           <div className="text-block"><h2>MEN</h2></div>
           
        </div>
       
        <div className="img-category">
  
        <img src={Women} alt=""/>
        <div className="text-block"><h2>WOMEN</h2></div>
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;
