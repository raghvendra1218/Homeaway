import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class ownerSignup extends Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            isTraveler: false,
            isRegistered: false
        }
        //Bind the handlers to this class
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    firstNameChangeHandler = (event) => {
        this.setState({
            ...this.state,
            firstName: event.target.value
        })
    }

    lastNameChangeHandler = (event) => {
        this.setState({
            ...this.state,
            lastName: event.target.value
        })
    }

    emailChangeHandler = (event) => {
        this.setState({
            ...this.state,
            email: event.target.value
        })
    }

    passwordChangeHandler = (event) => {
        this.setState({
            ...this.state,
            password: event.target.value
        })
    }

    signUp =(event)=>{
        //prevent page from refresh
        event.preventDefault();

        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            isTraveler: false
        }

        axios.post('http://localhost:3001/signup',data)
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    ...this.setState,
                    isRegistered : true
                })
            }else{
                this.setState({
                    ...this.state,
                    isRegistered : false
                })
            }
        })
        .catch( error =>{
            console.log("error:", error);
        });

    }


    render(){
        // let redirectVar = null;
        // if(!cookie.load('cookie')){
        //     redirectVar = <Redirect to= "/home"/>
        // }
        // if(this.state.isRegistered) {
        //     return (<Redirect to = "/home"/>)
        // } else {

        // }
        return(
            <div>
                {/* {redirectVar} */}
                <div id = "container" className ="container">
                    <div id="login-container" className="row">
                        <div className="login-header text-center traveler">
                            <h1 className="hidden-xs">Sign up for HomeAway</h1>
                            <div className="footer-top traveler"></div>
                            <div className="footer traveler" Align="center">
                                <div><span>Already have an account?</span><a id="sign-in-link" href="/auth/traveler/login?service=https%3A%2F%2Fwww.homeaway.com%2Fexp%2Fsso%2Fauth%3Flt%3Dtraveler%26context%3Ddef%26service%3D%252F">Log
                                        in</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                            <div className="panel panel-dashboard">
                                <div className="login-wrapper">
                                    <div className="login-form traveler">
                                        <fieldset id="login-form-fieldset" className="travelerFieldSet">
                                            <div className="panel-body">
                                                <form id="login-form" name="fm1" className="singleSubmit">
                                                    <div id="createAccountFields" className="">
                                                        <div id="messages"></div>
                                                        <div className="form-group clearfix">
                                                            <div className="name name-registration traveler">
                                                                <label for="firstName" className="hidden">First name</label>
                                                                <input id="firstName" onChange = {this.firstNameChangeHandler} name="firstName" className="form-control input-lg"
                                                                    tabindex="1" placeholder="First Name" type="text" size="20"
                                                                    autocomplete="on" />
                                                            </div>
                                                            <div className="name name-registration traveler" style={{marginRight:"0px"}}>
                                                                <label for="lastName" className="hidden">Last Name</label>
                                                                <input id="lastName" onChange = {this.lastNameChangeHandler} name="lastName" className="form-control input-lg"
                                                                    tabindex="2" placeholder="Last Name" type="text" size="20"
                                                                    autocomplete="on" />
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="emailAddress" className="hidden">Email Address</label>
                                                            <input id="emailAddress" onChange = {this.emailChangeHandler} name="emailAddress" className="form-control input-lg"
                                                                tabindex="3" placeholder="Email address" type="email" size="20"
                                                                autocomplete="on" />
                                                        </div>
                                                        <div className="form-group">
                                                            <label for="password" className="hidden">Password</label>
                                                            <input id="password" onChange = {this.passwordChangeHandler} name="password" className="form-control input-lg" tabindex="4"
                                                                placeholder="Password" type="password" size="20" autocomplete="off" />
                                                        </div>
                                                        <input tabindex="6" type="submit" onClick ={this.signUp} className="btn btn-primary btn-lg btn-block btn-cas-primary"
                                                            value="Sign Me Up" id="form-submit" />
                                                    </div>
                                                    <button type="button" tabindex="6" className="btn btn-primary btn-lg btn-block btn-cas-primary hidden"
                                                        id="emailRegisterButton" onclick="displayAccountForm(); return false;">
                                                        Sign up with Email
                                                    </button>
                                                    <div className="centered-hr text-center">
                                                        <span className="text-center"><em>or</em></span>
                                                    </div>
                                                    <div className="facebook">
                                                        <button tabindex="7" className="third-party-login-button fb-button traveler">
                                                            <div className="login-button-text">
                                                                <span className="logo"><i className="icon-facebook icon-white pull-left"
                                                                        aria-hidden="true"></i></span>
                                                                <span className="text text-center pull-right">
                                                                    Log in with Facebook
                                                                </span></div>
                                                        </button>
                                                    </div>
                                                    <div className="google">
                                                        <button tabindex="8" className="third-party-login-button google-button">
                                                            <div className="login-button-text">
                                                                <span className="logo-google">
                                                                <img className="icon-google pull-left" src={"//csvcus.homeaway.com/rsrcs/cdn-logos/2.3.2/third-party/google/google-color-g.svg"} alt ="googlelogo"/>
                                                                </span>
                                                                <span className="text text-center pull-right">
                                                                    Log in with Google
                                                                </span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <p id="fb-p" className="facebook text-center traveler"><small>We don't post anything
                                                            without your permission.</small></p>
                                                    <div className="form-group">
                                                        <div className="text-center">
                                                            <label style={{fontSize: "11px;", fontWeight:"normal"}}>By creating an account you
                                                                are accepting our 
                                                                <a href="http://www.homeaway.com/info/about-us/legal/terms-conditions"
                                                                    target="_blank" rel="noopener noreferrer">Terms and Conditions
                                                                </a> and 
                                                                <a href="http://www.homeaway.com/info/about-us/legal/privacy-policy"
                                                                    target="_blank" rel="noopener noreferrer">Privacy Policy
                                                                </a>.
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <input id="uuid" name="uuid" type="hidden" value="" />
                                                    <input type="hidden" name="locale" value="en_US" />
                                                    <input id="riskDeviceId" name="riskDeviceId" type="hidden" value="5d716fc7-a7eb-4e92-add7-ef1ad58db04d" />
                                                </form>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ownerSignup;