import axios from "axios";
import React, { useState } from "react";
import "../css/SignUpComponent.css";

const SignUpComponent = () => {
  const [inputSignup, setSignup] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
    user_gender: "",
    user_organization: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    axios("http://3.35.240.252:8080/users", {
      method: "POST",
      data: inputSignup,
    })
    .then((res) => {
      alert("create user!");
      window.location.reload();
    })
    .catch((error) => console.log(error));
  };

  const onChange = (e) => {
    const changeValue = { ...inputSignup };
    changeValue[e.target.id] = e.target.value;
    setSignup(changeValue);
  };
  const onClickGender = (e) => {
    const changeValue = { ...inputSignup };
    setSignup({ ...changeValue, user_gender: e.target.value });
  };

  return (
    <div>
      <div className="signupBackground">
        <div className="signupBody">
          <form className="signupForm" onSubmit={onSubmit}>
            <input
              type="text"
              id="email"
              // value={inputSignup.email}
              placeholder="Email"
              onChange={onChange}
            />
            <input
              type="password"
              id="password"
              // value={inputSignup.password}
              placeholder="Password"
              onChange={onChange}
            />
            <input
              type="text"
              id="name"
              // value={inputSignup.name}
              placeholder="Name"
              onChange={onChange}
            />
            <input
              type="text"
              id="nickname"
              // value={inputSignup.nickname}
              placeholder="nickName"
              onChange={onChange}
            />
            <input
              type="text"
              id="user_organization"
              // value={inputSignup.user_organization}
              placeholder="Organization"
              onChange={onChange}
            />
            <p>
              gender :&nbsp;&nbsp;
              <input
                type="radio"
                id="male"
                value="male"
                onClick={onClickGender}
              />
              <label htmlFor="male">male</label>
              <input
                type="radio"
                id="female"
                value="female"
                onClick={onClickGender}
              />
              <label htmlFor="female">female</label>
            </p>
            <button onClick={onSubmit}>create New ID!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
