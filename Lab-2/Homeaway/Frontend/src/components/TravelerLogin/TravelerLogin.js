import React, { Component } from 'react';
import LoginNavbar from '../LoginNavbar/LoginNavbar';
import axios from 'axios';
import {Redirect} from 'react-router';
import './login.css'
import * as Validate from '../../Validations/Validation';
import {loginData} from '../../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

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
                authFlag : false,
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
        if(valid ===''){
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
                        let loggedInUserDetails = JSON.parse(response2.data);
                        let user = {
                            userEmail:this.state.userDetails.email,
                            userFirstName:loggedInUserDetails.firstname,
                            travelerId:loggedInUserDetails._id,
                            isTraveler:this.state.userDetails.isTraveler

                        }
                        this.props.loginData(true, user);
                        this.props.history.push('/');
                        
                        // const userEmail = this.state.userDetails.email;
                        // const isTraveler = this.state.userDetails.isTraveler;
                        // const userFirstName = loggedInUserDetails.FIRST_NAME;
                        // const travelerId = loggedInUserDetails.TRAVELER_ID;
                        // sessionStorage.setItem('userEmail',  userEmail);
                        // sessionStorage.setItem('isTraveler',  isTraveler);
                        // sessionStorage.setItem('userFirstName', userFirstName);
                        // sessionStorage.setItem('travelerId', travelerId);
                        // this.setState({
                        //     ...this.state.userDetails,
                        //     firstName: userFirstName,
                        //     authFlag : true
                        // });
                    } else {
                        alert(response2.data.message);
                        this.setState({
                            ...this.state.userDetails,
                            authFlag : false
                        })
                    }
                })
                .catch(err=>{
                    alert(err.message);
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
        if(this.props.loginData.isLogged){
            redirectVar = <Redirect to= "/"/>
            return(redirectVar);
        }
        else {
            return(
                <div>
                    {redirectVar}
                    <LoginNavbar/>
                    <div className = "row">
                        {message}
                    </div>
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
function mapDispatchToProps(dispatch) {
    return {
        loginData: (flag,user) => dispatch(loginData(flag, user)),
    };
}

function mapStateToProps(state) {
    return{
        loginData : state.loginData,
    };
}
const travelerLogin = withRouter(connect(mapStateToProps, mapDispatchToProps)(TravelerLogin));
export default travelerLogin;
