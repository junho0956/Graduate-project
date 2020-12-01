import React, { useState, useEffect, useCallback } from "react";

import {HomeFeed, Profile, FeedItem} from "../components";
import {Navigator} from '../components/Navi';
import {CircleInfo, WritePost} from '../components/Circle';
import {SideMenu} from '../components/SideMenu'; 

import "./css/Home.css";

import {getAllCircle} from './function/getAllCircle';
import {getUserProfile} from './function/getUserProfile';
import {getUserCircle} from './function/getUserCircle';
import {UserCircleInfo, Circle} from '../model';

const Home = ({ handleLogoutFromApp }) => {

  // 전체 state 관리
  const [screenState, setScreenState] = useState([
    { AllPostData: [], checked: true }, // home 0
    { name: "", checked: false }, // profile 1
    { name: "", checked: false }, // circle 2
    { postData: [], checked: false }, // feed 3
    { writepostCircleID: "", checked: false},
    { changeState: 0}
  ]);

  // sideMenu open/close 관리
  const [sidemenu, setMenuOpen] = useState(true);
  const [searchTotalData, setSearchData] = useState([Circle]);
  const [userCircleList, setUserCircleList] = useState(UserCircleInfo)
  
  // 검색기능을 위해 미리 모든 동아리를 가져옴
  const AllCircles = useCallback(async() => {
    const result = await getAllCircle();
    if(result) setSearchData(result);
  }, []);

  // 로그인한 현재 유저의 홈피드를 구현하기 위한 작업
  // 유저 정보 => 동아리를 모두 가져옴
  const getProfileCircleOfUser = useCallback(async() => {
    const resultProfile = await getUserProfile(localStorage.getItem('nickname'));
    if(resultProfile){
      const resultCircle = await getUserCircle(resultProfile);
      if(resultCircle){
        setUserCircleList(resultCircle);
      }
    }
  }, [screenState]);

  // 사이드메뉴 애니메이션
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

  useEffect(() => {
    AllCircles();
    getProfileCircleOfUser();
  }, [screenState]);

  return (
    <div className="homebasic">
      <div className="homenavi">
        <Navigator
          screenState={screenState}
          sidemenu={sidemenu}
          changeScreen={changeScreen}
          handleLogoutFromHome={handleLogout}
        />
      </div>
      <div className="homeMain">
        <div className="homeFeed">
          {
          screenState[0].checked ? <HomeFeed userCircleList={userCircleList} screenState={screenState} changeScreen={changeScreen}/> : 
          screenState[1].checked ? <Profile screenState={screenState} changeScreen={changeScreen} /> : 
          screenState[2].checked ? <CircleInfo screenState={screenState} changeScreen={changeScreen} /> :
          screenState[3].checked ? <FeedItem postData={screenState[3].postData} screenState={screenState} changeScreen={changeScreen} /> :
          <WritePost screenState={screenState} changeScreen={changeScreen} />
          }
        </div>
        <div className="sidemenuLoc">
          <ul>
            <li>
              <SideMenu searchTotalData={searchTotalData} userCircleList={userCircleList} screenState={screenState} changeScreen={changeScreen}/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
