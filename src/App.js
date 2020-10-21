import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Login, Home, Navigator } from "./components";

function App() {
  const [MenuState, setMenuState] = useState([
    { name: "menuhome", checked: false },
    { name: "menusearch", checked: false },
    { name: "menumycircle", checked: false },
    { name: "menuprofile", checked: false },
  ]);

  const [homeState, setHomeState] = useState({
    clicked: false,
    circleName: "",
  });

  const handleChangeMenuTab = (menu, home) => {
    console.log("app 컴포넌트 재렌더링!");
    setHomeState(home);
    setMenuState(menu);
  };

  return (
    <div className="Appbasic">
      <div className="navi">
        <Navigator
          menuState={MenuState}
          homeState={homeState}
          handleChangeMenuTabFromApp={handleChangeMenuTab}
        />
      </div>
      <div className="Root">
        <Router>
          <Route exact path="/">
            <Home
              menuState={MenuState}
              homeState={homeState}
              handleChangeFeedFromApp={handleChangeMenuTab}
            />
          </Route>
          <Route path="/home" component={Login} />
        </Router>
      </div>
    </div>
  );
}

export default App;
