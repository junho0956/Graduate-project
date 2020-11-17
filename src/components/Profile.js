import React, { useState, useEffect, useCallback } from "react";
import "../csss/Profile.css";
import default_profile_img from "../img/default-profile.jpg";
import axios from "axios";
import colony from "../img/colony.PNG";
import { getUserProfile } from "../function/getUserProfile";
import { getUserCircle } from "../function/getUserCircle";

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

const Profile = ({ screenState, changeScreen }) => {
  const [user, setUser] = useState({
    organization: "",
    userPhoto: "",
    followCircle: "",
    joinCircle: "",
  });

  const [circleInfo, setCircleInfo] = useState({
    joincircle: [],
    followcircle: [],
  });

  const getProfileAndCircle = useCallback(async () => {
    const userprofile = await getUserProfile(screenState[1].name);
    
    if (userprofile) {
      const newUserInfo = {
        organization: userprofile.organization,
        userPhoto: userprofile.userPhoto,
        followcircle: userprofile.followCircle,
        joincircle: userprofile.joinCircle,
      };

      const usercircle = await getUserCircle(userprofile);
      if (usercircle) {
        setUser(newUserInfo);
        setCircleInfo(usercircle);
      }
    }
  }, [screenState]);

  useEffect(() => {
    getProfileAndCircle();
  }, [screenState]);

  const profileUpdate = (e) => {
    if (e.target.files !== null) {
      const fd = new FormData();
      fd.append("data", e.target.files[0]);
      axios({
        method:"post",
        url:"http://3.35.240.252:8080/upload",
        data:fd,
        processData:false,
        contentType:false,
    }).then(res => {
      console.log(res);
    })
  };
}

  const changeScreenProfile = res => {
    changeScreen(res);
  }

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
            {circleInfo.joincircle.map((res, index) => {
              return <ViewCircle screenState={screenState} data={res} key={index} changeScreen={changeScreenProfile}/>;
            })}
          </div>
        </div>
        <div className="profileFollowCircle">
          <p>Following</p>
          <div className="profileFollowCircleView">
            {circleInfo.followcircle.map((res, index) => {
              return <ViewCircle screenState={screenState} data={res} key={index} changeScreen={changeScreenProfile}/>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
