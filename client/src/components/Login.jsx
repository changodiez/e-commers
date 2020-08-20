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
        <button id="LoginbuttonClose" onClick={CloseLogin}>
          CLOSE
        </button>
    
          <div className="Login-modal">
            <form>
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
            </form>
          </div>
    
      </div>
    </div>
  );
};

export default Login;
