import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import List from "./components/index";
import ResetPassword from "./components/ResetPassword";
import UpdatePassword from "./components/UpdatePassword";
import VerifyEmail from "./components/VerifyEmail";
import { BrowserRouter, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Route path="/" exact component = {() => <Home />} />
          <Route path="/login"  component = {Login} />
          <Route path="/register"  component = {Register} />
          <Route path="/list" component = {List} />
          <Route path="/email" component = {ResetPassword} />
          <Route path="/reset" component = {UpdatePassword} />
          <Route path="/verify" component = {VerifyEmail} />
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
