import {GET_USERS, GET_ASSIGNEE_TASKS, GET_CREATED_TASKS, GET_FILTERED_ASSIGNEE_TASKS, GET_FILTERED_CREATED_TASKS} from "../Types";
import axios from "axios";

export const me = () => {
	return dispacth => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};
		axios.get("http://localhost:8000/users/me", {
			headers:headers
		}).then((response)=>{
			const user = JSON.parse(JSON.stringify(response.data));
			dispacth(meSuccess(user));
		});
	};
};

export const assigneeTasks = () => {
	return dispacth => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};
		axios.get("http://localhost:8000/tasks/assigneelist", {
			headers:headers
		}).then((response)=>{
			const tasks = response.data.tasks ? response.data.tasks : [];
			dispacth(assigneeTaskSuccess(tasks));
		})
	}
}

export const createdTasks = () => {
	return dispacth => {
		const headers = {
			'Authorization': 'bearer ' + localStorage.getItem('token'),
		};
		axios.get("http://localhost:8000/tasks/createdlist", {
			headers:headers
		}).then((response)=>{
			const tasks = response.data.tasks ? response.data.tasks : [];
			dispacth(createdTaskSuccess(tasks));
		})
	}
}

export const filterTasks = (e,data) => {
	e.preventDefault();
	return dispacth => {
		const config = {
			headers: {'Authorization': 'bearer ' + localStorage.getItem('token')},
			params: data,
		};
		axios.get('http://localhost:8000/tasks/filter', config).then((response)=>{
			const tasks = response.data.tasks ? response.data.tasks : [];
			if(data.type==='assignee'){
				dispacth(filterAssigneeTaskSuccess(tasks));
			} else{
				dispacth(filterCreatedTaskSuccess(tasks));
			}
		})
	}
}

const meSuccess = (user) => {
	return {
		type: GET_USERS,
		payload: {
			user
		}
	}
}

const assigneeTaskSuccess = (tasks) => {
	return {
		type: GET_ASSIGNEE_TASKS,
		payload:{
			tasks
		}
	}
}

const createdTaskSuccess = (tasks) => {
	return {
		type: GET_CREATED_TASKS,
		payload:{
			tasks
		}
	}
}

const filterAssigneeTaskSuccess = (tasks) => {
	return{
		type: GET_FILTERED_ASSIGNEE_TASKS,
		payload:{
			tasks
		}
	}
}

const filterCreatedTaskSuccess = (tasks) => {
	return {
		type: GET_FILTERED_CREATED_TASKS,
		payload:{
			tasks
		}
	}
}



