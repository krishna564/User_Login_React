import Nav from "./Nav";
import React, {useState, Component} from 'react';
import axios from "axios";
import Profile from "./Profile";
import EditUser from "./EditUser";


export default class Home extends Component {

    constructor(props){
    	super(props);
    	this.state = {
            user:[],
            selfEditData:{
            	email:"",
            	username:"",
            },
            modal:false,
    	} 
    }

	componentDidMount(){

		this.me();
	}

	me = () => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};

		axios.get("http://localhost:8000/users/me", {
			headers:headers
		})
			.then((response) =>{
				if(response.status === 200){
					this.setState({
						user:JSON.parse(JSON.stringify(response.data))
					});
				}
			})
			.catch(function (error){
				console.log(error);
			})
	}

	toggle = (email) =>{
		this.setState({
			modal: !this.state.modal,
			selfEditData:{
				email:email,
				username:"",
			}
		});
	}

	onChangeHandler = (e) => {
		const { selfEditData } = this.state;
		selfEditData[e.target.name] = e.target.value;
		this.setState({selfEditData});
	}

	update = () => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};
		axios.put("http://localhost:8000/users/selfedit", this.state.selfEditData,{
			headers:headers
		}).then((response) => {
			this.setState({
				selfEditData:{
					email:"",
					username:"",
				},
				modal:false,
			});
			this.me();
		}).catch((error)=>{
			alert(error.response);
		})
	}


	render(){
		if (this.state.user.username) {
			return(
				<div className="Home">
					<Nav />
					<h2>Hi {this.state.user.username}</h2>
					<Profile
						user = {this.state.user}
						toggle = {this.toggle}
					 />
					<EditUser 
						toggle = {this.toggle}
						data = {this.state.selfEditData}
						onChangeHandler = {this.onChangeHandler}
						modal = {this.state.modal}
						EditUser = {this.update}
					/>
				</div>
			)
		}

		return(
			<div className="Home">
				<Nav />
				<h2>You are not logged in</h2>
			</div>
		);
	}
}
