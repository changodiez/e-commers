import React, { Fragment, useState, useEffect} from 'react'
import NavigationBar from './NavigationBar'
import NavigationBarMovile from "./NavigationBarMovile"

const NavBar = (props) => {

const isAuthenticated = props.isAuthenticated
const setAuth = props.setAuth
const setSearchValue = props.setSearchValue
const setReloadCart = props.setReloadCart
const order = props.order

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
    }, [size]);
  
    window.addEventListener("resize", showMovile);


    return ( 
        <Fragment >
          
            {isMovile ? (
          <NavigationBarMovile
            auth={isAuthenticated}
            setAuth={setAuth}
            searchValue={setSearchValue}
            setReloadCart={setReloadCart}
            order={order}
          />
        ) : (
          <NavigationBar
            auth={isAuthenticated}
            setAuth={setAuth}
            searchValue={setSearchValue}
            setReloadCart={setReloadCart}
            order={order}
          />
        )}
        </Fragment>
     );
}
 
export default NavBar;