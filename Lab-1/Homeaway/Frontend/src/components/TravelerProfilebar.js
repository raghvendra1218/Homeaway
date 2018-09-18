import React, { Component } from 'react';
import LoginNavbar from './LoginNavbar';

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
                                        <a href="/traveler/th/inbox" data-bypass="true">Inbox</a>
                                    </li>
                                    <li role="presentation" className="js-th-nav-booked">
                                        <a href="/traveler/th/bookings" data-bypass="true">My Trips</a>
                                    </li>
                                    <li role="presentation" className="js-th-nav-profile">
                                        <a href="/traveler/profile/edit">Profile</a>
                                    </li>
                                    <li role="presentation" className="js-th-nav-settings">
                                        <a href="/traveler/account">Account</a>
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
 