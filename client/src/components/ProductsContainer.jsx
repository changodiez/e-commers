import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";

const ProductsContainer = () => {
  const [productsData, setProductsData] = useState([]);
  let { category } = useParams();

  let fetchLink = "";

  useEffect(() => {
    if (category === "men") {
      fetchLink = "http://localhost:4000/products/category/men";
    } else if (category === "women") {
      fetchLink = "http://localhost:4000/products/category/women";
    } else {
      fetchLink = "http://localhost:4000/products";
    }
    fetch(fetchLink)
      .then((res) => res.json())
      .then((json) => {
        setProductsData(json);
      });
  }, []);

  return (
    <div>
      <div className="products-container">
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
