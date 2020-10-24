import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import "./App.css";
import { Login, Home, Navigator } from "./components";

// import jQuery from "jquery";
// import $ from "jquery";
// window.$ = window.jQuery = jQuery;

function App() {
  const [MenuState, setMenuState] = useState([
    { name: "menuhome", checked: false },
    { name: "menusearch", checked: false },
    { name: "menuprofile", checked: false },
  ]);

  const [circleState, setCircleState] = useState({
    clicked: false,
    circleName: "",
  });

  const handleChangeFeed = (menu, home) => {
    setCircleState(home);
    setMenuState(menu);
  };

  return (
    <div className="Appbasic">
      <div className="navi">
        <Navigator
          menuState={MenuState}
          circleState={circleState}
          handleChangeFeedFromApp={handleChangeFeed}
        />
      </div>
      <div className="Root">
        <Router>
          <Route exact path="/">
            <Home
              menuState={MenuState}
              circleState={circleState}
              handleChangeFeedFromApp={handleChangeFeed}
            />
          </Route>
          <Route path="/home" component={Login} />
        </Router>
      </div>
    </div>
  );
}

export default App;
