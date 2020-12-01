import React, { useState } from "react";
import "../css/LoginComponent.css";
import axios from "axios";
// import SetUser from "../../Hooks/SetUser";

const LoginComponent = () => {
  const [inputID, setID] = useState("");
  const [inputPW, setPW] = useState("");
  // const [notuse, setUser] = SetUser("token");

  const forgotUserBtn = () => {};

  const attempLogin = (e) => {
    e.preventDefault();

    const loginState = {
      email: inputID,
      password: inputPW,
    };

    axios.post("http://3.35.240.252:8080/auth", loginState)
    .then((res) => {
      if(res.data.accessToken){
        localStorage.setItem("token", res.data.accessToken);
        localStorage.setItem("email", inputID);
        localStorage.setItem("nickname", res.data.userNickname);
        window.location.reload();
      }
      else{
        alert(res.data.msg);
        setPW('');
      }
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
              // value={idValue}
              placeholder=" ID"
              onChange={onChange}
            />
          </p>
          <p>
            <input
              id="pw"
              type="password"
              // value={pwValue}
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
