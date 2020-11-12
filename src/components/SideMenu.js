import React, { useState, useEffect } from "react";
import "../csss/SideMenu.css";
import { Search, MyCircle } from "../components";
import { AiOutlineStar } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

const SideMenu = () => {
  const [search, setSearch] = useState(true);
  const [circle, setCircle] = useState(false);
  const searchs = "search",
    circles = "circles";
  const A = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
  ];

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
  });

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
        {search ? <Search /> : <MyCircle A={A} />}
      </div>
    </div>
  );
};

export default SideMenu;
