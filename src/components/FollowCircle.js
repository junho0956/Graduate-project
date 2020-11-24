import React, { useState, useEffect } from "react";
import "../csss/FollowCircle.css";

const FollowCircle = ({ data, sreenState, changeScreen }) => {
  const [circle, setCircle] = useState({
    id: data.circleId,
    name: data.circleName,
    picture: data.circlePhoto,
    school: data.school,
    location: data.location,
    what: data.what,
  });

  const changeScreenF = () => {
    const newscreenState = sreenState.map(res => {return{...res, checked:false}});
    newscreenState[2].name = circle.name;
    newscreenState[2].checked = true;
    changeScreen(newscreenState);
  };

  return (
    <div className="followcircleItem" onClick={changeScreenF}>
      <img src={circle.picture} />
      <div className="followcircleInfo">
        <div className="followcircleTitle">{circle.name}</div>
        <div className="followcircleContents">
          {circle.school}&nbsp;/&nbsp;{circle.location}
          &nbsp;/&nbsp;{circle.what}
        </div>
      </div>
    </div>
  );
};

export default FollowCircle;
