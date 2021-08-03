import React, {Component} from "react";
import Nav from "./Nav";
import Charts from "./HighChart";
import store from "../store/Store";

export default class Dashboard extends Component{

	render(){
		var today = new Date();
		var todayDate = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + (today.getDate());
		console.log(today);
		const {assignee_tasks} = store.getState().assignee_tasks;
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
		return(
			<>
				<Nav />
				<Charts
					over_due = {over_due}
					assigned = {assigned}
					completed = {completed}
					in_progress = {in_progress}
				/>
				<div className="dashboard">	
					{tasks}
				</div>
			</>
		);
	}
}