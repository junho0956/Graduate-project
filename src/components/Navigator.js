import React, { useEffect } from "react";
import "../csss/Navigator.css";
import HomeMenuTab from "./HomeMenuTab";

const Navigator = ({ navState, circleState, handleChangeFeedFromHome }) => {
  const handleNavigator = (menu, circle) => {
    handleChangeFeedFromHome(menu, circle);
  };

  return (
    <div className="navigation">
      <div className="side" />
      <div className="navMain">
        <div className="Logo">Clava</div>
        <div className="menuTab">
          <HomeMenuTab
            navState={navState}
            circleState={circleState}
            handleNavigator={handleNavigator}
          />
        </div>
      </div>
      <div className="side" />
    </div>
  );
};

export default Navigator;
