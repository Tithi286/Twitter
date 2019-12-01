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
import { Link } from "react-router-dom";

class tweets extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweet: []
        }

    }


    componentDidMount(){
        console.log("in componentdidmount")
        const data = {
            params:{
            userID : "0010E0DC-7CAF-5F55-14B5-46466130211B"
        }}
       // console.log(data.userID)
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/userprofile/tweets', data)
                .then((response) => {
                    console.log("in axios", response)
                this.setState({
                    tweet : response.data
                });
                console.log(response)
                console.log(this.state.tweet)
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


        let tweet1;
        
        tweet1 =this.state.tweet.map(tweet => (
            <Link class="a" to="/descTweets">
            <div class="tweets-div" role="button">
                <div>
                <div class="u-flex u-flex-align">
                            <div class="u-mar2"><img src="https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg" class="logo5" style={{height:"40px", width:"40px"}}></img></div>
                            <div class="u-flex-justify">
                            <div class="u-mar1">
                            <div class="s-list-item-primary u-mar1 fullname">{tweet.user.firstName}</div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{tweet.tweet.tweet}</span>
                            </div>
                            </div>
                            </div>
                            </div>
                    {/* UserName<br />
                    Tweet Message */}
                </div>
                <div class="img-tweets-div">
                    <img src="https://www.sftravel.com/sites/sftraveldev.prod.acquia-sites.com/files/styles/sft_390x675_dark/public/alternative-portraits/Skyline-San-Francisco-at-Dusk_2.jpg?itok=FTSuT4Sf&timestamp=1515701696" class="tweets-img" ></img>
                    <div style={{paddingLeft: "12%"}}>
                    <div class="col-sm-3 buttons-div"><Icon icon={commentO} role="button"/></div>
                    <div class="col-sm-3 buttons-div"><Icon icon={loop} role="button"/> {tweet.retweetCount}</div>
                    <div class="col-sm-3 buttons-div"><Icon icon={heartO} role="button"/> {tweet.likeCount}</div>
                    <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button"/></div>                
                    </div>
                </div>
                
                <br/><br/>
            </div>
            </Link>
            )
        )
        



        return (
            <div class="container-flex">

            <br/>
            {tweet1}

            </div>

        )
    }

}


export default tweets;





