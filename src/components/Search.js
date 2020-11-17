import React, { useState, useEffect } from "react";
import "../csss/Search.css";
import axios from "axios";
import colonyImg from "../img/colony.PNG";
import {Circle} from '../model';

const SearchItem = ({ searchResult, screenState, changeScreen }) => {
  
  const changeScreenItem = () => {
    const newscreenState = screenState.map(res => {return {...res, checked:false}});
    newscreenState[2].name = searchResult.name;
    newscreenState[2].checked = true;
    changeScreen(newscreenState);
  }

  return (
    <div className="searchItem" onClick={changeScreenItem}>
      <img src={searchResult.picture} />
      <div className="searchItemInformation">
        <span id="searchItemName">{searchResult.name}</span>
        <span id="searchItemInfo">
          {searchResult.information.school}&nbsp;/&nbsp;{searchResult.information.location}
          &nbsp;/&nbsp;
          {searchResult.information.what}
        </span>
      </div>
    </div>
  );
};

const Search = ({ screenState, changeScreen }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [circleList, setCircleList] = useState([]);

  useEffect(() => {

    axios({
      method: 'POST',
      headers:{'Authorization':'Bearer '+localStorage.getItem('token')},
      url: "http://3.35.240.252:8080/circles/all", 
    }).then((res) => {
        const newCircleList = res.data.map((res) => {
          return {
            id: res.id,
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

  useEffect(() => {
    if (searchInput.length == 0) setSearchResult([]);
    else{
      const newList = circleList.filter((res) => { return res.name.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 });
      setSearchResult(newList);
    }
  }, [searchInput]);

  const SearchInput = e => setSearchInput(e.target.value);
  const changeScreenSearch = res => changeScreen(res);

  return (
    <div className="searchbasic">

      <div className="searchHead">
        <input
          id="searchInput"
          type="text"
          placeholder="동아리 찾기..."
          onChange={SearchInput}
        />
      </div>

      <div className="searchList">
        {searchResult.length >= 1 ? searchResult.map((res, index) => {
          return <SearchItem key={index} searchResult={res} screenState={screenState} changeScreen={changeScreenSearch} />;
        }) : null}
      </div>

    </div>
  );
};

export default Search;
