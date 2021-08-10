import { Link, Redirect } from "react-router-dom";
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
		                <Link to="/alltasks" className="nav-link">All Tasks</Link>
		            </ul>)
	}
	if(!log){
		return (<Redirect to="/samplelogin" />);
 	}
	return(
		<nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
		  <div className="container-fluid">
		        <div className="collapse navbar-collapse" id="navbarContent">
		        	<ul className="navbar-nav ">
		                <Link to="/" className="nav-link">Home</Link>
		            </ul>
		            <ul className="navbar-nav">
		                <Link to="/dashboard" className="nav-link">Dashboard</Link>
		            </ul>
		            <ul className="navbar-nav">
		                <Link to="/atasks" className="nav-link">Assigned Tasks</Link>
		            </ul>
		            <ul className="navbar-nav">
		                <Link to="/ctasks" className="nav-link">Created Tasks</Link>
		            </ul>
		            {taskLink}
		            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
		                <Link to="/list" className="nav-link">Users</Link>
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

