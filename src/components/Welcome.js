import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import welcomeImg from "../images/welcome.png";

const Welcome = () => {
  const userData = localStorage.getItem("userData");
  useEffect(() => {
    if (userData) {
      localStorage.removeItem("userData");
    }
  }, [userData]);
  return (
    <div className="content">
      <div className="imgContainer">
        <img alt="" src={welcomeImg} className="welcomeImg" />
      </div>
      <div className="content-inner">
        <h1>Welcome</h1>
        <p>We’re glad you’re here! Sign up to start</p>
        <Link className="signup-btn" to="/signup">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
