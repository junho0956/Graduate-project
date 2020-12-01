import React, { useState} from "react";
import "../css/JoinCircle.css";

const JoinCircle = ({ data, screenState, changeScreen }) => {
  
  const [circle, setCircle] = useState({
    id: data.id,
    name: data.name,
    picture: data.circleProfilePhoto,
    organization: data.organization,
    place: data.place,
    category: data.category,
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
          {circle.organization}&nbsp;/&nbsp;{circle.place}
          &nbsp;/&nbsp;{circle.category}
        </div>
      </div>
    </div>
  );
};

export default JoinCircle;
