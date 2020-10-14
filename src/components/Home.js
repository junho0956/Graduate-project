import React from "react";
import { BrowseRouter as Link, Route, Router } from "react-router-dom";
import Navigator from "./Navigator";
import "../csss/Home.css";

const Home = ({}) => {
  return (
    <div className="homebasic">
      <nav className="navi">
        <Navigator />
      </nav>
      <div className="home">
        <div className="side" />
        <div className="homeMain">This home Main</div>
        <div className="side" />
      </div>
    </div>
  );
};

export default Home;
