function TasksFilter(props) {
	return(
		<>
			<div className="TasksFilter">
				<select id="method" name="method" className="height" onChange={(e)=>props.onChangeHandler(e)}>
					<option value="">Select</option>
					<option value="keyword">Keyword</option>
					<option value="created_by">Creator</option>
					<option value="assignee">Assignee</option>
					<option value="status">Status</option>
				</select> {" "}
				<input id="text" name="value" className="height" required onChange={(e)=>props.onChangeHandler(e)} /> {" "}
				<button className="btn btn-dark" onClick={(e) => props.filterTasks(e,props.filterData)}>Search</button>
			</div>
			<div style={{float:'right'}}>
				<label htmlFor="from">From</label>{" "}
				<input type="date" name="from" className="height" onChange={(e)=>props.data.from = e.target.value} />{" "}
				<label htmlFor="to">To</label>{" "}
				<input type="date" name="to" className="height" onChange={(e)=>props.data.to = e.target.value} />{" "}
				<button className="btn btn-dark" onClick={(e) => props.filterTasksbyDate(e)}>Search</button>
			</div>
		</>
	);
}

export default TasksFilter;