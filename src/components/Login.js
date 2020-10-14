import React from "react";
import "../csss/Login.css";
import LoginComponent from "./LoginComponent";
import backgroundImg from "../img/5.jpg";

const Login = ({}) => {
  return (
    <div className="divider">
      <img src={backgroundImg} />
      <div className="side"></div>
      <div className="Main">
        <div className="discription">
          <p className="discription header">동아리 커뮤니티</p>
          <p className="headerDiscript">실시간으로 동아리를 확인해보세요!</p>
        </div>
        <div className="LoginComponent">
          <LoginComponent />
        </div>
      </div>
      <div className="side"></div>
    </div>
  );
};

export default Login;
