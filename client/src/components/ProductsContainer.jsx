import React from "react";
import ProductCard from "./ProductCard";
import Banner from "./Banner";

//import Men from "./../Assets/4.jpeg";
//import Women from "./../Assets/5.jpeg";

const ProductsContainer = (props) => {

const productsData = props.Data

  return (
    <div>
      <Banner />
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
    </div>
  );
};

export default ProductsContainer;
