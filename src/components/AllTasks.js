import React, { Component } from "react";
import axios from "axios";
import TasksFilter from "./TasksFilter";
import Nav from "./Nav";
import { Redirect } from "react-router-dom";

export default class AllTasks extends Component {

	constructor(props){
		super(props);
		this.state={
			tasksData: [],
			tasksFilter: {},
			isLoading:true,
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
				isLoading:false,
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
		console.log(this.state.tasksFilter);
		e.preventDefault();
		const config = {
			headers: {'Authorization': 'bearer ' + localStorage.getItem('token')},
			params:this.state.tasksFilter
		};
		axios.get("http://localhost:8000/tasks/multifilter",config).then((response)=>{
			this.setState({
				tasksData : response.data.tasks ? response.data.tasks : [],
				isLoading : false,
			});
		}).catch((error)=>{
			console.log(error.response);
		})
	}

	setIsLoading = () => {
		this.setState({
			isLoading:true
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
		if(!localStorage.getItem('token')){
			return (<Redirect to="/samplelogin" />)
		}
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
				{this.state.isLoading ? (
					<h3>Loading...</h3>
				):(
					<>
						<TasksFilter 
							onChangeHandler = {this.onChangeHandler}
							filterTasks = {this.filterTasks}
							filterData = {this.state.tasksFilter}
							loading = {this.setIsLoading}
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
					</>
				)}
			</div>
		);
	}
}