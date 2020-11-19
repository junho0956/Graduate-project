import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Navigator, HomeFeed, CircleInfo, Profile, SideMenu, FeedItem, WritePost} from "../components";
import "../csss/Home.css";

const Home = ({ handleLogoutFromApp }) => {

  const [screenState, setScreenState] = useState([
    { name: "", checked: true }, // home 0
    { name: "", checked: false }, // profile 1
    { name: "", checked: false }, // circle 2
    { postData: "", checked: false }, // feed 3
    { writepostCircleName: "", checked: false}
  ]);
  const [sidemenu, setMenuOpen] = useState(true);

  const movingSideMenu = (menuOpen) => {
    const sidemenuUl = document.querySelector(".sidemenuLoc").children[0];
    sidemenuUl.style.cssText = "transition:1s;";
    if (!menuOpen) sidemenuUl.style.marginLeft = "100%";
  };

  // useEffect(() => {
  //   axios({
  //     method:"post",
  //     url:'http://3.35.240.252:8080/circles/10/posts',
  //     description:'hello world',
  //     photoUrl: ['http://naver.com', 'http://google.com'],
  //     headers:{'Authorization':'Bearer '+localStorage.getItem('token')}
  //   })
  //   .then(res => console.log("success!", res))
  //   .catch(error => console.log(error));
  // },[])

  
  const changeScreen = (screenState, setSideMenu) => {
    setScreenState(screenState);
    if (setSideMenu !== undefined && sidemenu !== setSideMenu) {
      setMenuOpen(setSideMenu);
      movingSideMenu(setSideMenu);
    }
  };

  const handleLogout = () => handleLogoutFromApp();

  const A = [1, 2, 3];

  return (
    <div className="homebasic">
      <div className="navi">
        <Navigator
          screenState={screenState}
          sidemenu={sidemenu}
          changeScreen={changeScreen}
          handleLogoutFromHome={handleLogout}
        />
      </div>
      <div className="home">
        <div className="homeFeed">
          {screenState[0].checked ? <HomeFeed A={A} screenState={screenState}/> : 
          screenState[1].checked ? <Profile screenState={screenState} changeScreen={changeScreen} /> : 
          screenState[2].checked ? <CircleInfo screenState={screenState} changeScreen={changeScreen} /> :
          screenState[3].checked ? <FeedItem screenState={screenState} changeScreen={changeScreen} /> :
          <WritePost screenState={screenState} changeScreen={changeScreen} />
          }
        </div>
        <div className="sidemenuLoc">
          <ul>
            <li>
              <SideMenu screenState={screenState} changeScreen={changeScreen}/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
