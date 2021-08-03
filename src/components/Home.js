import Nav from "./Nav";
import React, {Component} from 'react';
import axios from "axios";
import Profile from "./Profile";
import EditUser from "./EditUser";
import { connect } from "react-redux";
import { me } from "../store/actions/UserActions";


class Home extends Component {

    constructor(props){
    	super(props);
    	this.state = {
            selfEditData:{
            	email:"",
            	username:"",
            },
            modal:false,
    	} 
    }

	componentDidMount(){

		this.props.me();
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
			this.props.me();
		}).catch((error)=>{
			alert(error.response);
		})
	}


	render(){
		const { user } = this.props;
		if (user.username) {
			return(
				<div className="Home">
					<Nav />
					<h2>Hi {user.username}</h2>
					<Profile
						user = {user}
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

const mapStateToProps = (state) => {
	const { user } = state.user;
	return {
		user
	};
};
export default connect(mapStateToProps, {me})(Home);
