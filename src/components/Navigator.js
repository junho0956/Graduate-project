import React, { useEffect } from "react";
import "../csss/Navigator.css";
import HomeMenuTab from "./HomeMenuTab";

const Navigator = ({ navState, handleChangeFeedFromHome }) => {
  const handleNavigator = (menu) => {
    handleChangeFeedFromHome(menu);
  };

  return (
    <div className="navigation">
      <div className="navLogo">Clava</div>
      <div className="navMenuTab">
        <HomeMenuTab navState={navState} handleNavigator={handleNavigator} />
      </div>
    </div>
  );
};

export default Navigator;
