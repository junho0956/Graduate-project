import React, { useState, useEffect } from "react";
import "../csss/HomeMenuTab.css";
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineStar,
  AiFillStar,
  AiOutlineMenuUnfold,
  AiOutlineMenuFold,
} from "react-icons/ai";
import { HiUser, HiOutlineUser } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { RiSearchFill } from "react-icons/ri";

const HomeMenuTab = ({ navState, handleNavigator }) => {
  const [menuOpen, setMenuOpen] = useState(true);

  const handleOnClick = (id) => {
    const newNavState = navState.map((res) =>
      res.name === id
        ? { ...res, checked: !res.checked }
        : { ...res, checked: false }
    );
    handleNavigator(newNavState);
  };

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
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

  const home = "navhome",
    search = "navsearch",
    profile = "navprofile";

  return (
    <div className="menutab">
      <div>
        {navState[0].checked ? (
          <AiFillHome onClick={() => handleOnClick(home)} />
        ) : (
          <AiOutlineHome onClick={() => handleOnClick(home)} />
        )}
      </div>
      <div>
        {navState[1].checked ? (
          <HiUser onClick={() => handleOnClick(profile)} />
        ) : (
          <HiOutlineUser onClick={() => handleOnClick(profile)} />
        )}
      </div>
      <div>
        {menuOpen ? (
          <AiOutlineMenuUnfold onClick={handleMenu} />
        ) : (
          <AiOutlineMenuFold onClick={handleMenu} />
        )}
      </div>
    </div>
  );
};

export default HomeMenuTab;
