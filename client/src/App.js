import React, { useState } from "react";
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

  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar setAuth={setAuth} />
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
