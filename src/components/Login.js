import React, { useState } from "react";
import { LoginComponent, SignUpComponent } from "../components";
import backgroundImg from "../img/2.jpg";
import "../csss/Login.css";

const Login = () => {
  const [loginOrSignup, setloginOrSignup] = useState(true);

  const ClickLoginorSignUp = (e) => {
    const loginButton = document.getElementById("loginbtn");
    const signupButton = document.getElementById("signupbtn");

    if (e.target.id === "loginbtn") {
      if (!loginOrSignup) {
        loginButton.style.fontSize = "2.5rem";
        signupButton.style.fontSize = "1.5rem";
        setloginOrSignup(!loginOrSignup);
      }
    } else if (e.target.id === "signupbtn") {
      if (loginOrSignup) {
        loginButton.style.fontSize = "1.5rem";
        signupButton.style.fontSize = "2.5rem";
        setloginOrSignup(!loginOrSignup);
      }
    }
  };

  return (
    <div className="loginDivider">
      <img src={backgroundImg} />
      <div className="loginSide"></div>
      <div className="loginMain">
        <div className="loginComponents">
          <div className="loginChangeButton">
            <button id="loginbtn" onClick={ClickLoginorSignUp}>
              Login
            </button>
            <button id="signupbtn" onClick={ClickLoginorSignUp}>
              new ID
            </button>
          </div>
          <div className="loginComponent">
            {loginOrSignup ? <LoginComponent /> : <SignUpComponent />}
          </div>
        </div>
        {/* <div className="loginDiscription">
          <p className="loginHeader">동아리 커뮤니티</p>
          <p className="loginHeaderDiscript">
            실시간으로 동아리를 확인해보세요!
          </p>
        </div> */}
      </div>
      <div className="side"></div>
    </div>
  );
};

export default Login;
