import React, { useState, useEffect } from "react";
import "../csss/SideMenu.css";
import { Search, MyCircle } from "../components";
import { AiOutlineStar } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

const SideMenu = ({state, changeScreen}) => {
  // select search/circle state, default click search
  const [search, setSearch] = useState(true);
  const [circle, setCircle] = useState(false);

  // state menu
  const handleSideMenu = (select) => {
    if (select === "search") {
      setSearch(true);
      setCircle(false);
    } else {
      setSearch(false);
      setCircle(true);
    }
  };

  // change css from state
  useEffect(() => {
    // const sideMenus = document.querySelectorAll(".sideMenuSelect div");
    const searchs = document.querySelector(".sideMenuSearch");
    const circles = document.querySelector(".sideMenuCircle");
    if (search) {
      searchs.style.backgroundColor = "lightgrey";
      circles.style.backgroundColor = "white";
    } else if (circle) {
      searchs.style.backgroundColor = "white";
      circles.style.backgroundColor = "lightgrey";
    }
  }, [search, circle]);

  const changeScreenSide = (res) => {
    changeScreen(res)
  }

  // params
  const searchs = "search";
  const circles = "circles";

  return (
    <div className="sideMenu">
      <div className="sideMenuSelect">
        <div className="sideMenuSearch">
          <FiSearch onClick={() => handleSideMenu(searchs)} />
        </div>
        <div className="sideMenuCircle">
          <AiOutlineStar onClick={() => handleSideMenu(circles)} />
        </div>
      </div>
      <div className="sideMenuInfo">
        {search ? <Search state={state} changeScreen={changeScreenSide}/> : 
        <MyCircle state={state} changeScreen={changeScreenSide} /> } 
      </div>
    </div>
  );
};

export default SideMenu;
