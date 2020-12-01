import React from "react";
import "./App.css";
import {Home} from "./components";
import {Login} from './components/Login';

function App() {

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    localStorage.removeItem('userId');
    window.location.reload();
  };

  const usertoken = localStorage.getItem('token');

  return (
    <div className="Appbasic">
      <div className="Root">
        {usertoken !== null ? <Home handleLogoutFromApp={handleLogout} /> : <Login /> }
      </div>
    </div>
  );
}

export default App;
