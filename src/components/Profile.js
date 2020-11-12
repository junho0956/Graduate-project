import React, { useState, useEffect } from "react";
import "../csss/Profile.css";
import default_profile_img from "../img/default-profile.jpg";
import axios from "axios";
import colony from "../img/colony.PNG";
import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

const ViewCircle = ({ data }) => {
  console.log("data : ", data);
  return (
    <div className="viewCirclebasic">
      <img src={colony}></img>
      {data.circleName}
    </div>
  );
};

const Profile = ({ nickname, loginUser, handleChangeFeedFromHome }) => {
  const [user, setUser] = useState({
    organization: "",
    userPhoto: null,
    followCircle: [],
    joinCircle: [],
  });

  const [followCircle, setFollowCircle] = useState([]);
  const [joinCircle, setJoinCircle] = useState([]);

  const handleChangeFeed = (e) => {
    handleChangeFeedFromHome(e);
  };

  async function getUserInfo() {
    const res = await axios({
      method: "GET",
      url: `http://3.35.240.252:8080/users/${nickname}`,
    });
    const settingUser = {
      organization: res.data.user_organization,
      userPhoto: res.data.profilePhoto,
      followCircle: res.data.followCircle,
      joinCircle: res.data.myCircle,
    };
    setUser(settingUser);

    /**
     * await는 Promise 객체는 pending 자체를 기다린 후에 반환하지만,
     * Promise 배열은 pending 을 기다리지 않고 반환하게 된다.
     * 즉 async/await만 사용해서 Promise 배열을 다룰수 없다.
     * Promise.all 은 Promise배열의 모든 값들의 promise를 기다린 후에 반환한다.
     * 중도에 거부하는 promise 객체가 있더라도 전체값을 반환한다.
     * 중도에 거부하는 promise가 발생시 즉시 중단하려면 Promise.reduce를 사용한다.
     */
    const joincircleResult = await Promise.all(
      settingUser.joinCircle.map(async (res) => {
        return await axios({
          method: "GET",
          url: `http://3.35.240.252:8080/circlesName/${res.circleName}`,
        });
      })
    );
    const followcircleResult = await Promise.all(
      settingUser.followCircle.map(async (res) => {
        return await axios({
          method: "GET",
          url: `http://3.35.240.252:8080/circlesName/${res.circleName}`,
        });
      })
    );

    const getjoinInfo = joincircleResult.map((res) => {
      return {
        circleName: res.data.name,
        circlePhoto: res.data.circleProfilePhoto,
      };
    });
    const getfollowInfo = followcircleResult.map((res) => {
      return {
        circleName: res.data.name,
        circlePhoto: res.data.circleProfilePhoto,
      };
    });
    setJoinCircle(getjoinInfo);
    setFollowCircle(getfollowInfo);
  }

  useEffect(() => {
    getUserInfo();
  }, [nickname]);

  useEffect(() => {
    if (loginUser) {
      if (user.userPhoto === null) {
        const userimg = document.querySelector(".profileImg img");
        const addimgBtn = document.querySelector(".profileImgAddButton div");
        userimg.addEventListener("mouseenter", () => {
          userimg.style.opacity = "0.3";
          addimgBtn.style.display = "block";
        });
        userimg.addEventListener("mouseleave", () => {
          userimg.style.opacity = "1";
          addimgBtn.style.display = "none";
        });
      }
    }
  }, [user]);

  return (
    <div className="profilebasic">
      <div className="profileLeft">
        <div className="profileImg">
          <img src={default_profile_img}></img>
          <div className="profileImgAddButton">
            <div>이미지 추가</div>
          </div>
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
            {joinCircle.map((res, index) => {
              return <ViewCircle key={index} data={res} />;
            })}
          </div>
        </div>
        <div className="profileFollowCircle">
          <p>Following</p>
          <div className="profileFollowCircleView">
            {followCircle.map((res, index) => {
              return <ViewCircle key={index} data={res} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
