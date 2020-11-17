import React, { useEffect } from "react";
import "../csss/NavigationTab.css";
import { AiFillHome, AiOutlineHome, AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { HiUser, HiOutlineUser } from "react-icons/hi";

import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

function settingJquery() {
  $(document).ready(function () {
    $(".userProfile").click(function () {
      $(".userProfileIn").fadeToggle();
    });
  });
}

const HomeMenuTab = ({ screenState, sidemenu, changeScreen, handleLogoutFromNavigator }) => {
  
  const changeScreenTab = (id) => {
    let newscreenState = screenState.map(res => {return {...res, checked:false}})
    if(id === 'home') newscreenState[0].checked = true;
    else if(id === 'profile') {
      newscreenState[1].name = localStorage.getItem('nickname');
      newscreenState[1].checked = true;
    }
    changeScreen(newscreenState, sidemenu);
  };

  const sideMenuChange = () => {
    const newMenuOpen = !sidemenu;
    changeScreen(screenState, newMenuOpen);
  };

  useEffect(() => {
    const menu = document.querySelector(".menutab");
    menu.style.cssText = "display:flex; flex-direction:row; justify-content:space-around; width:100%";
    const menuchild = document.querySelectorAll(".menutab div");
    menuchild.forEach(res => {
      res.style.cssText = "width:1.75rem; font-size:1.75rem; border-radius:1rem; cursor:pointer;";
      res.addEventListener("mouseenter", function (e) { e.target.style.backgroundColor = "lightgrey"; });
      res.addEventListener("mouseleave", function (e) { e.target.style.backgroundColor = "white"; });
    });

    settingJquery();
  }, []);

  const handleLogout = () => handleLogoutFromNavigator();

  const home = 'home', profile = 'profile';

  return (
    <div className="menutab">
      <div>
        {screenState[0].checked ? 
          <AiFillHome onClick={() => changeScreenTab(home)} /> :
          <AiOutlineHome onClick={() => changeScreenTab(home)} /> }
      </div>

      <div className="userProfile">
        {screenState[1].checked ? <HiUser /> : <HiOutlineUser />}
        <ul className="userProfileIn">
          <li className="userProfileLi" onClick={() => changeScreenTab(profile)}>프로필</li>
          <li className="userProfileLi" onClick={handleLogout}>로그아웃</li>
        </ul>
      </div>

      <div>
        {sidemenu ?
        <AiOutlineMenuUnfold onClick={sideMenuChange} /> :
        <AiOutlineMenuFold onClick={sideMenuChange} />}
      </div>
    </div>
  );
};

export default HomeMenuTab;
