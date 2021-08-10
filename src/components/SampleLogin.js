import React from 'react'
import LoginForm from './LoginForm'
import axios from "axios";
import { SubmissionError } from 'redux-form';
import {Redirect} from "react-router-dom";

export default class SampleLogin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: false,
    }
  }
  submit = values => {
    // print the form values to the console
    return axios.post("http://localhost:8000/users/login", values).then((response)=>{
      localStorage.setItem('token', response.data.data.token);
      this.setState({
        redirect:true,
      });
    }).catch((error)=>{
      console.log(error.response);
      if (error.response.status === 401) {
        throw new SubmissionError({
          _error: 'Invalid Email or Password',
        })
      }
      if (error.response.status === 403) {
        throw new SubmissionError({
          _error: 'Verify Your Email to Login'
        })
      }
      if (error.response.status === 422) {
        if(error.response.data.email){
          throw new SubmissionError({
            email: 'Email is required',
            _error: 'Login failed!'
          })
        }
        if(error.response.data.password){
          throw new SubmissionError({
            password: 'Password is required',
            _error: 'Login failed!'
          })
        }
      } 
    })
  }
  render() {
    if(localStorage.getItem('token')){
      return(<Redirect to="/" exact />)
    }
    if(this.state.redirect){
      return (<Redirect to="/" exact />)
    }
    return <LoginForm onSubmit={this.submit} />
  }
}