import React, { useState, useEffect, useCallback } from "react";
import { JoinCircle, FollowCircle } from "../components";
import "../csss/MyCircle.css";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import {UserCircleInfo} from '../model';

const MyCircle = ({userCircleList, screenState, changeScreen}) => {
  
  const [circleInfo, setCircleInfo] = useState(UserCircleInfo);
  const [Clickjoincircle, setJoinCircle] = useState(false);
  const [Clickfollowcircle, setFollowCircle] = useState(false);

  const setAnimation = () => {
    const followtitle = document.querySelector(".FollowCircleTitle");
    const joinslide = document.querySelector(".JoinCircleInfo");
    const jointarget = joinslide.children[0];
    const followslide = document.querySelector(".FollowCircleInfo");
    const followtarget = followslide.children[0];
    const joincircleHeight = window.getComputedStyle(jointarget.children[0]).height;
    const followcircleHeight = window.getComputedStyle(followtarget.children[0]).height;
    const joinHeight = Number(joincircleHeight.slice(0, -2)) * -1;
    const followHeight = Number(followcircleHeight.slice(0, -2)) * -1;
  
    jointarget.style.cssText = `transition:0.5s; margin-top:${joinHeight}px;`;
    followtarget.style.cssText = `transition:0.5s; margin-top:${followHeight}px;`;
  
    if (Clickjoincircle) 
    {
      jointarget.style.marginTop = "0%";
      followtitle.style.borderTop = "1px solid lightgrey";
    } 
    else followtitle.style.borderTop = "none";
  
    if (Clickfollowcircle) followtarget.style.marginTop = "0%";
  }

  useEffect(() => setAnimation());

  useEffect(() => {
    setCircleInfo(userCircleList);
  }, [userCircleList]);

  const ClickCircleChange = (id) => {

    if (id === "join"){
      setJoinCircle(!Clickjoincircle);
      setFollowCircle(false);
    } 
    else if (id === "follow"){
      setJoinCircle(false);
      setFollowCircle(!Clickfollowcircle);
    }
  };

  const changeScreenCircle = res => changeScreen(res);

  return (
    <div className="mycircleBasic">
      <div className="JoinCircle">
        
        <div className="JoinCircleTitle" onClick={() => ClickCircleChange("join")}> Joining
          {!Clickjoincircle ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
        </div>
        
        <div className="JoinCircleInfo">
          <ul>
            <li>
              {circleInfo.joincircle.map((res, index) => {
                return <JoinCircle key={index} data={res} screenState={screenState} changeScreen={changeScreenCircle}/>;
              })}
            </li>
          </ul>
        </div>

      </div>
      <div className="FollowCircle">
        
        <div className="FollowCircleTitle" onClick={() => ClickCircleChange("follow")}> Following
          {!Clickfollowcircle ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
        </div>
        <div className="FollowCircleInfo">
          <ul>
            <li>
              {circleInfo.followcircle.map((res, index) => {
                return <FollowCircle key={index} data={res} screenState={screenState} changeScreen={changeScreenCircle}/>;
              })}
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default MyCircle;
