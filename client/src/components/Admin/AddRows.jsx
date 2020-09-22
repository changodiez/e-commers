import React, { Fragment } from "react";

const AddRows = (props) => {
  const rows = props.valor;

  return (
    <Fragment>
      {/* <div className="col">
      <input
                type="text"
                placeholder={rows}
                name={rows}
                required
                value={rows}
                onChange={(e) => onChange(e)}
              ></input>
      </div> */}
    </Fragment>
  );
};

export default AddRows;
