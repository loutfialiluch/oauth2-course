import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    axios
      .get("/api")
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="main">
      {isLoggedIn ?   <Home /> : <Login/>}
    </div>
  );
}

export default App;
