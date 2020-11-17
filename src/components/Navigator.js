import React, { useEffect } from "react";
import "../csss/Navigator.css";
import NavigationTab from "./NavigationTab";

const Navigator = ({ screenState, sidemenu, changeScreen, handleLogoutFromHome }) => {
  
  const changeScreenNav = (nav, sidemenu) => changeScreen(nav, sidemenu);

  const ClickLogo = () => {
    const newState = screenState.map(res => {return {...res, checked:false}});
    newState[0].checked = true;
    changeScreen(newState);
  }

  const handleLogout = () => handleLogoutFromHome();

  return (
    <div className="navigation">
      <div className="navLogo"><div className="logoClava" onClick={ClickLogo}>Clava</div></div>
      <div className="navMenuTab">
        <NavigationTab
          screenState={screenState}
          sidemenu={sidemenu}
          changeScreen={changeScreenNav}
          handleLogoutFromNavigator={handleLogout}
        />
      </div>
    </div>
  );
};

export default Navigator;
