import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Login, Home, Navigator } from "./components";

function App() {
  const [MenuState, setMenuState] = useState([
    { name: "home", checked: true },
    { name: "search", checked: true },
    { name: "mycircle", checked: false },
    { name: "profile", checked: false },
    {
      name: "feed",
      checked: false,
      circlename: "",
    },
  ]);

  const handleChangeMenuTab = (e) => {
    console.log("handleChangeMenuTab", e);
  };

  return (
    <div className="Appbasic">
      <div className="navi">
        <Navigator
          menuState={MenuState}
          handleChangeMenuTabFromApp={handleChangeMenuTab}
        />
      </div>
      <div className="Root">
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Login} />
        </Router>
      </div>
    </div>
  );
}

export default App;
