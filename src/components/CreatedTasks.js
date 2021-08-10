import React, { Component } from "react";
import axios from "axios";
import Nav from "./Nav";
import { connect } from "react-redux";
import { createdTasks, filterTasks } from "../store/actions/UserActions";
import UpadateTask from "./UpdateTask";
import CreateTask from "./CreateTask";
import store from "../store/Store"
import TasksFilter from "./TasksFilter";
import { Redirect } from "react-router-dom";

class CreatedTasks extends Component {

	constructor(props){
		super(props);
		this.state={
			modal:false,
			editData:{
				id:"",
			},
			modalAdd:false,
			isLoading:true,
			set_created:false,
			created_tasks:[],
			createData:{
				title:"",
				description:"",
				due_date:"",
				assignee:"",
			},
			tasksFilter:{
				method:"",
				value:"",
				type:'created_by',
			},
			multiDelete:[],
		}
	}

	componentDidMount(){
		this.props.createdTasks();
	}

	componentDidUpdate(){
		if(!this.state.set_created){
			this.setState({
				created_tasks:store.getState().created_tasks,
				set_created:true,
				isLoading:false,
			})
		}
	}

	delete = (id) => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};
		axios.delete("http://localhost:8000/tasks/delete/" + id,{
			headers:headers
		}).then((response) => {
			alert("task deleted");
			this.props.createdTasks();
		}).catch((error)=>{
			alert(error.response);
		});		
	}

	toggle = (id,title,description,due_date) => {
		this.setState({
			modal: !this.state.modal,
			editData:{
				id:id,
				title:title,
				description:description,
				due_date:due_date,
			}
		})
	}
	toggleAdd = () => {
		this.setState({
			modalAdd: !this.state.modalAdd,	
		});
	}

	edit = () => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};
		axios.put("http://localhost:8000/tasks/updatetask",this.state.editData,{
			headers:headers
		}).then((response)=>{
			this.props.createdTasks();
			this.setState({
				isLoading:false,
			})
		}).catch((error)=>{
			alert(error.response);
		});
	}

	updateChangeHandler = (e) => {
		const {editData} = this.state;
		editData[e.target.name] = e.target.value;
		this.setState({editData});
	}

	createTask = () => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		}
		axios.post("http://localhost:8000/tasks/create", this.state.createData,{
			headers:headers
		}).then((response)=>{
			this.props.createdTasks();
		}).catch((error)=>{
			alert(error.response);
		});
	}

	onChangeHandler = (e) => {
		const {tasksFilter} = this.state;
		tasksFilter[e.target.name] = e.target.value;
		this.setState({tasksFilter})
	}

	onMultiDeleteChange = (e, id) => {
		if(e.target.checked){
			this.setState(({multiDelete}) => ({multiDelete: [...multiDelete,id]}));
		} else{
			this.setState(({multiDelete}) => ({multiDelete: multiDelete.filter(e => e !== id)}))
		}
	}

	multiDelete = () =>{
		// console.log(this.state.multiDelete);
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		}
		axios.delete("http://localhost:8000/tasks/multidelete/" + this.state.multiDelete,{
			headers:headers
		}).then((response)=>{
			this.setState({
				multiDelete:[],
			});
			this.props.createdTasks();
		}).catch((error)=>{
			alert(error.response);
		})
	}

	setIsLoading = () => {
		this.setState({
			isLoading:true
		})
	}

	render(){
		if(!localStorage.getItem('token')){
			return (<Redirect to="/samplelogin" />)
		}
		const {created_tasks} = this.props;
		let details = [];
		if(created_tasks.length){
			details = created_tasks.map((task)=>{
				return(
					<tr key={task.id}>
						<td><input type="checkbox" onChange = {(e)=>this.onMultiDeleteChange(e,task.id)} /></td>
						<td scope="row">{task.title}</td>
						<td scope="row">{task.description}</td>
						<td scope="row">{task.due_date}</td>
						<td scope="row">{task.status}</td>
						<td scope="row">
							<button type="button" size="sm" className="btn btn-primary" onClick={()=>this.toggle(task.id,task.title,task.description,task.due_date)}>Edit</button>{" "}
							<button type="button" size="sm" className="btn btn-danger" onClick={()=>this.delete(task.id)}>Delete</button>
						</td>
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
						<div>
							<button type="button" size="sm" className="btn btn-danger delete" onClick={this.multiDelete}>Delete Selected</button>
						</div>
						<CreateTask 
							modal = {this.state.modalAdd}
							create = {this.createTask}
							toggle = {this.toggleAdd}
							data = {this.state.createData}
						/>
						<UpadateTask 
							modal = {this.state.modal}
							update = {this.edit}
							data = {this.state.editData}
							toggle = {this.toggle}
							onChangeHandler = {this.updateChangeHandler}
							loading = {this.setIsLoading}
						/>
						{created_tasks.length===0 ? <h3>No Tasks for you</h3> : (
							<table className="table">
								<thead>
									<tr>
										<th scope="col"></th>
										<th scope="col">Title</th>
										<th scope="col">Description</th>
										<th scope="col">Due_Date</th>
										<th scope="col">Status</th>
										<th scope="col">Actions</th>
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
	const { created_tasks } = state.created_tasks;
	return {
		created_tasks
	};
};

export default connect(mapStateToProps, {createdTasks,filterTasks})(CreatedTasks);