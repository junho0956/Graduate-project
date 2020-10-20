import React, { useState, useEffect } from "react";
import "../csss/HomeMenuTab.css";
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import { HiUser, HiOutlineUser } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { RiSearchFill } from "react-icons/ri";

// import jQuery from "jquery";
// import $ from "jquery";
// window.$ = window.jQuery = jQuery;

const HomeMenuTab = ({ menuState, handleChangeMenuTabFromNavigator }) => {
  const [state, setState] = useState(menuState);

  const handleOnClick = (id) => {
    const newState = state.map((res) =>
      res.name === id ? { ...res, checked: !res.checked } : res
    );
    console.log("newState:", newState);
    setState(newState);
    handleChangeMenuTabFromNavigator(newState);
  };

  useEffect(() => {
    const menu = document.querySelector(".menutab");
    menu.style.cssText =
      "display:flex; flex-direction:row; justify-content:space-around; width:100%";
    const menuchild = document.querySelectorAll(".menutab div");
    menuchild.forEach((res) => {
      res.style.cssText =
        "width:2rem; font-size:2rem; border-radius:1rem; cursor:pointer";
      res.addEventListener("mouseenter", function (e) {
        e.target.style.backgroundColor = "lightgrey";
      });
      res.addEventListener("mouseleave", function (e) {
        e.target.style.backgroundColor = "white";
      });
    });
  });

  const home = "menuhome",
    search = "menusearch",
    star = "menumycircle",
    profile = "menuprofile";

  return (
    <div className="menutab">
      <div>
        {state[0].checked ? (
          <AiFillHome onClick={() => handleOnClick(home)} />
        ) : (
          <AiOutlineHome onClick={() => handleOnClick(home)} />
        )}
      </div>
      <div>
        {state[1].checked ? (
          <RiSearchFill onClick={() => handleOnClick(search)} />
        ) : (
          <FiSearch onClick={() => handleOnClick(search)} />
        )}
      </div>
      <div>
        {state[2].checked ? (
          <AiFillStar onClick={() => handleOnClick(star)} />
        ) : (
          <AiOutlineStar onClick={() => handleOnClick(star)} />
        )}
      </div>
      <div>
        {state[3].checked ? (
          <HiUser onClick={() => handleOnClick(profile)} />
        ) : (
          <HiOutlineUser onClick={() => handleOnClick(profile)} />
        )}
      </div>
    </div>
  );
};

export default HomeMenuTab;
