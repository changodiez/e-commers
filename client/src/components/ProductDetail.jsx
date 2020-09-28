import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./Button/BackButton";
import Loader from "./Button/Loader";
import LoginAsk from "./Button/LoginAsk";

const ProductDetail = (props) => {
  // eslint-disable-next-line

  const orderID = props.orderID.id;
  const isAuthenticated = props.isAuthenticated;

  let id = useParams().id;

  const [product, setProducts] = useState();

  useEffect(() => {
    fetch(`/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json[0]);
      });
  }, []);


  // ADD PRODUCTS TO THE CART
  const [qty, setQty] = useState(1);

  const AddProduct = async () => {
    const body = { qty, orderID };

    try {
       await fetch(`/carts/${id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    props.reloadCart(Math.random());
  };

  const setQtyLess = () => {
    if (qty > 1) {
      setQty(qty - 1);
    } else {
      setQty(1);
    }
  };

  // OPEN AND CLOSE LOGIN ASK
  const [state, setState] = useState(false)

  const LoginAskModal = () => {
    setState(!state)
  }

  return (
    <Fragment>
      <LoginAsk state={state} setState={setState}/> 
      <div className="basic-container">
        {product ? (
          <div className="product-detail">
            <BackButton />

            <div className="img-container">
              <img className="detail-img" src={product.image} alt="Product" />
            </div>
            <div className="detail-body ">
              <h1 className="detail-title">{product.product_name}</h1>
              <h3 className="detail-description">{product.description} </h3>
              <h1 className="detail-price">{product.unit_price} €</h1>
              <div className="select-qty">
                <button className="detail-button" onClick={setQtyLess}>
                  -
                </button>
                <h1>{qty}</h1>
                <button
                  className="detail-button"
                  onClick={() => setQty(qty + 1)}
                >
                  +
                </button>
              </div>
              {isAuthenticated ? (
                <button className="detail-button" onClick={AddProduct}>
                  Add to cart
                </button>
              ) : (
                <button className="detail-button" onClick={LoginAskModal}>
                  Add to cart
                </button>
              )}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </Fragment>
  );
};

export default ProductDetail;
