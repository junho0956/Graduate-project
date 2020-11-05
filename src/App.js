import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import "./App.css";
import { Login, Home } from "./components";

// import jQuery from "jquery";
// import $ from "jquery";
// window.$ = window.jQuery = jQuery;

function App() {
  useEffect(() => {});

  return (
    <div className="Appbasic">
      <div className="Root">
        <Router>
          <Route exact path="/" component={Login} />
          <Route path="/home">
            <Home />
          </Route>
        </Router>
      </div>
    </div>
  );
}

export default App;
