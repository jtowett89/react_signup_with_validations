import AppLogic from "../Logic/AppLogic";
import signupImg from "../images/signup.png";

import Input from "./Input";

const Signup = () => {
  const { btnTxt, handleSubmit, inputsData } = AppLogic();

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
