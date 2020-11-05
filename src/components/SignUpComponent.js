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
  };

  const onChange = (e) => {
    const changeValue = { ...signupValue };
    switch (e.target.id) {
      case "email":
        setSignup({ ...changeValue, email: e.target.value });
      case "password":
        setSignup({ ...changeValue, password: e.target.password });
      case "name":
        setSignup({ ...changeValue, name: e.target.password });
      case "nickname":
        setSignup({ ...changeValue, nickname: e.target.password });
      case "organization":
        setSignup({ ...changeValue, user_organization: e.target.password });
      default:
        return;
    }
  };
  const onClickGender = (e) => {
    const changeValue = { ...signupValue };
    setSignup({ ...changeValue, user_gender: e.target.value });
  };

  /*
  http POST 3.35.240.252:8080/users 
  email="joonho@example.com" 
  password="test" 
  name="joonho" 
  nickname="비켜보세요" 
  user_gender="male" 
  user_organization="DA-univer"
  */

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
              id="organization"
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
              <label for="male">male</label>
              <input
                type="radio"
                id="female"
                value="female"
                onClick={onClickGender}
              />
              <label for="female">female</label>
            </p>
            <button onClick={onSubmit}>create New ID!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
