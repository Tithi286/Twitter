import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
// import { Container, Row, Col } from 'reactstrap';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            authFlag: "",
            msg: "",
        }

        //Bind events
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);

    }
    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitLogin = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(data);
        axios.defaults.withCredentials = true;
        axios.post('/users/login', data)
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
            <div>
                {this.state.authFlag == true ? <Redirect to="/home" /> : ""}
                <div className="logintopnav">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <span className="text" >
                                    <img src="https://www.alc.edu/wp-content/uploads/2016/10/13-twitter-logo-vector-png-free-cliparts-that-you-can-download-to-you-Km878c-clipart.png" class="logo"></img>
                                    Home
                                </span>
                                <span className="text">About</span>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-2">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="signup">
                    <form className="form outer-box1 signup1">
                        <div className="outer-box">
                            <div className="elements2">
                                <h2 className="label" >log in to Twitter</h2>
                            </div>
                            <form name="loginForm" onSubmit={this.submitLogin}>
                                <div className="">
                                    <div className="elements">
                                        <span className="label" >Email:</span>
                                        <input name="email" id="email" type="email" placeholder="Email Address" onChange={this.emailChangeHandler} required />
                                    </div>
                                </div>
                                <div className="">
                                    <div className="elements">
                                        <span className="label" >Password:</span>
                                        <input name="password" id="password" type="password" placeholder="Password" onChange={this.passwordChangeHandler} required />
                                    </div>
                                </div>
                                <div className="form-group" className="col-md-12">
                                    <br />
                                    <button className="btn btn-primary col-md-4 button" align="left" type="submit">Login</button>
                                    <p>{this.state.msg}</p>
                                    <br /><br />
                                </div>

                            </form>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default login;