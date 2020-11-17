import React, { useState, useEffect } from "react";
import circleImg from "../img/colony.PNG";
import circleMainImg from "../img/colonyPicture.PNG";
import FeedItem from "./FeedItem";
import "../csss/Feed.css";
import jQuery from "jquery";
import $ from "jquery";
window.$ = window.jQuery = jQuery;


const HomeFeed = ({ A, screenState }) => {
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

  useEffect(() => {
    const imgAll = (res) => document.querySelectorAll(res);
    const wraps = imgAll(".pictures");

    wraps.forEach((wrap) => {
      const slide = wrap.children[1]; // slide
      slide.style.cssText = "overflow:hidden; position:relative;";
      const target = slide.children[0]; // ul
      const len = target.children.length; // li size
      const button = wrap.children[0]; // left, right button
      if (len > 2) {
        const leftbutton = button.children[0];
        const rightbutton = button.children[1];
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
      } else if (len == 1) {
        const button = wrap.children[0];
        button.style.cssText = "display:none;";
      }
    });
    const slide = () => {};
    // window.onload = function () {
    //   slide();
    // // };
    // $(document).ready(() => {
    //   console.log("$ join");
    //   window.onload = function () {
    //     slide();
    //   };
    // });
  });

  return (
    <div>
      <div>
        {A.map((res) => {
          return <FeedItem key={res} feed={feed} screenState={screenState}/>;
        })}
      </div>
    </div>
  );
};

export default HomeFeed;
