import React, { useState, useEffect, useCallback } from "react";
import { JoinCircle, FollowCircle } from "../components";
import "../csss/MyCircle.css";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { getUserProfile } from "../Hooks/getUserProfile";
import { getUserCircle } from "../Hooks/getUserCircle";

const MyCircle = ({state, changeScreen}) => {
  
  const [circleInfo, setCircleInfo] = useState({
    joincircle: [],
    followcircle: [],
  });

  const [joincircle, setJoinCircle] = useState(false);
  const [followcircle, setFollowCircle] = useState(false);

  const getProfileAndCircle = useCallback(async () => {
    const userprofile = await getUserProfile(localStorage.getItem("nickname"));
    if (userprofile) {
      const usercircle = await getUserCircle(userprofile);
      if (usercircle) {
        setCircleInfo(usercircle);
      }
    }
  }, [state]);

  useEffect(() => {
    getProfileAndCircle();
  }, [state]);

  useEffect(() => {
    const followtitle = document.querySelector(".FollowCircleTitle");
    const joinslide = document.querySelector(".JoinCircleInfo");
    const jointarget = joinslide.children[0];
    const followslide = document.querySelector(".FollowCircleInfo");
    const followtarget = followslide.children[0];
    const joincircleHeight = window.getComputedStyle(jointarget.children[0])
      .height;
    const followcircleHeight = window.getComputedStyle(followtarget.children[0])
      .height;
    const joinHeight = Number(joincircleHeight.slice(0, -2)) * -1;
    const followHeight = Number(followcircleHeight.slice(0, -2)) * -1;

    jointarget.style.cssText = `transition:0.5s; margin-top:${joinHeight}px;`;
    followtarget.style.cssText = `transition:0.5s; margin-top:${followHeight}px;`;

    if (joincircle) {
      jointarget.style.marginTop = "0%";
      followtitle.style.borderTop = "1px solid lightgrey";
    } else {
      followtitle.style.borderTop = "none";
    }
    if (followcircle) {
      followtarget.style.marginTop = "0%";
    }
  });

  // click circle handling
  const handleCircle = (id) => {
    if (id === "join") {
      setJoinCircle(!joincircle);
      setFollowCircle(false);
    } else if (id === "follow") {
      setJoinCircle(false);
      setFollowCircle(!followcircle);
    }
  };

  const changeScreenCircle = res => changeScreen(res);

  return (
    <div className="mycircleBasic">
      <div className="JoinCircle">
        <div className="JoinCircleTitle" onClick={() => handleCircle("join")}>
          Joining
          {!joincircle ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
        </div>
        <div className="JoinCircleInfo">
          <ul>
            <li>
              {circleInfo.joincircle.map((res, index) => {
                return <JoinCircle key={index} data={res} state={state} changeScreen={changeScreenCircle}/>;
              })}
            </li>
          </ul>
        </div>
      </div>
      <div className="FollowCircle">
        <div
          className="FollowCircleTitle"
          onClick={() => handleCircle("follow")}
        >
          Following
          {!followcircle ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
        </div>
        <div className="FollowCircleInfo">
          <ul>
            <li>
              {circleInfo.followcircle.map((res, index) => {
                return <FollowCircle key={index} data={res} state={state} changeScreen={changeScreenCircle}/>;
              })}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyCircle;
