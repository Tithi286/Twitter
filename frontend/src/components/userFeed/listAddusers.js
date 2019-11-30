import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import ModernDatepicker from 'react-modern-datepicker';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class ListsAdduser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            email: "",
            password: "",
            lname: "",
            message: "",
            authFlag: "",
            year: "",
            month: "",
            day: "",
            startDate: new Date()
        }

        this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.dobChangeHandler = this.dobChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        
    }

    fnameChangeHandler = (e) => {
        this.setState({
            fname: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    lnameChangeHandler = (e) => {
        this.setState({
            lname: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            pwd: e.target.value
        })
    }

    dobChangeHandler = (e) => {
        this.setState({
            startDate : e
        })
        console.log(this.state.startDate)
    }

    submitLogin(values) {
        this.props.signup(values);
        console.log(this);
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

   



    render() {

        let redirectVar = null;
        if (this.props.authFlag == true) {
            redirectVar = <Redirect to="blogin" />
        }
        const { handleSubmit } = this.props;
        
        

        return (
            <div className="opacity">
                <div className="first">
                <div class="col-md-3">
                </div>
                    <div class="col-md-6">
                        <div className="container">
                            <h3>Add Members</h3>
                            <button href="/adduser" class="button">Done </button>
                            <div>
                                <input type="text" class="searchbar" placeholder="Search Twitter" name="search" id="search"></input>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3">
                    </div>
                </div>
            </div>


        )
    }

}

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
        authFlag: state.signup.authFlag,
        message: state.signup.errormsg
    }
}



const mapDispatchStateToProps = dispatch => {
    return {
        signup: (values) => {
            const data = {
                firstName: values.fname,
                lastName: values.lname,
                email: values.email,
                password: values.password,
                DOB: values.startDate
            }
            console.log(data)
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/users/', data)
                .then((response) => {
                    console.log("in axios call")
                    console.log(response)
                    dispatch({ type: 'SIGNUP', payload: response.data, statusCode: response.status })
                })
                .catch((error) => {
                    dispatch({ type: 'SIGNUP', payload: error.response.data, statusCode: error.response.data.status })
                });
        }
    }
}


export default reduxForm({
    validate,
    form: "signup"
})(connect(mapStateToProps, mapDispatchStateToProps)(ListsAdduser));
