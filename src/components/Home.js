import React, { useState, useEffect } from "react";
import { Navigator, HomeFeed, CircleInfo, Profile, SideMenu} from "../components";
import "../csss/Home.css";

const Home = ({ handleLogoutFromApp }) => {

  const [navState, setNavState] = useState([
    { name: "", checked: true }, // home 0
    { name: "", checked: false }, // profile 1
    { id: "", checked: false }, // circle 2
    { name: "", checked: false }, // feed? 3
  ]);
  const [sidemenu, setMenuOpen] = useState(true);


  const movingSideMenu = (menuOpen) => {
    const target = document.querySelector(".sidemenuLoc").children[0];
    target.style.cssText = "transition:1s;";

    if (!menuOpen) target.style.marginLeft = "100%";
  };

  
  const changeScreen = (nav, setSideMenu) => {
    setNavState(nav);
    if (setSideMenu !== undefined && sidemenu !== setSideMenu) {
      setMenuOpen(setSideMenu);
      movingSideMenu(setSideMenu);
    }
  };


  const handleLogout = () => handleLogoutFromApp();

  const A = [1, 2, 3];

  return (
    <div className="homebasic">
      <div className="navi">
        <Navigator
          navState={navState}
          sidemenu={sidemenu}
          changeScreen={changeScreen}
          handleLogoutFromHome={handleLogout}
        />
      </div>
      <div className="home">
        <div className="homeFeed">
          {navState[0].checked ? <HomeFeed A={A} /> : (
            navState[1].checked ? <Profile state={navState} changeScreen={changeScreen} /> : (
              <CircleInfo state={navState} changeScreen={changeScreen} />
            )
          )}
        </div>
        <div className="sidemenuLoc">
          <ul>
            <li>
              <SideMenu state={navState} changeScreen={changeScreen}/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
