import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Men from "./../Assets/4.jpeg";
import Women from "./../Assets/5.jpeg";

const ProductsCategory = (props) => {
  const choseCategory = props.choseCategory;

  return (
    <Fragment>
      <Link to={`/products`}>
        <div id="mini-banner">
          <button
            className="chose-category-button"
            onClick={(e) => choseCategory("")}
          >
            <h1>All our products!</h1>
          </button>
        </div>
      </Link>
      <div className="products-category">
        <Link to={`/products`}>
          <div className="img-category">
            <button
              className="chose-category-button"
              onClick={(e) => choseCategory("men")}
            >
              <img src={Men} alt="" />
              <div className="text-block">
                <h2>MEN</h2>
              </div>
            </button>
          </div>
        </Link>

        <Link to={`/products`}>
          <div className="img-category">
            <button
              className="chose-category-button"
              onClick={(e) => choseCategory("women")}
            >
              <img src={Women} alt="" />
              <div className="text-block">
                <h2>Women</h2>
              </div>
            </button>
          </div>
        </Link>
      </div>
    </Fragment>
  );
};

export default ProductsCategory;
