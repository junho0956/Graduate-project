import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import "./App.css";
import { Login, Home } from "./components";

function App() {
  return (
    <div className="Appbasic">
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Login} />
      </Router>
    </div>
  );
}

export default App;
