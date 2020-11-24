import React, { useEffect, useState } from "react";
import "../csss/CircleInfo.css";
import axios from 'axios';
import {CirclePosts} from '../components';
import {CircleInformation} from '../model';
import {getCircleInfo} from '../function/getCircleInfo';

const WritePosting = ({cid, screenState, changeScreen}) => {
  
  const gowrite = () => {
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

const CircleJoinOut = ({cid, screenState, changeScreen}) => {
  
  useEffect(() => {
    const btn = document.querySelector("#circlejoinout");
    btn.addEventListener('mouseenter', function(){
      btn.innerHTML = '탈퇴하기';
    })
    btn.addEventListener('mouseleave', function(){
      btn.innerHTML = '활동 중';
    })
  },[cid]);
  const CircleOut = () => {
    axios({
      method:"DELETE",
      url:'http://3.35.240.252:8080/delete/myCircle',
      data:{deleteId: cid},
      headers:{'Authorization':'Bearer '+localStorage.getItem('token')}
    })
    .then(() => {
      let newscreenState = screenState.map(res => res);
      newscreenState[5].changeState++;
      changeScreen(newscreenState);
    })
    .catch(error => console.log(error));
  }

  return(
    <div className="JFbutton" id="circlejoinout"onClick={CircleOut}>활동 중</div>
  )
}

const CircleJoinIn = ({cid, screenState, changeScreen}) => {

  const signUpCircle = () => {
    
    axios({
      method:'POST',
      url:`http://3.35.240.252:8080/users/joinCircle/${cid}`,
      headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
    }).then(() => {
      let newscreenState = screenState.map(res => res);
      newscreenState[5].changeState++;
      changeScreen(newscreenState);
    }).catch(error => console.log(error))
  }

  return(
    <div className="JFbutton" onClick={signUpCircle}>
        가입하기
    </div>
  )
}

const CircleFollowOut = ({cid, screenState, changeScreen}) => {

  useEffect(() => {
    const btn = document.querySelector("#circlefollowout");
    btn.addEventListener('mouseenter', function(){
      btn.innerHTML = '팔로우 끊기';
    })
    btn.addEventListener('mouseleave', function(){
      btn.innerHTML = '팔로우 중';
    })
  },[cid]);

  const FollowOut = () => {
    axios({
      method:"DELETE",
      url:'http://3.35.240.252:8080/delete/follower',
      data:{deleteId: cid},
      headers:{'Authorization':'Bearer '+localStorage.getItem('token')}
    })
    .then(() => {
      let newscreenState = screenState.map(res => res);
      newscreenState[5].changeState++;
      changeScreen(newscreenState);
    })
    .catch(error => console.log(error));
  }

  return(
    <div className="JFbutton" id="circlefollowout"onClick={FollowOut}>팔로우 중</div>
  )
}

const CircleFollowIn = ({cid, screenState, changeScreen}) => {
  
  const followCircle = () => {
    axios({
      method:"POST",
      url:`http://3.35.240.252:8080/users/follower/${cid}`,
      headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
    }).then(() => {
      let newscreenState = screenState.map(res => res);
      newscreenState[5].changeState++;
      changeScreen(newscreenState);
    }).catch(error => console.log(error));
  }

  return(
    <div className="JFbutton" onClick={followCircle}>
      <div>
        팔로우하기
      </div>
    </div>
  )
}

const CircleJoinFollow = ({cid, state, screenState, changeScreen}) => {
  const changeScreenJF = (res) => changeScreen(res);

  return(
    <div>
    {
      state.join ? <div className="circleJFbutton"><WritePosting cid={cid} screenState={screenState} changeScreen={changeScreenJF}/><CircleJoinOut cid={cid}screenState={screenState} changeScreen={changeScreenJF}/></div> :
      state.follow ? <div className="circleJFbutton"><CircleJoinIn cid={cid} screenState={screenState} changeScreen={changeScreenJF}/> <CircleFollowOut cid={cid}screenState={screenState} changeScreen={changeScreenJF}/></div> :
      <div className="circleJFbutton"><CircleJoinIn cid={cid} screenState={screenState} changeScreen={changeScreenJF}/><CircleFollowIn cid={cid} screenState={screenState}changeScreen={changeScreenJF}/></div>
    }
    </div>
  )
}

const CircleInfo = ({ screenState, changeScreen}) => {
  const [circle, setCircle] = useState(CircleInformation);
  const [dataForPost, setdataForPost] = useState([]);

  // screenState가 바뀌면서 띄우고자 하는 동아리에 대한 정보를 name을 기준으로 가져옴
  const getCircle = async() => {
    const result = await getCircleInfo(screenState[2].name);
    if(result){
      setCircle(result.circle);
      setdataForPost(result.dataForPost);
    }
  }

  useEffect(() => {
    const navTitleName = document.querySelector('.logoClava');
    navTitleName.innerHTML = circle.name;
  })

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
        <div className="circleInfoUserCount">
          <span>멤버 : <strong>{circle.circleMember.length}</strong></span>&nbsp;&nbsp;
          <span>팔로워 : <strong>{circle.circleFollower.length}</strong></span>
        </div>
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
