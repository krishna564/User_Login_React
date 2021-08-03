import {GET_USERS, GET_ASSIGNEE_TASKS, GET_CREATED_TASKS, GET_FILTERED_ASSIGNEE_TASKS,GET_FILTERED_CREATED_TASKS} from "../Types";

const initialState = {
	user: [],
	assignee_tasks: [],
	created_tasks: [],
}

export function UserReducer (state = initialState, action) {
	switch(action.type){
		case GET_USERS:
			return{
				user:action.payload.user,
			};
		default:
			return state;
	}
}

export function AssigneeReducer (state = initialState, action) {
	switch(action.type){
		case GET_ASSIGNEE_TASKS:
			return{
				assignee_tasks:action.payload.tasks,
			};
		case GET_FILTERED_ASSIGNEE_TASKS:
			return{
				assignee_tasks:action.payload.tasks,
			};
		default:
			return state;
	}
}

export function CreatedReducer (state = initialState, action) {
	switch(action.type){
		case GET_CREATED_TASKS:
			return{
				created_tasks:action.payload.tasks,
			};
		case GET_FILTERED_CREATED_TASKS:
			return{
				created_tasks:action.payload.tasks,
			};
		default:
			return state;
	}
}