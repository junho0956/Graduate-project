import React, { useState, useEffect } from "react";
import "../csss/FollowCircle.css";
import colonyImg from "../img/colony.PNG";

const FollowCircle = ({ data, state, changeScreen }) => {
  const [circle, setCircle] = useState({
    id: data.circleId,
    name: data.circleName,
    picture: colonyImg,
    information: {
      school: data.Information.school,
      location: data.Information.location,
      what: data.Information.what,
    },
  });

  const changeScreenF = () => {
    const newState = state.map(res => {return{...res, checked:false}});
    newState[2].id = circle.id;
    newState[2].checked = true;
    changeScreen(newState);
  };

  return (
    <div className="followcircleItem" onClick={changeScreenF}>
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
