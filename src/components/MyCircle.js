import React, { useEffect } from "react";
import { JoinCircle, FollowCircle } from "../components";
import "../csss/MyCircle.css";

const MyCircle = ({ A, circleState, handleChangeFeedFromProfile }) => {
  const handleChange = (e) => {
    handleChangeFeedFromProfile(e);
  };

  return (
    <div className="mycircleBasic">
      <div className="JoinCircle">
        <div className="JoinCircleTitle">가입한 동아리</div>
        <div className="JoinCircleList">
          {A.map((res) => {
            return (
              <JoinCircle
                key={res}
                circleState={circleState}
                handleChangeFeedFromMyCircle={handleChange}
              />
            );
          })}
        </div>
      </div>
      <div className="FollowCircle">
        <div className="FollowCircleTitle">팔로우한 동아리</div>
        <div className="FollowCircleList">
          {A.map((res) => {
            return (
              <FollowCircle
                key={res}
                circleState={circleState}
                handleChangeFeedFromMyCircle={handleChange}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyCircle;
