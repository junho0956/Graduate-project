import React,{useState, useEffect} from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import axios from 'axios';
import {slider} from '../function/slider';
import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

const setCommentCss = () => {
  const feedComment = document.querySelectorAll('.feedComment');

  feedComment.forEach(res => {
    res.children[0].addEventListener('focus', function(){
      res.children[1].style.cssText="display:flex; flex-direction:row; position:relative; width:100%; justify-content:flex-end;";
      res.children[1].children[0].style.cssText= "width:5rem; height: 2rem; cursor:pointer; border:none; font-size:0.9rem; color:grey; margin:0.5rem; background-color:transparent;";
      res.children[1].children[1].style.cssText= "width:5rem; height: 2rem; cursor:pointer; border:none; border-radius:3px; font-size:0.9rem; color:lightgrey; background-color:blue; margin:0.5rem;"
    })
  })

  // textarea.addEventListener('focus', function(){
  //   commentbutton.style.cssText="display:flex; flex-direction:row; position:relative; width:100%; justify-content:flex-end;";
  //   commentbutton.children[0].style.cssText= "width:5rem; height: 2rem; cursor:pointer; border:none; font-size:0.9rem; color:grey; margin:0.5rem; background-color:transparent;";
  //   commentbutton.children[1].style.cssText= "width:5rem; height: 2rem; cursor:pointer; border:none; border-radius:3px; font-size:0.9rem; color:lightgrey; background-color:blue; margin:0.5rem;"
  // })

  $(document).ready(function(){
      $('.feedComment textarea').on('keyup', function(e){
        $(this).css('height','auto');
        $(this).height(this.scrollHeight);
      })
  })
}

const FeedItem = ({ postData, changeScreen}) => {
  const [feed, setFeed] = useState(postData);
  const [writecomment, setWritecomment] = useState("");
  const cancle = "cancle", comment = 'comment';
  
  const gettime1 = (date) => {
    const time = new Date(date);
    return `${time.getFullYear()}년 ${time.getMonth()+1}월 ${time.getDate()}일 ${time.getHours()}시 ${time.getMinutes()}분`;
  }

  const gettime2 = (date) => {
    let commentTime = "";
    const time = new Date(date);
    const now = new Date();

    // 시간차 구하기
    const subSec = now.getTime() - time.getTime();
    const sec = Math.floor(subSec/1000);
    const min = Math.floor(sec/60);
    const hour = Math.floor(min/60);
    const day = Math.floor(hour/24);
    const month = Math.floor(day/30);
    const year = Math.floor(month/12);

    if(year>0) commentTime = `${year}년 전`;
    else if(month>0) commentTime = `${month}개월 전`;
    else if(day>0) commentTime = `${day}일 전`;
    else if(hour>0) commentTime = `${hour}시간 전`;
    else if(min>0) commentTime = `${min}분 전`;
    else commentTime = `${sec}초 전`;
    return commentTime;
  }

  const inputComment = (e) => {
    setWritecomment(e.target.value);    
  }

  useEffect(() => setCommentCss(),[]);
  useEffect(() => {
    slider();

    const Incomment = document.querySelectorAll('.Incomment');
    Incomment.forEach(incomment => {
      incomment.style.cssText = "position:relative; width:100%; display:flex; flex-direction:row;";
      incomment.children[0].style.cssText = "width:6vw; margin:0.3rem 0.7rem 0.3rem 0.7rem; word-break:break-all;";
      incomment.children[1].style.cssText = "width:34vw; margin:0.3rem 0.7rem 0.3rem 0.7rem; word-break:break-all;";
      incomment.children[1].children[0].style.cssText = "color:grey; font-size:0.7rem; word-break:initial;"
    });
  }, [feed]);

  const commentButton = btn => {

    if(btn === 'comment'){
      axios({
        method:'POST',
        url:`http://3.35.240.252:8080/posts/${feed.id}/comment`,
        headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
        data: { description: writecomment}
      })
      .then(res => {
        document.querySelector('.feedComment textarea').value = "";
        document.querySelector('.commentButton').style.display="none";
        let newFeed = {...feed};
        newFeed.postComment = newFeed.postComment.concat(res.data);
        setFeed(newFeed);
        setWritecomment("");
      })
      .catch(error => console.log("error!", error))
    }
    else if(btn === 'cancle'){
      document.querySelector('.feedComment textarea').value = "";
      document.querySelector('.commentButton').style.display="none";
      setWritecomment("");
    }
  }

  return (
    <div className="feedbasic">
      <div className="feedTitle">
        <img src={feed.circleProfilePhoto} />
        <span className="feedCircleName">{feed.circleName}</span>
      </div>
      <div className="mainPictures">
        <span className="slideButton">
          <span id="slideLeftButton">
            <BsCaretLeftFill />
          </span>
          <span id="slideRightButton">
            <BsCaretRightFill />
          </span>
        </span>
        <div id="slide">
          <ul>
            {feed.postPhoto.map((res, index) => {
              return(
                <li key={index}>
                  <img src={res.photoUrl}/>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
      <div className="feedContent">
        <div className="contentTop">
          <div id="contentDate">{gettime1(feed.write_Date)}</div>
        </div>
        <div className="contentText">
            {feed.description}
        </div>
        <div className="contentComment">
          {feed.postComment.map((res,index) => {
            return(
              <div className="Incomment" key={index}>
                <div className="commentAuthor"><strong>{res.author}</strong></div>
                <div className="commentDiscription">{res.description}&nbsp;&nbsp;&nbsp;<span className="discriptionDate">{gettime2(res.write_Date)}</span></div>
              </div>
            )
          })}
          <div id="commentAll">댓글 더 보기..</div>
        </div>
      </div>
      <div className="feedComment">
        <textarea placeholder="댓글 달기.." rows="1" onChange={inputComment}></textarea>
        <div className="commentButton">
          <button onClick={() => commentButton(cancle)}>취소</button>
          <button onClick={() => commentButton(comment)}>댓글</button>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
