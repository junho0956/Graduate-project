import React, { useState } from "react";
import { BrowserRouter as Link } from "react-router-dom";
import "../csss/LoginComponent.css";

const LoginComponent = () => {
  const [idValue, setID] = useState("");
  const [pwValue, setPW] = useState("");

  const createUserBtn = () => {};
  const forgotUserBtn = () => {};

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const onChange = (e) => {
    if (e.target.id === "id") setID(e.target.value);
    else setPW(e.target.value);
  };

  return (
    <div className="background">
      <div className="title">Sign In</div>
      <div className="body">
        <form onSubmit={onSubmit}>
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
          {/* <a href="/forgotUser" id="forgotUser">
            forgot your ID or PW?
          </a> */}
          <p className="loginBtn">
            <button onClick={onSubmit}>Login!</button>
          </p>
          <p className="anotherBtn">
            <button onClick={createUserBtn}>Sign up</button>
            <button onClick={forgotUserBtn}>Find user</button>
          </p>
          <p></p>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
