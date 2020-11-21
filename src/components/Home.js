import React, { useState, useEffect, useCallback } from "react";
import { Navigator, HomeFeed, CircleInfo, Profile, SideMenu, FeedItem, WritePost} from "../components";
import "../csss/Home.css";
import { getAllCircle } from '../function/getAllCircle';

const Home = ({ handleLogoutFromApp }) => {

  // 전체 state 관리
  const [screenState, setScreenState] = useState([
    { name: "", checked: true }, // home 0
    { name: "", checked: false }, // profile 1
    { name: "", checked: false }, // circle 2
    { postData: "", checked: false }, // feed 3
    { writepostCircleID: "", checked: false}
  ]);
  // sideMenu open/close 관리
  const [sidemenu, setMenuOpen] = useState(true);
  const [searchData, setSearchData] = useState([]);
  
  const AllCircles = useCallback(async() => {
    const result = await getAllCircle();
    console.log(result);
    if(result) setSearchData(result);
  }, []);

  useEffect(() => {AllCircles()}, []);

  const movingSideMenu = (menuOpen) => {
    const sidemenuUl = document.querySelector(".sidemenuLoc").children[0];
    sidemenuUl.style.cssText = "transition:1s;";
    if (!menuOpen) sidemenuUl.style.marginLeft = "100%";
  };
  
  // 전체 스크린 관리
  const changeScreen = (screenState, setSideMenu) => {
    setScreenState(screenState);
    if (setSideMenu !== undefined && sidemenu !== setSideMenu) {
      setMenuOpen(setSideMenu);
      movingSideMenu(setSideMenu);
    }
  };
  
  // 로그아웃 핸들러
  const handleLogout = () => handleLogoutFromApp();

  // 임시용
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
          screenState[3].checked ? <FeedItem screenState={screenState} changeScreen={changeScreen} /> :
          <WritePost screenState={screenState} changeScreen={changeScreen} />
          }
        </div>
        <div className="sidemenuLoc">
          <ul>
            <li>
              <SideMenu searchData={searchData} screenState={screenState} changeScreen={changeScreen}/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
