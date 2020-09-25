import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import ProductsContainer from "./components/ProductsContainer";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import ProductsCategory from "./components/ProductsCategory";
import NavBar from "./components/NavBar";
import Admin from "./components/Admin/Admin";
import "./App.css";
import CheckOut from "./components/CheckOut";
import Profile from "./components/Profile";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkAuthentication = async () => {
    try {
      const res = await fetch("/auth/verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);


  //////////////////////////////////////////////////////////////////////////////////////Seach Function

  const [search, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue("");
  }, []);

  //Cart FETCH AND FUNCTION

  const [reloadCart, setReloadCart] = useState(Math.random());
  const [order, setOrder] = useState([]);
  const [orderID, setOrderID ] = useState ([])

  const getOrder = async () => {
    try {
      let response = await fetch(`/carts`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const products = await response.json();

      setOrder(products);

      response = await fetch(`/carts/orderID`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const orderID = await response.json();

      setOrderID(orderID);

    } catch (error) {
      console.error(error.message);
    };
  }

  useEffect(() => {
   getOrder()
  }, [reloadCart, isAuthenticated]);

  return (
    <Router>
      <NavBar
        isAuthenticated={isAuthenticated}
        setAuth={setAuth}
        setSearchValue={setSearchValue}
        setReloadCart={setReloadCart}
        order={order}
      />
      <Switch>
        <Route
          path="/"
          exact={true}
          render={(props) => (
            <div>
              <Banner />
              <ProductsCategory {...props} choseCategory={setSearchValue} />
            </div>
          )}
        />
        <Route
          path="/products/:id"
          render={(props) => (
            <ProductDetail {...props} reloadCart={setReloadCart} orderID={orderID} />
          )}
        />

        <Route
          path="/products"
          exact={true}
          render={(props) => (
            <ProductsContainer {...props} searchValue={search} />
          )}
        />
        <Route
          path="/checkout:id"
          exact={true}
          render={(props) => (
            <CheckOut {...props} order={order} setReloadCart={setReloadCart} isAuthenticated={isAuthenticated}/>
          )}
        />
        <Route path="/profile" component={Profile}/>
        <Admin />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
