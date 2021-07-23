import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";


export default class VerifyEmail extends Component{

	constructor(props){
		super(props);
		this.state = {
			token:"",
			redirect:false,
		}
	}

	submitHandler = (e) => {
		e.preventDefault();
		let token = this.state.token
		axios.get("http://localhost:8000/users/register/verification/" + token)
		.then((response)=>{
			this.setState({
				token:"",
				redirect:true,
			});
		}).catch((error)=>{
			console.log(error.response);
		})
	}

	render(){

		if (this.state.redirect) {
			return (<Redirect to="/login" />);
		}

		return(
			<form className="form-signin">
	        	<h3>Verify Email</h3>
		        <div className="form-label-group">
		          <input type="text" name="token" id="inputToken" className="form-control" placeholder="Email Token" required 
		           onChange={(e)=>{this.setState({token: e.target.value})}} />
		          <label htmlFor="inputToken">Email Token</label>
		        </div>

		      <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.submitHandler}>Submit</button>
		    </form>
		);
	}
}