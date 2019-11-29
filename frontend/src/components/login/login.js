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
        console.log("login")
        axios.post('http://localhost:3001/users/login', data)
            .then((response) => {
                if (response.status === 200) {
                    console.log("logged in")
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
            <div className = "bodylogin" >

                {this.state.authFlag === true ? <Redirect to="/home" /> : ""}
                <div className="loginnav">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-4">
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6" >
                                <a className="text" aria-hidden="true" href="/launchpage" >
                                    <img src="https://www.alc.edu/wp-content/uploads/2016/10/13-twitter-logo-vector-png-free-cliparts-that-you-can-download-to-you-Km878c-clipart.png" class="logo"></img>
                                    Home
                                </a>
                                <a className="text" href="https://about.twitter.com" >About</a>
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
                <div  >
                    <form className = "loginform">
                        <div >
                            <div >
                                <h4 className="loginlabel" >Log in to Twitter</h4>
                            </div>
                            <form name="loginForm" onSubmit={this.submitLogin}>
                                <div >
                                    <div className="logincontainer">
                                        <input name="email" id="email" type="email" placeholder="Email Address" onChange={this.emailChangeHandler} required />
                                    </div>
                                </div> 
                                <div >
                                    <div className="logincontainer" >
                                        <input name="password" id="password" type="password" placeholder="Password" onChange={this.passwordChangeHandler} required />
                                    </div>
                                </div>
                                <form className="buttonContainer">
                                <div >
                                    <button className="loginbutton" type="submit">Log in </button>
                                    <label className="buttonlabel">
                                    </label>
                                    <p>{this.state.msg}</p>
                                    
                                </div>  
                                </form> 
                            </form>
                            <form className="logininsideContainer">
                                <div>
                                    <p className="logindownfont col-sm-6" > New to Twitter? 
                                    <a className="col-sm-1" href="/signup"> Sign up now >> </a>
                                    </p>
                            
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