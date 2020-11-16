import React, { useState, useEffect } from "react";
import "../csss/Search.css";
import axios from "axios";
import colonyImg from "../img/colony.PNG";

const SearchItem = ({ list, state, changeScreen }) => {
  
  const changeScreenItem = () => {
    const newState = state.map(res => {return {...res, checked:false}});
    newState[2].name = list.name;
    newState[2].checked = true;
    changeScreen(newState);
  }

  return (
    <div className="searchItem" onClick={changeScreenItem}>
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

const Search = ({ state, changeScreen }) => {
  const [list, setList] = useState([]);
  const [searchCircleInput, setSearchCircleInput] = useState("");
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
    if (searchCircleInput.length == 0) setList([]);
    else{
      const newList = circleList.filter((res) => { return res.name.toLowerCase().indexOf(searchCircleInput.toLowerCase()) != -1 });
      setList(newList);
    }
  }, [searchCircleInput]);

  const handleSearchInput = (e) => {
    setSearchCircleInput(e.target.value);
  };

  const changeScreenSearch = (res) => {
    changeScreen(res);
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
              return <SearchItem key={index} list={res} state={state} changeScreen={changeScreenSearch} />;
            })
          : null}
      </div>
    </div>
  );
};

export default Search;
