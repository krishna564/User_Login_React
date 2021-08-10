import React,{Component} from 'react';
import RegisterForm from "./RegisterForm";
import axios from "axios";
import { SubmissionError } from "redux-form";
import { Redirect } from "react-router-dom";

export default class SampleRegister extends Component{
	constructor(props){
		super(props);
		this.state = {
			redirect:false,
		}
	}
	submit = (values) => {
		return axios.post("http://localhost:8000/users/register",values).then((response)=>{
			this.setState({
				redirect:true,
			})
		}).catch((error)=>{
			if(error.response.status===422){
				if (error.response.data.username) {
					throw new SubmissionError({
						username: error.response.data.username,
						_error:"User Registration failed",
					})
				}
				if (error.response.data.email) {
					throw new SubmissionError({
						email:error.response.data.email,
						_error:"User Registration failed",
					})
				}
				if (error.response.data.password) {
					throw new SubmissionError({
						password: error.response.data.password,
						_error:"User Registration failed",
					})
				}
			}
			if (error.response.status===409) {
				throw new SubmissionError({
					_error:"User Registration failed",
				})
			}
		})
	}

	render(){
		if(this.state.redirect){
			return(<Redirect to='/samplelogin' />);
		}
		return (<RegisterForm onSubmit={this.submit}/>);
	}
}