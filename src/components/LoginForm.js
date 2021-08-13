import React from 'react';
import {Field, reduxForm, SubmissionError, stopSubmit} from "redux-form";
import {Link} from "react-router-dom";

const validate = values => {
	const errors = {};
	if (!values.email) {
		errors.email = 'Required'
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid Email Address'
	}
	if (!values.password) {
		errors.password = 'Required'
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

let LoginForm = (props) => {
	const {handleSubmit,error} = props;
	return(
		<div className="container">
			<form className="form-signin" onSubmit={handleSubmit}>
				<h3>Login</h3>
				<div className="form-label-group" >
					<Field name="email" label="Email" component="input" type="email"  component={renderField} />
				</div>
				<div className="form-label-group" >
					<Field name="password" label="Password" component="input" type="password"  component={renderField} />					
				</div>
				<div className="error"> {error && <strong>{error}</strong>} </div>
				<button type="submit" className="btn btn-primary">Submit</button>
				<p> Don't have account? <Link to="/sampleregister" className="ml-4 link"> register </Link> or <Link to="/email" className="forgotPassword">forgot password?</Link></p>
			</form>
		</div>
	);
}

LoginForm = reduxForm({
	form:'login',
	validate,
})(LoginForm)

export default LoginForm;