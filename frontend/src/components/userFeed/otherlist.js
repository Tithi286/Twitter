import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from "react-router-dom";
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
import Icon from 'react-icons-kit';
import {commentO} from 'react-icons-kit/fa/commentO'
import {heartO} from 'react-icons-kit/fa/heartO'
import {bookmarkO} from 'react-icons-kit/fa/bookmarkO'
import {loop} from 'react-icons-kit/iconic/loop'
import Navbar from '../navbar'

class otherlists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listCreated: []
        }
        
    }

    componentDidMount(){
        const data={
            params:{
                userID:this.props.location.state
            }
        }
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/lists/others',data)
                .then((response) => {
                this.setState({
                    listCreated : response.data,
                   // profileimage: !response.data.data.tweetImage || response.data.data.tweetImage === 'undefined' ? '/pic.png' : response.data.data.tweetImage
                });
                
                console.log(this.state.listCreated)
                
            });
    }


    render() {

        let redirectVar = null;
        if (this.props.authFlag == true) {
            redirectVar = <Redirect to="blogin" />
        }
        const { handleSubmit } = this.props;
        //console.log(this.state.errormsg)
       
        let listCreated;
        
        listCreated =this.state.listCreated.map(list1 =>(
            <div class="tweets-div u-list1">
                
                <div class="u-flex u-flex-align container-flex">
                        <Link class="a" to={{pathname:"/indlist", state:[list1.listName,list1.listDesc,list1.members.length,list1.subscribers.length,list1._id] }}>
                            <div class="u-flex-justify col-md-9" style={{float:"left"}}>
                            <div class="u-mar1">
                            <div class="s-list-item-primary u-mar1 fullname"></div>
                            <div class="s-list-item-primary u-mar1 listheading">{list1.listName}</div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{list1.listDesc}</span>
                            </div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{list1.members.length} members .</span>
                                    <span class="span">{list1.subscribers.length} subscribers</span>
                            </div>
                            </div>
                            </div>
                        </Link>
                            <div class="col-md-3" style={{float:"left"}}>
                            </div>
                            </div>            
            </div>
            ))

        return (
            <div class="container-flex">
                {redirectVar}
                <Navbar/>
                <div class="col-md-6 feed">
                    <div class="home-font">
                        <div class="msg-block">Lists </div>
                    </div>
                        
                        <div class="topnav" id="myTopnav">
                            <a class="active" class="col-md-4">Lists</a>
                            <Link class="a" to={{pathname:"/subscribers", state:this.props.location.state }}>Subscribers</Link>
                            <Link class="a" to={{pathname:"/othermembers", state:this.props.location.state }}>Members</Link>
                        </div>
                    <div >
                        {listCreated}
                    </div>
                </div>
                <div class="col-md-3 feed">
                    <div>
                    <div>
                    <input type="text" class="searchbar" placeholder="Search Twitter" name="search" id="search"></input>
                    </div>
                    </div>
                </div>
                
            </div>



        )
    }

}


export default otherlists;





