import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import "react-datepicker/dist/react-datepicker.css";

class editProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            city:"",
            state:"",
            zipcode:"",
            bio:"",
            email: "",
            profileimage: "https://www.alc.edu/wp-content/uploads/2016/10/13-twitter-logo-vector-png-free-cliparts-that-you-can-download-to-you-Km878c-clipart.png",
            imageURL:""
        }

        this.fnameChangeHandler = this.fnameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.lnameChangeHandler = this.lnameChangeHandler.bind(this);
        this.profileimageChangeHandler = this.profileimageChangeHandler.bind(this);
        this.bioChangeHandler = this.bioChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.zipChangeHandler = this.zipChangeHandler.bind(this);
        this.submitChanges = this.submitChanges.bind(this);
        this.ImageChange = this.ImageChange.bind(this);
        this.updateprofileimage = this.updateprofileimage.bind(this);
        
    }
    
    componentDidMount() {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:3001/userprofile")
            .then((response) => {
                //update the state with the response data
                this.setState({
                    fname: response.data.first_name,
                    lname: response.data.last_name,
                    email: response.data.email,
                    bio: response.data.bio,
                    city: response.data.city,
                    state: response.data.state,
                    zipcode: response.data.zipcode,
                });
                if(response.data.profileimage){
                    this.setState({
                        profileimage : response.data.profileimage
                    })
                }
            }) .catch(error => {
                this.setState({
                    //message: error.response.data.error
                })
            });
    }

    fnameChangeHandler = (e) => {
        this.setState({
            fname: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }
    lnameChangeHandler = (e) => {
        this.setState({
            lname: e.target.value
        })
    }

    profileimageChangeHandler = (e) => {
        this.setState({
            
        })
    }

    bioChangeHandler = (e) => {
        this.setState({
            bio : e.target.value
        })
    }

    cityChangeHandler = (e) => {
        this.setState({
            city : e.target.value
        })
    }

    stateChangeHandler = (e) => {
        this.setState({
            state : e.target.value
        })
    }

    zipChangeHandler = (e) => {
        this.setState({
            zipcode : e.target.value
        })
    }

    ImageChange(event) {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ profileimage: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
            this.setState({
                imageURL: event.target.files[0]
            })
        }
    }

    updateprofileimage = (e) => {
        const image = new FormData();
        image.append("image", this.state.imageURL);

        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/updatepic', image)
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log("Status Code : ", response);
                if (response.status === 200) {
                    this.setState({
                        message: response.data.message
                    })
                }
            })
            .catch(error => {
                this.setState({
                    //message: error.response.data.error
                })
            });
    }

    submitChanges() {
        const data = {
            firstName: this.state.fname,
            lastName: this.state.lname,
            email: this.state.email,
            bio: this.state.bio,
            address: this.state.address,
            profileimage: this.state.profileimage
        }
        console.log(data)
        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/users/', data)
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
        // if (this.props.authFlag == true) {
        //     redirectVar = <Redirect to="blogin" />
        // }
        
        

        return (
            <div class="signup2">
                {/* {redirectVar} */}
                <br />
                <form class="outer-box1 signup1" onSubmit={this.submitChanges} >
                    <br />
                    <img src="https://www.alc.edu/wp-content/uploads/2016/10/13-twitter-logo-vector-png-free-cliparts-that-you-can-download-to-you-Km878c-clipart.png" class="logo"></img>
                    <div className="">
                        <div className="elements2">
                            <h3 class="label">Edit Your Profile</h3>
                            <br />
                        </div>
                        <div class="">
                            <br/>
                                <div class="elements">
                                    <span class="label">Profile Image</span>
                                    <img id="img" src={this.state.profileimage} alt="Avatar" style={{ width: "200px", height: "200px", borderRadius: "50%" }}></img>
                                    <input type="file" onChange={this.ImageChange} style={{ textAlign: "center", margin: "auto" }} name="pic" accept="image/*"></input>
                                    <button class="btn btn-primary btn-lg searchbox-submit js-searchSubmit" onClick={this.updateprofileimage} style={{ width: "200px", marginTop: "20px", marginBottom: "50px" }} data-effect="ripple" type="button" tabindex="5" data-loading-animation="true">
                                        Upload
                                    </button>
                                    </div>
                            </div>
                        <div class="">
                        <br/>
                            <div class="elements">
                                <span class="label">First Name</span>
                                <input class="form-control1 elements1" pattern="[A-Z]*||[a-z]*" type="text" name="fname" onChange={this.fnameChangeHandler} required/>
                            </div>
                        </div>
                        <div class="">
                            <br />
                            <div class="elements">
                                <span class="label">Last Name</span>
                                <input class="form-control1 elements1" pattern="[A-Z]*||[a-z]*" type="text" name="lname" onChange={this.lnameChangeHandler}required/>
                            </div>
                            </div>
                        <div class="">
                            <br />
                            <div class="elements">
                                <span class="label">Email</span>
                                <input class="form-control1 elements1"  type="text" name="email" onChange={this.emailChangeHandler}required/>
                            </div>
                        </div>
                            <div class="">
                            <br/>
                                <div class="elements">
                                    <span class="label">Bio</span>
                                    <input class="form-control1 elements1"  type="text" name="bio" onChange={this.bioChangeHandler}/>
                                </div>
                            </div>
                            <div class="">
                            <br/>
                                <div class="elements" style={{display:"flex"}}>
                                    <div class="inner-element">
                                    <span class="label">City</span>
                                    <input class="form-control1 elements1" pattern="[A-Z]*||[a-z]*" type="text" name="city" onChange={this.addChangeHandler}/>
                                    </div>
                                    <div class="inner-element">
                                    <span class="label">State</span>
                                    <input class="form-control1 elements1" pattern="[A-Z]*||[a-z]*" type="text" name="city" onChange={this.addChangeHandler}/>
                                    </div>
                                    <div class="inner-element">
                                    <span class="label">Zipcode</span>
                                    <input class="form-control1 elements1" pattern="[0-9]*" type="text" name="city" onChange={this.addChangeHandler}/>
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <br />
                                <button class="button" style={{width:"150px"}}>Save Changes</button>
                                <br /><br />
                                {/* <button class="btn btn-primary col-md-12 button" onClick={this.submitSignup}>Create your account</button> */}
                            </div>


                        
                    </div>
                </form>
                <br /><br />
            </div>



        )
    }

}

export default editProfile;

