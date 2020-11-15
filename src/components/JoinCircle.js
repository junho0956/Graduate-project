import React, { useState, useEffect } from "react";
import CircleImg from "../img/colony.PNG";
import "../csss/JoinCircle.css";

const JoinCircle = ({ data, state, changeScreen }) => {
  const [circle, setCircle] = useState({
    id: data.circleId,
    name: data.circleName,
    picture: CircleImg,
    information: {
      school: data.Information.school,
      location: data.Information.location,
      what: data.Information.what,
    },
  });

  const changeScreenJ = () => {
    const newState = state.map(res => {return{...res, checked:false}});
    newState[2].id = circle.id;
    newState[2].checked = true;
    changeScreen(newState);
  };

  return (
    <div className="joincircleItem" onClick={changeScreenJ}>
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
