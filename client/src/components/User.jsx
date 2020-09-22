import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import ProductsContainer from "./components/ProductsContainer";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import ProductsCategory from "./components/ProductsCategory";
import NavBar from "./components/NavBar";
import Admin from "./Admin/Admin";

const User = () => {
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

  return (
    <BrowserRouter>
      <Route path="/owner" exact={true} render={() => <Admin />} />

      <NavBar
        auth={isAuthenticated}
        setAuth={setAuth}
        setSearchValue={setSearchValue}
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
        <Route path="/market/:id" render={() => <ProductDetail />} />
        <Route
          path="/market"
          render={(props) => (
            <ProductsContainer {...props} searchValue={search} />
          )}
        />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default User;
