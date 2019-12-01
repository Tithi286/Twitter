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
            
        }

       
        
    }

    submitChanges(e) {
        e.preventDefault()
        const data = {
            firstName: this.state.fname,
        }
        console.log(data)
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3001/users/profile', data)
            .then((response) => {
                console.log("in axios call")
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            });
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
                <div class="signup2">
                <div class="col-md-3">
                </div>
                <form class="outer-box1 signup1" onSubmit={this.submitChanges}>
                    <div class="col-md-6">
                        <div className="container">
                            <h3>Add Members</h3>
                            <span><button href="/adduser" class="button">Done </button> </span>    
                            <div>
                                <input type="text" class="searchbar" placeholder="Add Members" name="search" id="search"></input>
                            </div>
                        </div>
                    </div>
                    </form>
                    <div class="col-md-3">
                    </div>
                    </div>
                </div>
            </div>


        )
    }

}


export default ListsAdduser; 