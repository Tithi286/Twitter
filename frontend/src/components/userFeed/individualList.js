import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
//import cookie from 'react-cookies';
import { Redirect } from 'react-router';
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
//import jwt_decode from 'jwt-decode';
//import uuid from 'react-native-uuid';
import { Link } from "react-router-dom";
import ModernDatepicker from 'react-modern-datepicker';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import Favicon from 'react-favicon';
import './tweet.css'
import Tweets from './tweets'
import Retweets from './retweets'
import Likes from './likes'
import Replies from './replies'
import Icon from 'react-icons-kit';
import {commentO} from 'react-icons-kit/fa/commentO'
import {heartO} from 'react-icons-kit/fa/heartO'
import {bookmarkO} from 'react-icons-kit/fa/bookmarkO'
import {loop} from 'react-icons-kit/iconic/loop'


var listsID
class IndividualList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            retweet: []
            
        }
        this.handleTweetClick = this.handleTweetClick.bind(this);
        this.handleRetweetClick = this.handleRetweetClick.bind(this);
        this.handleRepliesClick = this.handleRepliesClick.bind(this);
        this.handleLikesClick = this.handleLikesClick.bind(this);
    }

    componentDidMount(){
        
        axios.defaults.withCredentials = true;
        axios.get('http://localhost:3001/lists/tweets')
                .then((response) => {
                this.setState({
                    retweet : response.data
                 });
                 this.state.retweet.map(retweet1 =>{
                    console.log("members");
                    console.log(retweet1);
                });
                console.log(response)
                
            });
    }

    handleTweetClick() {
        this.setState({ isComponent: "tweet" });
    }

    handleRetweetClick() {
        this.setState({ isComponent: "retweet" });
    }

    handleRepliesClick() {
        this.setState({ isComponent: "replies" });
    }

    handleLikesClick() {
        this.setState({ isComponent: "likes" });
    }


    handleRetweetClick() {
        this.setState({ isComponent: "retweet" });
    }


    submitLogin(values) {
        this.props.signup(values);
        console.log(this);
    }

    subscribe(){
        console.log("listid"+listsID);
        const data={
           
                listID:listsID
            
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/lists/subscribe',data)
                .then((response) => {
               
       
             
                
            });
    }
    
   deleteList(){
        console.log("listid"+listsID);
        const data={
           
                listID:listsID
            
        }
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/lists/delete',data)
                .then((response) => {
               
                    window.location.assign("/lists");
             
                
            });
    }
    


    render() {
    console.log("list detailss")
        console.log(this.props.location.state[4])
        
            listsID=this.props.location.state[4]
           // profileimage: !response.data.data.tweetImage || response.data.data.tweetImage === 'undefined' ? '/pic.png' : response.data.data.tweetImage
        
        const isComponent = this.state.isComponent;
        console.log("Component : ",isComponent)

        let Contents;
        
        if(isComponent == "tweet"){
            Contents = (
                <Tweets/>
            )
        }

        else if(isComponent == "retweet"){
            Contents = (
                <Retweets/>
            )
        }

        else if(isComponent == "replies"){
            Contents = (
                <Replies/>
            )
        }

        else if(isComponent == "likes"){
            Contents = (
                <Likes/>
            )            
        }


        let redirectVar = null;
        if (this.props.authFlag == true) {
            redirectVar = <Redirect to="blogin" />
        }
        const { handleSubmit } = this.props;
        //console.log(this.state.errormsg)

        let retweet;
        
        retweet = this.state.retweet.map(retweet1 =>(
            <Link class="a" to="/descTweets">
            <div class="tweets-div" role="button">
                <div>
                <div class="u-flex u-flex-align">
                            <div class="u-mar2"><img src="https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg" class="logo5" style={{height:"40px", width:"40px"}}></img></div>
                            <div class="u-flex-justify">
                            <div class="u-mar1">
                            <div class="s-list-item-primary u-mar1 fullname">{retweet1.user.userName}</div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{retweet1.tweet.tweetDate}</span>
                            </div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{retweet1.tweet.tweet}</span>
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
                    <div class="col-sm-3 buttons-div">{retweet1.replyCount}<Icon icon={commentO} role="button"/></div>
                    <div class="col-sm-3 buttons-div">{retweet1.retweetCount}<Icon icon={loop} role="button"/></div>
                    <div class="col-sm-3 buttons-div">{retweet1.likeCount}<Icon icon={heartO} role="button"/></div>
                    <div class="col-sm-3 buttons-div"><Icon icon={bookmarkO} role="button"/></div>                
                    </div>
                </div>
                
                <br/><br/>
            </div>
            </Link>
            ))

        return (
            <div class="container-flex">
                {redirectVar}
                <div class="col-md-3 feed1" >
                    <span class="home-buttons"><img src="https://www.alc.edu/wp-content/uploads/2016/10/13-twitter-logo-vector-png-free-cliparts-that-you-can-download-to-you-Km878c-clipart.png" class="logo"></img></span><br /><br />
                    <a href="/home" class="a"><span class="home-buttons"><img src="https://cdn4.iconfinder.com/data/icons/roundies-2/32/birdhouse-512.png" class="logo4"></img>Home</span><br /><br /></a>
                    <a href="/explore" class="a"><span class="home-buttons"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEX///8DAQQAAABhYWHCwsK7u7sDAATr6+vY2Nj8/PyBgYHS0tLV1dXp6enx8fGlpaWenp5aWlp6enqampp2dXZlZWUyMTIiISIsKyxRUFFWVVaFhYVNTE0hICHExMRcXFwUExWysbIbGhxHRkc6OjqTk5M/P0AYFhkPDRBEv2DjAAAE+ElEQVR4nO2d6VIbQQyE8QLmNlcAQ8AcOeD9nzCVyo/82ma2mZbbsr4HkEdVW5J6Znq8s9OFh2E2xrBPxnwFMS/7LHsCM7CaQzLmLxDze9fVtzCA1SzImN9AzPOuq2/gDCxmOCKD/gBB97ouv4FTsJhbNujdaNA5/eXToKLwQMZcKL58mgtBUTgY5qMxh66rbwEVhQsy5gmIedd19S3cC4rCPoh503X1LSyD2+Fx19U3cJS+HR6gdsgGfXRqh6goLNmg6LsIb4eoKOyyQcebxRraISoKV2RMNAjO2EGQ5kpQFNCX/7Pr6ltARSGHOnwRFIVrJ3UI2+EBGdSqHUrUoVU7ROqQboeKQZBGoQ4lgyCNRh2OxpzlV4f0l0+DNktzqMPxLaPZcErGtFKHks1SxSBII1GHVpulqCjQm6Ubow6fyZhe7VBRFNAg+JFeHdJfPk20OmS/fJ6nLVaHg0QdsoMgjaQdomOCVc/Vt4CKwhMbFA2CVu2Q3TLyaofB6nALzg7j2+FlenX4nl8dji5mnkMdhl+lYQdBGrRZSp+gfGxxOxzi2yGakRXqcN519S1Eq8P4zdL86nD8BIW/X7cp6lBzdphDHaJjAit1+MYGfduUdkgXBXSylr4dxqtDRTtEg+Dvry54dyI36Lj98WZquH8xUYu9a4gJMxwmM7qYv58UyRdjfpIhiL4ZVIaVoT+VYWXoT2VYGfpTGVaG/lSGlaE/lWFl6E9lWBn6UxlWhv58mmHg3rQqKMxwbwIrdO60XE0J9Z8TdKZ83hYUZjiJvWgbfrgNoWz4DGXDj6Vs+Axlww+lbPgM22C0AA2/6+pbyP9IW9nwGcyMFmXDJ1AMgjQS95XitV4azc1Sp3aIZuQc6vA4+GZpfhs+OwjyKMzIikGQpowWFIrXemlQUaBt+FbqELXD/OqQnZG324Yf7zuMtuHTxwQ06FWaEzKm4piAJ70NHxYFxWaplQ2fnpEVxwQ04e2QHQRpotVh/OkoUodsO5QcE9CgGTmHOlTMyKUOQ1lE2/Ct3ix9Z4OiL589JqBRvErjtVmaXx2iGTn/I21sO5QcE9Cgp6pYdagYBHkU6lBxTEAjUYeKQZDmUFEUNubN0nsyppc6rHbIgNQh/R4TjaIoKPZFeG6D1aHX/x2yRQF9+dddl9/AQnG/7hlk2PGRtjajxTm6MkEaLVbomOBiUlCYYZivRRn0kwzB72wGlWFl6E9lWBn6UxlWhv5UhpWhP5VhZehPZVgZ+lMZVob+VIaVoT8d3omC0Um6xoQZNvz7BDpfYP/RAv2T3HJyTJhhA4qzQ3TUs4arNME2/Pw3S61s+PR1c2S0qJul3SmjBQO6RJbDaKG4RMYTbcP3ukpzRga1ukoT/n+HVr5D+n4dGgSt2mEO36GiKIBBcA2PtCmKgtcjbeh+XQ6jBWqH2Y0W/IysGARp8hstJDZ89Pe/1Q67U+qQAX358e0wvzqMtuHnUIfIhr8Go8X4YugZWeG4pUFF4YUNir58dhCkkbivrDZLUVFg22F+3+HmPNKmaIfx/2hRNnyG/OrQ6pG2suEzSAZBmvw2fEVRQO0whw3f65G2suEzmKlDgQ3fSh2iovDBBkWbpVbqkL9KMxoziTr02iyNfpUm/pE2xYUCr1dpFPfrzNRh9pul4f93aKUOc/zfYalDBi91GH2V5qXn4puIboedNkv/AM+6hfVApDumAAAAAElFTkSuQmCC" class="logo4"></img>Explore</span></a><br /><br />
                    <a href="/messages" class="a"><span class="home-buttons"><img src="https://img1.gratispng.com/20180910/cuf/kisspng-computer-icons-clip-art-email-font-awesome-symbol-message-svg-png-icon-free-download-371225-onl-5b96caeaac3f68.8944099415366090027055.jpg" class="logo4"></img>Messages</span><br /><br /></a>
                    <a href="/bookmarks" class="a"><span class="home-buttons"><img src="http://cdn.onlinewebfonts.com/svg/img_198285.png" class="logo4"></img>Bookmarks</span><br /><br /></a>
                    <a href="/lists" class="a"><span class="home-buttons"><img src="https://cdn4.iconfinder.com/data/icons/ad-network-icon-set-2/100/listing_1-512.png" class="logo4"></img>Lists</span><br /><br /></a>
                    <a href="/profile" class="a"><span class="home-buttons"><img src="https://library.kissclipart.com/20180904/ese/kissclipart-user-icon-png-clipart-computer-icons-user-66fe7db07b02eb73.jpg" class="logo4"></img>Profile</span><br/><br/></a>
                    <a href="/analytics" class="a"><span class="home-buttons"><img src="https://cdn1.vectorstock.com/i/1000x1000/76/15/analytics-icon-on-transparent-analytics-sign-vector-20707615.jpg" class="logo4"></img>Analytics</span><br /><br /></a>
                    <a href="/settings" class="a"><span class="home-buttons"><img src="https://upload.wikimedia.org/wikipedia/commons/6/6d/Windows_Settings_app_icon.png" class="logo4"></img>Settings</span><br /><br /></a>
                    <span class="home-buttons"><button class="buttons3">
                        Tweet
                </button></span>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </div>

                <div class="col-md-6 feed1 u-list1">
                    <div class="home-font">User Name</div>

                    <div class="home-font1">
                        <div class="">
                            <div class="rest-img">
                            </div>
                            <div class="s-list-item-primary u-mar1 fullname"></div>
                            <div class="s-list-item-primary u-mar1 listheading">{this.props.location.state[0]}</div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{this.props.location.state[1]}</span>
                            </div>
                            <div class="s-list-item-secondary u-mar1 snippet">
                                    <span class="span">{this.props.location.state[2]} members .</span>
                                    <span class="span">{this.props.location.state[3]} subscribers</span>
                            </div>
                            <div>
                            <button class="logob" onClick={this.deleteList}>Delete List</button>
                            <button class="logod" onClick={this.subscribe}>Subscribe</button>
                            </div>
                        </div>
                    </div>
                    
                 <div>
                        {retweet}
                    </div>
                </div>
                <div class="col-md-3 feed1">
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


export default IndividualList;
