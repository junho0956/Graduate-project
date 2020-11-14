import React, { useState, useEffect } from "react";
import {
  Navigator,
  HomeFeed,
  CircleInformation,
  Profile,
  SideMenu,
} from "../components";
import "../csss/Home.css";

const Home = ({ handleLogoutFromApp }) => {
  const [navState, clickNavi] = useState([
    { name: "navhome", checked: true },
    { name: "navprofile", checked: false },
  ]);
  const [sidemenu, setMenuOpen] = useState(true);

  // sidemenu animation function
  const movingSideMenu = (menuOpen) => {
    const menu = document.querySelector(".sidemenuLoc");
    // target is ul
    const target = menu.children[0];
    target.style.cssText = "transition:1s;";

    if (!menuOpen) {
      target.style.marginLeft = "100%";
    }
  };

  // navigation, sidemenu 의 state 값에 대한 handling
  const handleChangeFeed = (nav, setSideMenu) => {
    clickNavi(nav);
    if (sidemenu !== setSideMenu) {
      setMenuOpen(setSideMenu);
      movingSideMenu(setSideMenu);
    }
  };

  // logout handling
  const handleLogout = () => {
    handleLogoutFromApp();
  };

  // Feed 완성전까지 사용할 데이터
  const A = [1, 2, 3];

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
