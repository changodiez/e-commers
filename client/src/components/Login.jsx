import React from "react";

const Login = (props) => {
  const LoginOpen = props.LoginOpen;
  
  const Close = props.CloseLogin
  
  const CloseLogin = () => {
   Close(!LoginOpen)
 
  }

  return (
    <div>
      <div className="modal">
        
    
          <div className="Login-modal">
          <a id="LoginbuttonClose" onClick={CloseLogin}>
          X
        </a>
                       <form>
                       <h2>Login in to your account</h2>
            <p>Don't have an account? Register</p>
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
              ></input>

              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              ></input>

              <button type="submit">Login</button>
              <a>Can't remember your password?</a>
            </form>
          </div>
    
      </div>
    </div>
  );
};

export default Login;
