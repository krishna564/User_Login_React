const Filter = (props) => {
	return(
		<div className="filter">
			<select id="method" name="method" className="height" onChange={(e)=>{props.onChangeHandler(e)}}>
				<option value="">Select</option>
				<option value="id">Id</option>
				<option value="email">Email</option>
				<option value="username">Username</option>
				<option value="roles">Role</option>
			</select>{" "}
			<input type="text" name="value" className="height" required onChange={(e)=>{props.onChangeHandler(e)}} /> {" "}
			<button className="btn btn-dark" onClick={props.filerUser}>Search</button>
		</div>
	);
}

export default Filter;