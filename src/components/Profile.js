const Profile = (props) => {
	return(
		<div className="profile">
			<div className="card">
	            <div className="card-header">
	                <h4>Profile</h4>
	            </div>
	            <div className="card-body">
	                <ul className="list-group list-group-flush">
	                	<li className="list-group-item"><h5>Email: {props.user.email}</h5></li>
	                	<li className="list-group-item"><h5>Username: {props.user.username}</h5></li>
	                	<li className="list-group-item"><h5>Role: {props.user.roles}</h5></li>
	                	<li className="list-group-item"><h5>Created At: {props.user.created_at}</h5></li>
	                </ul>
	            </div>
	            <div className="card-footer">
	            	<button className="btn btn-primary" style={{ float: 'left' }} onClick={()=>{props.toggle(props.user.email)}}> Change</button>
	            </div>
			</div>
		</div>
	);
}
export default Profile;