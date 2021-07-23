import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

export default class ResetPassword extends Component{

	constructor(props){
		super(props);
		this.state = {
			data:{
				email:"",
			},
			msg:"",
			redirect:false,
		}
	}

	submitHandler = (e) => {
		e.preventDefault();
		console.log(this.state.data);
		axios.post("http://localhost:8000/password/email", this.state.data).then((response)=>{
			this.setState({
				data:{
					email:"",
				},
				msg:"Email has been sent",
				redirect:true,
			});
		}).catch((error)=>{
			if(error.response.status === 400){
				this.setState({msg:"Invalid Email"});
			}
			if(error.response.status === 422){
				this.setState({msg:JSON.parse(JSON.stringify(error.response.data.email))})
			}
		});
	}

	render(){
		if(this.state.redirect){
			return(<Redirect to="/reset" />);
		}
		return(
			<div className="container align-items-center">
				<form className="form-signin">
		        	<h3>Reset Your Password</h3>
			        <div className="form-label-group">
			          <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required 
			           onChange={(e)=>{this.setState({data: {email: e.target.value}})}} />
			          <label htmlFor="inputEmail">Email address</label>
			        </div>

			      <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.submitHandler}>Reset</button>
			      <p> Don't have account?<Link to="/register" className="ml-4 link"> Register</Link></p>
			    </form>
			    <span>{this.state.msg}</span>
			</div>
		);
	}
}