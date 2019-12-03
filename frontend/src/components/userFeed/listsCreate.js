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
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ListsCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listName: "",
            listDesc: "",
            isPrivate: 0,
        }

        this.listNameChangeHandler = this.listNameChangeHandler.bind(this);
        this.listDescChangeHandler = this.listDescChangeHandler.bind(this);
        this.submitAdd = this.submitAdd.bind(this);
        
    }

<<<<<<< HEAD
=======
    
>>>>>>> 932e44f931501982784299d5d02e513b96f8b114
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

    // goto = () => {
    //     try {
    //         this.props.history.push({
    //             pathname: "/lists",
    //         })
    //        // console.log(this.state.userID)
    //     } catch (e) { }
    // }


    submitAdd = (e) => {
        e.preventDefault();
        const data = {
            listName: this.state.listName,
            listDesc: this.state.listDesc,
            isPrivate:this.state.isPrivate
        }
        console.log(data);
        axios.defaults.withCredentials = true;
        console.log("data"+data)
        axios.post('http://localhost:3001/lists/create', data)
            .then((response) => {
                console.log(response.status);
                if (response.status === 200) {
                    this.props.history.push({
                        pathname: "/adduser",
                    })
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
                <form class="outer-box1 signup1"  onSubmit={this.submitAdd}>
                    <br />
                    <div className="">
                        <div className="list-font">
                            <span class="uppernav"><Link to="/lists"><a> <FontAwesomeIcon icon={ faWindowClose } /> </a></Link></span>
                            <div class="letter-block">Create new List </div>
                            <span class="home-buttons"><button class="buttons3" type="submit">Next</button></span>
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




