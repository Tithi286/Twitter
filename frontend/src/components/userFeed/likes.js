import React, { Component } from 'react';
import Icon from 'react-icons-kit';
import {commentO} from 'react-icons-kit/fa/commentO'
import {heartO} from 'react-icons-kit/fa/heartO'
import {bookmarkO} from 'react-icons-kit/fa/bookmarkO'
import {loop} from 'react-icons-kit/iconic/loop'
import '../../App.css';
import './tweet.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import ModernDatepicker from 'react-modern-datepicker';
import moment from 'moment';

import 'bootstrap/dist/css/bootstrap.min.css';
import Favicon from 'react-favicon';

class Likes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            likes: []
        }

    }

    componentDidMount(){
        var a = sessionStorage.getItem("component")
        let data;
        if(a == "profile"){
             data = {
                params:{
                userID : sessionStorage.getItem("userID")
            }}
        }
        else if(a == "explore"){
             data = {
                params:{
                userID : sessionStorage.getItem("ID")
            }}
        }
        console.log("USERID: ",data)
        
        console.log(data.userID)
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/userprofile/likes',data)
                .then((response) => {
                this.setState({
                    likes : response.data
                });
                console.log(response.data)
                //console.log(this.state.likes)
            });
    }

    render() {
        // let Tweet = this.state.tweets.map(tweet => {
        //     if (tweet != null)
        //         return (

        //             <div className="search">
        //                 <br/>{tweet.item}
        //                 <br/>{tweet.price}
        //             </div>
        //         )
        // })


        let likeTweets;
        
        likeTweets =this.state.likes.map(likes => (
            <div class="tweets-div u-list1">
                
                <div class="u-flex u-flex-align">
                            <div class="u-mar2"><img src="https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg" class="logo5" style={{height:"40px", width:"40px"}}></img></div>
                            <div class="u-flex-justify">
                            <div class="u-mar1">
                            <div class="s-list-item-primary u-mar1 fullname">{likes.user.firstName} {likes.user.lastName}</div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{likes.tweet.tweet}</span>
                            </div>
                            </div>
                            </div>
                            </div>
                
                <div class="img-tweets-div">
                    <img src="https://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/styles/sft_390x675_dark/public/alternative-portraits/Skyline-San-Francisco-at-Dusk_2.jpg?itok=FTSuT4Sf&timestamp=1515701696" class="tweets-img" ></img>
                    <div style={{paddingLeft: "12%", paddingTop: "2%",display: "flex"}}>
                    <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button"/></div>
                    <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button"/></div>
                    <div class="col-sm-3 buttons-div"><Icon icon={heartO} role="button"/>{likes.tweet.likeCount}</div>
                    <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button"/></div>
                </div>
                </div>
                
                <br/><br/>
            </div>
            )
        )
        



        return (
            <div class="container-flex">
            
            {likeTweets}

            </div>

        )
    }

}


export default Likes;





