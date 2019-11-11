import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
//import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
//import jwt_decode from 'jwt-decode';
//import uuid from 'react-native-uuid';
import ModernDatepicker from 'react-modern-datepicker';
import moment from 'moment';

class userSignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            lName: "",
            //   email: "",
            //   password: "",
            //   phone: "",
            errormsg: "",
            authFlag: "",
            year: "",
            month: "",
            day: "",
            startDate: moment()
        }
        
    }


   

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control1 elements1" type="text" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>

        )
    }

    renderEmail(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label style={{ textAlign: 'left' }}>{field.label}</label>
                <input className="form-control1 elements1" type="email" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    renderPassword(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control1 elements1" type="password" {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>

        )
    }

    submitLogin(values) {
        this.props.signup(values);
        console.log(this);
    }



    render() {

        let redirectVar = null;
        if (this.props.authFlag == true) {
            redirectVar = <Redirect to="blogin" />
        }
        const { handleSubmit } = this.props;
        //console.log(this.state.errormsg)

        return (
            <div class="signup2">
                {redirectVar}
                <br />
                <form class="outer-box1 signup1">
                    {/* <form onSubmit={handleSubmit(this.submitLogin.bind(this))}> */}
                    <br />
                    <img src="https://www.alc.edu/wp-content/uploads/2016/10/13-twitter-logo-vector-png-free-cliparts-that-you-can-download-to-you-Km878c-clipart.png" class="logo"></img>
                    <div className="">
                        <div className="elements2">
                            <h3 class="label">Create your account</h3>
                            <br />
                        </div>

                        <div class="">
                            <div class="elements">
                                <span class="label">Name</span>
                                <Field name="name" component={this.renderField} />
                            </div>

                        </div>
                        <div class="">
                            <br />
                            <div class="elements">
                                <span class="label">Email</span>
                                <Field name="email" component={this.renderEmail} />
                            </div>
                        </div>
                        <div class="">
    
                            <div class="elements">
                                <span class="label">Phone</span>
                                <Field name="phone" component={this.renderField} />
                            </div>
                            <div class="">
                            <br/>
                                <div class="elements">
                                    <span class="label">Password</span>
                                    <Field name="password" component={this.renderPassword} />
                                </div>
                            </div>
                            <div class="">
                
                                <div class="elements2">
                                    <span class="label">Date of Birth</span>
                                </div>
                                
                            </div>
                            <div class="">
                                <br />
                                <button class="button">Sign Up</button>
                                <br /><br />
                                {/* <button class="btn btn-primary col-md-12 button" onClick={this.submitSignup}>Create your account</button> */}
                            </div>


                        </div>
                    </div>
                </form>
                <br /><br />
            </div>



        )
    }

}
//export default BuyerSignup;

function validate(values) {

    let errors = {};

    if (!values.name) {
        errors.name = "Enter Name";
    }

    if (!values.email) {
        errors.email = "Enter a valid email id";
    }

    if (!values.password) {
        errors.password = "Enter a password";
    }

    if (!values.phone) {
        errors.phone = "Enter a phone number";
    }

    if (!values.date) {
        errors.date = "Select a date";
    }

    if (!values.month) {
        errors.month = "Select a month";
    }

    if (!values.year) {
        errors.year = "Select a year";
    }

}

const mapStateToProps = state => {
    return {
        // authFlag: state.bSignup.authFlag,
        // errormsg: state.bSignup.errormsg
    }
}



const mapDispatchStateToProps = dispatch => {
    return {
        signup: (values) => {
            const data = {
                fName: values.fName,
                lName: values.lName,
                phone: values.phone,
                email: values.email,
                password: values.password
            }
            //data["isRecruiter"] = recruiter

            axios.defaults.withCredentials = true;
            // axios.post('http://localhost:3001/buyerSignup1', data)
            //     .then((response) => {
            //         console.log(response.data)
            //         dispatch({ type: 'SIGNUP', payload: response.data, statusCode: response.status })
            //     })
            //     .catch((error) => {
            //         dispatch({ type: 'SIGNUP', payload: error.response.data, statusCode: error.response.data.status })
            //     });
        }
    }
}


export default reduxForm({
    validate,
    form: "bSignup"
})(connect(mapStateToProps, mapDispatchStateToProps)(userSignup));


