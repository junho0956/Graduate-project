import React, { useState, useEffect } from "react";
import "../csss/SideMenu.css";
import { Search, MyCircle } from "../components";
import { AiOutlineStar } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

const SideMenu = ({screenState, changeScreen}) => {

  const [searchBtn, setSearch] = useState(true);
  const [circleBtn, setCircle] = useState(false);

  const handleSideMenu = (select) => {
    if (select === "search") {
      setSearch(true);
      setCircle(false);
    } else {
      setSearch(false);
      setCircle(true);
    }
  };

  useEffect(() => {
    const searchs = document.querySelector(".sideMenuSearch");
    const circles = document.querySelector(".sideMenuCircle");
    if (searchBtn) {
      searchs.style.backgroundColor = "lightgrey";
      circles.style.backgroundColor = "white";
    } else if (circleBtn) {
      searchs.style.backgroundColor = "white";
      circles.style.backgroundColor = "lightgrey";
    }
  }, [searchBtn, circleBtn]);

  const changeScreenSide = (res) => {
    changeScreen(res)
  }

  const searchs = "search";
  const circles = "circles";

  return (
    <div className="sideMenu">

      <div className="sideMenuSelect">
        <div className="sideMenuSearch"><FiSearch onClick={() => handleSideMenu(searchs)} /></div>
        <div className="sideMenuCircle"><AiOutlineStar onClick={() => handleSideMenu(circles)} /></div>
      </div>

      <div className="sideMenuInfo">
        {searchBtn ? 
        <Search screenState={screenState} changeScreen={changeScreenSide}/> : 
        <MyCircle screenState={screenState} changeScreen={changeScreenSide} /> } 
      </div>
      
    </div>
  );
};

export default SideMenu;
