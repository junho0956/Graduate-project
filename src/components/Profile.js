import React, { useState, useEffect, useCallback } from "react";
import "../csss/Profile.css";
import default_profile_img from "../img/default-profile.jpg";
import axios from "axios";
import {UserInfo, UserCircleInfo} from '../model';
import {getUserProfile} from '../function/getUserProfile';
import { getUserCircle } from '../function/getUserCircle';

const ViewCircle = ({ screenState, data, changeScreen }) => {

  const changeScreenView = () => {
    let newscreenState = screenState.map(res => {return {...res, checked:false}});
    newscreenState[2].checked = true;
    newscreenState[2].name = data.circleName;
    changeScreen(newscreenState);
  }

  return (
    <div className="viewCirclebasic" onClick={changeScreenView}>
      <img src={data.circlePhoto}></img>
      {data.circleName}
    </div>
  );
};

const Profile = ({ screenState, changeScreen }) => {
  
  const [user, setUser] = useState(UserInfo);
  const [circleInfo, setCircleInfo] = useState(UserCircleInfo);
  
  const getProfile = async() => {
    const userprofile = await getUserProfile(screenState[1].name);
    const usercircle = await getUserCircle(userprofile);
    console.log("userprofile:", userprofile);
    console.log("usercircle: ",usercircle);
    setUser(userprofile);
    setCircleInfo(usercircle);
  }

  useEffect(() => {
    getProfile();
  }, [screenState]);

  // 업로드 구현
  const profileUpdate = async(e) => {
    if (e.target.files !== null) {
      const fd = new FormData();
      fd.append("data", e.target.files[0]);
      const imageUrl = await axios({
        method:"post",
        headers:{'Authorization':'Bearer ' + localStorage.getItem('token')},
        url:"http://3.35.240.252:8080/upload",
        data:fd,
        processData:false,
        contentType:false,
      })
      const formdata = {
        name:localStorage.getItem('nickname'),
        photoUrl:imageUrl.data
      };

      axios({
        method:'patch',
        url:'http://3.35.240.252:8080/usersImg',
        data:formdata,
        headers:{'Authorization':'Bearer ' + localStorage.getItem('token')},
      })  
      .then((res) => {
        let userUpdate = {...user};
        userUpdate.userPhoto = imageUrl.data;
        setUser(userUpdate);
      }).catch(error => console.log(error));
    };
  }
  const changeScreenProfile = res => changeScreen(res);

  return (
    <div className="profilebasic">
      <div className="profileLeft">
        <div className="profileImg">
          <img src={user.userPhoto !== null ? user.userPhoto : default_profile_img} />
        </div>
        <div className="profileUserInfo">
          <div>{screenState[1].name}</div>
          <div>{user.organization}</div>
        </div>
        <div className="profileUpdate" onChange={profileUpdate}>
          <label htmlFor="userImageButton" id="userImageButtonlabel">Edit Profile</label>
          <input
            type="file"
            id="userImageButton"
            accept="image/jpeg, image/jpg"
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
