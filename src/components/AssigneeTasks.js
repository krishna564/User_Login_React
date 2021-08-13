import React, { Component } from "react";
import Nav from "./Nav";
import TasksFilter from "./TasksFilter";
import { connect } from "react-redux";
import { assigneeTasks, filterTasks } from "../store/actions/UserActions";
import UpdateStatus from "./UpdateStatus"
import MultiUpdateStatus from "./MultiUpdateStatus";
import store from "../store/Store";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Pusher from "pusher-js";

class AsigneeTasks extends Component{

	constructor(props){
		super(props);
		this.state = {
			updateData:{
				id:"",
				status:"",
			},
			modal:false,
			set_assignee:false,
			isLoading:true,
			assignee_tasks:[],
			tasksFilter: {
				method: "",
				value: "",
				type:"assignee",
			},
			tasksFilterbyDate:{
				to:"",
				from:"",
			},
			multiSelectId: [],
			multiSelectStatus: "",
			multiSelectModal:false,
		}
	}

	componentDidMount(){
		this.props.assigneeTasks();
	}

	componentDidUpdate(){
		if(!this.state.set_assignee){
			this.setState({
				assignee_tasks:store.getState().assignee_tasks,
				set_assignee:true,
				isLoading:false,
			})
		}
	}

	statusUpdate = () => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};
		axios.put("http://localhost:8000/tasks/updatestatus", this.state.updateData, {
			headers:headers
		}).then((response)=> {
			this.setState({
				updateData:{
					id:"",
					status:"",
				},
				isLoading:false,
			});
			this.props.assigneeTasks()
		});
	}

	multiUpdate = () => {
		const data = {
			'id': this.state.multiSelectId,
			'status': this.state.multiSelectStatus,
		}
		console.log(data);
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		}
		axios.put('http://localhost:8000/tasks/multiupdate', data, {
			headers:headers
		}).then((response) => {
			this.setState({
				isLoading:false
			});
			this.props.assigneeTasks();
		});
	}

	setData = (value) => {
		this.setState({
			multiSelectStatus:value,
		});
	}

	setIsLoading = () => {
		this.setState({
			isLoading:true,
		});
	}
	toggle = (id) => {
		this.setState({
			modal: !this.state.modal,
			updateData:{
				id:id,
				status:"",
			}
		});
	}

	multiSelectToggle = () => {
		this.setState({
			multiSelectModal: !this.state.multiSelectModal
		});
	}

	onChangeHandler = (e) => {
		const {tasksFilter} = this.state;
		tasksFilter[e.target.name] = e.target.value;
		this.setState({tasksFilter});
	}

	onMultiChangeHandler = (e,id) => {
		// console.log(id);
		// console.log(this.state.multiSelectId)
		if (e.target.checked) {
			this.setState(({multiSelectId}) => ({multiSelectId: [...multiSelectId,id]}));
		} else {
			this.setState(({multiSelectId}) => ({multiSelectId: multiSelectId.filter(e => e !== id)}));
		}
	}

	render(){

		// Pusher.logToConsole = true;
	 //    var pusher = new Pusher('08a315f0306a89de6525', {
	 //      cluster: 'ap2'
	 //    });
	 //    var name = 'my-channel';

	 //    var channel = pusher.subscribe('my-channel');
	 //    channel.bind('my-event', function(data) {
	 //      alert(JSON.stringify(data));
	 //      console.log(JSON.stringify(data));
	 //    });

		if(!localStorage.getItem('token')){
			return (<Redirect to="/samplelogin" />)
		}
		const {assignee_tasks} = this.props;
		// console.log(this.state.assignee_tasks);
		let updateButton = []
		if (this.state.multiSelectId.length) {
			updateButton = (<MultiUpdateStatus 
							update = {this.multiUpdate}
							data = {this.setData}
							modal = {this.state.multiSelectModal}
							toggle = {this.multiSelectToggle}
							loading = {this.setIsLoading}
						/>)
		}
		let details = [];
		if(assignee_tasks.length !== 0){
			details = assignee_tasks.map((task)=>{
				return(
					<tr key={task.id}>
						<td scope="row"> <input type="checkbox" onChange = {(e) => this.onMultiChangeHandler(e,task.id)} /> </td>
						<td scope="row">{task.title}</td>
						<td scope="row">{task.description}</td>
						<td scope="row">{task.due_date}</td>
						<td scope="row">{task.status}</td>
						<td scope="row"><button type="button" size="sm" className="btn btn-primary" onClick={() => this.toggle(task.id)}>Update</button></td>
					</tr>
				);
			});
		}
		return(
			<div className="assignee">
				<Nav />

				{this.state.isLoading ? (
					<h3>Loading...</h3>
				): (
					<>
						{updateButton}
						<UpdateStatus
							update = {this.statusUpdate}
							data = {this.state.updateData}
							modal = {this.state.modal}
							toggle = {this.toggle}
							loading = {this.setIsLoading}
						 />

						{assignee_tasks.length===0 ? <h3>No Tasks for you</h3> : (
							<table className="table">
								<thead>
									<tr>
										<th scope="col"></th>
										<th scope="col">Title</th>
										<th scope="col">Description</th>
										<th scope="col">Due_Date</th>
										<th scope="col">Status</th>
										<th scope="col">Update Status</th>
									</tr>
								</thead>
								<tbody>
									{details}
								</tbody>
							</table>
						)}
					</>
				)}

			</div>
		);
	}
}
const mapStateToProps = (state) => {
	const { assignee_tasks } = state.assignee_tasks;
	return {
		assignee_tasks
	};
};

export default connect(mapStateToProps, {assigneeTasks, filterTasks})(AsigneeTasks);