import React from "react";

const Register = (props) => {
  const RegisterOpen = props.RegisterOpen;

  const Close = props.CloseRegister;

  const CloseRegister = () => {
    Close(!RegisterOpen);
  };

  return (
    <div>
      <div>
        <div className="modal">
          <div className="Login-modal">
            <button id="LoginbuttonClose" onClick={CloseRegister}>
              X
            </button>
            <form>
              <h2>Create an account</h2>
              <p>Already have an account? Sign In</p>
              <p>Enter your email</p>

              <input
                type="email"
                placeholder="Email..."
                name="uname"
                required
              ></input>
              <p>Enter your password</p>
              <input
                type="password"
                placeholder="Password..."
                name="psw"
                required
              ></input>
              <button type="submit">Register</button>
              <p>
                By providing your email address, you agree to our Privacy Policy
                and Terms & Conditions
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
