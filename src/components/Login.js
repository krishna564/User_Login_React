import React, {useState, Component} from 'react';
import axios from "axios";
import { Link, Redirect, useHistory } from "react-router-dom";

export default class Login extends Component {

	constructor(props){
		super(props);
		this.state = {
			loginData:{
				email:"",
				password:"",
			},
			msg:"",
			redirect:false,
		};
	}

	onChangeHandler = (e) => {
		const { loginData } = this.state;
		loginData[e.target.name] = e.target.value;
		this.setState({ loginData })
	} 

	submitHandler = (e) => {
		e.preventDefault();
		axios.post("http://localhost:8000/users/login", this.state.loginData)
			.then((response) => {
				if (response.status === 200) {
					localStorage.setItem('token', response.data.data.token);
					this.setState({
						redirect:true,
					});
				}	
			}).catch((error) =>{
				console.log(error.response.data.message);
				this.setState({
					msg:error.response.data.message
				});
			})
	};

	componentDidUpdate(){
		setTimeout(() => this.setState({msg:""}),20000);
	}


	render(){
		if(this.state.redirect){
			return(<Redirect to="/" exact />);
		}
		return(
			<div className="container">

		      	<form className="form-signin" onSubmit={this.submitHandler}>
		        	<h1> Login </h1>
			        <div className="form-label-group">
			          <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required onChange={this.onChangeHandler} />
			          <label htmlFor="inputEmail">Email address</label>
			        </div>

			        <div className="form-label-group">
			          <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required onChange={this.onChangeHandler} />
			          <label htmlFor="inputPassword">Password</label>
			        </div>
			      <button className="btn btn-lg btn-primary btn-block button" type="submit">Log in</button>
			      <p> Don't have account? <Link to="/register" className="ml-4 link"> register </Link> or <Link to="/email" className="forgotPassword">forgot password?</Link></p>
		      </form>
		      <span>{this.state.msg}</span>
		    </div>
		);	
	}
}
