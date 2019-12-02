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

class ListsCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listName: "",
            listDesc: "",
            isPrivate: "No",
        }

        this.listNameChangeHandler = this.listNameChangeHandler.bind(this);
        this.listDescChangeHandler = this.listDescChangeHandler.bind(this);
        this.submitAdd = this.submitAdd.bind(this);
        
    }

    componentWillMount() {
       
        var token = localStorage.getItem("token");
        axios.defaults.withCredentials = true;
        axios.get('http://'+':3001/trip-details', {
            headers: {"Authorization" : `Bearer ${token}`}
        })
            .then(response => {
                if (response.status === 200) {
                    console.log("Response : ", response.data);

                    var trips = response.data;
                    var tripsResult = trips.filter(function(property){
                        var index = trips.indexOf(property);
                        return index >= 0 && index <= 4;
                    });

                    this.setState({
                        tripDetails: response.data,
                        ownerDashBoardTrips : tripsResult
                    });

                    
                }
            }).catch((err) =>{
                if(err){
                    this.setState({
                        errorRedirect: true
                    })
                }
            });

    } 

    
    listNameChangeHandler = (e) => {
        this.setState({
            listName: e.target.value
        })
    }

    listDescChangeHandler = (e) => {
        this.setState({
            listDesc: e.target.value
        })
    }

    submitAdd = (e) => {
        e.preventDefault();
        const data = {
            listName: this.state.listName,
            listDesc: this.state.listDesc,
        }
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.post('/lists/create', data)
            .then((response) => {
                if (response.status === 200) {
                    this.setState({
                        authFlag: true
                    })
                }
                else {
                    this.setState({ msg: response.body.message });
                }
            })
            .catch((err) => {
                this.setState({
                    authFlag: false,
                    msg: err.response.data.message,
                })
                console.log("Error messagw", err.response.status);
            });

    }
   

    render() {
        return (
            <div class="signup2">
                <br />
                <form class="outer-box1 signup1" onSubmit={this.submitAdd}>
                    {/* <form onSubmit={handleSubmit(this.submitLogin.bind(this))}> */}
                    <br />
                    <div className="">
                        <div className="elements2">
                            <h3 class="label">Create new List</h3>
                            <span class="home-buttons"><Link to="/adduser"><button class="buttons3" type="submit">Next</button></Link></span>
                            {/*<button class="button">Next </button>*/}
                            
                            <br />
                            <p>{this.props.message}</p>
                        </div>
                        <div class="">
                        <br/>
                            <div class="elements">
                                <span class="label">Name</span>
                                <input class="form-control1 elements1" placeholder={this.state.listName} pattern="[A-Z]*||[a-z]*" type="text" name="listName" onChange={this.listNameChangeHandler} required/>
                            </div>
                        </div>
                        <div class="">
                        <br/>
                            <div class="elements">
                                <span class="label">Description</span>
                                <input class="form-control1 elements1" placeholder={this.state.listDesc} pattern="[A-Z]*||[a-z]*" type="text" name="listDesc" onChange={this.listDescChangeHandler} required/>
                            </div>
                        </div>>
                    </div>
                </form>
                <br /><br />
            </div>



        )
    }


}

export default ListsCreate;




