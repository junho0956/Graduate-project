import React, { useState, useEffect, useCallback } from "react";
import "../csss/Profile.css";
import default_profile_img from "../img/default-profile.jpg";
import axios from "axios";
import colony from "../img/colony.PNG";
import {UserInfo, UserCircleInfo} from '../model';

const ViewCircle = ({ screenState, data, changeScreen }) => {

  const changeScreenView = () => {
    let newscreenState = screenState.map(res => {return {...res, checked:false}});
    newscreenState[2].checked = true;
    newscreenState[2].name = data.circleName;
    changeScreen(newscreenState);
  }

  return (
    <div className="viewCirclebasic" onClick={changeScreenView}>
      <img src={colony}></img>
      {data.circleName}
    </div>
  );
};

const Profile = ({ userInfo, userCircleList, screenState, changeScreen }) => {
  const [user, setUser] = useState(UserInfo);
  const [circleInfo, setCircleInfo] = useState(UserCircleInfo);

  useEffect(() => {
    setUser(userInfo);
    setCircleInfo(userCircleList);
  }, [userInfo, userCircleList]);

  // 업로드 구현
  const profileUpdate = (e) => {
    if (e.target.files !== null) {
      const fd = new FormData();
      fd.append("data", e.target.files[0]);
      axios({
        method:"patch",
        Headers:{'Authorization':'Bearer ' + localStorage.getItem('token')},
        url:"http://3.35.240.252:8080/upload",
        data:fd,
        processData:false,
        contentType:false,
      }).then(res => {
        console.log(res);
      })
    };
  }
  const changeScreenProfile = res => changeScreen(res);

  return (
    <div className="profilebasic">
      <div className="profileLeft">
        <div className="profileImg">
          <img src={default_profile_img} />
        </div>
        <div className="profileUserInfo">
          <div>{screenState[1].name}</div>
          <div>{user.organization}</div>
        </div>
        <div className="profileUpdate">
          <input
            type="file"
            accept="image/jpeg, image/jpg"
            onChange={profileUpdate}
          />
        </div>
      </div>
      <div className="profileRight">
        <div className="profileJoinCircle">
          <p>Joining</p>
          <div className="profileJoinCircleView">
            {circleInfo.joinCircle.map((res, index) => {
              return <ViewCircle screenState={screenState} data={res} key={index} changeScreen={changeScreenProfile}/>;
            })}
          </div>
        </div>
        <div className="profileFollowCircle">
          <p>Following</p>
          <div className="profileFollowCircleView">
            {circleInfo.followCircle.map((res, index) => {
              return <ViewCircle screenState={screenState} data={res} key={index} changeScreen={changeScreenProfile}/>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
