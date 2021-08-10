import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import {SubmissionError} from "redux-form";
import ResetPasswordForm from "./ResetPasswordForm";


export default class UpdatePassword extends Component {

	constructor(props){
		super(props);
		this.state = {
			data:{
				token:"",
				email:"",
				password:"",
				password_confirmation:"",
			},
			msg:"",
			msg_email:"",
			msg_password:"",
			msg_token:"",
			redirect:false,
		};
	}

	onChangeHandler = (e) => {
		const { data } = this.state;
		data[e.target.name] = e.target.value;
		this.setState({ data });
	}

	submitHandler = (values) => {
		console.log(values);
		return axios.post("http://localhost:8000/password/reset", values)
		    .then((response) => {
		    	this.setState({
		    		data:{
		    			token:"",
		    			email:"",
		    			password:"",
		    			password_confirmation:"",
		    		},
		    		redirect:true,
		    	})
		    }).catch((error)=>{
		    	console.log(error.response);
		    	if(error.response.status === 400){
		    		throw new SubmissionError({
		    			_error:"Invalid Email or Token"
		    		})
		    	}
		    	if(error.response.status === 422){
		    		if(error.response.data.token){
						throw new SubmissionError({
							token: error.response.data.token,
							_error:"Reset password failed",
						})
					}
					if(error.response.data.email){
						throw new SubmissionError({
							email: error.response.data.email,
							_error:"Reset password failed",
						})
					}
					if(error.response.data.password){
						throw new SubmissionError({
							password: error.response.data.password,
							_error:"Reset password failed",
						})
					}
		    	}
		    });
	}

	render(){
		if(this.state.redirect){
			return(<Redirect to="/login" />);
		}
		return(
			<ResetPasswordForm onSubmit = {this.submitHandler} />
		);
	}
}