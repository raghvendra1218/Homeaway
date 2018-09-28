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
        this.state = {
            propertyDetails : {
                propCountry: "",
                propStreetAddress: "",
                propApartment: "",
                propCity: "",
                propState: "",
                propZip: "",
                propHeadline: "",
                propDescription: "",
                propType: "",
                propNoBedroom: "",
                propGuestCount: "",
                propNoBathroom: "",
                propPhoto1: "",
                propPhoto2: "",
                propPhoto3: "",
                propPhoto4: "",
                propPhoto5: "",
                propCurrency: "",
                propBaseRate: "",
                propAvailDate: "",
                propAvailTillDate: "",
                propIsPosted: false
            }
        }

    }

    componentDidMount = () => {
        $(document).ready(function () {
            $('#sidebarCollapse').on('click', function () {
                $('#sidebar').toggleClass('active');
            });
            //Continue button handle
            $('#continueNext').on('click', function() {
                $('#wc').removeClass('active');
                $('#wc a').attr("aria-expanded","false");
                $('#lc').addClass('active');
                $('#lc a').attr("aria-expanded","true");
            });
            //Next-Location button handle
            $('#next-lc').on('click', function() {
                $('#lc').removeClass('active');
                $('#lc a').attr("aria-expanded","false");
                $('#de').addClass('active');
                $('#de a').attr("aria-expanded","true");
            });
            //Back-Location button handle
            $('#back-lc').on('click', function() {
                $('#lc').removeClass('active');
                $('#lc a').attr("aria-expanded","false");
                $('#wc').addClass('active');
                $('#wc a').attr("aria-expanded","true");
            });
            //Next-Details button handle
            $('#next-de').on('click', function() {
                $('#de').removeClass('active');
                $('#de a').attr("aria-expanded","false");
                $('#ph').addClass('active');
                $('#ph a').attr("aria-expanded","true");
            });
            //Back-Details button handle
            $('#back-de').on('click', function() {
                $('#de').removeClass('active');
                $('#de a').attr("aria-expanded","false");
                $('#lc').addClass('active');
                $('#lc a').attr("aria-expanded","true");
            });
            //Next-Photo button handle
            $('#next-ph').on('click', function() {
                $('#ph').removeClass('active');
                $('#ph a').attr("aria-expanded","false");
                $('#pr').addClass('active');
                $('#pr a').attr("aria-expanded","true");
            });
            //Back-Photo button handle
            $('#back-ph').on('click', function() {
                $('#ph').removeClass('active');
                $('#ph a').attr("aria-expanded","false");
                $('#de').addClass('active');
                $('#de a').attr("aria-expanded","true");
            });
            //Back-Pricing button handle
            $('#back-pr').on('click', function() {
                $('#pr').removeClass('active');
                $('#pr a').attr("aria-expanded","false");
                $('#ph').addClass('active');
                $('#ph a').attr("aria-expanded","true");
            });
        });
    }

    //Country change handler to update state variable with the text entered by the user
    propCountryChangeHandler = (e) => {
        const ownerPropCountry = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propCountry : ownerPropCountry
            }
        })
    }
    //Street Address change handler to update state variable with the text entered by the user
    propStreetAddressChangeHandler = (e) => {
        const ownerPropStreetAddress= e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propCountry : ownerPropStreetAddress
            }
        })
    }
    //Apartment change handler to update state variable with the text entered by the user
    propApartmentChangeHandler = (e) => {
        const ownerPropApartment = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propCountry : ownerPropApartment
            }
        })
    }
    //City change handler to update state variable with the text entered by the user
    propCityChangeHandler = (e) => {
        const ownerPropCity = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propCountry : ownerPropCity
            }
        })
    }
    //State change handler to update state variable with the text entered by the user
    propStateChangeHandler = (e) => {
        const ownerPropState = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propCountry : ownerPropState
            }
        })
    }
    //ZIP change handler to update state variable with the text entered by the user
    propZipChangeHandler = (e) => {
        const ownerPropZip = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propCountry : ownerPropZip
            }
        })
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
                                <li id = "wc" className= "active">
                                    <a href="#welcome" data-toggle="tab" aria-expanded = "false">
                                        <i className="fa fas fa-home"></i>
                                        Welcome
                                    </a>
                                </li>
                                <li id = "lc">
                                    <a href="#location" data-toggle="tab" aria-expanded = "false" >
                                    <i class="fa fas fa-location-arrow"></i>
                                        Location
                                     </a>
                                </li>
                                <li id = "de">    
                                    <a href="#details" data-toggle="tab" aria-expanded = "false">
                                        <i className="fa fas fa-copy"></i>
                                        Details
                                    </a>
                                </li>
                                <li id = "ph">
                                    <a href="#photos" data-toggle="tab" aria-expanded = "false">
                                        <i className="fa fas fa-image"></i>
                                        Photos
                                    </a>
                                </li>
                                <li id = "pr">
                                    <a data-toggle="tab" href="#pricing" aria-expanded = "false">
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