import React from "react";
import { Link } from "react-router-dom";

const ProductsCategory = () => {
  return (
    <div className="products-category">
        <Link to={`/products/category`}>
      <div className="img-category">
        <img src={Men} alt="" />
        <div className="text-block">
          <h2>MEN</h2>
        </div>
      </div></Link>  

     </div>
  );
};

export default ProductsCategory;
