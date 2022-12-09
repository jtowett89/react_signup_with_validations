import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import successImg from "../images/success.png";

const Success = () => {
  const storedData = localStorage.getItem("userData");
  const userData = storedData ? JSON.parse(storedData) : "";

  // For redirecting to root path if there is no user data in localStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (userData === "") {
      navigate("/");
    }
  }, [userData, navigate]);

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
