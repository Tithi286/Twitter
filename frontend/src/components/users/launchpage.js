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

class launchpage extends Component {

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
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control elements1" type="text" {...field.input} />
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
                <input className="form-control elements1" type="email" {...field.input} />
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
                <input className="form-control elements1" type="password" {...field.input} />
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
            <div>
                {redirectVar}
                <div class="landingpage1">
                
                    <svg class="twitterIcon-bird" viewBox="0 0 1208 982" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>
                    

                </div>
                <div class="landingpage">
                <br/><br/>
                <div class="home-div1">
                <input type="email" placeholder="Email" class="input">
                </input>
                <input type="password" placeholder="Password"  class="input">
                </input>
                <button class="login1">
                    Login
                </button>
                </div>
                <br/>
                <div class="home-div">
                <img src="https://www.alc.edu/wp-content/uploads/2016/10/13-twitter-logo-vector-png-free-cliparts-that-you-can-download-to-you-Km878c-clipart.png" class="logo1"></img>
                <h1>
                    See what's happening in <br/>the world right now<br/>
                </h1><br/>
                <h4>
                Join Twitter today. 
                </h4>
                <button class="buttons1">
                    Sign up
                </button><br/><br/>
                <button class="buttons2">
                    Log in
                </button>
                </div>
                </div>
            </div>



        )
    }

}


export default launchpage;





