import React, { useState, useEffect } from "react";
import circleImg from "../img/colony.PNG";
import circleMainImg from "../img/colonyPicture.PNG";
import FeedItem from "./FeedItem";
import {slider} from '../function/slider';
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
    slider();
    // window.onload = function () {
    //   slide();
    // // };
    // $(document).ready(() => {
    //   console.log("$ join");
    //   window.onload = function () {
    //     slide();
    //   };
    // });
  },[]);

  return (
    <div>
      <div>
        {/* {A.map((res) => {
          return <FeedItem key={res} feed={feed} screenState={screenState}/>;
        })} */}
      </div>
    </div>
  );
};

export default HomeFeed;
