import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';


class OwnerLogin extends Component {

        //call the constructor method
        constructor(props){
            //Call the constrictor of Super class i.e The Component
            super(props);
            //maintain the state required for this component
            this.state = {
                email : "",
                password : "",
                isTraveler: false,
                authFlag : false
            }
            //Bind the handlers to this class
            this.emailChangeHandler = this.emailChangeHandler.bind(this);
            this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
            this.submitLogin = this.submitLogin.bind(this);
        }
        //Call the Will Mount to set the auth Flag to false
        componentWillMount(){
            this.setState({
                authFlag : false
            })
        }
        //email change handler to update state variable with the text entered by the user
        emailChangeHandler = (e) => {
            this.setState({
                email : e.target.value
            })
        }
        //password change handler to update state variable with the text entered by the user
        passwordChangeHandler = (e) => {
            this.setState({
                password : e.target.value
            })
        }
        //submit Login handler to send a request to the node backend
        submitLogin = (e) => {
            // var headers = new Headers();
            //prevent page from refresh
            e.preventDefault();
            const data = {
                email : this.state.email,
                password : this.state.password,
                isTraveler: false
            }
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/login',data)
                .then(response => {
                    console.log("Status Code : ",response.status);
                    if(response.status === 200){
                        this.setState({
                            authFlag : true
                        })
                    }else{
                        this.setState({
                            authFlag : false
                        })
                    }
                });
        }

        render(){
            // redirect based on successful login
            let redirectVar = null;
            if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>
        }
            const Background = "https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png";
            // ../OwnerLoginImage.png";
            // "https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png"
            return(
                <div>
                    {redirectVar}
                    {/* <LoginNavbar/> */}
                    <div id="container" className="container">
                        <div id="login-container" className="row" style={{height: "340px"}}>
                            <div className="col-md-6 col-sm-6 hidden-xs"><a id="personyzeContent" className ="ownerlogin-image"></a></div>
                            <div id="formContainer" className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
                                <span id="loginBannerURL" style={{display:"none"}}></span>
                                <div className="login-form panel panel-dashboard personyze">
                                    <div className="panel-heading">
                                        <p className="panel-title personyze" id="loginTitle">Owner Login</p>
                                    </div>
                                    <div className="panel-body">
                                        <form id="login-form" name="fm1" className="singleSubmit">
                                            <div className="ui-widget"></div>
                                            <fieldset>
                                                <div className="has-feedback form-group floating-label" data-toggle="label">
                                                    <label For="username" className="hidden">Email</label>
                                                    <input id="username" onChange = {this.emailChangeHandler} name="email" className="form-control input-lg" tabindex="1"
                                                        placeholder="Email address" type="email" size="20" autocomplete="on" />
                                                </div>
                                                <div className="has-feedback form-group floating-label" data-toggle="label">
                                                    <label for="password" className="hidden">Password</label>
                                                    <input id="password" onChange = {this.passwordChangeHandler} name="password" className="form-control input-lg" tabindex="2"
                                                        placeholder="Password" type="password" size="20" autocomplete="off" />
                                                </div>
                                                <div className="form-group">
                                                    <span id="urlForgotPassword" style={{display:"none"}}>/forgotPassword?</span>
                                                    <a href="https://cas.homeaway.com/auth/homeaway/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fhaod%2Fauth%2Fsignin.html"
                                                        id="forgotPasswordUrl" className="forgot-password">Forgot password?</a>
                                                </div>
                                                <div>
                                                    <input type="submit" onClick= {this.submitLogin} className="btn btn-primary btn-lg btn-block" value="Log In" id="form-submit" tabindex="4" />
                                                    <div className="remember checkbox">
                                                        <label for="rememberMe">
                                                            <input id="rememberMe" name="rememberMe" tabindex="3" type="checkbox" value="true" /><input
                                                                type="hidden" name="_rememberMe" value="on" />
                                                            Keep me signed in
                                                        </label>
                                                    </div>
                                                </div>
                                                {/* <input type="hidden" name="flowKey" value="ee393b345a13e47789021c307a2c064a9s1" />
                                                <input id="dp" name="devicePrint" type="hidden" value="version=1&amp;pm_fpua=mozilla/5.0 (macintosh; intel mac os x 10_13_6) applewebkit/537.36 (khtml, like gecko) chrome/69.0.3497.92 safari/537.36|5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36|MacIntel&amp;pm_fpsc=24|1440|900|793&amp;pm_fpsw=&amp;pm_fptz=-8&amp;pm_fpln=lang=en-US|syslang=|userlang=&amp;pm_fpjv=0&amp;pm_fpco=1" />
                                                <input type="hidden" name="_eventId" value="submit" />
                                                <input type="hidden" name="deviceIdKey" id="device-id-key" value="3c558b8e-4b04-4da0-a3b2-f2ad4c5baa3a" /> */}
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

export default OwnerLogin;
