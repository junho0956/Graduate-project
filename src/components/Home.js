import React, { useState, useEffect } from "react";
import { BrowseRouter as Link, Route, Router } from "react-router-dom";
import {
  Navigator,
  Search,
  HomeFeed,
  CircleInformation,
  Profile,
} from "../components";
import "../csss/Home.css";

const Home = () => {
  const A = [1, 2, 3];

  // navigation 을 눌렀을 때 그에 맞게 이동
  const [navState, clickNavi] = useState([
    { name: "navhome", checked: false },
    { name: "navsearch", checked: false },
    { name: "navprofile", checked: false },
  ]);

  // 검색, 프로필, 동아리 등에서 동아리 정보를 눌렀을 때 이동
  const [circleState, clickCircle] = useState({
    clicked: false,
    circleName: "",
  });

  const handleChangeFeed = (nav, circle) => {
    clickCircle(circle);
    clickNavi(nav);
  };

  return (
    <div className="homebasic">
      <div className="navi">
        <Navigator
          navState={navState}
          circleState={circleState}
          handleChangeFeedFromHome={handleChangeFeed}
        />
      </div>
      <div className="home">
        <div className="side" />
        <div className="homeMain">
          <div className="homeMainleft">
            {circleState.clicked ? (
              <CircleInformation name={circleState.circleName} />
            ) : navState[2].checked ? (
              <Profile
                A={A}
                circleState={circleState}
                handleChangeFeedFromHome={handleChangeFeed}
              />
            ) : (
              <HomeFeed A={A} />
            )}
          </div>
          <div className="homeMainright">
            <div className="homeMenuInfo">
              <Search
                A={A}
                circleState={circleState}
                handleChangeFeedFromHome={handleChangeFeed}
              />
            </div>
          </div>
        </div>
        <div className="side" />
      </div>
    </div>
  );
};

export default Home;

/*

Home 컴포넌트를 기준으로
HomeMenuTab 에서 상태값을 받는다.

HomeMenuTab 의 기본 상태값은
Home : true(default)
Search : true(default)
MyCircle : false

Search 컴포넌트에는 SearchItem의 List(검색결과값)이 있다.
그 Item을 누르면 정보를 담아서 Home 컴포넌트의 .homeMainleft 태그에 상태값을 전달해줘야 한다.
그럼 이 때는 Home:false, Search:true, MyCircle:false 가 되고 정보값에 맞는 동아리를 컴포넌트로 반환해준다.

MyCircle에는 2개의 컴포넌트가 있다.
JoinCircle, FollowCircle
이 2개 컴포넌트도 마찬가지로 Item이 있고, 선택하게 되면 SearchItem을 클릭한 것과 동일하게 작동한다.

*/
