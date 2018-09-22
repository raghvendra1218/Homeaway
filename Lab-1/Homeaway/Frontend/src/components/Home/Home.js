import React, { Component } from 'react';
import './home.css';
import $ from 'jquery';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        };
    }


    componentDidMount = () => {
        $('#login').on('click', function(){
            $("#login").toggleClass("Dropdown--open");
            $("#login-ul").toggleClass("--open Dropdown__menu");
        });
    }


    render(){
        return(
            <div>
                <div className ="HeroImage" style={{backgroundImage: "url('http://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.30/images/homepage/jumbotron/ptaHpNextHeroImage/large.jpg')", height: "100%", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
                    <div class="HeroImage__content">
                        <div style={{ transition: "opacity 300ms ease-in-out 0s;", opacity: "1;" }}>
                            <div className="site-header site-header--inverse border-border-color homeaway_us">
                                <a className="site-header__tray-toggle hidden-md hidden-lg" role="button" tabindex="0">
                                    <span className="SVGIcon SVGIcon--24px"><svg data-id="SVG_MENU__24" width="24"
                                        height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <g fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M21 5H3M21 12H3M21 19H3"></path>
                                        </g></svg>
                                    </span>
                                </a>
                                <div className="site-header-logo">
                                    <a className="site-header-logo__link flex-item" href="https://www.homeaway.com/" title="HomeAway.com"><img alt="HomeAway logo" className="site-header-logo__img img-responsive" role="presentation"
                                        src={"//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"} /></a>
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
                                    <div className="dropdown" tabindex="-1" role="presentation">
                                        <button aria-haspopup="true" aria-expanded="false" className="site-header-nav__toggle Dropdown__toggle" id="dropdownMenuButton"
                                            label="Login" data-toggle="dropdown">
                                            UserName<span aria-hidden="true" className="caret"></span>
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="site-header__login">
                                            <a class="dropdown-item" href="#">&nbsp;<span className="glyphicon glyphicon-envelope"></span>&nbsp;&nbsp;&nbsp;Inbox</a><br></br>
                                            <a class="dropdown-item" href="#">&nbsp;<span className="glyphicon glyphicon-briefcase"></span>&nbsp;&nbsp;&nbsp;My trips</a><br></br>
                                            <a class="dropdown-item" href="#">&nbsp;<span className="glyphicon glyphicon-user"></span>&nbsp;&nbsp;&nbsp;My profile</a><br></br>
                                            <a class="dropdown-item" href="#">&nbsp;<span className="glyphicon glyphicon-cog"></span>&nbsp;&nbsp;&nbsp;Account</a><br></br>
                                            <a class="dropdown-item" href="#">&nbsp;<span className="glyphicon glyphicon-log-out"></span>&nbsp;&nbsp;&nbsp;Logout</a><br></br>
                                        </div>
                                    </div>
                                    <div id="login" className="dropdown" tabindex="-1" role="presentation">
                                        <button aria-haspopup="true" aria-expanded="false" className="site-header-nav__toggle Dropdown__toggle" id="dropdownMenuButton"
                                            label="Login" data-toggle="dropdown">
                                            Login<span aria-hidden="true" className="caret"></span>
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="site-header__login">
                                            <a class="dropdown-item" href="#">&nbsp;<span className="glyphicon glyphicon-log-in"></span>&nbsp;&nbsp;&nbsp;Traveler Login</a><br></br>
                                            <a class="dropdown-item" href="#">&nbsp;<span className="glyphicon glyphicon-log-in"></span>&nbsp;&nbsp;&nbsp;Owner Login</a>
                                        </div>
                                    </div>
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
                                </div><a className="site-header-list-your-property btn btn-default btn-inverse" data-bypass="true" href="https://www.homeaway.com/lyp?icid=IL___O_Text___top_nav_link_hp">List
                your property</a>
                                <div className="site-header-birdhouse">
                                    <div className="site-header-birdhouse__toggle" data-toggle="dropdown" role="button" tabindex="0"><img alt="HomeAway birdhouse"
                                        className="site-header-birdhouse__image" role="presentation" src={"//csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"} />
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
                    <div className="hidden-xs">
                </div>
                {/*********/}
                    <div className="Jumbotron">
                        <div className="Jumbotron__wrapper">
                            <div className="Jumbotron__content">
                                <h1 className="HeadLine"><span className="HeadLine__text">Book beach houses, cabins,</span><span className="HeadLine__text">condos
                    and more, worldwide</span></h1>
                                <div id="stab-searchbox" className="mobile-inline">
                                    <div className="stab-searchbox">
                                        <form className="js-searchForm " method=" post">
                                        <legend>
                                            <span className="searchbox-title">Search</span>
                                            <i className="icon-close icon-white close-form-xs-modal" aria-hidden="true"></i>
                                        </legend>
                                        <div className="searchbox-input searchbox-input-where-to form-group has-icon">
                                            <span className="twitter-typeahead" style={{ position: "relative;", display: "inline-block;" }}>
                                                <input
                                                    autocomplete="off" type="text" className="form-control js-destination js-launchModal tt-hint"
                                                    tabindex="-1" spellcheck="false" placeholder ="Where do you want to go?" style={{ position: "absolute;", top: "0px;", left: "0px;", borderColor: "transparent;", boxShadow: "none;", opacity: "1;", background: "none 0% 0% auto repeat scroll padding-box border-box rgba(0, 0, 0, 0);" }} dir="ltr" />
                                                <span role="status" aria-live="polite"
                                                    style={{position: "absolute;", padding: "0px;", border: "0px;", height: "1px;", width: "1px;", marginBottom: "-1px;", marginRight: "-1px;", overflow: "hidden;", clip: "rect(0px, 0px, 0px, 0px);", whiteSpace: "nowrap;"}}></span>
                                                </span>
                                            <i className="icon-location form-control-icon" aria-hidden="true"></i>
                                            <label className="sr-only" for="searchKeywords">Where do you want to go?</label>
                                            <input id="searchbox-uuid" className="searchbox-uuid js-uuid" name="uuid" type="hidden" />
                                        </div>
                                        <div className="visible-xs searchbox-xs-btn-affordance pull-left">
                                            <div className="btn btn-lg btn-primary js-launchModal">
                                                <i aria-hidden="true" className="icon-search"></i>
                                            </div>
                                        </div>
                                        <div className="searchbox-input searchbox-input-arrive form-group has-icon">
                                            <input type="date" id="stab-searchbox-start-date" className="form-control js-startDate" name="from-date"
                                                tabindex="2" placeholder="Arrive" />
                                            <i className="icon-calendar form-control-icon" aria-hidden="true"></i>
                                            <label className="sr-only" for="stab-searchbox-start-date">Arrive</label>
                                        </div>
                                        <div className="searchbox-input searchbox-input-depart form-group has-icon">
                                            <input type="date" id="stab-searchbox-end-date" className="form-control js-endDate" name="to-date"
                                                tabindex="3" placeholder="Depart" />
                                            <i className="icon-calendar form-control-icon" aria-hidden="true"></i>
                                            <label className="sr-only" for="stab-searchbox-end-date">Depart</label>
                                        </div>

                                        <div id="pets-search-warning" className="guest-selector-view">
                                            <div id="stab-guest-selector" className="form-group searchbox-input searchbox-select icon-usergroup">
                                                <input autocomplete="off" type="number" min="0" className="text-centre form-control js-guestSelectorInput"
                                                    tabindex="4" placeholder="Guests"/>
                                            </div>
                                        </div>

                                        <button className="btn btn-primary btn-lg searchbox-submit js-searchSubmit" data-effect="ripple" type="button"
                                            tabindex="5" data-loading-animation="true">
                                            Search
                    </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="ValueProps hidden-xs">
                            <ul className="ValueProps__list">
                                <li className="ValueProps__item"><strong className="ValueProps__title">Your whole vacation starts here</strong><span
                                    className="ValueProps__blurb">Choose a rental from the world's best selection</span></li>
                                <li className="ValueProps__item"><strong className="ValueProps__title">Book and stay with confidence</strong><span
                                    className="ValueProps__blurb"><a href="https://www.homeaway.com/info/ha-guarantee/travel-with-confidence?icid=il_o_link_bwc_homepage">Secure
                            payments, peace of mind</a></span></li>
                                <li className="ValueProps__item"><strong className="ValueProps__title">Your vacation your way</strong><span
                                    className="ValueProps__blurb">More space, more privacy, no compromises</span></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div> 
        )
    }

}

export default Home;