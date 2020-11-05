import React, { useState, useEffect } from "react";
import "../csss/Search.css";
import colonyImg from "../img/colony.PNG";

const SearchItem = ({ list, homeState, handleChangeFeedFromSearch }) => {
  const handleChangeFeed = (e) => {
    const newHomeState = { ...homeState };
    newHomeState.clicked = true;
    newHomeState.circleName = list.name;
    console.log("SearchItem 에서 " + list.name + "을 클릭");
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
  const [list, setList] = useState({
    name: "colony",
    picture: colonyImg,
    information: {
      school: "Dong-A Univ",
      location: "Pusan",
      what: "security",
    },
  });

  const handleChangeFeed = (e) => {
    console.log("Search 에서", e);
    handleChangeFeedFromHome(e);
  };
  return (
    <div className="searchbasic">
      <div className="searchHead">
        <input id="searchInput" type="text" placeholder="동아리 찾기..." />
      </div>
      <div className="searchList">
        {A.map((res) => {
          return (
            <SearchItem
              list={list}
              key={res}
              homeState={homeState}
              handleChangeFeedFromSearch={handleChangeFeed}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
