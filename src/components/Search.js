import React, { useState, useEffect } from "react";
import "../csss/Search.css";
import axios from "axios";
import colonyImg from "../img/colony.PNG";

const SearchItem = ({ list, homeState, handleChangeFeedFromSearch }) => {
  const handleChangeFeed = (e) => {
    const newHomeState = { ...homeState };
    newHomeState.clicked = true;
    newHomeState.circleName = list.name;
    handleChangeFeedFromSearch(newHomeState);
  };

  return (
    <div className="searchItem" onClick={handleChangeFeed}>
      <img src={list.picture} />
      <div className="searchItemInformation">
        <span id="searchItemName">{list.name}</span>
        <span id="searchItemInfo">
          {list.information.school}&nbsp;/&nbsp;{list.information.location}
          &nbsp;/&nbsp;
          {list.information.what}
        </span>
      </div>
    </div>
  );
};

const Search = ({ A, homeState, handleChangeFeedFromHome }) => {
  const [list, setList] = useState([]);
  const [searchCircleInput, setSearchCircleInput] = useState("");
  /*
  {
    name: "colony",
    picture: colonyImg,
    information: {
      school: "Dong-A Univ",
      location: "Pusan",
      what: "security",
    },
  }
  */

  useEffect(() => {
    // get circle
    console.log("searchCircleInput : ", searchCircleInput);

    axios({
      method: "GET",
      url: `http://3.35.240.252:8080/circles/${searchCircleInput}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log("error: ", error));
  }, [searchCircleInput]);

  const handleSearchInput = (e) => {
    console.log("click : ", e.target.value);
    setSearchCircleInput(e.target.value);
  };

  const handleSearch = (e) => {
    handleChangeFeedFromHome(e);
  };
  return (
    <div className="searchbasic">
      <div className="searchHead">
        <input
          id="searchInput"
          type="text"
          placeholder="동아리 찾기..."
          onChange={handleSearchInput}
        />
      </div>
      <div className="searchList"></div>
    </div>
  );
};

export default Search;
