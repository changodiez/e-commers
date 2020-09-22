import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const Login = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    loginError: "",
    loginSuccess: "",
  });

  const setAuth = props.setAuth;

  //Managing login
  const { email, password, loginError, loginSuccess } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const [isAdmin, setIsAdmin ] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault();

    if (email === "admin" && password === "admin") {
      alert("Welcome Admin");
      setIsAdmin(true)
      setTimeout(() => {
        CloseLogin()
      }, 400);
      
    } else {
      try {
        const body = { email, password };
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        });

        const parseRes = await response.json();

        if (response.ok) {
          setInputs({
            ...inputs,
            loginSuccess: "Login successful",
            loginError: "",
          });
          localStorage.setItem("token", parseRes.token);
          setAuth(true);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          setInputs({ ...inputs, loginError: parseRes });
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  const LoginOpen = props.LoginOpen;

  const Close = props.CloseLogin;

  const CloseLogin = () => {
    Close(!LoginOpen);
  };

  return (
    <div>
      <div className="modal">
        <div className="Login-modal">
          {isAdmin ? <Redirect to="/owner"/> : null}
          <button id="LoginbuttonClose" onClick={CloseLogin}>
            X
          </button>
          <form onSubmit={onSubmit}>
            <h2>Login in to your account</h2>
            <p>Don't have an account? Register</p>
            <p>Email: </p>
            <input
              type="text"
              placeholder="Enter email"
              name="email"
              required
              value={email}
              onChange={(e) => onChange(e)}
            ></input>

            <p>Password: </p>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              value={password}
              onChange={(e) => onChange(e)}
            ></input>
            <p
              className="error-message"
              style={{ display: loginError ? "block" : "none" }}
            >
              {loginError}
            </p>
            <p
              className="success-message"
              style={{ display: loginSuccess ? "block" : "none" }}
            >
              {loginSuccess}
            </p>
            <button type="submit">Login</button>
            <p>Can't remember your password?</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
