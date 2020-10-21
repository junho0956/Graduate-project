import React, { useEffect } from "react";
import "../csss/Navigator.css";
import HomeMenuTab from "./HomeMenuTab";

const Navigator = ({ menuState, homeState, handleChangeMenuTabFromApp }) => {
  const handleChangeMenuTabFromNavigator = (menu, home) => {
    handleChangeMenuTabFromApp(menu, home);
  };

  return (
    <div className="navigation">
      <div className="side" />
      <div className="navMain">
        <div className="Logo">Clava</div>
        <div className="menuTab">
          <HomeMenuTab
            menuState={menuState}
            homeState={homeState}
            handleChangeMenuTabFromNavigator={handleChangeMenuTabFromNavigator}
          />
        </div>
      </div>
      <div className="side" />
    </div>
  );
};

export default Navigator;
