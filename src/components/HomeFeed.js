import React, { useState, useEffect } from "react";
import FeedItem from "./FeedItem";
import {slider} from '../function/slider';
import "../csss/Feed.css";
import {getCircleInfo} from '../function/getCircleInfo';

const HomeFeed = ({ userCircleList, screenState, changeScreen }) => {
  const [feed, setFeed] = useState([]);

  /**
   * 홈피드를 구현하기 위해서는
   * 가입한 동아리/ 팔로우한 동아리에 대한 모든 포스트를 가져와서
   * 시간순으로 정렬한 후에 FeedItem을 통해서 보여줘야 한다.
   * FeedItem 에 필요한 정보는 function/getCircleInfo 에 동아리 이름을 파라미터로 넘기면
   * 그 동아리에 대한 모든 피드를 가져올 수 있고,
   * 가져온 모든 피드에 대해서 write_Data 변수를 통해 객체 내부 모든피드를 정렬한 후,
   * FeedItem을 Mapping!
   */
  const getUserAllFeed = async() => {
    // 가입한 동아리에서 각 동아리 이름을 가지고 동아리 피드에 대한 정보를 가져온다.
    const joinAllFeed = await Promise.all(
      userCircleList.joincircle.map(async res => {
        return await getCircleInfo(res.circleName);
      })
    )
    const followAllFeed = await Promise.all(
      userCircleList.followcircle.map(async(res) => {
        return await getCircleInfo(res.circleName);
      })
    )
    
    let makeAllFeed = [];
    joinAllFeed.forEach(res => {
      return res.dataForPost.forEach(res => {
        makeAllFeed = makeAllFeed.concat(res);
      })
    });
    followAllFeed.forEach(res => {
      return res.dataForPost.forEach(res => {
        makeAllFeed = makeAllFeed.concat(res);
      })
    });

    makeAllFeed.sort(function(a,b){return a.id - b.id})
    makeAllFeed.reverse();
    setFeed(makeAllFeed);
  }

  useEffect(() => {
    getUserAllFeed();
  }, [userCircleList]);
  useEffect(() => slider(),[feed]);

  return (
    <div>
      <div>
        {feed.map((res, index) => {
          return <FeedItem key={index} postData={res} screenState={screenState} changeScreen={changeScreen}/>;
        })}
      </div>
    </div>
  );
};

export default HomeFeed;
