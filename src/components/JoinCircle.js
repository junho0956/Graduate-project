import React, { useState, useEffect } from "react";
import CircleImg from "../img/colony.PNG";
import "../csss/JoinCircle.css";

const JoinCircle = ({ circleState, handleChangeFeedFromMyCircle }) => {
  const [circle, setCircle] = useState({
    name: "colony",
    picture: CircleImg,
    information: {
      school: "Dong-A Univ",
      location: "Pusan",
      what: "security",
    },
  });

  const handleChange = (e) => {
    const newcircleState = { ...circleState };
    newcircleState.clicked = true;
    newcircleState.circleName = circle.name;
    handleChangeFeedFromMyCircle(newcircleState);
  };

  return (
    <div className="joincircleItem" onClick={handleChange}>
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
