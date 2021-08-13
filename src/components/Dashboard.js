import React, {Component} from "react";
import Nav from "./Nav";
import Charts from "./HighChart";
import store from "../store/Store";
import {Redirect} from "react-router-dom";
import {assigneeTasks} from "../store/actions/UserActions";
import { connect } from "react-redux";

class Dashboard extends Component{

	constructor(props){
		super(props);
		this.state={
			redirect:false,
			set_dashboard: false,
			isLoading:true,
			assignee_tasks:[],
		}
	}

	componentDidMount(){
		this.props.assigneeTasks();
	}

	componentDidUpdate(){
		if (!this.state.set_dashboard) {
			this.setState({
				set_dashboard:true,
				isLoading:false,
			})
		}
	}

	setRedirect = (e) => {
		e.preventDefault();
		this.setState({
			redirect:true,
		})
	}

	render(){
		var today = new Date();
		var todayDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate());
		const {assignee_tasks} = this.props;
		let tasks = [];
		let over_due = 0;
		let completed = 0;
		let in_progress = 0;
		let assigned = 0;
		if(assignee_tasks.length){
			tasks = assignee_tasks.map((task)=>{
				let status = "";
				var due_date = new Date(task.due_date);
				if(due_date<today && task.status !== 'completed'){
					status = "overdue";
					over_due++;
				}
				if(due_date>today && task.status === 'completed'){
					completed++;
					status = task.status;
				}
				if(due_date>today && task.status === 'assigned'){
					assigned++;
					status = task.status;
				}
				if(due_date>today && task.status === 'in-progress'){
					in_progress++;
					status = task.status;
				}
				return(
					<div key={task.id} className="task">
						<p className="status">{status}</p>
						<h4>{task.title}</h4> 
						<p>{task.description}</p>
					</div>
				);
			})
		}
		if(this.state.redirect){
			return(<Redirect to="/atasks" />)
		}
		return(
			<>
				<Nav />
				{this.state.isLoading ? (
					<h3>Loading...</h3>
				) : (
					<>
						<Charts
							over_due = {over_due}
							assigned = {assigned}
							completed = {completed}
							in_progress = {in_progress}
						/>
						<div className="dashboard" onClick={this.setRedirect}>	
							{tasks}
						</div>
					</>
				)}
				
			</>
		);
	}
}
const mapStateToProps = (state) => {
	const { assignee_tasks } = state.assignee_tasks;
	return {
		assignee_tasks
	};
};

export default connect(mapStateToProps,{assigneeTasks})(Dashboard);
