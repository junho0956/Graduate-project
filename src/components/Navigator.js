import React, { useEffect } from "react";
import "../csss/Navigator.css";
import NavigationTab from "./NavigationTab";

const Navigator = ({ navState, sidemenu, handleChangeFeedFromHome }) => {
  const handleNavigator = (nav, sidemenu) => {
    handleChangeFeedFromHome(nav, sidemenu);
  };

  return (
    <div className="navigation">
      <div className="navLogo">Clava</div>
      <div className="navMenuTab">
        <NavigationTab
          navState={navState}
          sidemenu={sidemenu}
          handleNavigator={handleNavigator}
        />
      </div>
    </div>
  );
};

export default Navigator;
