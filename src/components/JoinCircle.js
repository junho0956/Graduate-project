import React, { useState } from "react";
import CircleImg from "../img/colony.PNG";
import "../csss/JoinCircle.css";

const JoinCircle = () => {
  const [circle, setCircle] = useState({
    name: "colony",
    picture: CircleImg,
    information: {
      school: "Dong-A Univ",
      location: "Pusan",
      what: "security",
    },
  });

  return (
    <div className="joincircleItem">
      <img src={circle.picture} />
      <div className="joincircleInfo">
        <div className="circleName">{circle.name}</div>
        <div className="circleContents">
          {circle.information.school}&nbsp;/&nbsp;{circle.information.location}
          &nbsp;/&nbsp;{circle.information.what}
        </div>
      </div>
    </div>
  );
};

export default JoinCircle;
