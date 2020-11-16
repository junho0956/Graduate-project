import React, { useEffect, useState } from "react";
import colonyImg from "../img/colony.PNG";
import HomeFeed from "./HomeFeed";
import "../csss/CircleInfo.css";
import axios from 'axios';

const CircleJoinIn = () => {
  return(
    <div className="JFbutton">
      <div>
        가입하기
      </div>
    </div>
  )
}

const CircleFollowIn = () => {
  return(
    <div className="JFbutton">
      <div>
        팔로우하기
      </div>
    </div>
  )
}

const CircleJoinFollow = (state) => {
  return(
    <div>
      {
      state.join ? <div className="JFbutton">활동 중</div> :
      state.follow ? <div className="circleJFbutton"><CircleJoinIn/> <div className="JFbutton">팔로우 중</div></div> :
      <div className="circleJFbutton"><CircleJoinIn /><CircleFollowIn /></div>
      }
    </div>
  )
}

const CircleInfo = ({ state }) => {
  const [circle, setCircle] = useState({});
  
  const getCircle = async() => {
    const getcircleInfo = await axios({
      method:'POST',
      url:`http://3.35.240.252:8080/circles/found`,
      headers: {'Authorization':'Bearer '+localStorage.getItem('token')},
      data:{circleName:state[2].name}
    });

    const userId = localStorage.getItem('userId');
    let userJoinCheck = getcircleInfo.data.circleMember.filter(res => res.userId === userId);
    // let userFollowCheck = getcircleInfo.data.circleFollower.filter(res => res.userId === userId);
    userJoinCheck = userJoinCheck === userId ? true : false;
    // userFollowCheck = userFollowCheck === nickname ? true : false;
    let userFollowCheck = false;
    const newCircle = {
      name: getcircleInfo.data.name,
      picture: colonyImg,
      organization: getcircleInfo.data.organization,
      description: getcircleInfo.data.description,
      category: getcircleInfo.data.category,
      location: 'Busan',
      circlePost: getcircleInfo.data.circlePost,
      circleMember: getcircleInfo.data.circleMember,
      circleFollower: [],
      circleUserCheck: {join : userJoinCheck, follow : userFollowCheck}, // join || follower
    }
    setCircle(newCircle);
  }

  useEffect(() => {
    getCircle();
  }, [state]);

  const A = [1, 2, 3];

  return (
    <div className="circleInfobasic">
      <div className="circleInfoImg">
        <img src={circle.picture} />
      </div>
      <div className="circleInfoTitle">
        <div className="circleInfoName">{circle.name}</div>
        <div className="circleInfoCheckUser">
          <CircleJoinFollow state={circle.circleUserCheck}/>
        </div>
      </div>
      <div className="circleInfos">
        <div className="circleInformations">
          <div className="circleInfomation">{circle.organization}</div>
          <div className="circleInfomation">{circle.category}</div>
          <div className="circleInfomation">{circle.location}</div>
        </div>
        <div className="circleInfopresent">
          <p>{circle.description}</p>
        </div>
        <div className="circleFeed">
          <HomeFeed A={A} />
        </div>
      </div>
    </div>
  );
};

export default CircleInfo;
