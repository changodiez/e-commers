import React from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";

import Banner from "./components/Banner";
import ProductsContainer from "./components/ProductsContainer";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Banner />
      <ProductsContainer />
      <Footer />
    </div>
  );
}

export default App;
