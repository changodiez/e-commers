import React ,{ useEffect, useState}from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavigationBar from "./NavigationBar";
import NavigationBarMovile from "./NavigationBarMovile";
import ProductsContainer from "./ProductsContainer";
import ProductDetail from "./ProductDetail";
import Footer from "./Footer";
import Banner from "./Banner";
import ProductsCategory from "./ProductsCategory";


const User = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuth = (boolean) => {
      setIsAuthenticated(boolean);
    };
  
    const checkAuthentication = async () => {
      try {
        const res = await fetch("http://localhost:4000/auth/verify", {
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
  
    // movile Navbar
  
    const [isMovile, SetMovile] = useState(false);
  
    const showMovile = () => {
      if (window.innerWidth <= 960) {
        SetMovile(true);
      } else {
        SetMovile(false);
      }
    };
  
    const size = window.addEventListener("resize", showMovile);
    useEffect(() => {
      showMovile();
    }, []);
  
    window.addEventListener("resize", showMovile);

    return (  
     
      <BrowserRouter> 
      
        <div className="App">
        {isMovile ? (
          <NavigationBarMovile
            auth={isAuthenticated}
            setAuth={setAuth}
            searchValue={setSearchValue}
          />
        ) : (
          <NavigationBar
            auth={isAuthenticated}
            setAuth={setAuth}
            searchValue={setSearchValue}
          />
        )}

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
            path="/products"
            exact={true}
            render={(props) => (
              <ProductsContainer {...props} searchValue={search} />
            )}
          />
          <Route path="/product/:id" render={() => <ProductDetail />} />
        </Switch>
        <Footer />
      </div>
      </BrowserRouter>
    );
}
 
export default User;