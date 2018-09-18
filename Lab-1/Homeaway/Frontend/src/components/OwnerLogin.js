import React, { Component } from 'react';
import LoginNavbar from './LoginNavbar';


class OwnerLogin extends Component {
    render(){
        const Background = "https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png";
        // ../OwnerLoginImage.png";
        // "https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png"
        return(
            <div>
                <LoginNavbar/>
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
                                    <form id="login-form" name="fm1" className="singleSubmit" action="/auth/homeaway/login?service=https%3A%2F%2Fwww.homeaway.com%2Fhaod%2Fauth%2Fsignin.html"
                                        method="post">
                                        <div className="ui-widget">
                                        </div>
                                        <fieldset>
                                            <div className="has-feedback form-group floating-label" data-toggle="label">
                                                <label For="username" className="hidden">Email</label>
                                                <input id="username" name="username" className="form-control input-lg" tabindex="1"
                                                    placeholder="Email address" type="email" value="" size="20" autocomplete="on" />
                                            </div>
                                            <div className="has-feedback form-group floating-label" data-toggle="label">
                                                <label for="password" className="hidden">Password</label>
                                                <input id="password" name="password" className="form-control input-lg" tabindex="2"
                                                    placeholder="Password" type="password" value="" size="20" autocomplete="off" />
                                            </div>
                                            <div className="form-group">
                                                <span id="urlForgotPassword" style={{display:"none"}}>/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fhaod%2Fauth%2Fsignin.html</span>
                                                <a href="https://cas.homeaway.com/auth/homeaway/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fhaod%2Fauth%2Fsignin.html"
                                                    id="forgotPasswordUrl" className="forgot-password">Forgot password?</a>
                                            </div>
                                            <div>
                                                <input type="submit" className="btn btn-primary btn-lg btn-block" value="Log In" id="form-submit"
                                                    tabindex="4" />
                                                <div className="remember checkbox">
                                                    <label for="rememberMe">
                                                        <input id="rememberMe" name="rememberMe" tabindex="3" type="checkbox" value="true" /><input
                                                            type="hidden" name="_rememberMe" value="on" />
                                                        Keep me signed in
                                                    </label>
                                                </div>
                                            </div>
                                            <input type="hidden" name="flowKey" value="ee393b345a13e47789021c307a2c064a9s1" />
                                            <input id="dp" name="devicePrint" type="hidden" value="version=1&amp;pm_fpua=mozilla/5.0 (macintosh; intel mac os x 10_13_6) applewebkit/537.36 (khtml, like gecko) chrome/69.0.3497.92 safari/537.36|5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.92 Safari/537.36|MacIntel&amp;pm_fpsc=24|1440|900|793&amp;pm_fpsw=&amp;pm_fptz=-8&amp;pm_fpln=lang=en-US|syslang=|userlang=&amp;pm_fpjv=0&amp;pm_fpco=1" />
                                            <input type="hidden" name="_eventId" value="submit" />
                                            <input type="hidden" name="deviceIdKey" id="device-id-key" value="3c558b8e-4b04-4da0-a3b2-f2ad4c5baa3a" />
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
