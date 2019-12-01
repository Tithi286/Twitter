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

        }

       
        
    }

    goTo = () => {
        const data = {
            params: {
                topic: this.state.search
            }
        }
        console.log("Data from search lists: ", data)
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/lists/search', data)
            .then((response) => {
                console.log(response);
            });
    }

    searchChangeHandler = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    submitChanges(e) {
        e.preventDefault()
        const data = {
            firstName: this.state.fname,
        }
        console.log(data)
        axios.defaults.withCredentials = true;
        axios.put('http://localhost:3001/users/member', data)
            .then((response) => {
                console.log("in axios call")
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            });
       }

    render() {
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
                                <input type="text" class="searchbar1" placeholder="Add member" name="search" id="search" onChange={this.searchChangeHandler}></input>
                            </div>
                            <div style={{ paddingLeft: "78%" }}>
                            <button class="buttons3" onClick={this.goTo}>
                                add member
                            </button>
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