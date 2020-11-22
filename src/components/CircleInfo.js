import React, { useEffect, useState } from "react";
import colonyImg from "../img/colony.PNG";
import "../csss/CircleInfo.css";
import axios from 'axios';
import {CirclePosts} from '../components';
import {CircleInformation} from '../model';
import {getCircleInfo} from '../function/getCircleInfo';

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

  // screenState가 바뀌면서 띄우고자 하는 동아리에 대한 정보를 name을 기준으로 가져옴
  const getCircle = async() => {
    const result = await getCircleInfo(screenState[2].name);
    if(result){
      // console.log(result);
      setCircle(result.circle);
      setdataForPost(result.dataForPost);
    }
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
        <img src={circle.circleProfilePhoto} />
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
          <div className="circleInfomation">{circle.place}</div>
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
