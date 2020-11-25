import React, {useEffect, useState} from "react";
import "./App.css";
import { Login, Home } from "./components";
import getUserToken from "./Hooks/getUserToken";
// import Loader from './function/Loader';
import axios from 'axios';

// const [loading, setLoding] = useState(null);

// const httpInstance = axios.create({
//   baseURL:[],
//   timeout:10000,
// })

// useEffect(() => {

// },[]);

function App() {
  const [token, setToken] = getUserToken("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("nickname");
    localStorage.removeItem('userId');
    window.location.reload();
  };

  return (
    <div className="Appbasic">
      <div className="Root">
        {token.token !== null ? <Home handleLogoutFromApp={handleLogout} /> : <Login /> }
      </div>
    </div>
  );
}

export default App;
