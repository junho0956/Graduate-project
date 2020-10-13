import React, { useState } from "react";
import "../csss/LoginComponent.css";

const LoginComponent = () => {
  const [idValue, setID] = useState("");
  const [pwValue, setPW] = useState("");

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
            <label htmlFor="id">ID </label>
            <input id="id" type="text" value={idValue} onChange={onChange} />
          </p>
          <p>
            <label htmlFor="pw">PW </label>
            <input
              id="pw"
              type="password"
              value={pwValue}
              onChange={onChange}
            />
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
