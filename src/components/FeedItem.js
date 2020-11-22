import React,{useState, useEffect} from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import axios from 'axios';
import {slider} from '../function/slider';
import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

const setCommentCss = () => {
  const commentbutton = document.querySelector('.commentButton');
  const textarea = document.querySelector('.feedComment textarea');

  textarea.addEventListener('focus', function(){
    commentbutton.style.cssText="display:flex; flex-direction:row; position:relative; width:100%; justify-content:flex-end;";
    commentbutton.children[0].style.cssText= "width:5rem; height: 2rem; cursor:pointer; border:none; font-size:0.9rem; color:grey; margin:0.5rem; background-color:transparent;";
    commentbutton.children[1].style.cssText= "width:5rem; height: 2rem; cursor:pointer; border:none; border-radius:3px; font-size:0.9rem; color:lightgrey; background-color:blue; margin:0.5rem;"
  })

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

  const inputComment = (e) => {
    setWritecomment(e.target.value);    
  }

  useEffect(() => setCommentCss(),[]);
  useEffect(() => {
    slider();
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
        console.log("success!", res);
        document.querySelector('.feedComment textarea').value = "";
        document.querySelector('.commentButton').style.display="none";
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
        <span className="circleName">{feed.circleName}</span>
      </div>
      <div className="pictures">
        <span className="slideButton">
          <span id="slideLeftButton">
            <BsCaretLeftFill />
          </span>
          <span id="slideRightButton">
            <BsCaretRightFill />
          </span>
        </span>
        <div id="slide" className="feedPicture">
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
          <div id="contentDate">{feed.write_Date}</div>
        </div>
        <div className="contentText">{feed.description}</div>
        <div className="contentComment">
          {feed.postComment.map((res,index) => {
            return(
              <div className="Incomment" key={index}>
                <strong>{res.author}</strong>&nbsp;&nbsp;
                {res.description}&nbsp;&nbsp;&nbsp;{res.created}
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
