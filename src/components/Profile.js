import Moment, {moment} from "react-moment";
const Profile = (props) => {
	return(
		<div className="profile">
			<h1>User Profile Card</h1>
			<div className="card">
				<h1>{props.user.username}</h1>
				<p className="title">{props.user.email}</p>
				<p className="title">{props.user.roles}</p>
				<p className="title">Created At: <Moment date={props.user.created_at} /> </p>
				<button className="card-button" onClick={()=>{props.toggle(props.user.email, props.user.username)}}> Update</button>
			</div>
		</div>
	);
}
export default Profile;