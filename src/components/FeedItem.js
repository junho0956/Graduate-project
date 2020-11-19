import React,{useState} from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
// FeedItem

const FeedItem = ({ screenState, changeScreen}) => {
  console.log("postData : ",screenState[3]);
  const feed = {...screenState[3].postData};
  const circleName = feed.name;
  const circlePicture = feed.picture;
  const circleMainPicture = feed.mainPicture;
  const circleMainText = feed.post.description;
  const circleComment = feed.post.postComment;
  const circleDate = feed.post.write_date;
  const circleData = {
    name:feed.name,
    
  }

  return (
    <div className="feedbasic">
      <div className="feedTitle">
        <img src={circlePicture} />
        <span className="circleName">{circleName}</span>
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
            <li>
              <img src={circleMainPicture} />
            </li>
            <li>
              <img src={circleMainPicture} />
            </li>
            <li>
              <img src={circleMainPicture} />
            </li>
          </ul>
        </div>
      </div>
      <div className="feedContent">
        <div className="contentTop">
          <div id="contentDate">{circleDate}</div>
        </div>
        <div className="contentText">{circleMainText}</div>
        <div className="contentComment">
          <div className="Incomment">
            <strong>{circleComment[0].name}</strong>&nbsp;&nbsp;
            {circleComment[0].Incomment}
          </div>
          <div className="Incomment">
            <strong>{circleComment[1].name}</strong>&nbsp;&nbsp;
            {circleComment[1].Incomment}
          </div>
          <div className="Incomment">
            <strong>{circleComment[2].name}</strong>&nbsp;&nbsp;
            {circleComment[2].Incomment}
          </div>
          <div id="commentAll">댓글 모두 보기..</div>
        </div>
      </div>
      <div className="feedComment">
        <input type="text" placeholder="댓글 달기.." />
      </div>
    </div>
  );
};

export default FeedItem;
