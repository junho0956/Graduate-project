import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";

import circleImg from "../img/colony.PNG";
import circleMainImg from "../img/colonyPicture.PNG";
import a from "../img/colony.PNG";

import { BsCaretLeft, BsCaretRight } from "react-icons/bs";

import "../csss/Feed.css";

const FeedItem = ({ feed }) => {
  const circleName = feed.name;
  const circlePicture = feed.circlePicture;
  const circleMainPicture = feed.mainPicture;
  const circleMainText = feed.mainText;
  const circleComment = feed.comment;
  const circleDate = feed.circleDate;

  const IMG = useRef();

  useEffect(() => {
    const imgAll = (all) => document.querySelectorAll(all);
    const imgOne = (one) => document.querySelector(one);
    const slide = () => {
      const wrap = imgOne("#slide");
      wrap.style.cssText = "overflow:hidden; position:relative;";
      const target = wrap.children[0];
      const len = target.children.length;

      if (len > 2) {
        const leftbutton = imgOne("#slideLeftButton");
        const rightbutton = imgOne("#slideRightButton");
        const button = imgOne(".slideButton");
        button.style.cssText =
          "position:sticky; width:100%; display:flex; justify-content:space-between; transform:translateY(100%); z-index:10;";
        leftbutton.style.cssText =
          "cursor:pointer; position:relative; left:1rem; font-size:2rem";
        rightbutton.style.cssText =
          "position:relative; font-size:2rem; right:1rem; cursor:pointer;";
      }

      target.style.cssText = `width:calc(${100 * len}%); display:flex;`;
      Array.from(target.children).forEach(
        (res) => (res.style.cssText = `width:calc(${100 / len})%;`)
      );
    };
    window.onload = function () {
      slide();
    };
  });

  return (
    <div className="feedbasic">
      <div className="feedTitle">
        <img src={circlePicture} />
        <span className="circleName">{circleName}</span>
      </div>
      <div className="pictures">
        <span className="slideButton">
          <span id="slideLeftButton">
            <BsCaretLeft />
          </span>
          <span id="slideRightButton">
            <BsCaretRight />
          </span>
        </span>
        <div id="slide" ref={IMG} className="feedPicture">
          <ul>
            <li>
              <img src={circleMainPicture} />
            </li>
            <li>
              <img src={a} />
            </li>
            <li>
              <img src={circleMainPicture} />
            </li>
            <li>
              <img src={a} />
            </li>
          </ul>
        </div>
      </div>
      <div className="feedContent">
        <div className="contentTop">
          <i className="far fa-heart"></i>
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

const Feed = () => {
  const [feed, setFeed] = useState({
    name: "colony",
    circlePicture: circleImg,
    mainPicture: circleMainImg,
    circleDate: "2020년 10월 15일",
    mainText:
      "콜로니 동아리 여러분, 404호로 새롭게 동아리방을 옮겼습니다~ \n술 한잔 합시다 ^^",
    comment: [
      {
        name: "admin",
        Incomment: "콜로니 방이 새롭게 변경되었습니다!",
      },
      {
        name: "student1",
        Incomment: "지렸다;ㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷㄷ",
      },
      {
        name: "student2",
        Incomment: "저기서 술각임 ㄹㅇ ㅋㅋ",
      },
    ],
  });

  return (
    <div>
      <div>
        <FeedItem feed={feed} />
        <FeedItem feed={feed} />
      </div>
    </div>
  );
};

export default Feed;
