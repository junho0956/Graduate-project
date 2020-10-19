import React, { useState, useEffect } from "react";
import "../csss/HomeMenuTab.css";
import {
  AiFillHome,
  AiOutlineHome,
  AiOutlineStar,
  AiFillStar,
} from "react-icons/ai";
import { HiUser, HiOutlineUser } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { RiSearchFill } from "react-icons/ri";

const HomeMenuTab = ({ menuState, handleChangeMenuTabFromNavigator }) => {
  const [state, setState] = useState(menuState);

  const handleOnClick = (e) => {
    console.log(e.target.id);
    // state.forEach((res) => console.log(res.name, res.checked));
    // const newState = state.map((res) =>
    //   res.name === e.target.id ? { ...res, checked: false } : res
    // );
    // console.log("newState:", newState);
    // setState(newState);
    // handleChangeMenuTabFromNavigator(newState);
  };

  const home = "home",
    search = "search",
    star = "star",
    profile = "profile";

  return (
    <div className="menu">
      <span>
        {state[0].checked ? (
          <AiFillHome id={home} onClick={handleOnClick} />
        ) : (
          <AiOutlineHome id={home} onClick={handleOnClick} />
        )}
      </span>
      <span>
        {state[1].checked ? (
          <RiSearchFill id={search} onClick={handleOnClick} />
        ) : (
          <FiSearch id={search} onClick={handleOnClick} />
        )}
      </span>
      <span>
        {state[2].checked ? (
          <AiFillStar id={star} onClick={handleOnClick} />
        ) : (
          <AiOutlineStar id={star} onClick={handleOnClick} />
        )}
      </span>
      <span>
        {state[3].checked ? (
          <HiUser id={profile} onClick={handleOnClick} />
        ) : (
          <HiOutlineUser id={profile} onClick={handleOnClick} />
        )}
      </span>
    </div>
  );
};

export default HomeMenuTab;
