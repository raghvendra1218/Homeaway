import React, { Component } from 'react';
import LoginNavbar from '../LoginNavbar/LoginNavbar';
import axios from 'axios';
import {Redirect} from 'react-router';
import './login.css'

//Define a Login Component
class TravelerLogin extends Component{
    //call the constructor method
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
                isTraveler: true,
                authFlag : false
            }
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
    submitLogin = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            userDetails: {
                ...this.state.userDetails
            }
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.post('http://localhost:3001/login',data)
            .then(response2 => {
                console.log("Status Code for post: ",response2.status);
                if(response2.status === 200){
                    // axios.get('http://localhost:3001/userdetail',{ params: {email:this.state.userDetails.email, isTraveler: this.state.userDetails.isTraveler}})
                    // .then((response) => {
                    //     console.log("Status code for get: ", response.status);
                    //     if(response.status === 200) {
                    //         //update the state with the response data
                    //             const userFirstName = response.data[0].FIRST_NAME;
                    //             const userLastName = response.data[0].LAST_NAME;
                    //             const userID = response.data[0].ID;
                    //             const aboutMe = response.data[0].ABOUT_ME;
                    //             const city = response.data[0].CITY;
                    //             const country = response.data[0].COUNTRY;
                    //             const school = response.data[0].SCHOOL;
                    //             const company = response.data[0].COMPANY;
                    //             const hometown = response.data[0].HOMETOWN;
                    //             const languages = response.data[0].LANGUAGES;
                    //             const gender = response.data[0].GENDER;
                    //             const phoneNumber = response.data[0].PHONE_NUMBER;
                    //             var userEmail = this.state.userDetails.email;
                    //             sessionStorage.setItem('userEmail', userEmail);
                    //             sessionStorage.setItem('userFirstName', userFirstName);
                    //             sessionStorage.setItem('userLastName', userLastName);
                    //             sessionStorage.setItem('userID', userID);
                    //             sessionStorage.setItem('aboutMe', aboutMe);
                    //             sessionStorage.setItem('city', city);
                    //             sessionStorage.setItem('country', country);
                    //             sessionStorage.setItem('school', school);
                    //             sessionStorage.setItem('company', company);
                    //             sessionStorage.setItem('hometown', hometown);
                    //             sessionStorage.setItem('languages', languages);
                    //             sessionStorage.setItem('gender', gender);
                    //             sessionStorage.setItem('phoneNumber', phoneNumber);
                    //             this.setState({
                    //                 userDetails: {
                    //                     ...this.state.userDetails,
                    //                     firstName : userFirstName,
                    //                     lastName : userLastName
                    //                 }
                    //             });
                    //             // console.log("Value of State", JSON.stringify(this.state.userDetails));
                    //             // console.log(`Response Data: ${response.data}`);
                    //             // console.log(`Response Data FirstName : ${response.data[0].FIRST_NAME}`);
                    //             // console.log(`FirstName: ${this.state.userDetails.firstName}`);
                    //     }
                    // });
                    let loggedInUserDetails = JSON.parse(response2.data)[0];
                    const userEmail = this.state.userDetails.email;
                    const isTraveler = this.state.userDetails.isTraveler;
                    const userFirstName = loggedInUserDetails.FIRST_NAME;
                    const userID = loggedInUserDetails.ID;
                    sessionStorage.setItem('userEmail',  userEmail);
                    sessionStorage.setItem('isTraveler',  isTraveler);
                    sessionStorage.setItem('userFirstName', userFirstName);
                    sessionStorage.setItem('userID', userID);
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
    }

    render(){
        // redirect based on successful login
        let redirectVar = null;
        // if(cookie.load('cookie')){
        if(sessionStorage.getItem("userEmail") !== null){
            redirectVar = <Redirect to= "/"/>
            return(redirectVar);
        }
        else {
            return(
                <div>
                    {redirectVar}
                    <LoginNavbar/>
                    <div id="container-login" className="container" >
                        <div id="login-container" className="row">
                            <div className="login-header text-center col-md-12 traveler">
                                <h1 className="hidden-xs">Log in to HomeAway</h1>
                                <div className="footer text-footer text-center traveler">
                                    <div className="">
                                        <span>
                                            Need an account?
                                        </span>
                                        <a href="http://localhost:3000/travelersignup">&nbsp;
                                            Sign Up
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div id="formContainer" className="col-lg-4 col-lg-offset-4 col-md-5 col-md-offset-4 col-sm-6 col-sm-offset-3 col-xs-12">
                                <div className="login-wrapper panel panel-dashboard">
                                    <div className="login-form  traveler">
                                        <div className="panel-heading">
                                            <p className="panel-title">Account login</p>
                                        </div>
                                        <div className="panel-body">
                                            <fieldset id="login-form-fieldset" className="travelerFieldSet">
                                                <div className="field-group traveler">
                                                    <form id="login-form" name="fm1" className="singleSubmit">
                                                        <fieldset>
                                                            <div className="ui-widget">
                                                            </div>
                                                            <div className="has-feedback form-group floating-label" data-toggle="label">
                                                                <label htmlFor="email" className="hidden">Email</label>
                                                                <input id="email" name="email" className="form-control input-lg-login" tabIndex="1" type = "text"
                                                                    placeholder="Email address"  onChange = {this.emailChangeHandler} size="20" autoComplete="on" autoFocus/>
                                                            </div>
                                                            <div className="has-feedback form-group floating-label" data-toggle="label">
                                                                <label htmlFor="password" className="hidden">Password</label>
                                                                <input id="password" name="password" className="form-control input-lg-login" tabIndex="2"
                                                                    placeholder="Password" type="password" onChange = {this.passwordChangeHandler}size="20" autoComplete="off" />
                                                            </div>
                                                            <div className="form-group">
                                                                <span id="urlForgotPassword" style={{ display: "none" }}>/forgotPassword</span>
                                                                <a href="https://cas.homeaway.com/auth/traveler/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fexp%2Fsso%2Fauth%3Flt%3Dtraveler%26context%3Ddef%26service%3D%252F"
                                                                    id="forgotPasswordUrl" className="forgot-password">Forgot password?</a>
                                                            </div>
                                                            <div className="form-group">
                                                                <input type="submit" onClick= {this.submitLogin} className="btn btn-primarylogin btn-lg btn-block" value="Log In" id="form-submit" tabIndex="4" />
                                                                <div className="remember checkbox traveler">
                                                                    <label htmlFor="rememberMe">
                                                                        <input id="rememberMe" name="rememberMe" tabIndex="3" type="checkbox" value="true"/>
                                                                        {/* <input type="hidden" name="_rememberMe" value="on" /> */}
                                                                        Keep me signed in
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            {/* <input type="hidden" name="flowKey" value="e7aa5cb1eae324c06a49cd1353c2e200es1" /> */}
                                                            {/* <input id="dp" name="devicePrint" type="hidden" value="version=1&amp;pm_fpua=mozilla/5.0 (macintosh; intel mac os x 10_13_6) applewebkit/537.36 (khtml, like gecko) chrome/69.0.3497.92 safari/537.36|5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36|MacIntel&amp;pm_fpsc=24|1440|900|793&amp;pm_fpsw=&amp;pm_fptz=-8&amp;pm_fpln=lang=en-US|syslang=|userlang=&amp;pm_fpjv=0&amp;pm_fpco=1" /> */}
                                                            {/* <input type="hidden" name="_eventId" value="submit" /> */}
                                                            {/* <input type="hidden" name="deviceIdKey" id="device-id-key" value="f0ca042d-5be6-40d9-8d4a-36fa091fb70d" /> */}
                                                        </fieldset>
                                                        <input type="hidden" name="locale" value="en_US" />
                                                    </form>
                                                    <div className="centered-hr text-center">
                                                        <span className="text-center"><em>or</em></span>
                                                    </div>
                                                    <div className="facebook">
                                                        <button tabIndex="7" className="third-party-login-button fb-button traveler">
                                                            <div className="login-button-text">
                                                                <span className="logo"><i className=" icon-facebook icon-white pull-left fa fa-facebook" aria-hidden="true"></i></span>
                                                                <span className="text text-center pull-right">
                                                                    Log in with Facebook
                                                                </span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <div className="google">
                                                        <button tabIndex="8" className="third-party-login-button google-button">
                                                            <div className="login-button-text">
                                                                <span className="logo-google"><img className="icon-google pull-left" src={"//csvcus.homeaway.com/rsrcs/cdn-logos/2.3.2/third-party/google/google-color-g.svg"} alt="googlelogo" /></span>
                                                                <span className="text text-center pull-right">
                                                                    Log in with Google
                                                                </span>
                                                            </div>
                                                        </button>
                                                    </div>
                                                    <p id="fb-p" className="facebook text-center traveler">
                                                        <small>We don't post anything without your permission.</small>
                                                    </p>
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
}

export default TravelerLogin;
