import React from 'react';
import {Field, reduxForm, SubmissionError} from "redux-form";
import {Link} from "react-router-dom";

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input className="input" {...input} placeholder={label} type={type} />
      <div className="error" > {touched && error && <span>{error}</span>} </div>
    </div>
  </div>
)

let RegisterForm = (props) => {
	const {handleSubmit,error} = props;
	return(
		<div className="container">
			<form className="form-signin" onSubmit={handleSubmit}>
				<h3>Register</h3>
				<div className="form-label-group" >
					<Field name="username" label="UserName" component="input" type="text"  component={renderField} />
				</div>
				<div className="form-label-group" >
					<Field name="email" label="Email" component="input" type="email"  component={renderField} />
				</div>
				<div className="form-label-group" >
					<Field name="password" label="Password" component="input" type="password"  component={renderField} />					
				</div>
				<div className="form-label-group" >
					<Field name="password_confirmation" label="Password Confirm" component="input" type="password"  component={renderField} />					
				</div>
				<div className="error"> {error && <strong>{error}</strong>} </div>
				<button type="submit" className="btn btn-primary">Submit</button>
				<p> already a member?<Link to="/samplelogin" className="ml-4 link"> Log in </Link></p>
			</form>
		</div>
	);
}
RegisterForm = reduxForm({
	form:'register',
})(RegisterForm)

export default RegisterForm;