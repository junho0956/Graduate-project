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

const HomeMenuTab = ({
  menuState,
  circleState,
  handleChangeFeedFromNavigator,
}) => {
  // const [state, setState] = useState(menuState);

  const handleOnClick = (id) => {
    const newMenuState = menuState.map((res) =>
      res.name === id
        ? { ...res, checked: !res.checked }
        : { ...res, checked: false }
    );
    const newCircleState = circleState;
    newCircleState.clicked = false;
    newCircleState.circleName = "";
    // setState(newCircleState);
    handleChangeFeedFromNavigator(newMenuState, newCircleState);
  };

  useEffect(() => {
    const menu = document.querySelector(".menutab");
    menu.style.cssText =
      "display:flex; flex-direction:row; justify-content:space-around; width:100%";
    const menuchild = document.querySelectorAll(".menutab div");
    menuchild.forEach((res) => {
      res.style.cssText =
        "width:1.75rem; font-size:1.75rem; border-radius:1rem; cursor:pointer;";
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
    profile = "menuprofile";

  return (
    <div className="menutab">
      <div>
        {menuState[0].checked ? (
          <AiFillHome onClick={() => handleOnClick(home)} />
        ) : (
          <AiOutlineHome onClick={() => handleOnClick(home)} />
        )}
      </div>
      <div>
        {menuState[1].checked ? (
          <RiSearchFill onClick={() => handleOnClick(search)} />
        ) : (
          <FiSearch onClick={() => handleOnClick(search)} />
        )}
      </div>
      <div>
        {menuState[2].checked ? (
          <HiUser onClick={() => handleOnClick(profile)} />
        ) : (
          <HiOutlineUser onClick={() => handleOnClick(profile)} />
        )}
      </div>
    </div>
  );
};

export default HomeMenuTab;
