import { Link } from "react-router-dom";
import axios from "axios";


function Nav() {

	const logout = () =>{
		const headers = {
			Authorization: "bearer " + localStorage.getItem('token')
		};
		axios.post("http://localhost:8000/users/logout",{
			headers:headers
		}).then((response)=>{
			localStorage.removeItem('token');
		}).catch((error)=>{
			console.log(error.response);
		});
	}

	return(
		<nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
		  <div className="container-fluid">
		        <div className="collapse navbar-collapse" id="navbarContent">
		        	<ul className="navbar-nav">
		                <Link to="/" className="nav-link">Home</Link>
		            </ul>
		            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
		                <Link to="/list" className="nav-link">Users</Link>
		            </ul>
		            <ul className="navbar-nav">
		                <li className="nav-item">
		                    <Link to="/login" className="nav-link" onClick={logout}> Logout </Link>
		                </li>
		            </ul>
		        </div>
		    </div>
		</nav>
	);
}

export default Nav;