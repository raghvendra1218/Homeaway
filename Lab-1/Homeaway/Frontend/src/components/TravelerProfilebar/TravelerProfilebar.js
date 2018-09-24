import React, { Component } from 'react';
import LoginNavbar from '../LoginNavbar/LoginNavbar';

class TravelerProfilebar extends Component {
    render(){
        return(
            <div>
                <LoginNavbar/>
                <div className="js-trav-home-header trav-home-header">
                    <section className="header-section">
                        <div className="trav-home-navbar js-trav-home-navbar hidden-xs">
                            <div className="container">
                                <ul className="nav nav-underline nav-underline--left" role="tablist">
                                    <li role="presentation" className="js-th-nav-inbox">
                                        <a href="http://localhost:3000/inbox" data-bypass="true">Inbox</a>
                                    </li>
                                    <li role="presentation" className="js-th-nav-booked">
                                        <a href="http://localhost:3000//bookings" data-bypass="true">My Trips</a>
                                    </li>
                                    <li role="presentation" className="js-th-nav-profile">
                                        <a href="http://localhost:3000/editprofile">Profile</a>
                                    </li>
                                    <li role="presentation" className="js-th-nav-settings">
                                        <a href="http://localhost:3000/account">Account</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default TravelerProfilebar;
 