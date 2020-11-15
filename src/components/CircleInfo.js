import React, { useEffect, useState } from "react";
import colonyImg from "../img/colony.PNG";
import HomeFeed from "./HomeFeed";
import "../csss/CircleInfo.css";
import axios from 'axios';

const CircleInfo = ({ state }) => {
  const [circle, setCircle] = useState({});

  const getCircle = async() => {
    const getcircleInfo = await axios.get(`http://3.35.240.252:8080/circles/${state[2].id}`);
    const newCircle = {
      name: getcircleInfo.data.name,
      picture: colonyImg,
      organization: getcircleInfo.data.organization,
      description: getcircleInfo.data.description,
      category: getcircleInfo.data.category,
      location: 'Busan',
      circlePost: getcircleInfo.data.circlePost,
      circleMember: getcircleInfo.data.circleMember,
      circleFollower: [],
    }
    setCircle(newCircle);
  }

  useEffect(() => {
    getCircle();
  }, [state]);

  const A = [1, 2, 3];

  return (
    <div className="circleInfobasic">
      <div className="circleInfoImg">
        <img src={circle.picture} />
      </div>
      <div className="circleInfoName">{circle.name}</div>
      <div className="circleInfos">
        <div className="circleInformations">
          <div className="circleInfomation">{circle.organization}</div>
          <div className="circleInfomation">{circle.category}</div>
          <div className="circleInfomation">{circle.location}</div>
        </div>
        <div className="circleInfopresent">
          <p>{circle.description}</p>
        </div>
        <div className="circleFeed">
          <HomeFeed A={A} />
        </div>
      </div>
    </div>
  );
};

export default CircleInfo;
