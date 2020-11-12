import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { Login, Home } from "./components";
import getUserToken from "./Hooks/getUserToken";
// import jQuery from "jquery";
// import $ from "jquery";
// window.$ = window.jQuery = jQuery;

function App() {
  const [token, setToken] = getUserToken("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    window.location.reload();
  };

  return (
    <div className="Appbasic">
      <div className="Root">
        {token.token !== null ? (
          <Home handleLogoutFromApp={handleLogout} />
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}

export default App;
