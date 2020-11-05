import React, { useEffect, useState } from "react";
import "../csss/Login.css";
import { LoginComponent, SignUpComponent } from "../components";
import backgroundImg from "../img/5.jpg";

import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

const Login = ({}) => {
  const [changeState, setChangeState] = useState(true);

  const changeLogin = (e) => {
    const loginButton = document.getElementById("loginbtn");
    const signupButton = document.getElementById("signupbtn");

    if (e.target.id === "loginbtn") {
      if (!changeState) {
        loginButton.style.fontSize = "2.5rem";
        signupButton.style.fontSize = "1.5rem";
        setChangeState(!changeState);
      }
    } else if (e.target.id === "signupbtn") {
      if (changeState) {
        loginButton.style.fontSize = "1.5rem";
        signupButton.style.fontSize = "2.5rem";
        setChangeState(!changeState);
      }
    }
  };

  return (
    <div className="loginDivider">
      <img src={backgroundImg} />
      <div className="loginSide"></div>
      <div className="loginMain">
        <div className="loginDiscription">
          <p className="loginHeader">동아리 커뮤니티</p>
          <p className="loginHeaderDiscript">
            실시간으로 동아리를 확인해보세요!
          </p>
        </div>
        <div className="loginComponents">
          <div className="loginChangeButton">
            <button id="loginbtn" onClick={changeLogin}>
              Login
            </button>
            <button id="signupbtn" onClick={changeLogin}>
              new ID
            </button>
          </div>
          <div className="loginComponent">
            {changeState ? <LoginComponent /> : <SignUpComponent />}
          </div>
        </div>
      </div>
      <div className="side"></div>
    </div>
  );
};

export default Login;
