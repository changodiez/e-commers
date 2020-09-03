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
  const [productsData, setProductsData] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  useEffect(() => {
    fetch("http://localhost:4000/products")
      .then((res) => res.json())
      .then((json) => {
        setProductsData(json);
      });
  }, []);

  // Search FUNCTION
  const data = productsData;
  let datavalid;
  data ? (datavalid = data.flat()) : (datavalid = []);

  const [inputValue, setInputValue] = React.useState("");

  const filterOnChange = (e) => {
    setInputValue(e.target.value);
  };

  const filterOnClick = () => {
    let searchValue = inputValue.toLowerCase();
    let filteredProducts = datavalid.filter(
      (data) =>
        data.product_name.toLowerCase().includes(searchValue) ||
        data.description.toLowerCase().includes(searchValue)
    );

    setProductsData(filteredProducts);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <NavigationBar
          Data={productsData}
          filterOnChange={filterOnChange}
          inputValue={inputValue}
          filterOnClick={filterOnClick}
          setAuth={setAuth}
        />
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
          render={(props) => (
            <ProductsContainer {...props} Data={productsData} />
          )}
        />
        <Route
          path="/product/:id"
          render={(props) => <ProductDetail {...props} Data={productsData} />}
        />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
