import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../Home/home.css';

class Navbar extends Component {
    constructor(props) {
        super()
        this.state = {
            isTraveler: JSON.parse(sessionStorage.getItem('isTraveler'))
        }
    }
    //handle logout to destroy the session
    handleLogout = () => {
        let loggedInUser = sessionStorage.getItem('userEmail');
        sessionStorage.clear();
        alert(`${loggedInUser} logged out successfully.`);
        console.log("User logged out Successfully.");
    }
    render() {
        let userLogin = null;
        if(sessionStorage.getItem('userEmail') !== null && this.state.isTraveler){
            console.log('Able to read session.');
            userLogin = (
                <div className="dropdown" tabindex="-1" role="presentation">
                <button aria-haspopup="true" aria-expanded="false" className="site-header-nav__toggle Dropdown__toggle" id="dropdownMenuButton"
                    label="Login" data-toggle="dropdown">
                    {sessionStorage.getItem('userFirstName').toUpperCase()}<span aria-hidden="true" className="caret"></span>
                </button>
                <div class="dropdown-menu" aria-labelledby="site-header__login">
                    <ul>
                        <li class="dropdown-item"><Link to="/inbox"><span className="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;&nbsp;Inbox </Link></li>
                        <li class="dropdown-item"><Link to="/travelertrips"><span className="glyphicon glyphicon-briefcase"></span>&nbsp;&nbsp;&nbsp;My trips</Link></li>
                        <li class="dropdown-item"><Link to="/editprofile"><span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;&nbsp;My profile</Link></li>
                        <li class="dropdown-item"><Link to="/account"><span className="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;&nbsp;Account</Link></li>
                        <li class="dropdown-item"><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;&nbsp;Logout</Link></li>
                    </ul>
                </div>
            </div>
            );
        } else if(sessionStorage.getItem('userEmail') !== null && !this.state.isTraveler) {
            console.log('Able to read session.');
            userLogin = (
                <div className="dropdown" tabindex="-1" role="presentation">
                <button aria-haspopup="true" aria-expanded="false" className="site-header-nav__toggle Dropdown__toggle" id="dropdownMenuButton"
                    label="Login" data-toggle="dropdown">
                    {sessionStorage.getItem('userFirstName').toLocaleUpperCase()}<span aria-hidden="true" className="caret"></span>
                </button>
                <div class="dropdown-menu" aria-labelledby="site-header__login">
                    <ul>
                        <li class="dropdown-item"><Link to="/inbox"><span className="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;&nbsp;Inbox </Link></li>
                        <li class="dropdown-item"><Link to="/ownerpostings"><span className="glyphicon glyphicon-tent"></span>&nbsp;&nbsp;&nbsp;My postings</Link></li>
                        <li class="dropdown-item"><Link to="/editprofile"><span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;&nbsp;My profile</Link></li>
                        <li class="dropdown-item"><Link to="/account"><span className="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;&nbsp;Account</Link></li>
                        <li class="dropdown-item"><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;&nbsp;Logout</Link></li>
                    </ul>
                </div>
            </div>
            ); 
        } else {
            console.log("unable to read session");
            userLogin = (
                <div id="login" className="dropdown" tabindex="-1" role="presentation">
                    <button aria-haspopup="true" aria-expanded="false" className="site-header-nav__toggle Dropdown__toggle" id="dropdownMenuButton"
                        label="Login" data-toggle="dropdown">
                        Login<span aria-hidden="true" className="caret"></span>
                    </button>
                    <div class="dropdown-menu" aria-labelledby="site-header__login">
                        <ul>
                            <li class="dropdown-item"><Link to="/travelerlogin"><span className="glyphicon glyphicon-log-in"></span>&nbsp;&nbsp;&nbsp;Traveler Login</Link></li>
                            <li class="dropdown-item"><Link to="/ownerlogin"><span className="glyphicon glyphicon-log-in"></span>&nbsp;&nbsp;&nbsp;Owner Login</Link></li>
                        </ul>
                    </div>
                </div>
            );
        }
        return(
            <div>
            <div className="Application__header">
                <div className="site-header border-border-color homeaway_us">
                    <a className="site-header__tray-toggle hidden-md hidden-lg" role="button" tabindex="0">
                        <span className="SVGIcon SVGIcon--24px"><svg data-id="SVG_MENU__24" width="24"
                            height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 5H3M21 12H3M21 19H3"></path>
                            </g></svg>
                        </span>
                    </a>
                    <div className="site-header-logo">
                        <a className="site-header-logo__link flex-item" href="http://localhost:3000" title="HomeAway.com"><img alt="HomeAway logo" className="site-header-logo__img img-responsive" role="presentation"
                            src={"//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"} /></a>
                    </div>
                    <div className="site-header__flex-spacer"></div>
                    <div className="site-header-nav" role="navigation">
                        <div className="site-header-flags site-header-flags--columns dropdown" tabindex="-1">
                            <button aria-expanded="false" aria-haspopup="true" className="site-header-flags__toggle" id="site-header-flags">
                                <span className="sr-only">United States</span><i aria-hidden="true" className="flag-us"></i>
                            </button>
                            <div aria-labelledby="site-header-flags" className="site-header-flags__dropdown-menu dropdown-menu dropdown-menu-right fade" role="menu"><a className="site-header__link site-header-flags__flag us" data-bypass="true"
                                data-country-code="us" href="https://www.homeaway.com/" role="menuitem"><i aria-hidden="true"
                                    className="site-header-flags__flag-icon flag-us"></i>
                                <span className="site-header-flags__flag-text">United States</span></a>
                            </div>
                        </div>
                        <a className="site-header-nav__link" data-bypass="true" href="https://www.homeaway.com/tripboard">
                            <div className="site-header-scratchpad" data-bypass="true">
                                <div className="site-header-scratchpad__label">Trip Boards</div>
                            </div>
                        </a>
                        {userLogin}
                        <div className="Dropdown site-header-nav__dropdown" tabindex="-1" role="presentation"><button aria-expanded="false"
                            aria-haspopup="true" className="site-header-nav__toggle Dropdown__toggle" id="site-header__help" label="Help">Help
                    <span aria-hidden="true" className="caret"></span></button>
                            <ul className="Dropdown__menu Dropdown__menu--right" role="menu" aria-labelledby="site-header__help">
                                <li role="none"><a data-bypass="true" href="https://help.homeaway.com/" role="menuitem">Visit help
                            center</a></li>
                                <li className="divider"></li>
                                <li className="dropdown-header">Travelers</li>
                            </ul>
                        </div>
                    </div>
                    {(!this.state.isTraveler) ?
                        <div>
                            <a className="site-header-list-your-property btn btn-default" data-bypass="true" href="http://localhost:3000/postproperty">Post your property</a>
                        </div> :
                        <div>
                            <a className="site-header-list-your-property btn btn-default" data-bypass="true" href="http://localhost:3000">Post your property</a>
                        </div>
                    }
                    <div className="site-header-birdhouse">
                        <div className="site-header-birdhouse__toggle" data-toggle="dropdown" role="button" tabindex="0"><img alt="HomeAway birdhouse"
                            className="site-header-birdhouse__image" role="presentation" src={"//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"} />
                            <div className="site-header-birdhouse__tagline">Our<br></br>Family of<br></br> Brands</div>
                        </div>
                        <div className="site-header-birdhouse__dropdown-menu dropdown-menu fade">
                            <p>HomeAway is the world leader in vacation rentals. We offer the largest selection of properties for
                                any travel occasion and every budget. We're committed to helping families and friends find a
                    perfect vacation rental to create unforgettable travel experiences together.</p>
                            <div><a href="https://www.homeaway.com/info/homeaway/about-the-family">Learn more</a></div>
                            <div className="text-right site-about-logo-wrapper">
                                <img alt="logo" src={"//csvcus.homeaway.com/rsrcs/cdn-logos/1.5.1/bce/brand/homeaway/logo-simple.svg"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default Navbar;