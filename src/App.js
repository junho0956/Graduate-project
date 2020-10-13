import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import { Login, Home } from "./components";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/home" component={Home} />
    </Router>
  );
}

export default App;
