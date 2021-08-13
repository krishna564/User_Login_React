import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import store from "../store/Store";
import { useState } from "react";

function Nav(props) {

	const [log, setLog] = useState(true);

	const logout = () =>{
		const headers = {
			Authorization: "bearer " + localStorage.getItem('token')
		};
		axios.post("http://localhost:8000/users/logout",{},{
			headers:headers
		}).then((response)=>{
			localStorage.removeItem('token');
			setLog(false);
		}).catch((error)=>{
			console.log(error.response);
		});
	}
	const { user } = store.getState().user;
	let taskLink = [];
	if(user.roles === 'Admin'){
		taskLink = (<ul className="navbar-nav">
		                <NavLink to="/alltasks" className="nav-link">All Tasks</NavLink>
		            </ul>)
	}
	if(!log){
		return (<Redirect to="/samplelogin" />);
 	}
	return(
		<nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
		  <div className="container-fluid">
		        <div className="collapse navbar-collapse" id="navbarContent">
		        	<ul className="navbar-nav">
		                <NavLink to="/" exact activeClassName="active" className="nav-link">Home</NavLink>
		            </ul>
		            <ul className="navbar-nav">
		                <NavLink to="/dashboard" activeClassName="active" className="nav-link">Dashboard</NavLink>
		            </ul>
		            <ul className="navbar-nav">
		                <NavLink to="/atasks" activeClassName="active" className="nav-link">Assigned Tasks</NavLink>
		            </ul>
		            <ul className="navbar-nav">
		                <NavLink to="/ctasks" activeClassName="active" className="nav-link">Created Tasks</NavLink>
		            </ul>
		            {taskLink}
		            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
		                <NavLink to="/list" activeClassName="active" className="nav-link">Users</NavLink>
		            </ul>
		            <ul className="navbar-nav">
		                <li className="nav-item">
		                    <button className="btn btn-dark" onClick={logout}> Logout </button>
		                </li>
		            </ul>
		        </div>
		    </div>
		</nav>
	);
}

export default Nav;

