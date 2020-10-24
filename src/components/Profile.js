import React from "react";
import MyCircle from "./MyCircle";
import "../csss/Profile.css";
import default_profile_img from "../img/default-profile.jpg";

const Profile = ({ A, homeState, handleChangeFeedFromHome }) => {
  const handleChangeFeed = (e) => {
    handleChangeFeedFromHome(e);
  };

  return (
    <div className="profilebasic">
      <div className="profileHeader">
        <div className="profileImg">
          <img src={default_profile_img}></img>
        </div>
        <div className="profileInfo">
          <div className="profileName">jh0956</div>
          <div className="profileBelong">DongA Univ.</div>
        </div>
      </div>
      <div className="profileCircle">
        <MyCircle
          A={A}
          homeState={homeState}
          handleChangeFeedFromProfile={handleChangeFeed}
        />
      </div>
    </div>
  );
};

export default Profile;
