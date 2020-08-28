import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route } from 'react-router-dom'


import NavigationBar from "./components/NavigationBar";
import ProductsContainer from "./components/ProductsContainer";
import ProductDetail from "./components/ProductDetail"
import Footer from "./components/Footer";

function App() {

  const [productsData, setProductsData] = useState();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((json) => {
        setProductsData(json);
      });
  }, []);

  return (
    <BrowserRouter>
    <div className="App">
      <NavigationBar Data={productsData} />
      <Route path="/" exact={true} render={(props)=><ProductsContainer {...props} Data={productsData} />} />
      <Route path="/product/:id" render={(props)=><ProductDetail {...props} Data={productsData} />} />
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
