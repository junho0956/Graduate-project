import React, { useState, useEffect } from "react";
import "../csss/FollowCircle.css";
import colonyImg from "../img/colony.PNG";

const FollowCircle = ({ data, handleChangeFeedFromMyCircle }) => {
  const [circle, setCircle] = useState({
    name: data.circleName,
    picture: colonyImg,
    information: {
      school: data.Information.school,
      location: data.Information.location,
      what: data.Information.what,
    },
  });

  const handleChange = (e) => {
    // const newcircleState = { ...circleState };
    // newcircleState.clicked = true;
    // newcircleState.circleName = circle.name;
    // handleChangeFeedFromMyCircle(newcircleState);
  };

  return (
    <div className="followcircleItem" onClick={handleChange}>
      <img src={circle.picture} />
      <div className="followcircleInfo">
        <div className="followcircleTitle">{circle.name}</div>
        <div className="followcircleContents">
          {circle.information.school}&nbsp;/&nbsp;{circle.information.location}
          &nbsp;/&nbsp;{circle.information.what}
        </div>
      </div>
    </div>
  );
};

export default FollowCircle;
