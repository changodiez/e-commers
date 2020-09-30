import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import PopUpMessage from "./Button/PopUpMessage";

const Profile = (props) => {
  // FETCH DATA CURRENT CUSTOMER
  const isAuthenticated = props.isAuthenticated;

  const [refresh, setRefresh] = useState(Math.random());
  const [profile, setProfile] = useState([]);

  const getProfile = async () => {
    try {
      let response = await fetch(`/auth/profile`, {
        method: "GET",
        headers: { token: localStorage.token },
      });
      const profile = await response.json();

      setProfile(profile[0]);
    } catch (error) {
      console.error(error.message);
    }
  };

  // UPDATE DATA

  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    postcode: "",
    country: "",
    mobile: "",
  });

  const {
    first_name,
    last_name,
    address,
    city,
    postcode,
    country,
    mobile,
  } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const setProfileData = () => {
    setInputs({
      first_name: profile.first_name,
      last_name: profile.last_name,
      address: profile.address,
      city: profile.city,
      postcode: profile.postcode,
      country: profile.country,
      mobile: profile.mobile,
    });
  };

  const updateData = async (e) => {
    e.preventDefault();
    const body = {
      first_name,
      last_name,
      address,
      city,
      postcode,
      country,
      mobile,
    };
    try {
      await fetch("/auth/profile/update", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    }
    setRefresh(Math.random());
  };

  // UPDATE PASSWORD

  const [passKey, setPasskey] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { password, newPassword, confirmPassword } = passKey;

  const onChangePassword = (e) => {
    setPasskey({ ...passKey, [e.target.name]: e.target.value });
  };

  const [state, setState] = useState(false);
  const [textMessage, setTextMessage] = useState("");

  const updatePassword = async (e) => {
    e.preventDefault();

    const body = passKey;
    try {
      const updatePassword = await fetch("/auth/password", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(body),
      });

      const res = await updatePassword.json();

      setState(!state);
      setTextMessage(res);
    } catch (error) {
      console.error(error);
    }
  };

  // GET ORDER DATA

  // const [orderData, setOrderData] = useState([]);
  // const getOrderData = async () => {
  //   try {
  //     let response = await fetch(`/carts/orders/inActive`, {
  //       method: "GET",
  //       headers: { token: localStorage.token },
  //     });
  //     const orderData = await response.json();

  //     setOrderData(orderData);
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  useEffect(() => {
    getProfile();
    // getOrderData();
  }, [refresh]);

  useEffect(() => {
    setProfileData();
  }, [profile, refresh]);

  return isAuthenticated ? (
    <Fragment>
      {state ? (
        <PopUpMessage state={state} setState={setState} text={textMessage} />
      ) : null}
      <div className="navbar-space"></div>
      <div className=" profile basic-container ">
        <div className="title">
          <h1>YOUR PROFILE</h1>
          <h3>
            Here you can check and change your info, your contact and shiping or
            modify your password{" "}
          </h3>
        </div>

        <form onSubmit={updateData}>
          <div className="title">
            <h3>Name and Last name</h3>
          </div>
          <div className="form-row">
            <div className="col">
              <label>
                <h3>First Name:</h3>
                <input
                  type="text"
                  placeholder={profile.first_name}
                  name="first_name"
                  value={first_name}
                  onChange={(e) => onChange(e)}
                ></input>
              </label>
            </div>
            <div className="col">
              <label>
                <h3>Last Name</h3>
                <input
                  type="text"
                  placeholder={profile.last_name}
                  name="last_name"
                  value={last_name}
                  onChange={(e) => onChange(e)}
                ></input>
              </label>
            </div>
          </div>
          <div className="form-row">
            <div className="title">
              <h3>Shiping info and contact</h3>
            </div>
            <div className="col">
              <label>
                <h3>Address</h3>
                <input
                  type="text"
                  placeholder={profile.address}
                  name="address"
                  value={address}
                  onChange={(e) => onChange(e)}
                ></input>
              </label>
            </div>
            <div className="col">
              <label>
                <h3>City</h3>
                <input
                  type="text"
                  placeholder={profile.city}
                  name="city"
                  value={city}
                  onChange={(e) => onChange(e)}
                ></input>
              </label>
            </div>
            <div className="col">
              <label>
                <h3>Postcode</h3>
                <input
                  type="text"
                  placeholder={profile.postcode}
                  name="postcode"
                  value={postcode}
                  onChange={(e) => onChange(e)}
                ></input>
              </label>
            </div>
            <div className="col">
              <label>
                <h3>Country</h3>
                <input
                  type="text"
                  placeholder={profile.country}
                  name="country"
                  value={country}
                  onChange={(e) => onChange(e)}
                ></input>
              </label>
            </div>
            <div className="col">
              <label>
                <h3>Movile contact number</h3>
              </label>
              <input
                type="text"
                placeholder={profile.mobile}
                name="mobile"
                value={mobile}
                onChange={(e) => onChange(e)}
              ></input>
            </div>
            <div className="button-container">
              <button type="submit">UPDATE</button>
            </div>
          </div>
        </form>
        <form onSubmit={updatePassword}>
          <div className="form-row">
            <div className="title">
              <h3>Change Your Password</h3>
            </div>
            <div className="col">
              <label>
                <h3> Current password</h3>

                <input
                  type="password"
                  placeholder="Current Password"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => onChangePassword(e)}
                ></input>
              </label>
            </div>
            <div className="col">
              <label>
                <h3> New password</h3>

                <input
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  value={newPassword}
                  required
                  onChange={(e) => onChangePassword(e)}
                ></input>
              </label>
            </div>
            <div className="col">
              <label>
                <h3> Confirm password</h3>

                <input
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  required
                  onChange={(e) => onChangePassword(e)}
                ></input>
              </label>
            </div>
            <div className="button-container">
              <button type="submit" >
                Change your Password
              </button>
            </div>
          </div>
        </form>
        {/* <div className="orders-table">
          <div className="title">
            <h1>Your orders</h1>
          </div>
          <div>
            <table className="table">
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>Date of order</th>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
            {orderData.map((order)=> <tr>
      <th>{order.id}</th>
      <th>{!order.status ? "OPEN" : "CLOSED"}</th>
      <th>{order.open_date}</th>
      <th>{order.close_date || "---"}</th>
    </tr>)}
    
    </tbody>
            </table>
          </div>
        </div>*/}
      </div> 
      <div className="navbar-space"></div>
    </Fragment>
  ) : (
    <Redirect to="/" />
  );
};

export default Profile;
