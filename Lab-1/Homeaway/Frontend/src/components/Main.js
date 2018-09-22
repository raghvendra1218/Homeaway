import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Login';
// import LoginNavbar from './LoginNavbar';
// import Home from './Home/Home';
// import Delete from './Delete/Delete';
// import Create from './Create/Create';
// import Navbar from './LandingPage/Navbar';
import LoginNavbar from './LoginNavbar';
import OwnerLogin from './OwnerLogin';
import travelerSignup from './travelerSignup';
import ownerSignup from './ownerSignup';
// Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={LoginNavbar}/>
                <Route path="/travelersignup" component={travelerSignup}/>
                <Route path="/ownersignup" component={ownerSignup}/>
                <Route path="/travelerlogin" component={Login}/>
                <Route path="/ownerlogin" component={OwnerLogin}/>
                {/* <Route path="/home" component={Home}/> */}
                {/* <Route path="/delete" component={Delete}/> */}
                {/* <Route path="/create" component={Create}/> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;