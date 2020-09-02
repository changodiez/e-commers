import React from "react";
import ProductCard from "./ProductCard";



const ProductsContainer = (props) => {

const productsData = props.Data

  return (
    <div>
      
      <div  className="products-container">
        <div id="products-list" className="cards-grid">
          {productsData ? (
            productsData.map((product, index) => (
              <ProductCard value={product} key={index} />
            ))
          ) : (
            <p>Loading</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;
