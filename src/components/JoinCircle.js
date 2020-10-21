import React, { useState, useEffect } from "react";
import CircleImg from "../img/colony.PNG";
import "../csss/JoinCircle.css";

const JoinCircle = ({ homeState, handleChangeFeedFromMyCircle }) => {
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
    const newHomeState = { ...homeState };
    newHomeState.clicked = true;
    newHomeState.circleName = circle.name;
    handleChangeFeedFromMyCircle(newHomeState);
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
