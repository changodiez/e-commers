import React from 'react';

const Register = (props) => {

    const RegisterOpen = props.RegisterOpen;
  
    const Close = props.CloseRegister
    
    const CloseRegister = () => {
     Close(!RegisterOpen)
   
    }

    return ( 
        <div>
             <div>
      <div className="modal">
        
          <div className="Login-modal">
          <a id="LoginbuttonClose" onClick={CloseRegister}>
          X
        </a>
            <form>
            <h2>Register</h2>
              <input
                type="text"
                placeholder="Enter Username"
                name="uname"
                required
              ></input>

<input
                type="email"
                placeholder="Enter email"
                name="uname"
                required
              ></input>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              ></input>

              <button type="submit">Register</button>
            </form>
          </div>
    
      </div>
    </div>
        </div>
     );
}
 
export default Register;