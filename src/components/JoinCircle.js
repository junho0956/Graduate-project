import React, { useState, useEffect } from "react";
import CircleImg from "../img/colony.PNG";
import "../csss/JoinCircle.css";

const JoinCircle = ({ data, screenState, changeScreen }) => {
  const [circle, setCircle] = useState({
    id: data.circleId,
    name: data.circleName,
    picture: data.circlePhoto,
    school: data.school,
    location: data.location,
    what: data.what,
  });

  const changeScreenJ = () => {
    const newscreenState = screenState.map(res => {return{...res, checked:false}});
    newscreenState[2].name = circle.name;
    newscreenState[2].checked = true;
    changeScreen(newscreenState);
  };

  return (
    <div className="joincircleItem" onClick={changeScreenJ}>
      <img src={circle.picture} />
      <div className="joincircleInfo">
        <div className="circleName">{circle.name}</div>
        <div className="circleContents">
          {circle.school}&nbsp;/&nbsp;{circle.location}
          &nbsp;/&nbsp;{circle.what}
        </div>
      </div>
    </div>
  );
};

export default JoinCircle;
