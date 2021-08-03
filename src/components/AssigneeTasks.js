import React, { Component } from "react";
import Nav from "./Nav";
import TasksFilter from "./TasksFilter";
import { connect } from "react-redux";
import { assigneeTasks, filterTasks } from "../store/actions/UserActions";
import UpdateStatus from "./UpdateStatus"
import store from "../store/Store";
import axios from "axios";

class AsigneeTasks extends Component{

	constructor(props){
		super(props);
		this.state = {
			updateData:{
				id:"",
				status:"",
			},
			assignee_tasks:[],
			modal:false,
			tasksFilter: {
				method: "",
				value: "",
				type:"assignee",
			},
			tasksFilterbyDate:{
				to:"",
				from:"",
			},
		}
	}

	componentDidMount(){
		this.props.assigneeTasks();
		
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
				}
			});
			this.props.assigneeTasks()
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

	onChangeHandler = (e) => {
		const {tasksFilter} = this.state;
		tasksFilter[e.target.name] = e.target.value;
		this.setState({tasksFilter});
	}

	render(){
		console.log(this.state.assignee_tasks);
		const {assignee_tasks} = this.props;
		let details = [];
		if(assignee_tasks.length !== 0){
			details = assignee_tasks.map((task)=>{
				return(
					<tr key={task.id}>
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

				<UpdateStatus
					update = {this.statusUpdate}
					data = {this.state.updateData}
					modal = {this.state.modal}
					toggle = {this.toggle}
				 />

				 <TasksFilter 
					onChangeHandler = {this.onChangeHandler}
					filterTasks = {this.props.filterTasks}
					filterTasksbyDate = {this.filterTasksbyDate}
					data = {this.state.tasksFilterbyDate}
					filterData = {this.state.tasksFilter}
				/>

				{assignee_tasks.length===0 ? <h3>No Tasks for you</h3> : (
					<table className="table">
						<thead>
							<tr>
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