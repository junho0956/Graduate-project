import React, { useState } from "react";
import "../csss/Navigator.css";
import HomeMenuTab from "./HomeMenuTab";

const Navigator = ({ menuState, handleChangeMenuTabFromApp }) => {
  const handleChangeMenuTabFromNavigator = (e) => {
    console.log("Navigator에서", e, "를 받았습니다.");
    handleChangeMenuTabFromApp(e);
  };

  return (
    <div className="navigation">
      <div className="side" />
      <div className="navMain">
        <div className="Logo">Clava</div>
        <div className="menuTab">
          <HomeMenuTab
            menuState={menuState}
            handleChangeMenuTabFromNavigator={handleChangeMenuTabFromNavigator}
          />
        </div>
      </div>
      <div className="side" />
    </div>
  );
};

export default Navigator;
