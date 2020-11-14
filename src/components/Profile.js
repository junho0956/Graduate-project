import React, { useState, useEffect, useCallback } from "react";
import "../csss/Profile.css";
import default_profile_img from "../img/default-profile.jpg";
import axios from "axios";
import colony from "../img/colony.PNG";
import { getUserProfile } from "../Hooks/getUserProfile";
import { getUserCircle } from "../Hooks/getUserCircle";

const ViewCircle = ({ data }) => {
  return (
    <div className="viewCirclebasic">
      <img src={colony}></img>
      {data.circleName}
    </div>
  );
};

const Profile = ({ nickname, handleChangeFeedFromHome }) => {
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

  // home state handling
  const handleChangeFeed = (e) => {
    handleChangeFeedFromHome(e);
  };

  const getProfileAndCircle = useCallback(async () => {
    const userprofile = await getUserProfile(nickname);
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
  }, [nickname]);

  useEffect(() => {
    getProfileAndCircle();
  }, [nickname]);

  return (
    <div className="profilebasic">
      <div className="profileLeft">
        <div className="profileImg">
          <img src={default_profile_img} />
        </div>
        <div className="profileUserInfo">
          <div>{nickname}</div>
          <div>{user.organization}</div>
        </div>
      </div>
      <div className="profileRight">
        <div className="profileJoinCircle">
          <p>Joining</p>
          <div className="profileJoinCircleView">
            {circleInfo.joincircle.map((res, index) => {
              return <ViewCircle data={res} key={index} />;
            })}
          </div>
        </div>
        <div className="profileFollowCircle">
          <p>Following</p>
          <div className="profileFollowCircleView">
            {circleInfo.followcircle.map((res, index) => {
              return <ViewCircle data={res} key={index} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
