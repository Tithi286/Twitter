import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Signup from './signup/userSignup'
import Login from './login/login';
import Launchpage from './users/launchpage'
import UserHome from './userFeed/userHome'
import Explore from './userFeed/explore'
import Messages from './userFeed/messages'
import Bookmarks from './userFeed/bookmarks'
import Lists from './userFeed/lists'
import Profile from './userFeed/profile'
import Analytics from './userFeed/analytics'
import Settings from './userFeed/settings'
import tweets from './userFeed/tweets';
import Inbox from './chat/inbox';
import Newmessages from './chat/newmessage';

class Main extends Component {
    render() {
        return ( 
            <div>
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/launchpage" component={Launchpage} />
                <Route path="/home" component={UserHome} />
                <Route path="/explore" component={Explore} />
                <Route path="/messages" component={Messages} />
                <Route path="/bookmarks" component={Bookmarks} />
                <Route path="/lists" component={Lists} />
                <Route path="/profile" component={Profile} />
                <Route path="/analytics" component={Analytics} />
                <Route path="/settings" component={Settings} />
                <Route path="/tweets" component={tweets} />
                <Route path="/inbox" component={Inbox} />
                <Route path="/newmessages" component={Newmessages} />

            </div>
        )
    }
}
//Export The Main Component
export default Main;