import React, { useState, useEffect } from "react";
import { BrowseRouter as Link, Route, Router } from "react-router-dom";
import {
  Navigator,
  Search,
  HomeFeed,
  CircleInformation,
  Profile,
  SideMenu,
} from "../components";
import "../csss/Home.css";
import getUserToken from "../Hooks/getUserToken";

const Home = ({ handleLogoutFromApp }) => {
  const A = [1, 2, 3];

  const [navState, clickNavi] = useState([
    { name: "navhome", checked: true },
    { name: "navprofile", checked: false },
  ]);
  const [sidemenu, setMenuOpen] = useState(true);

  const movingSideMenu = (close) => {
    const menu = document.querySelector(".sidemenuLoc");
    const target = menu.children[0]; // ul
    target.style.cssText = "transition:1s;";

    if (!close) {
      target.style.marginLeft = "100%";
    } else {
      target.style.marginLeft = "0";
    }
  };

  const handleChangeFeed = (nav, setSideMenu) => {
    clickNavi(nav);
    if (sidemenu != setSideMenu) {
      setMenuOpen(setSideMenu);
      movingSideMenu(setSideMenu);
    }
  };

  const handleLogout = () => {
    handleLogoutFromApp();
  };

  return (
    <div className="homebasic">
      <div className="navi">
        <Navigator
          navState={navState}
          sidemenu={sidemenu}
          handleChangeFeedFromHome={handleChangeFeed}
          handleLogoutFromHome={handleLogout}
        />
      </div>
      <div className="home">
        <div className="homeFeed">
          {navState[1].checked ? (
            <Profile
              nickname={localStorage.getItem("nickname")}
              loginUser={true}
              handleChangeFeedFromHome={handleChangeFeed}
            />
          ) : (
            <HomeFeed A={A} />
          )}
        </div>
        <div className="sidemenuLoc">
          <ul>
            <li>
              <SideMenu />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
