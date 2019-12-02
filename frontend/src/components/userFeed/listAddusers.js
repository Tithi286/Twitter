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
            search: "",
            user1: []
        }

       this.submitChanges=this.submitChanges.bind(this);
        
    }

    goTo = (e) => {
        e.preventDefault()
        const data = {
            params: {
                fname: this.state.search
            }
        }
        console.log("Data from search lists: ", data)
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/lists/search', data)
            .then((response) => {
                this.setState({
                    user1 : response.data
                });
                console.log(this.state.user1);
                this.state.user1.map(username =>{ 
                    console.log("username")
                    console.log(username.firstName);
                    console.log(this.state.user1[0].userID)
                });
            });
    }

    searchChangeHandler = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    submitChanges = (v1) => {
        // e.preventDefault()
        console.log("v1 valuse"+v1);
        console.log(this.props.location.state)
       
        const data = {
            userID: v1,
            listID:this.props.location.state

        }
        console.log(data)

        axios.defaults.withCredentials = true;

        axios.post('http://localhost:3001/lists/member', data)
            .then((response) => {
                console.log("in axios cal")
                console.log(response)
            })

            .catch((error) => {
                console.log(error)
            });


       }

    render() {

        let user1;
        console.log("sent value")
        console.log(this.props.location.state)
        user1 = this.state.user1.map(username => (
             
            
                <div class="u-clickable u-list" role="button">
                <div class="u-flex u-flex-align container-flex">
                    <div class="u-mar2 col-sm-1"  style={{float:"left"}}><img src="https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg" class="logo5"></img></div>
                    <div class="col-md-6" style={{float:"left"}}>
                    {/* <Link class="a" to="/explore1"> */}
                        <div class="u-mar3">
                        <div class="s-list-item-primary u-mar3 fullname"> </div>
                            <div class="s-list-item-secondary u-mar3 snippet">
                            <span class="span">{username.firstName}</span>
                            </div>
                        </div>
                    {/* </Link> */}
                    </div>
                    <div class="col-sm-3" style={{float:"left"}}> 
                    <button class="logoc" style={{float:"left"}} onClick={() => this.submitChanges(username.userID)}>Add Member</button>
                    </div>
                </div>
                </div>
         
        ))
        


        return (
            <div className="opacity">
                <div className="first">
                <div class="signup2">
                <div class="col-md-3">
                </div>
                <div class="outer-box1 signup1" >
                    <div class="col-md-6">
                        <div className="container">
                            <h3>Add Members</h3>
                            <span>
                                <Link to="/lists">
                                <button class="button">Go back </button>
                                </Link>
                                 </span>    
                            <div>
                                <input type="text" class="searchbar1" placeholder="Add member" name="search" id="search" onChange={this.searchChangeHandler}></input>
                            </div>
                            <div style={{ paddingLeft: "78%" }}>
                            <button class="buttons3" onClick={this.goTo}>
                                Search
                            </button>
                            </div>
                            {user1}
                        </div>
                    </div>
                    </div>
                    <div class="col-md-3">
                    </div>
                    </div>
                </div>
            </div>


        )
    }

}


export default ListsAdduser; 