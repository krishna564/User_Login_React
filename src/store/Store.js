import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import reduxThunk from "redux-thunk";
import { UserReducer, AssigneeReducer, CreatedReducer } from "./reducers/UserReducer";

const rootReducer = combineReducers({
	user: UserReducer,
	assignee_tasks: AssigneeReducer,
	created_tasks: CreatedReducer
});

const store = createStore(rootReducer,  compose(applyMiddleware(reduxThunk)));

export default store;