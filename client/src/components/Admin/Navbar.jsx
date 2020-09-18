import React, { Fragment } from "react";


const NavBar = () => {
  return (
    <Fragment>
      <div className="nav-bar">
        <div className="nav-container">
          <div className="logo" style={{color:"white"}}>Admin Tools</div>
          <ul>
            <li>Products</li>
            <li>Customers</li>
            <li>Supliers</li>
          </ul>
        </div>
       
      </div>
    </Fragment>
  );
};

export default NavBar;
