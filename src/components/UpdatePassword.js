import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";


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

	submitHandler = (e) => {
		e.preventDefault();
		console.log(this.state.data);
		axios.post("http://localhost:8000/password/reset", this.state.data)
		    .then((response) => {
		    	this.setState({
		    		data:{
		    			token:"",
		    			email:"",
		    			password:"",
		    			password_confirmation:"",
		    		},
		    		msg:"",
		    		msg_email:"",
		    		msg_password:"",
		    		redirect:true,
		    	})
		    }).catch((error)=>{
		    	if(error.response.status === 400){
		    		this.setState({msg:"Invalid user or Invaild Token"});
		    	}
		    	if(error.response.status === 422){
		    		this.setState({
						msg_email:JSON.parse(JSON.stringify(error.response.data.email)),
						msg_password:JSON.parse(JSON.stringify(error.response.data.password)),
						msg_token:JSON.parse(JSON.stringify(error.response.data.token)),
					});
		    	}
		    });
	}

	render(){
		if(this.state.redirect){
			return(<Redirect to="/login" />);
		}
		return(
			<div>
				<form className="form-signin">
		        	<h3>Update Password</h3>
			        <div className="form-label-group">
			          <input type="text" name="token" id="inputToken" className="form-control" placeholder="Token" required 
			           onChange={this.onChangeHandler} />
			          <label htmlFor="inputToken">Token</label>
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

			      <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.submitHandler}>Update</button>
			      <p> Don't have account?<Link to="/register" className="ml-4 link"> Register</Link></p>
			    </form>
			    <span>{this.state.msg}</span>
			    <span>{this.state.msg_email}</span>
			    <span>{this.state.msg_password}</span>
			</div>

		);
	}
}