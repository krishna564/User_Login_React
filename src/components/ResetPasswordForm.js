import React from 'react';
import {Field, reduxForm, SubmissionError} from "redux-form";
import {Link} from "react-router-dom";

const validate = values => {
	const errors = {};
	if(!values.token){
		errors.token = 'Required'
	}
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid Email Address'
	}
	if (!values.password) {
		errors.password = 'Required'
	} else if (values.password.length < 8){
		errors.password = 'Must be 8 characters or more '
	}
	if (!values.password_confirmation) {
		errors.password_confirmation = 'Required'
	} else if (values.password !== values.password_confirmation){
		errors.password_confirmation = 'Passwords should match'
	}
	return errors;
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input className="input" {...input} placeholder={label} type={type} />
      <div className = "error"> {touched && error && <span>{error}</span>} </div>
    </div>
  </div>
)

let ResetPasswordForm = (props) => {
	const {handleSubmit,error} = props;
	return(
		<div className="container">
			<form className="form-signin" onSubmit={handleSubmit}>
				<h3>Update Password</h3>
				<div className="form-label-group" >
					<Field name="token" label="Token" component="input" type="text"  component={renderField} />
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
				<p> Don't have account? <Link to="/sampleregister" className="ml-4 link"> register </Link></p>
			</form>
		</div>
	);
}

ResetPasswordForm = reduxForm({
	form:'reset',
	validate,
})(ResetPasswordForm)

export default ResetPasswordForm;