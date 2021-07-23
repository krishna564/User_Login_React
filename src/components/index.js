import React, {useState, Component} from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import AddUser from "./addUser";
import EditUser from "./EditUser";
import Nav from "./Nav";
import Filter from "./Filter";


export default class List extends Component {
	constructor(props){
		super(props);
		this.state ={
			users:[],
			newUserData:{
				email:"",
				username:"",
				password:"",
			},
			editUserData:{
				email:"",
				username:"",
			},
			filterData:{
				method:"",
				value:"",
			},
			msg:"",
			editModal: false,
		}
	}
	
	componentDidMount(){
		this.getUsers();
	}
	getUsers(){
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};
		axios.get("http://localhost:8000/users/get/all", {
			headers:headers
		}).then((response) => {
			if(response.status === 200){
				this.setState({
					users: response.data.users.data ? response.data.users.data : [],
				});
			}
		});
	}
	

	addNewUser = () => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};
		axios.post("http://localhost:8000/users/adduser", this.state.newUserData, {
			headers:headers
		})
		.then((response) => {
			const { users } = this.state;
			const newUsers = [...users];
			newUsers.push(response.data.user);
			this.setState(
				{
					users: newUsers,
					newUserData:{
						email:"",
						username:"",
						password:"",
					},
				},
			);
		}).catch((error) => {
			console.log(error.response);
			alert("Not authorized to add User");
		});
	};

	EditUser = (e) => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};
		axios.put("http://localhost:8000/users/edit", this.state.editUserData, {
			headers:headers
		}).then((response) => {
			if(response.status === 200){
				this.setState({
					editUserData:{
						email:"",
						username:"",
					},
					editModal:false,
				});
				this.getUsers();
			}
		}).catch((error)=>{
			console.log(error.response);
			if(error.response.status === 401){
				alert("You are not authorized");
			}
		});
	}

	toggleEdit = (email) => {
		this.setState({
			editModal: !this.state.editModal,
			editUserData:{
				email:email,
				username:"",
			}
		});
	}

	onFilterChangeHandler = (e) => {
		const { filterData } = this.state;
		filterData[e.target.name] = e.target.value;
		this.setState({filterData});
	}

	filterUser = (e) => {
		e.preventDefault();
		console.log(this.state.filterData);
		const config = {
			headers: {'Authorization': 'bearer ' + localStorage.getItem('token')},
			params: this.state.filterData,
		};
		axios.get("http://localhost:8000/list", config)
		.then((response)=>{
			this.setState({
				users: response.data.users.data ? response.data.users.data : [],
			})
		}).catch((error)=>{
			console.log(error.response);
		})
	}

	delete = (id) => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};
		axios.delete("http://localhost:8000/users/delete/" + id, {
			headers:headers
		}).then((response) => {
	    	if(response.status === 200){
	    		alert("User deleted")
	    		this.getUsers();
	    	}
	    }).catch((error) =>{
	    	alert("Not authorized");
	    })
	}

	render(){
		const { users } = this.state;
		let userDetails = [];
		if(users.length){
			userDetails = users.map((user) => {
				return (
					<tr key={user.id}>
						<td scope="row">{user.id}</td>
						<td>{user.email}</td>
						<td>{user.username}</td>
						<td>
							<button type="button" size="sm" className="btn btn-success button" onClick={() => this.toggleEdit(user.email)}>Edit</button>
			                <button type="button" size="sm" className="btn btn-danger button" onClick={() => this.delete(user.id)}>Delete</button>
						</td>
					</tr>
				);
			});
		}

		return(
			<div>

				<Nav />

				<Filter 
					onChangeHandler = {this.onFilterChangeHandler}
					data = {this.filterData}
					filerUser = {this.filterUser}
				/>
				
				<AddUser
					addNewUser = {this.addNewUser}
					newUserData = {this.state.newUserData}
				 />

				 <EditUser
					EditUser = {this.EditUser}
					data = {this.state.editUserData}
					toggle = {this.toggleEdit}
					modal = {this.state.editModal}
				 />

				 <span>{this.state.msg}</span>
				 {users.length === 0 ? (
				 	<h3>No Users </h3>
				 ) : (
				 	<table className="table table-stripped">
						<thead>
							<tr>
								<th scope="col">id</th>
								<th scope="col">Email</th>
								<th scope="col">Username</th>
								<th scope="col">Actions</th>
							</tr>
						</thead>
						<tbody>{userDetails}</tbody>
					</table>
				 )}
			</div>
		);
	}
}