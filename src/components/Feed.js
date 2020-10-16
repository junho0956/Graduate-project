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

import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

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
          "position:absolute; width:100%; display:flex; justify-content:space-between; top:50%; transform:translateY(-50%); z-index:10;";
        leftbutton.style.cssText =
          "cursor:pointer; position:absolute; left:1rem; height:1.5rem; width:1.5rem; font-size:1.25rem;";
        rightbutton.style.cssText =
          "position:absolute; text-align:right; height:1.5rem; width:1.5rem; font-size:1.25rem; right:1rem; cursor:pointer;";
        leftbutton.children[0].style.cssText =
          "border-radius:0.75rem; transform:translateY(-10%); background-color:transparent; color:lightgrey; border:1.25px solid lightgrey;";
        rightbutton.children[0].style.cssText =
          "border-radius:0.75rem; transform:translateY(-10%); background-color:transparent; color:lightgrey; border:1.25px solid lightgrey;";

        let pos = 0;
        leftbutton.style.display = "none";
        leftbutton.addEventListener("click", () => {
          if (pos > 0) {
            pos = pos - 1;
            if (pos == 0) leftbutton.style.display = "none";
            rightbutton.style.display = "inline";
          }
          target.style.marginLeft = `${-pos * 100}%`;
        });

        rightbutton.addEventListener("click", () => {
          if (pos < len - 1) {
            pos = pos + 1;
            if (pos == len - 1) rightbutton.style.display = "none";
            leftbutton.style.display = "inline";
          }
          target.style.marginLeft = `${-pos * 100}%`;
        });

        target.style.cssText = `width:calc(${
          100 * len
        }%); display:flex; transition:1s;`;
        Array.from(target.children).forEach(
          // (res) => (res.style.cssText = `width:calc(${100 / len})%;`)
          (res) => (res.style.cssText = "width:100%")
        );
      }
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
            <BsCaretLeftFill />
          </span>
          <span id="slideRightButton">
            <BsCaretRightFill />
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
