import React, { useEffect, useState } from "react";
import colonyImg from "../img/colony.PNG";
import "../csss/CircleInfo.css";
import axios from 'axios';
import {CirclePosts} from '../components';
import {CircleInformation} from '../model';

const WritePosting = ({cid, screenState, changeScreen}) => {
  
  const gowrite = () => {
    // console.log("screenS")
    const newscreenState = screenState.map(res => {return {...res, checked:false}});
    newscreenState[4].checked = true;
    newscreenState[4].writepostCircleID = cid;
    changeScreen(newscreenState);
  }
  
  return(
    <div className="JFbutton">
      <div onClick = {gowrite}>
        글쓰기
      </div>
    </div>
  )
}

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

const CircleJoinFollow = ({cid, state, screenState, changeScreen}) => {
  
  const changeScreenJF = (res) => changeScreen(res);

  return(
    <div>{
      state.join ? <div className="JFbutton">활동 중</div> :
      state.follow ? <div className="circleJFbutton"><CircleJoinIn/> <div className="JFbutton">팔로우 중</div></div> :
      <div className="circleJFbutton"><WritePosting cid={cid} screenState={screenState} changeScreen={changeScreenJF} /><CircleJoinIn /><CircleFollowIn /></div>
    }</div>
  )
}

const CircleInfo = ({ screenState, changeScreen }) => {
  const [circle, setCircle] = useState(CircleInformation);
  const [dataForPost, setdataForPost] = useState([]);
  
  // screenState가 바뀌면서 띄우고자 하는 동아리에 대한 정보를 name을 기준으로
  const getCircle = async() => {

    const getcircleInfo = await axios({
      method:'POST',
      url:`http://3.35.240.252:8080/circles/found2`,
      headers: {'Authorization':'Bearer '+localStorage.getItem('token')},
      data:{circleName:screenState[2].name}
    });
    const userEmail = localStorage.getItem('email');
    
    let checkUserJoinCircle = getcircleInfo.data.circleMember.filter(res => res.email === userEmail);
    let checkUserFollowCircle = getcircleInfo.data.circleFollower.filter(res => res.email === userEmail);
    checkUserJoinCircle = checkUserJoinCircle.length > 0 ? true : false;
    checkUserFollowCircle = checkUserFollowCircle.length > 0 ? true : false;
    
    const circleData = getcircleInfo.data;
    const newCircle = {
      id: circleData.id,
      name: circleData.name,
      picture: circleData.circleProfilePhoto ? circleData.circleProfilePhoto : colonyImg,
      organization: circleData.organization,
      description: circleData.description,
      category: circleData.category,
      location: circleData.place ? circleData.place : 'Busan',
      circlePost: circleData.circlePosts,
      circleMember: circleData.circleMember,
      circleFollower: circleData.circleFollower,
      circleUserCheck: {
        join : checkUserJoinCircle, 
        follow : checkUserFollowCircle
      },
    }

    const makeDataForPost = newCircle.circlePost.map(res => {
      return{
        name: newCircle.name,
        picture: newCircle.picture,
        mainPicture: ['"../img/1.jpg"', '../img/2.jpg', '../img/3.jpg', '..img/4.jpg'],
        post: res,
      }
    })
    setCircle(newCircle);
    setdataForPost(makeDataForPost);
  }

  useEffect(() => {
    getCircle();
  }, [screenState]);

  const changeScreenCircleInfo = (res) => {
    changeScreen(res);
  }

  return (
    <div className="circleInfobasic">
      <div className="circleInfoImg">
        <img src={circle.picture} />
      </div>
      <div className="circleInfoTitle">
        <div className="circleInfoName">{circle.name}</div>
        <div className="circleInfoCheckUser">
          <CircleJoinFollow cid={circle.id} state={circle.circleUserCheck} screenState={screenState} changeScreen={changeScreenCircleInfo}/>
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
        <div>
          <CirclePosts screenState={screenState} postdata={dataForPost} screenState={screenState} changeScreen={changeScreenCircleInfo}/>
        </div>
      </div>
    </div>
  );
};

export default CircleInfo;
