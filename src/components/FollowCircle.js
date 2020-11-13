import React, { useState, useEffect } from "react";
import "../csss/FollowCircle.css";
import colonyImg from "../img/colony.PNG";

const FollowCircle = ({ data, handleChangeFeedFromMyCircle }) => {
  const [circle, setCircle] = useState([]);

  const handleChange = (e) => {
    // const newcircleState = { ...circleState };
    // newcircleState.clicked = true;
    // newcircleState.circleName = circle.name;
    // handleChangeFeedFromMyCircle(newcircleState);
  };

  return (
    <div className="followcircleItem" onClick={handleChange}>
      <img src={data.picture} />
      <div className="followcircleInfo">
        <div className="followcircleTitle">{data.name}</div>
        <div className="followcircleContents">
          {data.Information.school}&nbsp;/&nbsp;{data.Information.location}
          &nbsp;/&nbsp;{data.Information.what}
        </div>
      </div>
    </div>
  );
};

export default FollowCircle;
