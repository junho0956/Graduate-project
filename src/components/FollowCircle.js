import React, { useState, useEffect } from "react";
import "../csss/FollowCircle.css";
import colonyImg from "../img/colony.PNG";

const FollowCircle = ({ homeState, handleChangeFeedFromMyCircle }) => {
  const [circle, setCircle] = useState({
    name: "colony",
    picture: colonyImg,
    Information: {
      school: "Dong-A Univ",
      location: "Pusan",
      what: "security",
    },
  });

  const handleChange = (e) => {
    const newHomeState = { ...homeState };
    newHomeState.clicked = true;
    newHomeState.circleName = circle.name;
    console.log("followitem : ", newHomeState);
    handleChangeFeedFromMyCircle(newHomeState);
  };

  return (
    <div className="followcircleItem" onClick={handleChange}>
      <img src={circle.picture} />
      <div className="followcircleInfo">
        <div className="followcircleTitle">{circle.name}</div>
        <div className="followcircleContents">
          {circle.Information.school}&nbsp;/&nbsp;{circle.Information.location}
          &nbsp;/&nbsp;{circle.Information.what}
        </div>
      </div>
    </div>
  );
};

export default FollowCircle;
