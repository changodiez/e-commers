import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
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

  //Seach Function

  const [search, setSearchValue] = useState("");

  useEffect(() => {
    setSearchValue("");
  }, []);


  //Cart Reloaded 

  const [ reloadCart, setReloadCart] = useState(Math.random())

  return (
    <Router>
      <NavBar
          isAuthenticated={isAuthenticated}
          setAuth={setAuth}
          setSearchValue={setSearchValue}
          setReloadCart={setReloadCart}
          reloadCart={reloadCart}
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
        <Route path="/products/:id" render={(props) => <ProductDetail {...props} reloadCart={setReloadCart}/>} />

        <Route
          path="/products"
          exact={true}
          render={(props) => (
            <ProductsContainer {...props} searchValue={search} />
          )}
        />
        <Admin />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
