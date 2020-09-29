import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <Fragment>
      <div className="nav-bar" id="navbarAdmin" >
        <div className="nav-container">
          <div className="logo" style={{ color: "white" }}>
            Admin Tools
          </div>
          <ul>
            <li>
              <Link to="/">
                <button>Go to the shop</button>
              </Link>
            </li>

            <li>
              <NavLink activeStyle={{ color: "yellow" }} exact to="/owner">
                Products
              </NavLink>
            </li>

            <li>
              <NavLink
                activeStyle={{ color: "yellow" }}
                exact
                to="/owner/costumers"
              >
                Customers
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default NavBar;
