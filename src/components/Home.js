import React, { useState, useEffect } from "react";
import { BrowseRouter as Link, Route, Router } from "react-router-dom";
import {
  // Navigator,
  Search,
  HomeFeed,
  MyCircle,
  CircleInformation,
} from "../components";
import "../csss/Home.css";

const Home = ({ menuState, homeState, handleChangeFeedFromApp }) => {
  const A = [1, 2, 3];
  const [state, setState] = useState(homeState);

  const handleChangeFeed = (e) => {
    console.log("home : ", e);
    setState(e);
    handleChangeFeedFromApp(menuState, e);
  };

  useEffect(() => {
    console.log("home useEffect");
  });

  return (
    <div className="homebasic">
      <div className="home">
        <div className="side" />
        <div className="homeMain">
          <div className="homeMainleft">
            {state.clicked ? (
              <CircleInformation name={state.circleName} />
            ) : (
              <HomeFeed A={A} />
            )}
          </div>
          <div className="homeMainright">
            <div className="homeMenuInfo">
              {menuState[1].checked ? (
                <Search
                  A={A}
                  homeState={homeState}
                  handleChangeFeedFromHome={handleChangeFeed}
                />
              ) : menuState[2].checked ? (
                <MyCircle
                  A={A}
                  homeState={homeState}
                  handleChangeFeedFromHome={handleChangeFeed}
                />
              ) : (
                <Search
                  A={A}
                  homeState={homeState}
                  handleChangeFeedFromHome={handleChangeFeed}
                />
              )}
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
