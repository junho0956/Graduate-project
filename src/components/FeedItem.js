import React from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
// FeedItem

const FeedItem = ({ feed }) => {
  const circleName = feed.name;
  const circlePicture = feed.circlePicture;
  const circleMainPicture = feed.mainPicture;
  const circleMainText = feed.mainText;
  const circleComment = feed.comment;
  const circleDate = feed.circleDate;

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
