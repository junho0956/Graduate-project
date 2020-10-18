import React from "react";
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

const HomeMenuTab = () => {
  return (
    <div className="menu">
      <AiOutlineHome />
      <FiSearch />
      <AiOutlineStar />
      <HiOutlineUser />
    </div>
  );
};

export default HomeMenuTab;
