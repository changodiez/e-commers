import React from "react";
import { Link } from "react-router-dom";

import Men from "./../Assets/4.jpeg";
import Women from "./../Assets/5.jpeg";


const ProductsCategory = () => {
  return (
    <div className="products-category">
      <Link  to={`/products`}>
      <div id="mini-banner">
          <h1>All our products!</h1>
        </div>
      </Link>
      
        <Link to={`/products/category/men`}>
      <div className="img-category">
        <img src={Men} alt="" />
        <div className="text-block">
          <h2>MEN</h2>
        </div>
      </div></Link>

      <Link to={`/products/category/women`}>
      <div className="img-category">
        <img src={Women} alt="" />
        <div className="text-block">
          <h2>Women</h2>
        </div>
      </div></Link>  
 

     </div>
  );
};

export default ProductsCategory;
