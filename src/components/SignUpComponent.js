import Axios from "axios";
import React, { useState } from "react";
import "../csss/SignUpComponent.css";

const SignUpComponent = () => {
  const [signupValue, setSignup] = useState({
    email: "",
    password: "",
    name: "",
    nickname: "",
    user_gender: "",
    user_organization: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(signupValue);
    Axios("http://3.35.240.252:8080/users", {
      method: "POST",
      data: signupValue,
    })
      .then((res) => {
        alert("create user!");
      })
      .catch((error) => console.log(error));
  };

  const onChange = (e) => {
    const changeValue = { ...signupValue };
    changeValue[e.target.id] = e.target.value;
    setSignup(changeValue);
  };
  const onClickGender = (e) => {
    const changeValue = { ...signupValue };
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
              value={signupValue.email}
              placeholder="Email"
              onChange={onChange}
            />
            <input
              type="password"
              id="password"
              value={signupValue.password}
              placeholder="Password"
              onChange={onChange}
            />
            <input
              type="text"
              id="name"
              value={signupValue.name}
              placeholder="Name"
              onChange={onChange}
            />
            <input
              type="text"
              id="nickname"
              value={signupValue.nickname}
              placeholder="nickName"
              onChange={onChange}
            />
            <input
              type="text"
              id="user_organization"
              value={signupValue.user_organization}
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
