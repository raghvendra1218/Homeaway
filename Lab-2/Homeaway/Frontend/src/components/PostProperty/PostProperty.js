import React, { Component } from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
import './postproperty.css';
import $ from 'jquery';
import Location from './Location';
import Welcome from './Welocome';
import Details from './Details';
import Photos from './Photos';
import Pricing from './Pricing';
import Availability from './Availability';
import Navbar from '../Navbar/Navbar';
import * as Validate from '../../Validations/Validation';
import jwtDecode from 'jwt-decode';
import {postPropertyData} from '../../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class PostProperty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            propertyDetails : {
                ownerId: jwtDecode(localStorage.getItem('token')).userId,
                email: jwtDecode(localStorage.getItem('token')).email,
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
                propPhotosArr : [],
                propCurrency: "",
                propBaseRate: "",
                propStartDate: "",
                propEndDate: "",
                propIsPosted: false,
                isBooked: false,
                travelerId: ""
            },
            messagediv:""

        }
        // Bind the handlers to this class
        this.propCountryChangeHandler = this.propCountryChangeHandler.bind(this);
        this.propStreetAddressChangeHandler = this.propStreetAddressChangeHandler.bind(this);
        this.propApartmentChangeHandler = this.propApartmentChangeHandler.bind(this);
        this.propCityChangeHandler = this.propCityChangeHandler.bind(this);
        this.propStateChangeHandler = this.propStateChangeHandler.bind(this);
        this.propZipChangeHandler = this.propZipChangeHandler.bind(this);
        this.propHeadlineChangeHandler = this.propHeadlineChangeHandler.bind(this);
        this.propDescriptionChangeHandler = this.propDescriptionChangeHandler.bind(this);
        this.propTypeChangeHandler = this.propTypeChangeHandler.bind(this);
        this.propBedroomChangeHandler = this.propBedroomChangeHandler.bind(this);
        this.propGuestCountChangeHandler = this.propGuestCountChangeHandler.bind(this);
        this.propBathroomsChangeHandler = this.propBathroomsChangeHandler.bind(this);
        this.propPhotohandleDrop = this.propPhotohandleDrop.bind(this);
        this.propStartDateChangeHandler = this.propStartDateChangeHandler.bind(this);
        this.propEndDateChangeHandler = this.propEndDateChangeHandler.bind(this);
        this.propCurrencyChangeHandler = this.propCurrencyChangeHandler.bind(this);
        this.propBaseRateChangeHandler = this.propBaseRateChangeHandler.bind(this);

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
                $('#av').addClass('active');
                $('#av a').attr("aria-expanded","true");
            });
            //Back-Photo button handle
            $('#back-ph').on('click', function() {
                $('#ph').removeClass('active');
                $('#ph a').attr("aria-expanded","false");
                $('#de').addClass('active');
                $('#de a').attr("aria-expanded","true");
            });
            //Next-Availability button handle
            $('#next-av').on('click', function() {
                $('#av').removeClass('active');
                $('#av a').attr("aria-expanded","false");
                $('#pr').addClass('active');
                $('#pr a').attr("aria-expanded","true");
            });
            //Back-Availability button handle
            $('#back-av').on('click', function() {
                $('#av').removeClass('active');
                $('#av a').attr("aria-expanded","false");
                $('#ph').addClass('active');
                $('#ph a').attr("aria-expanded","true");
            });
            //Back-Pricing button handle
            $('#back-pr').on('click', function() {
                $('#pr').removeClass('active');
                $('#pr a').attr("aria-expanded","false");
                $('#av').addClass('active');
                $('#av a').attr("aria-expanded","true");
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
                propStreetAddress : ownerPropStreetAddress
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
                propApartment : ownerPropApartment
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
                propCity : ownerPropCity
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
                propState : ownerPropState
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
                propZip : ownerPropZip
            }
        })
    }
    //Headline change handler to update state variable with the text entered by the user
    propHeadlineChangeHandler = (e) => {
        const ownerPropHeadline = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propHeadline : ownerPropHeadline
            }
        })
    }
    //Description change handler to update state variable with the text entered by the user
    propDescriptionChangeHandler = (e) => {
        const ownerPropDescription = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propDescription : ownerPropDescription
            }
        })
    }
    //Property Type change handler to update state variable with the text entered by the user
    propTypeChangeHandler = (e) => {
        const ownerPropType = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propType : ownerPropType
            }
        })
    }
    //Property Bedroom change handler to update state variable with the text entered by the user
    propBedroomChangeHandler = (e) => {
        const ownerPropBedroom = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propNoBedroom : ownerPropBedroom
            }
        })
    }
    //Property GuestCount change handler to update state variable with the text entered by the user
    propGuestCountChangeHandler = (e) => {
        const ownerPropGuestCount = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propGuestCount : ownerPropGuestCount
            }
        })
    }
    //Property Bathrooms change handler to update state variable with the text entered by the user
    propBathroomsChangeHandler = (e) => {
        const ownerPropBathrooms = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propNoBathroom : ownerPropBathrooms
            }
        })
    }
    //Property Photo change handler to update state variable with the text entered by the user
    propPhotohandleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            this.uid = new Date().valueOf();
            formData.append("imagename", file.name);
            this.state.propertyDetails.propPhotosArr.push(file.name);

            console.log(file.name);


            formData.append("timestamp", (Date.now() / 1000) | 0);

            return axios.post('http://localhost:3001/uploadImages', formData, {
                params: {
                    imagename: file.name
                }
            })
                .then(response => {
                    const data = response.data;
                    // const fileURL = data.secure_url // You should store this URL for future references in your app
                    console.log(data);
                    if (response.status === 200) {
                        console.log("Photo uploaded successfully.")
                    }
                })
        });

        // Once all the files are uploaded
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation
        });
    }
    //Property Start Date change handler to update state variable with the text entered by the user
    propStartDateChangeHandler = (e) => {
        const ownerPropStartDate = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propStartDate : ownerPropStartDate
            }
        })
    }
    //Property End Date change handler to update state variable with the text entered by the user
    propEndDateChangeHandler = (e) => {
        const ownerEndDate = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propEndDate : ownerEndDate
            }
        })
    }
    //Property Currency change handler to update state variable with the text entered by the user
    propCurrencyChangeHandler = (e) => {
        const ownerCurrency = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propCurrency : ownerCurrency
            }
        })
    }
    //Property Base Rate change handler to update state variable with the text entered by the user
    propBaseRateChangeHandler = (e) => {
        const ownerBaseRate = e.target.value;
        this.setState({
            propertyDetails:{
                ...this.state.propertyDetails,
                // ...this.state,
                propBaseRate : ownerBaseRate
            }
        })
    }

    //Post Property handler to send a request to the node back-end
    postProperty = (event) => {
        //prevent page from refresh
        event.preventDefault();
        let valid = '';
        // let valid = Validate.postproperty(this.state);
        if(valid === '') {
            const propertyData = {
                    propertyDetails: {
                        ...this.state.propertyDetails
                    }
                }
            this.props.postPropertyData( propertyData,false);
            //Post Call to post Property Details in DB
            //set the with credentials to true
            axios.defaults.withCredentials = true;
            //make a post request with the user data
            axios.post('http://localhost:3001/postproperty',
            propertyData,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            })
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                        ...this.state.propertyDetails,
                        propIsPosted : true
                    })
                    this.props.postPropertyData(propertyData,true);
                    console.log("message:", response.data.message);
                    alert("Your property was successfully posted.");
                }else{
                    this.setState({
                        ...this.state.propertyDetails,
                        propIsPosted : false
                    })
                    this.props.postPropertyData(propertyData,false);
                    alert("Your property was not successfully posted.");
                }
            })
            .catch( error =>{
                console.log("error:", error);
            });
        } else {
            this.setState({
                ...this.state,
                messagediv: valid
            });
            event.preventDefault();
        }
    }

    render() {
        let message = null;
        if(this.state.messagediv !== ''){
            message = (
                <div className="clearfix">
                    <div className="alert alert-info text-center" role="alert">{this.state.messagediv}</div>
                </div>
            );
        } else {
            message = (
                <div></div>
            );
        }
        // redirect based on successful login
        let redirectVar = null;
        if (!localStorage.getItem('token')) {
            redirectVar = <Redirect to="/ownerlogin" />
            return (redirectVar);
        } else if(this.state.propertyDetails.propIsPosted) {
            redirectVar = <Redirect to ="/postproperty"/>
            return(redirectVar);
        } else {
            return (
                <div>
                    <Navbar/>
                    <div className = "row">
                        {message}
                    </div>
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
                                <li id = "av">
                                    <a href="#availability" data-toggle="tab" aria-expanded = "false">
                                    <i class="fa fas fa-calendar"></i>
                                        Availability
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
                                    <Location 
                                    countryChange = {this.propCountryChangeHandler} 
                                    addressChange = {this.propStreetAddressChangeHandler} 
                                    apartmentChange = {this.propApartmentChangeHandler} 
                                    cityChange = {this.propCityChangeHandler} 
                                    stateChange = {this.propStateChangeHandler}
                                    zipChange = {this.propZipChangeHandler} />
                                </div>
                                <div id="details" className="tab-pane fade">
                                    <Details 
                                    headlineChange = {this.propHeadlineChangeHandler}
                                    descriptionChange = {this.propDescriptionChangeHandler}
                                    typeChange = {this.propTypeChangeHandler}
                                    bedroomsChange = {this.propBedroomChangeHandler}
                                    guestCountChange = {this.propGuestCountChangeHandler}
                                    bathroomsChange = {this.propBathroomsChangeHandler}/>
                                </div>
                                <div id="photos" className="tab-pane fade" >
                                    <Photos 
                                    photoOneChange = {this.propPhotohandleDrop}
                                    />
                                </div>
                                <div id="availability" className="tab-pane fade">
                                    <Availability 
                                    startDateChange = {this.propStartDateChangeHandler}
                                    endDateChange = {this.propEndDateChangeHandler}/>
                                </div>
                                <div id="pricing" className="tab-pane fade">
                                    <Pricing 
                                    currencyChange = {this.propCurrencyChangeHandler}
                                    baseRateChange = {this.propBaseRateChangeHandler}
                                    submitClick = {this.postProperty}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

function mapDispatchToProps(dispatch) {
    return {
        postPropertyData: (propertyData, isPosted) => dispatch(postPropertyData(propertyData, isPosted)),
    };
}

function mapStateToProps(state) {
    return{
        propertyData : state.propertyData,
    };
}
const postproperty = withRouter(connect(mapStateToProps, mapDispatchToProps)(PostProperty));
export default postproperty;
// export default PostProperty;