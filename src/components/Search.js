import React, { useState, useEffect } from "react";
import "../csss/Search.css";

// 검색결과별 컴포넌트
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
          {searchResult.school}&nbsp;/&nbsp;{searchResult.location}
          &nbsp;/&nbsp;
          {searchResult.what}
        </span>
      </div>
    </div>
  );
};

const Search = ({ searchTotalData, screenState, changeScreen }) => {
  // 검색에 사용되는 상탯값(검색결과, 검색인풋, 동아리 리스트)
  const [searchResult, setSearchResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [circleList, setCircleList] = useState([]);

  // Home component에서 searchData 값이 바뀔때마다 circleList를 변경함
  useEffect(() => {setCircleList(searchTotalData)},[searchTotalData]);

  // 검색 Effect => input이 바뀔때마다 렌더링
  useEffect(() => {
    if (searchInput.length == 0) setSearchResult([]);
    else
    {
      const newList = circleList.filter((res) => { return res.name.toLowerCase().indexOf(searchInput.toLowerCase()) != -1 });
      setSearchResult(newList);
    }
  }, [searchInput]);

  // 인풋 state
  const SearchInput = e => setSearchInput(e.target.value);
  // 전체 스크린 관리
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
