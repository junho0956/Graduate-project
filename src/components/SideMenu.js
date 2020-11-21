import React, { useState, useEffect } from "react";
import "../csss/SideMenu.css";
import { Search, MyCircle } from "../components";
import { AiOutlineStar } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

const SideMenu = ({searchTotalData, screenState, changeScreen}) => {

  // sideMenu 검색/동아리 버튼
  const [searchBtn, setSearch] = useState(true);
  const [circleBtn, setCircle] = useState(false);

  // sideMenu 버튼이 navigation에 있기 때문에 연결해서 관리
  const handleSideMenu = (select) => {
    if (select === "search") {
      setSearch(true);
      setCircle(false);
    } else {
      setSearch(false);
      setCircle(true);
    }
  };

  // sideMenu 효과 => 버튼 변경될때만 렌더링
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

  // 전체 스크린 관리
  const changeScreenSide = (res) => changeScreen(res);

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
        <Search searchTotalData={searchTotalData} screenState={screenState} changeScreen={changeScreenSide}/> : 
        <MyCircle screenState={screenState} changeScreen={changeScreenSide} /> } 
      </div>
      
    </div>
  );
};

export default SideMenu;
