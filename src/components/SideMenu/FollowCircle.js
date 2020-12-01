import React, { useState, useEffect } from "react";
import "../css/FollowCircle.css";

const FollowCircle = ({ data, sreenState, changeScreen }) => {
  const [circle, setCircle] = useState({
    id: data.id,
    name: data.name,
    picture: data.circleProfilePhoto,
    organization: data.organization,
    place: data.place,
    category: data.category,
  });

  const changeScreenF = () => {
    let newscreenState = sreenState.map(res => {return{...res, checked:false}});
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
          {circle.organization}&nbsp;/&nbsp;{circle.location}
          &nbsp;/&nbsp;{circle.category}
        </div>
      </div>
    </div>
  );
};

export default FollowCircle;
