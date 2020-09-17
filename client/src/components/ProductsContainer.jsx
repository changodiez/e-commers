import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const ProductsContainer = (props) => {
  //Search

  const searchValue = props.searchValue;

  const [productsData, setProductsData] = useState([]);
  
  useEffect(() => {

      const fetchLink = `http://localhost:4000/products?name=${searchValue}`

      fetch(fetchLink)
        .then((res) => res.json())
        .then((json) => {
          setProductsData(json);
        });
  }, [searchValue]);

  return (
    <div>
      <div className="products-container">
        <div id="products-list" className="cards-grid">
          {productsData.length === 0 ? (
            <div className="nothing-here">
           <p>No exact matches found for {searchValue} try again</p>
           </div>
          ) : (
            productsData.map((product, index) => (
              <ProductCard value={product} key={index} />
            ))
            
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;
