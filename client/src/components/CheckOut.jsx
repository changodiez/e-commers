import React, { Fragment, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ProductsCart from "./ProductsCart";
import PopUpMessage from "./Button/PopUpMessage";

const CheckOut = (props) => {
  const order = props.order;
  const setReloadCart = props.setReloadCart;
  const isAuthenticated = props.isAuthenticated;

  let totalImport = 0;
  props.order.forEach((a) => {
    totalImport += parseFloat(a.unit_price * a.quantity);
  });

  // PROFILE INFO
  const [profile, setProfile] = useState([]);

  const getProfile = async () => {
    try {
      let response = await fetch(`/auth/profile`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const profile = await response.json();

      setProfile(profile[0]);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // CHECKOUT

  const [state, setState] = useState(false);
  const [goBack, setGoBack ] = useState(false)


  const handleCheckout = async () => {
    try {
      await fetch("/carts/checkout", {
        method: "POST",
        headers: {
          token: localStorage.token,
        },
      });
    } catch (error) {
      console.error(error);
    }
    setState(!state);
    setGoBack(true)
  };

  return (
    <Fragment>
      {goBack && !state ? <Redirect to="/"/> : null}
      {(() => {
        if (isAuthenticated) {
          return (
            <Fragment>
              <PopUpMessage
                state={state}
                setState={setState}
                text="Thanks for your order!"
              />
              <div className="navbar-space"></div>
              <div className="cart-container basic-container">
                <h1>Check out </h1>
                <div className="checkout-colums">
                  <div className="left-side">
                    <div className="shiping-info">
                      <h2> Your shipping address:</h2>
                      <p className="price">
                        Full Name:{" "}
                        {profile.first_name + " " + profile.last_name}
                      </p>
                      <p className="price">
                        Address:
                        {profile.address +
                          ", " +
                          profile.city +
                          " " +
                          profile.postcode +
                          ", " +
                          profile.country}{" "}
                      </p>
                      <p className="price">Phone: {profile.mobile}</p>
                    </div>
                    <div className="card-detail">
                      <div class="credit-info">
                        <h2> Pay Method:</h2>
                        <div class="credit-info-content">
                          Card Number
                          <input required class="input-field"></input>
                          Card Holder
                          <input required class="input-field"></input>
                          <table class="half-input-table">
                            <tr>
                              <td>
                                {" "}
                                Expires
                                <input required class="input-field"></input>
                              </td>
                              <td>
                                CVC
                                <input required class="input-field"></input>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="body-checkout">
                    {order.length > 0 ? (
                      order.map((product, index) => (
                        <ProductsCart
                          product={product}
                          index={index}
                          setReloadCart={setReloadCart}
                        />
                      ))
                    ) : (
                      <div>
                        <div>Your cart is empty</div>
                        <p>Add a product to your cart</p>
                      </div>
                    )}
                    <h2>TOTAL IMPORT: {totalImport} €</h2>
                  </div>
                </div>
                <div className="checkout-button-container">
                  <button className="checkout-button">
                    <Link to="/products">Add more products</Link>
                  </button>
                  <button
                    className="button2 checkout-button"
                    onClick={handleCheckout}
                  >
                    BUY NOW
                  </button>
                </div>
              </div>
            </Fragment>
          );
        } else {
          return <Redirect />;
        }
      })()}
    </Fragment>
  );
};

export default CheckOut;
