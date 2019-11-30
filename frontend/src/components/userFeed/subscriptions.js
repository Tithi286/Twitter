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
import 'bootstrap/dist/css/bootstrap.min.css';
import { faHome, faList } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Favicon from 'react-favicon';

class Subscriptions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fName: "",
            lName: "",
            errormsg: "",
            authFlag: "",
            year: "",
            month: "",
            day: "",
            startDate: moment()
        }
        
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
            <div class="container-flex">
                {redirectVar}
                
               
                <div class="col-md-6 feed">
                        <div class="topnav" id="myTopnav">
                           <a class="headertwitter" href="www.amazon.com">
                            <span>@Amazon</span>
                            <p>Paris is the capital of France.</p>
                            </a>

                        </div>
                </div>                
            </div>



        )
    }

}


export default Subscriptions;