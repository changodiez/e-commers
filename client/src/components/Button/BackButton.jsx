import React from "react";
import { useHistory } from "react-router-dom";


const BackButton = () => {
  let history = useHistory();

  return (
    <div className="back-button">
      <button onClick={history.goBack}>Back</button>
    </div>
  );
};

export default BackButton;
