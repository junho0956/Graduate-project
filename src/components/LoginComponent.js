import React, { useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../csss/LoginComponent.css";
import axios from "axios";

const LoginComponent = () => {
  const [idValue, setID] = useState("");
  const [pwValue, setPW] = useState("");

  const createUserBtn = () => {};
  const forgotUserBtn = () => {};

  const onSubmit = (e) => {
    e.preventDefault();

    const userdata = {
      email: idValue,
      password: pwValue,
    };

    axios({
      method: "post",
      url: "http://3.35.240.252:8080/auth",
      data: userdata,
    })
      .then((res) => {
        console.log("post :: ", res);
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
        <form className="loginForm" onSubmit={onSubmit}>
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
          <a href="/forgotUser" id="forgotUser">
            forgot your ID or PW?
          </a>
          <p className="loginBtn">
            <button onClick={onSubmit}>Login!</button>
          </p>
          <p></p>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
