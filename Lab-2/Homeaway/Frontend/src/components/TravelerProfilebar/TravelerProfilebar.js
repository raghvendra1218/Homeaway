import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import {CONSTANTS} from '../../Constants';

class TravelerProfilebar extends Component {
    render(){
        return(
            <div>
                <Navbar/>
                <div className="js-trav-home-header trav-home-header">
                    <section className="header-section">
                        <div className="trav-home-navbar js-trav-home-navbar hidden-xs">
                            <div className="container">
                                <ul className="nav nav-underline nav-underline--left" role="tablist">
                                    <li role="presentation" className="js-th-nav-inbox">
                                        <a href={CONSTANTS.ROOTURL+'/inbox'} data-bypass="true">Inbox</a>
                                    </li>
                                    <li role="presentation" className="js-th-nav-booked">
                                        <a href={CONSTANTS.ROOTURL+'/bookings'} data-bypass="true">My Trips</a>
                                    </li>
                                    <li role="presentation" className="js-th-nav-profile">
                                        <a href={CONSTANTS.ROOTURL+'/editprofile'}>Profile</a>
                                    </li>
                                    <li role="presentation" className="js-th-nav-settings">
                                        <a href={CONSTANTS.ROOTURL+'/account'}>Account</a>
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
 