import React, {useState, useEffect} from "react";
// import MyCircle from "./MyCircle";
import "../csss/Profile.css";
import default_profile_img from "../img/default-profile.jpg";
import axios from 'axios';

const Profile = ({ A, email, loginUser, handleChangeFeedFromHome }) => {
  const [user, setUser] = useState({
    imgCheck:false,
    organization:'',
    nickname:'',
    userPhoto:null,
    joinCircle:{},
    followCircle:{},
  })
  
  const handleChangeFeed = (e) => {
    handleChangeFeedFromHome(e);
  };

  useEffect(() => {
    const settingUser;
    axios({
      method:'GET',
      url:
    })
  },[email]);

  return (
    <div className="profilebasic">
      <div className="profileLeft">
        <div className="profileImg">
          <img src={default_profile_img}></img>
        </div>
        <div className="profileUserInfo">
          <p>닉네임</p>
          <p>소속</p>
        </div>
      </div>
      <div className="profileRight">
        <div className="profileJoinCircle">
          <p>Active</p>
        </div>
        <div className="profileFollowCircle">
          <p>Following</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
