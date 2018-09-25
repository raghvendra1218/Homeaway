import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import LoginNavbar from '../LoginNavbar/LoginNavbar';
import './postproperty.css';
import $ from 'jquery';
import Location from './Location';
import Welcome from './Welocome';
import Details from './Details';
import Photos from './Photos';
import Pricing from './Pricing';
import Availability from './Availability';

class PostProperty extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount = () => {
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
        });
    }

    render() {
        // redirect based on successful login
        let redirectVar = null;
        if (sessionStorage.getItem("userEmail") === null) {
            redirectVar = <Redirect to="/ownerlogin" />
            return (redirectVar);
        } else {
            return (
                <div>
                    <LoginNavbar/>
                    <div className="wrapper">
                        <nav id="sidebar">
                            <div id = "sidebarCollapse" className="sidebar-header" style={{paddingTop:"50px", paddingBottom: "0px"}}>
                                <h3 style= {{fontSize: "25px"}}>Property Details</h3>
                                <strong>PD</strong>
                            </div>
                            <ul className="list-unstyled components">
                                <li className= "active">
                                    <a href="#welcome" data-toggle="tab">
                                        <i className="fa fas fa-home"></i>
                                        Welcome
                                    </a>
                                </li>
                                <li>
                                    <a href="#location" data-toggle="tab">
                                    <i class="fa fas fa-location-arrow"></i>
                                        Location
                                     </a>
                                </li>
                                <li>    
                                    <a href="#details" data-toggle="tab">
                                        <i className="fa fas fa-copy"></i>
                                        Details
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#photos">
                                        <i className="fa fas fa-image"></i>
                                        Photos
                                    </a>
                                </li>
                                <li>
                                    <a data-toggle="tab" href="#pricing">
                                    <i class="fa far fa-credit-card"></i>
                                        Pricing
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <div className="col-sm-10">
                            <div id = "side" className="tab-content">
                                <div id="welcome" className="tab-pane fade in active">
                                    <Welcome />
                                </div>
                                <div id="location" className="tab-pane fade" >
                                    <Location />
                                </div>
                                <div id="details" className="tab-pane fade">
                                    <Details />
                                </div>
                                <div id="photos" className="tab-pane fade" >
                                    <Photos />
                                </div>
                                <div id="pricing" className="tab-pane fade">
                                    <Pricing />
                                </div>
                                {/* <div id = "welcome" className="tab-pane fade in active" role = "tabpanel">
                                    <Availability/>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default PostProperty;