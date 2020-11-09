import React, { useState, useEffect } from "react";
import { JoinCircle, FollowCircle } from "../components";
import "../csss/MyCircle.css";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const MyCircle = ({ A, handleChangeFeedFromProfile }) => {
  const [joincircle, setJoinCircle] = useState(false);
  const [followcircle, setFollowCircle] = useState(false);

  const handleCircle = (id) => {
    if (id === "join") {
      setJoinCircle(!joincircle);
      setFollowCircle(false);
    } else if (id === "follow") {
      setJoinCircle(false);
      setFollowCircle(!followcircle);
    }
  };

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
    console.log(joinHeight);
    jointarget.style.cssText = `transition:0.5s; margin-top:${joinHeight}px;`;
    followtarget.style.cssText = `transition:0.5s; margin-top:${followHeight}px;`;
    if (joincircle) {
      jointarget.style.marginTop = "0%";
      followtitle.style.borderTop = "1px solid lightgrey";
    } else followtitle.style.borderTop = "none";
    if (followcircle) {
      followtarget.style.marginTop = "0%";
    }
  });

  const handleChange = (e) => {
    handleChangeFeedFromProfile(e);
  };

  return (
    <div className="mycircleBasic">
      <div className="JoinCircle">
        <div className="JoinCircleTitle" onClick={() => handleCircle("join")}>
          가입한 동아리
          {!joincircle ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
        </div>
        <div className="JoinCircleInfo">
          <ul>
            <li>
              {A.map((res, index) => {
                return <JoinCircle key={index} />;
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
          팔로우한 동아리
          {!followcircle ? <RiArrowDownSLine /> : <RiArrowUpSLine />}
        </div>
        <div className="FollowCircleInfo">
          <ul>
            <li>
              {A.map((res, index) => {
                return <FollowCircle key={index} />;
              })}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyCircle;
