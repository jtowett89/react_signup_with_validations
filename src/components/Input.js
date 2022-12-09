import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Input = (props) => {
  return (
    <div className="input-container">
      <FontAwesomeIcon icon={props.data.icon} className="input-icon" />
      <input
        onChange={props.data.change}
        name={props.data.name}
        placeholder={props.data.placeholder}
        value={props.data.value}
        type={props.data.type}
      />
      <div className="error">{props.data.errors}</div>
    </div>
  );
};

export default Input;
