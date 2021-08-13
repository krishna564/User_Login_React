import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import List from "./components/index";
import ResetPassword from "./components/ResetPassword";
import UpdatePassword from "./components/UpdatePassword";
import VerifyEmail from "./components/VerifyEmail";
import AssigneeTasks from "./components/AssigneeTasks";
import CreatedTasks from "./components/CreatedTasks";
import AllTasks from "./components/AllTasks";
import Dashboard from "./components/Dashboard"
import Notification from "./components/Notification";
import SampleLogin from "./components/SampleLogin";
import SampleRegister from "./components/SampleRegister";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function App() {

  const [isLogged, setIsLogged] = useState(false);

  const updateIsLogged = () => {
    setIsLogged(true);
  }

  const removeIsLogged = () => {
    setIsLogged(false);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Route path="/" exact component = {() => <Home remove={removeIsLogged} />} />
          <Route path="/login"  component = {Login} />
          <Route path="/register"  component = {Register} />
          <Route path="/list" component = {List} />
          <Route path="/email" component = {ResetPassword} />
          <Route path="/reset" component = {UpdatePassword} />
          <Route path="/verify" component = {VerifyEmail} />
          <Route path="/atasks" component = {AssigneeTasks} />
          <Route path="/ctasks" component = {CreatedTasks} />
          <Route path="/alltasks" component = {AllTasks} />
          <Route path="/dashboard" component = {Dashboard} />
          <Route path="/notification" component = {Notification} />
          <Route path="/samplelogin" component = {() => <SampleLogin isLogged={isLogged} update = {updateIsLogged} />} />
          <Route path="/sampleregister" component = {SampleRegister} />
          
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
