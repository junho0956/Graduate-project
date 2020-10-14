import React, { useState, useMemo, useCallback } from "react";
import "../csss/Search.css";
import colonyImg from "../img/colony.PNG";

const SearchItem = ({ list }) => {
  return (
    <div className="searchItem">
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

const Search = () => {
  const [list, setList] = useState({
    name: "colony",
    picture: colonyImg,
    information: {
      school: "Dong-A Univ",
      location: "Pusan",
      what: "security",
    },
  });

  return (
    <div className="searchbasic">
      <div className="searchHead">
        <input id="searchInput" type="text" placeholder="동아리 찾기..." />
      </div>
      <div className="searchList">
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
        <SearchItem list={list} />
      </div>
    </div>
  );
};

export default Search;
