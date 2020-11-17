import React, { useState, useEffect } from "react";
import { Navigator, HomeFeed, CircleInfo, Profile, SideMenu, FeedItem} from "../components";
import "../csss/Home.css";

const Home = ({ handleLogoutFromApp }) => {

  const [screenState, setScreenState] = useState([
    { name: "", checked: true }, // home 0
    { name: "", checked: false }, // profile 1
    { name: "", checked: false }, // circle 2
    { postData: "", checked: false }, // feed? 3
  ]);
  const [sidemenu, setMenuOpen] = useState(true);

  const movingSideMenu = (menuOpen) => {
    const sidemenuUl = document.querySelector(".sidemenuLoc").children[0];
    sidemenuUl.style.cssText = "transition:1s;";
    if (!menuOpen) sidemenuUl.style.marginLeft = "100%";
  };

  
  const changeScreen = (nav, setSideMenu) => {
    setScreenState(nav);
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
          screenState={screenState}
          sidemenu={sidemenu}
          changeScreen={changeScreen}
          handleLogoutFromHome={handleLogout}
        />
      </div>
      <div className="home">
        <div className="homeFeed">
          {screenState[0].checked ? <HomeFeed A={A} screenState={screenState}/> : 
          screenState[1].checked ? <Profile screenState={screenState} changeScreen={changeScreen} /> : 
          screenState[2].checked ? <CircleInfo screenState={screenState} changeScreen={changeScreen} /> :
          <FeedItem screenState={screenState} changeScreen={changeScreen} /> 
          }
        </div>
        <div className="sidemenuLoc">
          <ul>
            <li>
              <SideMenu screenState={screenState} changeScreen={changeScreen}/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
