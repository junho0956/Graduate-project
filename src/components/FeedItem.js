import React,{useState, useEffect, useRef} from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import axios from 'axios';
import {slider} from './function/slider';
import {BsThreeDots, BsTrash} from 'react-icons/bs';
import {AiOutlineFire, AiTwotoneFire} from 'react-icons/ai';
import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;

const setCommentCss = () => {
  // 댓글 입력부분
  const insertComment = document.querySelectorAll('.insertComment');

  insertComment.forEach(res => {
    res.children[0].addEventListener('focus', function(){
      res.children[1].style.cssText="display:flex; flex-direction:row; position:relative; width:100%; justify-content:flex-end;";
      res.children[1].children[0].style.cssText= "width:5rem; height: 2rem; cursor:pointer; border:none; font-size:0.9rem; color:grey; margin:0.5rem; background-color:transparent;";
      res.children[1].children[1].style.cssText= "width:5rem; height: 2rem; cursor:pointer; border:none; border-radius:3px; font-size:0.9rem; color:lightgrey; background-color:blue; margin:0.5rem;"
    })
  })

  $(document).ready(function(){
      $('.insertComment textarea').on('keyup', function(e){
        $(this).css('height','auto');
        $(this).height(this.scrollHeight);
      })
  });
}

const FeedItem = ({ postData, screenState, changeScreen}) => {
  
  const [feed, setFeed] = useState(postData);
  const [writecomment, setWritecomment] = useState("");
  const cancle = "cancle", comment = 'comment';
  const [circleInfo, setcircleInfo] = useState({
    circleName : postData.circleName,
    circleProfilePhoto : postData.circleProfilePhoto
  })
  const userId = localStorage.getItem('userId');
  
  const imgRef = useRef(null);
  const Incomment = useRef(null);

  const [userLike, setUserLike] = useState(false);
  const [likeId, setLikeId] = useState(null);
  
  // 포스트 날짜
  const gettime1 = (date) => {
    const time = new Date(date);
    return `${time.getFullYear()}년 ${time.getMonth()+1}월 ${time.getDate()}일 ${time.getHours()}시 ${time.getMinutes()}분`;
  }

  // 시간차 구하기
  const gettime2 = (date) => {
    let commentTime = "";
    const time = new Date(date);
    const now = new Date();

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

  useEffect(() => {
    setCommentCss();
  },[]);

  useEffect(() => {
    slider();

    imgRef.current.childNodes.forEach(res => {
      res.children[0].style.cssText = "width:40vw; height:30vw;";
    })

    const Incomment = document.querySelectorAll('.Incomment');
    Incomment.forEach(incomment => {
      incomment.style.cssText = "position:relative; width:100%; display:flex; flex-direction:row;";
      incomment.children[0].style.cssText = "width:6vw; margin:0.3rem 0.7rem 0.3rem 0.7rem; word-break:break-all;";
      incomment.children[1].style.cssText = "width:34vw; margin:0.3rem 0.7rem 0.3rem 0.7rem; word-break:break-all;";
      incomment.children[1].children[0].style.cssText = "color:grey; font-size:0.7rem; word-break:initial;"
    });


    // console.log(Incomment.current.childNodes);
    // Incomment.current.childNodes[0].forEach(incomment => {
    //   console.log(incomment);
    //   // incomment.style.cssText = "position:relative; width:100%; display:flex; flex-direction:row;";
    //   // incomment.children[0].style.cssText = "width:6vw; margin:0.3rem 0.7rem 0.3rem 0.7rem; word-break:break-all;";
    //   // incomment.children[1].style.cssText = "width:34vw; margin:0.3rem 0.7rem 0.3rem 0.7rem; word-break:break-all;";
    //   // incomment.children[1].children[0].style.cssText = "color:grey; font-size:0.7rem; word-break:initial;"
    // })

    const property = document.querySelectorAll('.feedProperty');
    property.forEach(res => {
      res.style.cssText="transition:0.5s; cursor:pointer; position:absolute; width:2.5rem; height:2.5rem; top:50%; right:2rem; border-radius:50%; display:flex; justify-content:center; align-items:center; transform:translate(-50%, -50%); ";
      res.children[1].style.cssText = "display:none;";
      res.addEventListener('mouseenter',function(){res.style.backgroundColor = 'lightgrey';});
      res.addEventListener('mouseleave',function(){res.style.backgroundColor = 'white';});
      res.addEventListener('click',function(){
        res.children[0].style.display="none";
        res.children[1].style.cssText="cursor:pointer; position:absolute; width:2.5rem; height:2.5rem; border-radius:50%; display:flex; justify-content:center; align-items:center;";
      })
    })
    // likeId => 삭제를 위해서
    let newLikeId = feed.postLike.filter(res => res.userId === Number(userId));
    
    if(newLikeId.length>0){
      newLikeId = Number(newLikeId[0].id);
      setLikeId(newLikeId);
      setUserLike(true);
    }
  }, [feed, screenState]);

  const commentButton = btn => {

    if(btn === 'comment'){
      axios({
        method:'POST',
        url:`http://3.35.240.252:8080/posts/${feed.id}/comment`,
        headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
        data: { description: writecomment}
      })
      .then(res => {
        document.querySelector('.insertComment textarea').value = "";
        document.querySelector('.commentButton').style.display="none";
        let newFeed = {...feed};
        newFeed.postComment = newFeed.postComment.concat(res.data);
        setFeed(newFeed);
        setWritecomment("");
      })
      .catch(error => console.log("error!", error))
    }
    else if(btn === 'cancle'){
      document.querySelector('.insertComment textarea').value = "";
      document.querySelector('.commentButton').style.display="none";
      setWritecomment("");
    }
  }

  const delComment = (id) => {
    axios({
      method:"DELETE",
      url:'http://3.35.240.252:8080/delete/comment',
      data:{deleteId:id},
      headers:{'Authorization':'Bearer '+localStorage.getItem('token')}
    }).then(res => {
      let newFeed = {...feed};
      newFeed.postComment = newFeed.postComment.filter(res => res.id !== id);
      setFeed(newFeed);
    })
  }

  const delPost = () => {
    if(window.confirm("정말로 게시글을 삭제하시겠습니까?")){
      axios({
        method:"DELETE",
        url:'http://3.35.240.252:8080/delete/post',
        data:{deleteId:postData.id},
        headers:{'Authorization':'Bearer '+localStorage.getItem('token')}
      }).then(res => {
        window.location.reload();
      }).catch(error => console.log(error));
    }
  }

  const changeScreenFeed = () => {
    let newscreenState = screenState.map(res => {return{...res, checked:false}});
    newscreenState[2].checked = true;
    newscreenState[2].name = feed.circleName;
    changeScreen(newscreenState);
  }

  const clickLike = () => {
    if(!userLike){ // Like
      axios({
        method:'post',
        headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
        url:`http://3.35.240.252:8080/posts/${feed.id}/like`,
      }).then(() => {
        axios({
          method:'post',
          headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
          url:`http://3.35.240.252:8080/posts/found/${feed.id}`,
        }).then(postdata => {
          setFeed(postdata.data);
        })
      }).catch(error=>console.log(error)).catch(error => console.log(error));
    }
    else{ //UnLike

      axios({
        method:'delete',
        headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
        url:`http://3.35.240.252:8080/delete/like`,
        data:{deleteId:feed.id},
      }).then(() => {
        axios({
          method:'post',
          headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
          url:`http://3.35.240.252:8080/posts/found/${feed.id}`,
        }).then(postdata => {
          setUserLike(false);
          setLikeId(null);
          setFeed(postdata.data);
        })
      }).catch(error=>console.log(error));
    }
  }

  const nickname = localStorage.getItem('nickname');

  return (
    <div className="feedbasic">
      <div className="feedTitle">
        <div className="feedTitleInfo" onClick={changeScreenFeed}>
        <img src={circleInfo.circleProfilePhoto} />
        <span className="feedCircleName">{circleInfo.circleName}</span>
        </div>
        {feed.author === nickname ? 
          <div className="feedProperty">
            <BsThreeDots/>
            <div className="feedTrash" onClick={delPost}><BsTrash /></div>
          </div>
        :null}
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
          <ul ref={imgRef}>
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
          <div id="contentLike" onClick={clickLike}>{userLike ? <span><AiTwotoneFire /></span>: <span id="likethis"><AiOutlineFire /></span>}{feed.likeNum}</div>
          <div id="contentDate">{gettime1(feed.write_Date)}</div>
        </div>
        <div className="contentText">
            {feed.description}
        </div>
        <div ref={Incomment} className="contentComment">
          {feed.postComment.map((res,index) => {
            return(
              <div className="Incomment" key={index}>
                <div className="commentAuthor"><strong>{res.author}</strong></div>
                <div className="commentDiscription">{res.description}&nbsp;&nbsp;&nbsp;<span className="discriptionDate">{gettime2(res.write_Date)}</span>&nbsp;
                  {res.author === nickname ? <span className="delcomment" onClick={() => delComment(res.id)}>✖</span> : null}
                </div>
              </div>
            )
          })}
          <div id="commentAll">댓글 더 보기..</div>
        </div>
      </div>
      <div className="insertComment">
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
