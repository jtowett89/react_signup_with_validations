import React from "react";
import successImg from "../images/success.png";

const Success = () => {
  const userData = JSON.parse(localStorage.getItem("userData"));
  return (
    <div className="content">
      <div className="imgContainer">
        <img alt="" src={successImg} className="welcomeImg" />
      </div>
      <div className="content-inner">
        <h2>Successfully Logged In</h2>
        <p>{userData.email}</p>
      </div>
    </div>
  );
};

export default Success;
