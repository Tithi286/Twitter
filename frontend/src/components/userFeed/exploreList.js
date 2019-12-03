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
import Favicon from 'react-favicon';
//import { Link } from "react-router-dom";
import Navbar from '../navbar'


class exploreList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: "",
            profile: []
        }

    }

    componentDidMount() {
        const data = {
            params: {
                topic: this.props.location.state.search
            }
        }
        console.log("Data from explore: ", data)
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/userfeed/search', data)
            .then((response) => {
                this.setState({
                    profile: response.data
                });
                console.log(response)
                console.log(this.state.profile)
            });
    }




    render() {

        let Contents;

        let redirectVar = null;
        if (this.props.authFlag == true) {
            redirectVar = <Redirect to="blogin" />
        }
        const { handleSubmit } = this.props;

        return (
            <div class="container-flex">

                <Navbar/>


                <div class="col-md-6 feed">
                    <div class="home-font">Explore</div>
                    <div class="container-flex">
                    <div class="col-md-6 divs" style={{float:"left"}}>
                    People
                    </div>
                    <div class="col-md-6 divs" style={{float:"left"}}>
                    Posts
                    </div>
                    </div>
                </div>

                <div class="col-md-3 feed">
                    <div>
                    
                    </div>
                </div>


                
            </div>
        )
    }

}


export default exploreList;





