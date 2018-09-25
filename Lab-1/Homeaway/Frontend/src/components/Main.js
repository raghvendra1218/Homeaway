import React, {Component} from 'react';
import {Route} from 'react-router-dom';

//Import Components
import Home from './Home/Home';
import EditProfile from './EditProfile/EditProfile';
import LoginNavbar from './LoginNavbar/LoginNavbar';
import OwnerLogin from './OwnerLogin/OwnerLogin';
import OwnerSignup from './OwnerSignup/OwnerSignup';
import TravelerLogin from './TravelerLogin/TravelerLogin';
import TravelerSignup from './TravelerSignup/TravelerSignup';
import PostProperty from './PostProperty/PostProperty';

// Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={Home}/>
                <Route path="/travelersignup" component={TravelerSignup}/>
                <Route path="/ownersignup" component={OwnerSignup}/>
                <Route path="/travelerlogin" component={TravelerLogin}/>
                <Route path="/ownerlogin" component={OwnerLogin}/>
                <Route path="/editprofile" component={EditProfile}/>
                <Route path="/postproperty" component={PostProperty}/>
                {/* <Route path="/create" component={Create}/> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;