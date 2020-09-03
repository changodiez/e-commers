import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //Managing login
  const { email, password } = inputs;
  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password };
      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      localStorage.setItem("token", parseRes.token);
      props.setAuth(true);
    } catch (error) {
      console.error(error.message);
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

            <button type="submit">Login</button>
            <p>Can't remember your password?</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
