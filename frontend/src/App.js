import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import "./App.css"
import Home from "./components/Home";
import Game from "./components/Game";
import SignUp from "./components/SignUp";
import LoginForm from "./components/loginform";
import PublicChat from "./components/PublicChat";
function App() {
  //nav sidebar
 //Login
 //SignUp
 //Public Chat
 //Private Chat Game
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/home/:username" element={<Home/>}/> 
        <Route path="/publichat/:username" element={<PublicChat/>}/>         
        <Route path="/privategame" element={<Game/>}/>
      </Routes>
      </BrowserRouter>
    
    </div>   
  );
}

export default App;
