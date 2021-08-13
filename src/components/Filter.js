const Filter = (props) => {
	return(
		<div className="filter">
			<input type="text" name="id" className="height" placeholder = "id" onChange={(e)=>{props.onChangeHandler(e)}} /> {" "}
			<input type="text" name="email" className="height" placeholder = "email" onChange={(e)=>{props.onChangeHandler(e)}} /> {" "}
			<input type="text" name="username" className="height" placeholder = "username" onChange={(e)=>{props.onChangeHandler(e)}} /> {" "}
			<input type="text" name="roles" className="height" placeholder = "role" onChange={(e)=>{props.onChangeHandler(e)}} /> {" "}
			<button className="btn btn-dark" onClick={props.filerUser}>Search</button>
		</div>
	);
}

export default Filter;