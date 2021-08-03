import React, { Component } from "react";
import axios from "axios";
import TasksFilter from "./TasksFilter";
import Nav from "./Nav";

export default class AllTasks extends Component {

	constructor(props){
		super(props);
		this.state={
			tasksData: [],
			tasksFilter: {
				method: "",
				value: "",
			},
			tasksFilterbyDate:{
				to:"",
				from:"",
			},
			direction:false,
		};
	}

	componentDidMount(){
		this.allTasks();
	}

	allTasks = () => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		}
		axios.get("http://localhost:8000/tasks/alltasks", {
			headers:headers,
		}).then((response)=>{
			this.setState({
				tasksData : response.data.tasks ? response.data.tasks : [],
			});
		}).catch((error)=>{
			alert(error);
		})
	}

	onChangeHandler = (e) => {
		const { tasksFilter } = this.state;
		tasksFilter[e.target.name] = e.target.value;
		this.setState({tasksFilter});
	}

	filterTasks = (e) => {
		e.preventDefault();
		const config = {
			headers: {'Authorization': 'bearer ' + localStorage.getItem('token')},
			params:this.state.tasksFilter
		};
		axios.get("http://localhost:8000/tasks/filter",config).then((response)=>{
			this.setState({
				tasksData : response.data.tasks ? response.data.tasks : [],
			});
		}).catch((error)=>{
			console.log(error.response);
		})
	}

	filterTasksbyDate = (e, data) => {
		e.preventDefault();
		const config = {
			headers: {'Authorization': 'bearer ' + localStorage.getItem('token')},
			params:data
		};
		axios.get("http://localhost:8000/tasks/filterdate",config).then((response)=>{
			this.setState({
				tasksData : response.data.tasks ? response.data.tasks : [],
			});
		}).catch((error)=>{
			console.log(error.response);
		})
	}

	sortItems = (key) => {
		const items = [...this.state.tasksData];
		items.sort((a,b) => {
			if(a[key] < b[key]){
				return this.state.direction ? -1 : 1;
			}
			if(a[key] > b[key]){
				return this.state.direction ? 1 : -1;
			}
			return 0;
		});
		this.setState({
			tasksData:items
		});
		this.setState({
			direction: !this.state.direction
		});
	}

	render(){
		const { tasksData } = this.state;
		let details = [];
		if(tasksData.length){
			details = tasksData.map((task)=>{
				return(
					<tr key={task.id}>
						<td scope="row">{task.title}</td>
						<td scope="row">{task.description}</td>
						<td scope="row">{task.due_date}</td>
						<td scope="row">{task.status}</td>
						<td scope="row">{task.assignee}</td>
						<td scope="row">{task.created_by}</td>
					</tr>
				);
			})
		}
		return(
			<div className="AllTasks">
				<Nav />
				<TasksFilter 
					onChangeHandler = {this.onChangeHandler}
					filterTasks = {this.filterTasks}
					filterTasksbyDate = {this.filterTasksbyDate}
					data = {this.state.tasksFilterbyDate}
					filterData = {this.state.tasksFilter}
				/>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">
								<button type="button" className="btn" onClick={() => this.sortItems('title')}>Title</button>
							</th>
							<th scope="col">
								<button type="button" className="btn" onClick={() => this.sortItems('description')}>Description</button>
							</th>
							<th scope="col">
								<button type="button" className="btn" onClick={() => this.sortItems('due_date')}>Due_Date</button>
							</th>
							<th scope="col">
								<button type="button" className="btn" onClick={() => this.sortItems('status')}>Status</button>
							</th>
							<th scope="col">
								<button type="button" className="btn" onClick={() => this.sortItems('assignee')}>Assignee</button>
							</th>
							<th scope="col">
								<button type="button" className="btn" onClick={() => this.sortItems('created_by')}>Created_by</button>
							</th>
						</tr>
					</thead>
					<tbody>
						{details}
					</tbody>
				</table>
			</div>
		);
	}
}