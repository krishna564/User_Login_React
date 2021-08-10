import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { UserReducer, AssigneeReducer, CreatedReducer } from "./reducers/UserReducer";
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
	user: UserReducer,
	assignee_tasks: AssigneeReducer,
	created_tasks: CreatedReducer,
	form:formReducer,
});

const store = createStore(rootReducer,  compose(applyMiddleware(reduxThunk)));

export default store;