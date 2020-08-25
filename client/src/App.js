import React from "react";
import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Banner from "./components/Banner";
import ProductContainer from "./components/ProductsContainer";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Banner />
      <ProductContainer />
    </div>
  );
}

export default App;
