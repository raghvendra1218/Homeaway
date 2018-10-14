import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import LoginNavbar from '../LoginNavbar/LoginNavbar';
import * as Validate from '../../Validations/Validation';

class OwnerLogin extends Component {
    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            userDetails : {
                firstName: "",
                lastName: "",
                email : "",
                password : "",
                isTraveler: false,
                authFlag : false
            },
            messagediv: ''
        }
        // Bind the handlers to this class
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.emailChangeHandler = this.emailChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }


    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            userDetails : {
                ...this.state.userDetails,
                authFlag : false
            }
        })
    }

    //email change handler to update state variable with the text entered by the user
    emailChangeHandler = (e) => {
        const userEmail = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                email : userEmail
            }
        })
    }

    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        const userPassword = e.target.value;
        this.setState({
            userDetails: {
                ...this.state.userDetails,
                password : userPassword
            }
        })
    }
    
    //submit Login handler to send a request to the node backend
    submitLogin = (event) => {
    // var headers = new Headers();
    //prevent page from refresh
    event.preventDefault();
    let valid = Validate.login(this.state.userDetails);
    if(valid ==='') {
        const data = {
            userDetails: {
                ...this.state.userDetails,
                email : this.state.userDetails.email,
                password : this.state.userDetails.password,
                isTraveler: false
            }
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response2 => {
                console.log("Status Code for post: ",response2.status);
                if(response2.status === 200){
                //     axios.get('http://localhost:3001/userdetail',{ params: {email:this.state.userDetails.email, isTraveler: this.state.userDetails.isTraveler}})
                //     .then((response) => {
                //         console.log("Status code for get: ", response.status);
                //         if(response.status === 200) {
                //             //update the state with the response data
                //             const userFirstName = response.data[0].FIRST_NAME;
                //             const userLastName = response.data[0].LAST_NAME;
                //             const userID = response.data[0].ID;
                //             const phoneNumber = response.data[0].PHONE_NUMBER;
                //             const userEmail = this.state.userDetails.email;
                //             sessionStorage.setItem('userEmail', userEmail);
                //             sessionStorage.setItem('userFirstName', userFirstName);
                //             sessionStorage.setItem('userLastName', userLastName);
                //             sessionStorage.setItem('userID', userID);
                //             sessionStorage.setItem('phoneNumber', phoneNumber);
                //             this.setState({
                //                 userDetails: {
                //                     ...this.state.userDetails,
                //                     firstName : userFirstName,
                //                     lastName : userLastName
                //                 }
                //             });
                //         }
                //     });
                let loggedInUserDetails = JSON.parse(response2.data)[0];
                const userEmail = this.state.userDetails.email;
                const isTraveler = this.state.userDetails.isTraveler;
                const userFirstName = loggedInUserDetails.FIRST_NAME;
                const ownerId = loggedInUserDetails.OWNER_ID;
                sessionStorage.setItem('userEmail',  userEmail);
                sessionStorage.setItem('isTraveler',  isTraveler);
                sessionStorage.setItem('userFirstName', userFirstName);
                sessionStorage.setItem('ownerId', ownerId);
                this.setState({
                    ...this.state.userDetails,
                    firstName: userFirstName,
                    authFlag : true
                });
                } else {
                    alert(response2.data.message);
                    this.setState({
                        ...this.state.userDetails,
                        authFlag : false
                    })
                }
            })
            .catch(err=>{
                alert(err.response2.data.message);
            });
    } else {
        this.setState({
            ...this.state,
            messagediv: valid
        });
        event.preventDefault();
    }
}

    render(){
        let message = null;
        if(this.state.messagediv !== ''){
            message = (
                <div className="clearfix">
                    <div className="alert alert-info text-center" role="alert">{this.state.messagediv}</div>
                </div>
            );
        } else {
            message = (
                <div></div>
            );
        }
        // redirect based on successful login
        let redirectVar = null;
        // if(cookie.load('cookie')){
        if(sessionStorage.getItem("userEmail") !== null){
            redirectVar = <Redirect to= "/"/>
            return(redirectVar);
        } else {
            return(
                <div>
                    {redirectVar}
                    <LoginNavbar/>
                    <div className = "row">
                        {message}
                    </div>
                    <div id="container-login" className="container">
                        <div id="login-container" className="row" style={{height: "340px"}}>
                            <div className="col-md-6 col-sm-6 hidden-xs center" style= {{paddingTop: '5px', paddingLeft:"12%"}}>
                                <img id="personyzeContent"  className ="ownerlogin-image" src= "https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png"/>
                            </div>
                            <div id="formContainer" className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
                                <span id="loginBannerURL" style={{display:"none"}}></span>
                                <div className="login-form panel panel-dashboard personyze">
                                    <div className="panel-heading">
                                        <p className="panel-title personyze" id="loginTitle">Owner Login</p>
                                        <div className="footer text-footer text-center traveler"><br></br>
                                            <div style={{textAlign: "left"}}>
                                                <span>
                                                    Need an account?
                                                </span>
                                                <a href="http://localhost:3000/ownersignup">&nbsp;
                                                    Sign Up
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="panel-body">
                                        <form id="login-form" name="fm1" className="singleSubmit">
                                            <div className="ui-widget"></div>
                                            <fieldset className ="travelerFieldSet">
                                                <div className="has-feedback form-group floating-label" data-toggle="label">
                                                    <label For="username" className="hidden">Email</label>
                                                    <input id="username" onChange = {this.emailChangeHandler} name="email" className="form-control input-lg-login" tabindex="1"
                                                        placeholder="Email address" type="email" size="20" autocomplete="on" autoFocus/>
                                                </div>
                                                <div className="has-feedback form-group floating-label" data-toggle="label">
                                                    <label for="password" className="hidden">Password</label>
                                                    <input id="password" onChange = {this.passwordChangeHandler} name="password" className="form-control input-lg-login" tabindex="2"
                                                        placeholder="Password" type="password" size="20" autocomplete="off" />
                                                </div>
                                                <div className="form-group">
                                                    <span id="urlForgotPassword" style={{display:"none"}}>/forgotPassword?</span>
                                                    <a href="https://cas.homeaway.com/auth/homeaway/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fhaod%2Fauth%2Fsignin.html"
                                                        id="forgotPasswordUrl" className="forgot-password">Forgot password?</a>
                                                </div>
                                                <div>
                                                    <input type="submit" onClick= {this.submitLogin} className="btn btn-primarylogin btn-lg btn-block" value="Log In" id="form-submit" tabindex="4" />
                                                    <div className="remember checkbox">
                                                        <label for="rememberMe">
                                                            <input id="rememberMe" name="rememberMe" tabindex="3" type="checkbox" value="true" /><input
                                                                type="hidden" name="_rememberMe" value="on" />
                                                            Keep me signed in
                                                        </label>
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <input type="hidden" name="locale" value="en_US" />
                                        </form>
                                    </div>
                                    <div className="panel-footer">
                                        <div className="footer text-footer text-center">
                                            <div>
                                                <span>
                                                    Want to list your property?
                                                </span>
                                                <a href="https://www.homeaway.com/order/benefits" target="_blank" rel="noopener noreferrer">
                                                    Learn More
                                                </a>
                                            </div>
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
}

export default OwnerLogin;
