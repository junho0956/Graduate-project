import React from "react";
import { BrowseRouter as Link, Route, Router } from "react-router-dom";
import {
  Navigator,
  Search,
  HomeFeed,
  MyCircle,
  CircleInformation,
} from "../components";
import "../csss/Home.css";

const Home = ({}) => {
  const A = [1, 2, 3];

  return (
    <div className="homebasic">
      <nav className="navi">
        <Navigator />
      </nav>
      <div className="home">
        <div className="side" />
        <div className="homeMain">
          <div className="homeMainleft">
            {/* <HomeFeed A={A} /> */}
            <CircleInformation />
          </div>
          <div className="homeMainright">
            <div className="homeMenuInfo">
              {/* <Search /> */}
              <MyCircle />
            </div>
          </div>
        </div>
        <div className="side" />
      </div>
    </div>
  );
};

export default Home;
