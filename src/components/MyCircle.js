import React from "react";
import { JoinCircle, FollowCircle } from "../components";
import "../csss/MyCircle.css";

const MyCircle = () => {
  return (
    <div className="mycircleBasic">
      <div className="JoinCircle">
        <div className="JoinCircleTitle">가입한 동아리</div>
        <div className="JoinCircleList">
          <JoinCircle />
          <JoinCircle />
          <JoinCircle />
          <JoinCircle />
          <JoinCircle />
          <JoinCircle />
          <JoinCircle />
          <JoinCircle />
          <JoinCircle />
          <JoinCircle />
          <JoinCircle />
        </div>
      </div>
      <div className="FollowCircle">
        <div className="FollowCircleTitle">팔로우한 동아리</div>
        <div className="FollowCircleList">
          <FollowCircle />
          <FollowCircle />
          <FollowCircle />
          <FollowCircle />
          <FollowCircle />
          <FollowCircle />
          <FollowCircle />
          <FollowCircle />
          <FollowCircle />
          <FollowCircle />
          <FollowCircle />
        </div>
      </div>
    </div>
  );
};

export default MyCircle;
