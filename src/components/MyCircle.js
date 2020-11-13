import React, { useState, useEffect } from "react";
import { JoinCircle, FollowCircle } from "../components";
import "../csss/MyCircle.css";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import axios from "axios";
import colonyImg from "../img/colony.PNG";

const MyCircle = ({ handleChangeFeedFromProfile }) => {
  const [joincircle, setJoinCircle] = useState(false);
  const [followcircle, setFollowCircle] = useState(false);
  const [joincircleList, setJoinCircleList] = useState([]);
  const [followcircleList, setFollowCircleList] = useState([]);

  const user = localStorage.getItem("nickname");

  useEffect(() => {
    // user의 mycircle, followcircle 정보 가져오기
    async function getUserCircle() {
      const usercircles = await axios({
        method: "GET",
        url: `http://3.35.240.252:8080/users/${user}`,
      });

      // 가지고온 mycircle의 모든 객체를 map으로 탐색하여
      // circle component로 보내기 위한 데이터셋 joincircleList 상태값 변화
      const mycirclelist = await Promise.all(
        usercircles.data.myCircle.map(async (res) => {
          return await axios({
            method: "GET",
            url: `http://3.35.240.252:8080/circlesName/${res.circleName}`,
          });
        })
      );

      const followcirclelist = await Promise.all(
        usercircles.data.followCircle.map(async (res) => {
          return await axios({
            method: "GET",
            url: `http://3.35.240.252:8080/circlesName/${res.circleName}`,
          });
        })
      );

      const newJoinCircle = mycirclelist.map((res) => {
        return {
          name: res.data.name,
          // picture: res.data.circleProfilePhoto,
          picture: colonyImg,
          Information: {
            school: res.data.organization,
            location: "Busan",
            what: res.data.category,
          },
        };
      });

      const newFollowCircle = followcirclelist.map((res) => {
        return {
          name: res.data.name,
          // picture: res.data.circleProfilePhoto,
          picture: colonyImg,
          Information: {
            school: res.data.organization,
            location: "Busan",
            what: res.data.category,
          },
        };
      });

      setJoinCircleList(newJoinCircle);
      setFollowCircleList(newFollowCircle);
    }

    getUserCircle();
  }, [user, joincircleList, followcircleList]);

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

    jointarget.style.cssText = `transition:1s; margin-top:${joinHeight}px;`;
    followtarget.style.cssText = `transition:1s; margin-top:${followHeight}px;`;

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

  const handleChange = (e) => {
    handleChangeFeedFromProfile(e);
  };

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
              {joincircleList.map((res, index) => {
                return <JoinCircle key={index} data={res} />;
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
              {followcircleList.map((res, index) => {
                return <FollowCircle key={index} data={res} />;
              })}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyCircle;
