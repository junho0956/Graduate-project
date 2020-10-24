import React, { useEffect } from "react";
import "../csss/Navigator.css";
import HomeMenuTab from "./HomeMenuTab";

const Navigator = ({ menuState, circleState, handleChangeFeedFromApp }) => {
  const handleChangeFeedFromNavigator = (menu, circle) => {
    handleChangeFeedFromApp(menu, circle);
  };

  return (
    <div className="navigation">
      <div className="side" />
      <div className="navMain">
        <div className="Logo">Clava</div>
        <div className="menuTab">
          <HomeMenuTab
            menuState={menuState}
            circleState={circleState}
            handleChangeFeedFromNavigator={handleChangeFeedFromNavigator}
          />
        </div>
      </div>
      <div className="side" />
    </div>
  );
};

export default Navigator;
