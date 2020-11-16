import React, { useState, useEffect, useCallback } from "react";
import "../csss/Profile.css";
import default_profile_img from "../img/default-profile.jpg";
import axios from "axios";
import colony from "../img/colony.PNG";
import { getUserProfile } from "../Hooks/getUserProfile";
import { getUserCircle } from "../Hooks/getUserCircle";

const ViewCircle = ({ state, data, changeScreen }) => {

  const changeScreenView = () => {
    let newState = state.map(res => {return {...res, checked:false}});
    newState[2].checked = true;
    newState[2].name = data.circleName;
    changeScreen(newState);
  }

  return (
    <div className="viewCirclebasic" onClick={changeScreenView}>
      <img src={colony}></img>
      {data.circleName}
    </div>
  );
};

const Profile = ({ state, changeScreen }) => {
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
    const userprofile = await getUserProfile(state[1].name);
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
  }, [state]);

  useEffect(() => {
    getProfileAndCircle();
  }, [state]);

  const profileUpdate = (e) => {
    if (e.target.files !== null) {
      //create format data
      const fd = new FormData();
      // formdata에 key, value 추가
      fd.append("data", e.target.files[0]);
      axios({
        method:"post",
        url:"http://3.35.240.252:8080/upload",
        data:fd,
        processData:false,
        contentType:false,
    });
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
          <div>{state[1].name}</div>
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
              return <ViewCircle state={state} data={res} key={index} changeScreen={changeScreenProfile}/>;
            })}
          </div>
        </div>
        <div className="profileFollowCircle">
          <p>Following</p>
          <div className="profileFollowCircleView">
            {circleInfo.followcircle.map((res, index) => {
              return <ViewCircle state={state} data={res} key={index} changeScreen={changeScreenProfile}/>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
