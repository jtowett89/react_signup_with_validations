import React, { useState } from "react";
import signupImg from "../images/signup.png";
import { faLock, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Input from "./Input";

const Signup = () => {
  // Error States
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  // Input Value States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Button text state
  const [btnTxt, setBtnTxt] = useState(false);

  // For redirecting to the success page
  const navigate = useNavigate();

  // Validate email address and username
  const validateInputs = (username, email) => {
    let numberRexExp = /^\d+$/;
    let specialCharRexExp = /[^A-Za-z0-9]/g;
    let emailRegExp =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (
      username.length < 5 ||
      username.length > 15 ||
      numberRexExp.test(username.charAt(0)) ||
      numberRexExp.test(username.charAt(username.length - 1)) ||
      specialCharRexExp.test(username)
    ) {
      setUsernameError(
        "Username must consist of 5 to 15 characters, only letters and numbers are allowed, with no numbers at the beginning or the end"
      );
      setBtnTxt(false);
      return false;
    } else if (!emailRegExp.test(email)) {
      setEmailError("Invalid Email Address");
      setBtnTxt(false);
      return false;
    } else {
      return true;
    }
  };

  // Function for handling input field changes
  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirm_password") {
      setConfirmPassword(e.target.value);
    }
  };

  // Function for submitting the signup form
  const handleSubmit = (e) => {
    setBtnTxt(true);
    // Prevent default form submission
    e.preventDefault();

    //Reset all errors on form submission
    setUsernameError(null);
    setEmailError(null);
    setPasswordError(null);
    setConfirmPasswordError(null);

    if (validateInputs(username, email)) {
      // Post data to endpoint
      fetch("https://goldblv.com/api/hiring/tasks/register", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          password_confirmation: confirmPassword
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then((response) => response.json())
        .then((data) => {
          // Check if there are errors in the input fields and render errors appropriately
          if (data.errors) {
            if (data.errors.username) {
              setUsernameError(data.errors.username);
            } else if (data.errors.email) {
              setEmailError(data.errors.email);
            } else if (data.errors.password) {
              // Loop over the password erros array then update the necessary state
              data.errors.password.map((error) => {
                return error === "The password confirmation does not match."
                  ? setConfirmPasswordError(error)
                  : setPasswordError(error);
              });
            }
            setBtnTxt(false);
          } else {
            // set user data in localstorage
            localStorage.setItem("userData", JSON.stringify(data));
            console.log("success");
            setBtnTxt(false);

            // Redirect to success page after successful signup
            navigate("/success");
          }
          return;
        })
        .catch((error) => {
          // Log errors from the request
          setBtnTxt(false);
          console.log("Error: " + error);
          return;
        });
    } else {
      setBtnTxt(false);
      return;
    }
  };

  const inputsData = [
    {
      name: "username",
      type: "text",
      icon: faUser,
      change: handleChange,
      placeholder: "Username",
      value: username,
      errors: usernameError
    },
    {
      name: "email",
      type: "email",
      icon: faEnvelope,
      change: handleChange,
      placeholder: "Email",
      value: email,
      errors: emailError
    },
    {
      name: "password",
      type: "password",
      icon: faLock,
      change: handleChange,
      placeholder: "Password",
      value: password,
      errors: passwordError
    },
    {
      name: "confirm_password",
      type: "password",
      icon: faLock,
      change: handleChange,
      placeholder: "Confirm Password",
      value: confirmPassword,
      errors: confirmPasswordError
    }
  ];

  return (
    <div className="content">
      <div className="imgContainer">
        <img alt="" src={signupImg} className="welcomeImg" />
      </div>
      <div className="content-inner">
        <h2>Create Account</h2>
        <p>Go ahead and sign up, let everyone know how awesome you are!</p>
        <form onSubmit={handleSubmit}>
          {inputsData.map((input, index) => (
            <Input key={index} data={input} />
          ))}
          <div className="input-container">
            <button type="submit" className="signup-btn">
              {btnTxt ? "Submitting..." : "Create Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
