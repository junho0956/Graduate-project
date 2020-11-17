import React, { useState } from "react";
import "../csss/LoginComponent.css";
import axios from "axios";
import getUserToken from "../Hooks/getUserToken";

const LoginComponent = () => {
  const [idValue, setID] = useState("");
  const [pwValue, setPW] = useState("");
  const [usertoken, setUserToken] = getUserToken("token");

  const forgotUserBtn = () => {};

  const attempLogin = (e) => {
    e.preventDefault();

    const userdata = {
      email: idValue,
      password: pwValue,
    };

    axios.post("http://3.35.240.252:8080/auth", userdata)
    .then((res) => {
      const usertokenData = {
        token: res.data.accessToken,
        email: idValue,
        nickname: res.data.userNickname,
      };
      setUserToken(usertokenData);
      window.location.reload();
    })
    .catch((error) => console.log(error));
  };

  const onChange = (e) => {
    if (e.target.id === "id") setID(e.target.value);
    else setPW(e.target.value);
  };

  return (
    <div className="loginBackground">
      <div className="loginBody">
        <form className="loginForm" onSubmit={attempLogin}>
          <p>
            <input
              id="id"
              type="text"
              value={idValue}
              placeholder=" ID"
              onChange={onChange}
            />
          </p>
          <p>
            <input
              id="pw"
              type="password"
              value={pwValue}
              placeholder=" PW"
              onChange={onChange}
            />
          </p>
          <a href="/forgotUser" id="forgotUser" onClick={forgotUserBtn}>forgot your ID or PW?</a>
          <p className="loginBtn"><button onClick={attempLogin}>Login!</button></p>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
