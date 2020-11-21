import React,{useState} from "react";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
// FeedItem

const FeedItem = ({ screenState, changeScreen}) => {
  console.log("postData : ",screenState[3]);
  const [feed, setFeed] = useState(screenState[3].postData);

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
          {/* <div className="Incomment">
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
          </div> */}
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
