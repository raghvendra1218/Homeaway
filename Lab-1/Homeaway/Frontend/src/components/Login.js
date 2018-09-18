import React, { Component } from 'react';
import LoginNavbar from './LoginNavbar';

class Login extends Component {
    render(){
        return(
            <div>
                <LoginNavbar/>
                <div id ="container" className ="container">
            <div id="login-container" className="row">
    <div className="login-header text-center col-md-12 traveler">
        <h1 className="hidden-xs">Log in to HomeAway</h1>
        <div className="footer text-footer text-center traveler">
            {/* <!-- Need to catch possible exceptions for when the properties don't exist --> */}
            <div className="">
                <span>
                    Need an account?
                </span>
                <a href="/auth/traveler/register?service=https%3A%2F%2Fwww.homeaway.com%2Fexp%2Fsso%2Fauth%3Flt%3Dtraveler%26context%3Ddef%26service%3D%252F&amp;requestingBrand=traveler">
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
                            <form id="login-form" name="fm1" className="singleSubmit" action="/auth/traveler/login"
                                method="post">
                                <fieldset>
                                    <div className="ui-widget">
                                    </div>
                                    <div className="has-feedback form-group floating-label" data-toggle="label">
                                        <label for="username" className="hidden">Email</label>
                                        <input id="username" name="username" className="form-control input-lg" tabindex="1"
                                            placeholder="Email address" type="email" value="" size="20" autocomplete="on"/>
                                    </div>
                                    <div className="has-feedback form-group floating-label" data-toggle="label">
                                        <label for="password" className="hidden">Password</label>
                                        <input id="password" name="password" className="form-control input-lg" tabindex="2"
                                            placeholder="Password" type="password" value="" size="20" autocomplete="off"/>
                                    </div>
                                    <div className="form-group">
                                        <span id="urlForgotPassword" style={{display:"none"}}>/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fexp%2Fsso%2Fauth%3Flt%3Dtraveler%26context%3Ddef%26service%3D%252F</span>
                                        <a href="https://cas.homeaway.com/auth/traveler/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fexp%2Fsso%2Fauth%3Flt%3Dtraveler%26context%3Ddef%26service%3D%252F"
                                            id="forgotPasswordUrl" className="forgot-password">Forgot password?</a>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-primary btn-lg btn-block" value="Log In" id="form-submit"
                                            tabindex="4"/>
                                        <div className="remember checkbox traveler">
                                            <label for="rememberMe">
                                                <input id="rememberMe" name="rememberMe" tabindex="3" type="checkbox" value="true"/>
                                                <input type="hidden" name="_rememberMe" value="on"/> 
                                                Keep me signed in
                                            </label>
                                        </div>
                                    </div>
                                    <input type="hidden" name="flowKey" value="e7aa5cb1eae324c06a49cd1353c2e200es1"/>
                                    <input id="dp" name="devicePrint" type="hidden" value="version=1&amp;pm_fpua=mozilla/5.0 (macintosh; intel mac os x 10_13_6) applewebkit/537.36 (khtml, like gecko) chrome/69.0.3497.92 safari/537.36|5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36|MacIntel&amp;pm_fpsc=24|1440|900|793&amp;pm_fpsw=&amp;pm_fptz=-8&amp;pm_fpln=lang=en-US|syslang=|userlang=&amp;pm_fpjv=0&amp;pm_fpco=1"/>
                                    <input type="hidden" name="_eventId" value="submit"/>
                                    <input type="hidden" name="deviceIdKey" id="device-id-key" value="f0ca042d-5be6-40d9-8d4a-36fa091fb70d"/>
                                </fieldset>
                                <input type="hidden" name="locale" value="en_US"/>
                            </form>
                            <div className="centered-hr text-center">
                                <span className="text-center"><em>or</em></span>
                            </div>
                            <div className="facebook">
                                <button tabindex="7" className="third-party-login-button fb-button traveler">
                                    <div className="login-button-text">
                                        <span className="logo"><i className=" icon-facebook icon-white pull-left fa fa-facebook" aria-hidden="true"></i></span>
                                        <span className="text text-center pull-right">
                                            Log in with Facebook
                                        </span></div>
                                </button>
                            </div>
                            <div className="google">
                                <button tabindex="8" className="third-party-login-button google-button">
                                    <div className="login-button-text">
                                        <span className="logo-google"><img className="icon-google pull-left" src={"//csvcus.homeaway.com/rsrcs/cdn-logos/2.3.2/third-party/google/google-color-g.svg"} alt="googlelogo"/></span>
                                        <span className="text text-center pull-right">
                                            Log in with Google
                                        </span>
                                    </div>
                                </button>
                            </div>
                            <p id="fb-p" className="facebook text-center traveler"><small>We don't post anything without
                                    your permission.</small></p>
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

export default Login;
