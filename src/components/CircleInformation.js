import React, { useState } from "react";
import colonyImg from "../img/colony.PNG";
import HomeFeed from "./HomeFeed";
import "../csss/CircleInformation.css";

const CircleInformation = ({ name }) => {
  const [circle, setCircle] = useState({
    name: "Colony",
    picture: colonyImg,
    Information: {
      school: "Dong-A Univ.",
      location: "Pusan",
      what: "Security",
    },
  });

  const A = [1, 2, 3];
  console.log("circleName : ", name);

  return (
    <div className="circleInformationBasic">
      <div className="circleInfoImg">
        <img src={colonyImg} />
      </div>
      <div className="circleInfoName">{circle.name}</div>
      <div className="circleInfos">
        <div className="circleInformations">
          <div className="circleInfomation">{circle.Information.school}</div>
          <div className="circleInfomation">{circle.Information.location}</div>
          <div className="circleInfomation">{circle.Information.what}</div>
        </div>
        <div className="circleInfopresent">
          <p>안녕하세요~ 부산 최고의 보안 동아리 {circle.name}입니다.</p>
          <p>Tel : 010-9457-4773</p>
          <p>동아대학교 승학캠퍼스 빨다404호로 오세요!</p>
        </div>
        <div className="circleFeed">
          <HomeFeed A={A} />
        </div>
      </div>
    </div>
  );
};

export default CircleInformation;
