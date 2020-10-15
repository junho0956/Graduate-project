import React from "react";
import { BrowseRouter as Link, Route, Router } from "react-router-dom";
import { Navigator, Search, Feed, HomeMenuTab } from "../components";
import "../csss/Home.css";

const Home = ({}) => {
  return (
    <div className="homebasic">
      <nav className="navi">
        <Navigator />
      </nav>
      <div className="home">
        <div className="side" />
        <div className="homeMain">
          <div className="homeMainleft">
            <Feed />
          </div>
          <div className="homeMainright">
            <div className="homeMenuTitle">
              <HomeMenuTab />
            </div>
            <div className="homeMenuInfo">
              <Search />
            </div>
          </div>
        </div>
        <div className="side" />
      </div>
    </div>
  );
};

export default Home;
