import React, {useState, Component} from 'react';
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class Register extends Component {

	constructor(props){
		super(props);
		this.state = {
			signupData : {
				username: "",
				email: "",
				password: "",
				password_confirmation: "",
			},
			msg_email:[],
			msg_password:[],
			msg_username:[],
			msg:"",
			redirect:false,
		};
	}



	onChangeHandler = (e) => {
		const { signupData } = this.state;
		signupData[e.target.name] = e.target.value;
		this.setState({ signupData });
	};
	submitHandler = (e) => {
		e.preventDefault();
		axios.post("http://localhost:8000/users/register", this.state.signupData)
			.then((response) => {
				if(response.status === 200){
					this.setState({
						signupData : {
							username: "",
							email: "",
							password: "",
							password_confirmation: "",
						},
						redirect:true,
					});
				}	
			}).catch((error) => {
				console.log(error.response);
				if(error.response.status === 422){
					if(error.response.data.username){
						this.setState({
							msg_username:JSON.parse(JSON.stringify(error.response.data.username)),
						})
					}
					if(error.response.data.password){
						this.setState({
							msg_password:JSON.parse(JSON.stringify(error.response.data.password)),
						})
					}
					if(error.response.data.email){
						this.setState({
							msg_email:JSON.parse(JSON.stringify(error.response.data.email)),
						});
					}
				}
				if (error.response.status === 409) {
					this.setState({
						msg:error.response.data.message
					});
				}
				
			});
	};

	render(){
		if(this.state.redirect){
			return(<Redirect to="/login" exact />);
		}
		return(
			<div className="container">
				<form className="form-signin">
		        	<h1>Register</h1>
		        	<div className="form-label-group">
			          <input type="text" name="username" id="inputUserName" className="form-control" placeholder="User Name" required 
			           onChange={this.onChangeHandler} />
			          <label htmlFor="inputUserName">User Name</label>
			        </div>

			        <div className="form-label-group">
			          <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required 
			           onChange={this.onChangeHandler} />
			          <label htmlFor="inputEmail">Email address</label>
			        </div>

			        <div className="form-label-group">
			          <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required
			           onChange={this.onChangeHandler} />
			          <label htmlFor="inputPassword">Password</label>
			        </div>

			        <div className="form-label-group">
			          <input type="password" name="password_confirmation" id="inputPasswordConfirmation" className="form-control" placeholder="Re-Password" required
			           onChange={this.onChangeHandler} />
			          <label htmlFor="inputPasswordConfirmation">Re-Password</label>
			        </div>
			      <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.submitHandler}>Register</button>
			      <p> already a member?<Link to="/login" className="ml-4 link"> Log in </Link></p>
			    </form>
			    <span>{this.state.msg_email}</span>
			    <span>{this.state.msg_password}</span>
			    <span>{this.state.msg_username}</span>
			    <span>{this.state.msg}</span>

			</div>
		);
	}
}
