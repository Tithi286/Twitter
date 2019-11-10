import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Signup from './signup/userSignup'
import Launchpage from './users/launchpage'

class Main extends Component {
    render(){
        return(
            <div>
            <Route path="/signup" component={Signup}/>
            <Route path="/launchpage" component={Launchpage}/>
            </div>
            )
    }
}
//Export The Main Component
export default Main;