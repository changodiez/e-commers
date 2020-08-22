import React from "react";

const Login = (props) => {
  const LoginOpen = props.LoginOpen;

  const Close = props.CloseLogin;

  const CloseLogin = () => {
    Close(!LoginOpen);
  };

  return (
    <div>
      <div className= "modal" >
        <div className= "Login-modal">
          <button id="LoginbuttonClose" onClick={CloseLogin}>
            X
          </button>
          <form>
            <h2>Login in to your account</h2>
            <p>Don't have an account? Register</p>
            <p>Username: </p>
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
            ></input>

            <p>Password: </p>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
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
