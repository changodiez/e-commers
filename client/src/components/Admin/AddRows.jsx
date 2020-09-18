import React, { Fragment } from "react";

const AddRows = (props) => {
  const rows = props.valor;

  return (
    <Fragment>
      <div className="col">
        <input type="text" className="form-control" placeholder={rows}></input>
        <img></img>
      </div>
    </Fragment>
  );
};

export default AddRows;
