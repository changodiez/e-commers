import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import ProductsContainer from "./components/ProductsContainer";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import ProductsCategory from "./components/ProductsCategory";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const checkAuthentication = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
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

  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar auth={isAuthenticated} setAuth={setAuth} />
        <Route
          path="/"
          exact={true}
          render={() => (
            <div>
              <Banner />
              <ProductsCategory />
            </div>
          )}
        />

        <Route
          path="/products"
          exact={true}
          render={() => <ProductsContainer />}
        />
        <Route path="/product/:id" render={() => <ProductDetail />} />

        <Route
          path="/products/category/:category"
          exact={true}
          render={() => <ProductsContainer />}
        />

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
