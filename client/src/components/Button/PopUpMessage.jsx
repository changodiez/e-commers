import React from "react";

const PopUpMessage = (props) => {
  const state = props.state;
  const setState = props.setState;
  const text = props.text;

  return (
    <div className="popup-message">
      {state ? (
        <div className="modal">
          <div className="Login-modal">
            <button className="popup-button" onClick={() => setState(!state)}>
              X
            </button>
            <div className="login-ask">
              <h3>{text}</h3>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PopUpMessage;
