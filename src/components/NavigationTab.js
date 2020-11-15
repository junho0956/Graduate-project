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

const HomeMenuTab = ({ navState, sidemenu, changeScreen, handleLogoutFromNavigator }) => {
  
  const handleOnClick = (id) => {

    let newNavState = navState.map(res => {return {...res, checked:false}})
    
    if(id === 'home') newNavState[0].checked = true;
    else if(id === 'profile') {
      newNavState[1].name = localStorage.getItem('nickname');
      newNavState[1].checked = true;
    }
    
    changeScreen(newNavState, sidemenu);
  };

  const handleMenu = () => {
    const newMenuOpen = !sidemenu;
    changeScreen(navState, newMenuOpen);
  };

  useEffect(() => {
    const menu = document.querySelector(".menutab");
    menu.style.cssText =
      "display:flex; flex-direction:row; justify-content:space-around; width:100%";
    const menuchild = document.querySelectorAll(".menutab div");
    menuchild.forEach((res) => {
      res.style.cssText =
        "width:1.75rem; font-size:1.75rem; border-radius:1rem; cursor:pointer;";
      res.addEventListener("mouseenter", function (e) {
        e.target.style.backgroundColor = "lightgrey";
      });
      res.addEventListener("mouseleave", function (e) {
        e.target.style.backgroundColor = "white";
      });
    });

    settingJquery();
  }, []);

  const handleLogout = () => {
    handleLogoutFromNavigator();
  };

  const home = 'home', 
  profile = 'profile';

  return (
    <div className="menutab">
      
      <div>
        {navState[0].checked ? 
          <AiFillHome onClick={() => handleOnClick(home)} /> :
          <AiOutlineHome onClick={() => handleOnClick(home)} /> }
      </div>

      <div className="userProfile">
        {navState[1].checked ? <HiUser /> : <HiOutlineUser />}
        <ul className="userProfileIn">
          <li className="userProfileLi" onClick={() => handleOnClick(profile)}>
            프로필
          </li>
          <li className="userProfileLi" onClick={handleLogout}>
            로그아웃
          </li>
        </ul>
      </div>

      <div>
        {sidemenu ? (
          <AiOutlineMenuUnfold onClick={handleMenu} />
        ) : (
          <AiOutlineMenuFold onClick={handleMenu} />
        )}
      </div>
    </div>
  );
};

export default HomeMenuTab;
