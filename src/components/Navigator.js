import React from "react";
import "../csss/Navigator.css";
import HomeMenuTab from "./HomeMenuTab";

const Navigator = ({}) => {
  return (
    <div className="navigation">
      <div className="side" />
      <div className="navMain">
        <div className="Logo">Clava</div>
        <div className="menuTab">
          <HomeMenuTab />
        </div>
      </div>
      <div className="side" />
    </div>
  );
};

export default Navigator;
