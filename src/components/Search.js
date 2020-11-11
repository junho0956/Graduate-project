import React, { useState, useEffect, useCallback } from "react";
import "../csss/Search.css";
import axios from "axios";
import colonyImg from "../img/colony.PNG";
// import useSearch from "../Hooks/useSearch";

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
  const [circleList, setCircleList] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "http://3.35.240.252:8080/circles",
    })
      .then((res) => {
        const newCircleList = res.data.map((res) => {
          return {
            name: res.name,
            picture: colonyImg,
            information: {
              school: res.organization,
              location: "Busan",
              what: res.category,
            },
          };
        });
        setCircleList(newCircleList);
      })
      .catch((error) => console.log(error));
  }, []);

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
    if (searchCircleInput.length == 0) {
      setList([]);
      return;
    }

    console.log("circleList : ", circleList);

    const newList = circleList.filter((res) => {
      return (
        res.name.toLowerCase().indexOf(searchCircleInput.toLowerCase()) != -1
      );
    });

    // console.log("newList : ", newList);
    setList(newList);
  }, [searchCircleInput]);

  const handleSearchInput = (e) => {
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
      <div className="searchList">
        {list.length >= 1
          ? list.map((res, index) => {
              return <SearchItem key={index} list={res} />;
            })
          : null}
      </div>
    </div>
  );
};

export default Search;
