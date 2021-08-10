function TasksFilter(props) {
	return(
		<>
			<div className="TasksFilter">
				<input id="keyword" name="keyword" className="height" placeholder="keyword..." required onChange={(e)=>props.onChangeHandler(e)} /> {" "}
				<input id="assignee" name="assignee" className="height" placeholder="assignee" required onChange={(e)=>props.onChangeHandler(e)} /> {" "}
				<input id="created_by" name="created_by" className="height" placeholder="creator" required onChange={(e)=>props.onChangeHandler(e)} /> {" "}
				<input id="status" name="status" className="height" placeholder="status" required onChange={(e)=>props.onChangeHandler(e)} /> {" "}
			
				<label htmlFor="from">From</label>{" "}
				<input type="date" name="from" className="height" onChange={(e)=>props.onChangeHandler(e)} />{" "}
				<label htmlFor="to">To</label>{" "}
				<input type="date" name="to" className="height" onChange={(e)=>props.onChangeHandler(e)} />{" "}
				<button className="btn btn-dark" onClick={(e) => props.filterTasks(e,props.filterData)}>Search</button>
			</div>
		</>
	);
}

export default TasksFilter;