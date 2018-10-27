import React, { Component } from 'react';
import axios from 'axios';
import TravelerProfilebar from '../TravelerProfilebar/TravelerProfilebar';
import "../SearchProperty/searchProperty.css"
import {capitalizeFirstLetter} from '../../utility';
import {usaDateFormat} from '../../utility';
import jwtDecode from 'jwt-decode';
import {ownerBookings} from '../../actions/index';
import {ownerProperties} from '../../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class OwnerPostedProperties extends Component {
    imageArr = [];
    // imageArr2 = [];
    constructor(props) {
        super();
        this.state= {
            propertiesBookedResult:[],
            propertiesPosted:[],
            ownerId: jwtDecode(localStorage.getItem('token')).userId,
            isPropPostedFetched: false,
            isPropBookedFetched: false
        }
    }
    //get the user details from Back-end  
    componentDidMount(){

        //Get the properties booked under a particular owner
        axios.get('http://localhost:3001/ownerpropsbooking', {
            params: {ownerId:this.state.ownerId},
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        })
        .then((response) => {
        //Update the state with the response data    
        this.setState({
                ...this.state,
                propertiesBookedResult: this.state.propertiesBookedResult.concat(response.data.result),
                isPropBookedFetched : true
        });
        let obj1 = this.state;
        this.props.ownerBookings(obj1, true);
        for(var i=0; i<response.data.result.length;i++){
            var photoD = response.data.result[i];
            var photoArray = JSON.parse(photoD.propimages);
            this.handleGetPhoto(photoArray[0]);
        }
        console.log("Property Booking Result : "+ JSON.stringify(this.state.propertiesBookedResult));
        })
        .catch( error =>{
        console.log("error:", error);
        });
        //Get the properties owned by a particular Owner
        axios.get('http://localhost:3001/ownerprops', { 
            params: {ownerId:this.state.ownerId},
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
        })
            .then((response) => {
            //Update the state with the response data    
            this.setState({
                    ...this.state,
                    propertiesPosted: this.state.propertiesPosted.concat(response.data.result),
                    isPropPostedFetched : true
            });
            let obj2 = this.state;
            this.props.ownerProperties(obj2, true);
            for(var i=0; i<response.data.result.length;i++){
                var photoD = response.data.result[i];
                var photoArray = JSON.parse(photoD.propimages);
                this.handleGetPhoto(photoArray[0]);
            }
            console.log("Property Owned Result : "+ JSON.stringify(this.state.propertiesPosted));
        })
        .catch( error =>{
            console.log("error:", error);
        });
    }

    handleGetPhoto = (fileName) => {
        axios.post('http://localhost:3001/download/' + fileName)
            .then(response => {
                console.log("Image Res : ", response);
                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                this.imageArr.push(imagePreview)
                this.setState({
                    getImage: true
                })
            });
    }

    render() {
        //iterate over the searched result data to display each result in the below html skeleton
        let propertiesBookedResults = this.state.propertiesBookedResult;
        let propertiesPostedResults = this.state.propertiesPosted;
        let eachPropPostedResult = null;
        let eachPropBookedResult = null;
        if(propertiesBookedResults.length === 0 && this.state.isPropBookedFetched) {
            eachPropBookedResult = (
                <div>
                    <br/>
                    <div className="alert alert-info" role="alert" style={{paddingLeft: '25px'}}>
                        <p>No Properties Booked as of now.</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )
        } else {
            eachPropBookedResult = propertiesBookedResults.map((result, index) => {
                // console.log("Each Result Array: ", result);
                return(
                    <div>
                        <div className="Application__resultsColumn">
                            <section className="Application__results Application__section--padded">
                                <div className="Results">
                                    <div data-wdio="ScrollListener">
                                        <div className="HitCollection" data-wdio="HitCollection">
                                            <span className="Hit__spu" id="spu=vrbo-455355-1038466"></span>
                                            <div className="Hit media-flex media-flex--left media-flex--xs" data-wdio="hit">
                                                <div threshold="1200" className="HitCarousel thumbnail--noMargin Hit__thumbnail content--clickable">
                                                    <div className="Hit__tripboardButton">
                                                        <button className="react-trip-board-button react-trip-board-button__position-right"
                                                            tabindex="-1" aria-label="Create a new Trip Board">
                                                            <div className="react-trip-board-button__heart-core"><svg height="40px" viewBox="-10 -12 36 35"
                                                                width="40px">
                                                                <path className="react-trip-board-button__heart-core-bg react-trip-board-button__heart-core__heart-icon unhearted"></path>
                                                                <path className="react-trip-board-button__heart-core__heart-icon unhearted" d="M14.1294135,7.57785915 L9.1813451,12.5257519 C8.40187017,13.3051991 7.13698698,13.3040721 6.35866678,12.5257519 L1.41077405,7.57785915 C0.543404248,6.78002342 -8.8817842e-16,5.63564613 -8.8817842e-16,4.3646175 C-8.8817842e-16,1.9541783 1.95395254,0 4.3646175,0 C5.60449125,0 6.72403494,0.517216091 7.51825852,1.3473355 C7.60675643,1.43944557 7.69073914,1.53539356 7.76998089,1.63472794 C7.84989992,1.53539356 7.93365686,1.43944557 8.02170325,1.3473355 C8.81615259,0.517216091 9.93569628,0 11.1753443,0 C13.5860092,8.02060533e-16 15.5399618,1.9541783 15.5399618,4.3646175 C15.5399618,5.63564613 14.9965575,6.78024918 14.1294135,7.57785915 Z"></path>
                                                            </svg></div>
                                                        </button>
                                                    </div>
                                                    <a aria-label="View property" className="SimpleImageCarousel" data-imgsrcurl="https://odis.homeaway.com/odis/listing/acec066f-9d31-4aed-9e32-9f06406edba3.c6.jpg"
                                                        data-index="0" data-wdio="SimpleImageCarousel--main" role="button" tabindex="0" style={{ backgroundImage: "url('https://odis.homeaway.com/odis/listing/acec066f-9d31-4aed-9e32-9f06406edba3.c6.jpg');" }}>
                                                        <div className="SimpleImageCarousel__image SimpleImageCarousel__image--cur" role="img"
                                                            aria-label="" style={{ backgroundImage: "url('http:/odis.homeaway.com/odis/listing/acec066f-9d31-4aed-9e32-9f06406edba3.c6.jpg&quot')" }}></div>
                                                        <div className="SimpleImageCarousel__image SimpleImageCarousel__image--next-slide" style={{ backgroundImage: "url('https://odis.homeaway.com/odis/listing/33f61678-ce3f-4603-997f-5f838173fdbc.c6.jpg')" }}></div>
                                                        <div className="SimpleImageCarousel__image SimpleImageCarousel__image--prev-slide"></div>
                                                        <div className="SimpleImageCarousel__preloader"></div>
                                                        <button className="SimpleImageCarousel__button SimpleImageCarousel__button--left"
                                                            data-wdio="SimpleImageCarousel__button--prev"><span className="sr-only">Previous Image</span><span
                                                                className="SVGIcon SVGIcon--24px SimpleImageCarousel__svg SimpleImageCarousel__svg--left"><svg
                                                                    data-id="SVG_CHEVRON_LEFT__24" width="24" height="24" viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M16 23L5 12 16 1"></path>
                                                                </svg></span>
                                                        </button>
                                                        <button className="SimpleImageCarousel__button SimpleImageCarousel__button--right"
                                                            data-wdio="SimpleImageCarousel__button--next"><span className="sr-only">Next Image</span><span
                                                                className="SVGIcon SVGIcon--24px SimpleImageCarousel__svg SimpleImageCarousel__svg--right"><svg
                                                                    data-id="SVG_CHEVRON_RIGHT__24" width="24" height="24" viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M8 23l11-11L8 1"></path>
                                                                </svg></span>
                                                        </button>
                                                        <img src={this.imageArr[index]}/>
                                                    </a>
                                                </div>
                                                <div className="Hit__info"><a key = {result._id} className="a--plain-link Hit__infoLink" onClick ={(event) => {this.propertyDetailHandler(event,result._id)}} href={'http://localhost:3000/propertydetail/'+ result._id} >
                                                    <div className="HitInfo HitInfo--desktop">
                                                        <div className="HitInfo__content">
                                                            <div className="HitInfo__viewedUrgency hidden-xs" data-wdio="viewed-urgency-message"><small>Viewed
                                                            46 times in the last 48 hours</small><span style={{float:"right"}}><strong>Booking Dates: </strong><small>{usaDateFormat(result.bookstartdate.substring(0, 10))} to {usaDateFormat(result.bookenddate.substring(0, 10))} </small></span></div>
                                                            <h4 className="HitInfo__headline hover-text hidden-xs">
                                                            {capitalizeFirstLetter(result.propheadline)}</h4>
                                                            <div className="HitInfo__distance hidden-xs">
                                                                <div className="GeoDistance"><svg aria-hidden="true" className="GeoDistance__icon"
                                                                    xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14">
                                                                    <path className="GeoDistance__iconPinPath fill-transparent stroke-currentColor"
                                                                        d="M4.832 13.342l.005.007c.12.173.207.173.33-.007a48.424 48.424 0 0 0 .682-.99 49.957 49.957 0 0 0 1.507-2.381 33.65 33.65 0 0 0 .88-1.577C9.047 6.84 9.5 5.591 9.5 4.82 9.5 2.438 7.49.5 5 .5S.5 2.438.5 4.82c0 .771.454 2.02 1.263 3.574.263.504.558 1.032.88 1.577a49.957 49.957 0 0 0 2.19 3.371zm-.814.58l-.002-.003.005.007-.003-.003z"></path>
                                                                    <ellipse className="GeoDistance__iconPinHole stroke-none fill-currentColor"
                                                                        cx="5" cy="5.212" rx="1.25" ry="1.212"></ellipse>
                                                                </svg><span className="GeoDistance__text">1.4 mi to San Diego center</span></div>
                                                            </div>
                                                            <div className="HitInfo__details">
                                                                <div className="Details__propertyType Details__item">{capitalizeFirstLetter(result.proptype)}</div>
                                                                <div className="Details__bathrooms text-capitalize Details__label">{result.propbedroom} BA</div>
                                                                <div className="Details__sleeps Details__label">Sleeps {result.propguestcount}</div>
                                                                <div className="Details__area Details__item Details__label"><span className="Details__value">200</span><span
                                                                    className="text-capitalize">Sq. Ft.</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="HitInfo__infoBar hover-bg">
                                                            <div className="HitInfo__priceSuperlativeGroup"><span className="HitInfo__superlative small"><strong>Wonderful!</strong>
                                                                <span>4.9/5</span></span>
                                                                <div className="HitInfo__price"><span className="InstantBook__icon" aria-hidden="true"
                                                                    title="Book without waiting for owner approval"><span>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                            viewBox="0 0 16 16">
                                                                            <path d="M6.9,8.9l-0.5,5.9c0,0.6,0.2,0.7,0.5,0.2l5.6-7c0.3-0.4,0.2-0.8-0.4-0.8h-3l0.5-5.9 c0-0.6-0.2-0.7-0.5-0.2l-5.6,7C3.1,8.5,3.3,8.9,3.9,8.9H6.9z"></path>
                                                                        </svg>
                                                                    </span></span><span className="Price"><span className="Price__value"
                                                                        data-wdio="Price" data-price="89">$&nbsp;{result.propbaserate}</span><span className="Price__period">avg/night</span></span></div>
                                                            </div>
                                                            <div className="HitInfo__badgeRatingGroup"><span className="" style={{ display: "inline-block;", outline: "0;", position: "relative" }}
                                                                role="button" tabindex="0">
                                                                <div className="HitInfo__premierBadge bg-brand small" data-wdio="premier-partner-badge">Premier
                                                                Partner</div>
                                                            </span>
                                                                <div className="HitInfo__rating">
                                                                    <div className="rating rating-5"></div><span className="RatingReview__reviewCount">123</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )
            })
        }
        if(propertiesPostedResults.length === 0 && this.state.isPropPostedFetched) {
            eachPropPostedResult = (
                <div>
                    <br/>
                    <div className="alert alert-info" role="alert" style={{paddingLeft: '25px'}}>
                        <p>No Properties posted as of now.</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )
        } else {
            eachPropPostedResult = propertiesPostedResults.map((propPostedResult, index) => {
                // console.log("Each Result Array: ", result);
                return(
                    <div>
                        <div className="Application__resultsColumn">
                            <section className="Application__results Application__section--padded">
                                <div className="Results">
                                    <div data-wdio="ScrollListener">
                                        <div className="HitCollection" data-wdio="HitCollection">
                                            <span className="Hit__spu" id="spu=vrbo-455355-1038466"></span>
                                            <div className="Hit media-flex media-flex--left media-flex--xs" data-wdio="hit">
                                                <div threshold="1200" className="HitCarousel thumbnail--noMargin Hit__thumbnail content--clickable">
                                                    <div className="Hit__tripboardButton">
                                                        <button className="react-trip-board-button react-trip-board-button__position-right"
                                                            tabindex="-1" aria-label="Create a new Trip Board">
                                                            <div className="react-trip-board-button__heart-core"><svg height="40px" viewBox="-10 -12 36 35"
                                                                width="40px">
                                                                <path className="react-trip-board-button__heart-core-bg react-trip-board-button__heart-core__heart-icon unhearted"></path>
                                                                <path className="react-trip-board-button__heart-core__heart-icon unhearted" d="M14.1294135,7.57785915 L9.1813451,12.5257519 C8.40187017,13.3051991 7.13698698,13.3040721 6.35866678,12.5257519 L1.41077405,7.57785915 C0.543404248,6.78002342 -8.8817842e-16,5.63564613 -8.8817842e-16,4.3646175 C-8.8817842e-16,1.9541783 1.95395254,0 4.3646175,0 C5.60449125,0 6.72403494,0.517216091 7.51825852,1.3473355 C7.60675643,1.43944557 7.69073914,1.53539356 7.76998089,1.63472794 C7.84989992,1.53539356 7.93365686,1.43944557 8.02170325,1.3473355 C8.81615259,0.517216091 9.93569628,0 11.1753443,0 C13.5860092,8.02060533e-16 15.5399618,1.9541783 15.5399618,4.3646175 C15.5399618,5.63564613 14.9965575,6.78024918 14.1294135,7.57785915 Z"></path>
                                                            </svg></div>
                                                        </button>
                                                    </div>
                                                    <a aria-label="View property" className="SimpleImageCarousel" data-imgsrcurl="https://odis.homeaway.com/odis/listing/acec066f-9d31-4aed-9e32-9f06406edba3.c6.jpg"
                                                        data-index="0" data-wdio="SimpleImageCarousel--main" role="button" tabindex="0" style={{ backgroundImage: "url('https://odis.homeaway.com/odis/listing/acec066f-9d31-4aed-9e32-9f06406edba3.c6.jpg');" }}>
                                                        <div className="SimpleImageCarousel__image SimpleImageCarousel__image--cur" role="img"
                                                            aria-label="" style={{ backgroundImage: "url('http:/odis.homeaway.com/odis/listing/acec066f-9d31-4aed-9e32-9f06406edba3.c6.jpg&quot')" }}></div>
                                                        <div className="SimpleImageCarousel__image SimpleImageCarousel__image--next-slide" style={{ backgroundImage: "url('https://odis.homeaway.com/odis/listing/33f61678-ce3f-4603-997f-5f838173fdbc.c6.jpg')" }}></div>
                                                        <div className="SimpleImageCarousel__image SimpleImageCarousel__image--prev-slide"></div>
                                                        <div className="SimpleImageCarousel__preloader"></div>
                                                        <button className="SimpleImageCarousel__button SimpleImageCarousel__button--left"
                                                            data-wdio="SimpleImageCarousel__button--prev"><span className="sr-only">Previous Image</span><span
                                                                className="SVGIcon SVGIcon--24px SimpleImageCarousel__svg SimpleImageCarousel__svg--left"><svg
                                                                    data-id="SVG_CHEVRON_LEFT__24" width="24" height="24" viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M16 23L5 12 16 1"></path>
                                                                </svg></span>
                                                        </button>
                                                        <button className="SimpleImageCarousel__button SimpleImageCarousel__button--right"
                                                            data-wdio="SimpleImageCarousel__button--next"><span className="sr-only">Next Image</span><span
                                                                className="SVGIcon SVGIcon--24px SimpleImageCarousel__svg SimpleImageCarousel__svg--right"><svg
                                                                    data-id="SVG_CHEVRON_RIGHT__24" width="24" height="24" viewBox="0 0 24 24"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill="none" stroke-linecap="round" stroke-linejoin="round" d="M8 23l11-11L8 1"></path>
                                                                </svg></span>
                                                        </button>
                                                        <img src={this.imageArr[index]}/>
                                                    </a>
                                                </div>
                                                <div className="Hit__info"><a key = {propPostedResult._id} className="a--plain-link Hit__infoLink" onClick ={(event) => {this.propertyDetailHandler(event,propPostedResult._id)}} href={'http://localhost:3000/propertydetail/'+ propPostedResult._id} >
                                                    <div className="HitInfo HitInfo--desktop">
                                                        <div className="HitInfo__content">
                                                            <div className="HitInfo__viewedUrgency hidden-xs" data-wdio="viewed-urgency-message"><small>Viewed
                                                            46 times in the last 48 hours</small><span style={{float:"right"}}><strong>Available Dates: </strong><small>{usaDateFormat(propPostedResult.propavaildate.substring(0, 10))} to {usaDateFormat(propPostedResult.propavailtill.substring(0, 10))} </small></span></div>
                                                            <h4 className="HitInfo__headline hover-text hidden-xs">
                                                            {capitalizeFirstLetter(propPostedResult.propheadline)}</h4>
                                                            <div className="HitInfo__distance hidden-xs">
                                                                <div className="GeoDistance"><svg aria-hidden="true" className="GeoDistance__icon"
                                                                    xmlns="http://www.w3.org/2000/svg" width="10" height="14" viewBox="0 0 10 14">
                                                                    <path className="GeoDistance__iconPinPath fill-transparent stroke-currentColor"
                                                                        d="M4.832 13.342l.005.007c.12.173.207.173.33-.007a48.424 48.424 0 0 0 .682-.99 49.957 49.957 0 0 0 1.507-2.381 33.65 33.65 0 0 0 .88-1.577C9.047 6.84 9.5 5.591 9.5 4.82 9.5 2.438 7.49.5 5 .5S.5 2.438.5 4.82c0 .771.454 2.02 1.263 3.574.263.504.558 1.032.88 1.577a49.957 49.957 0 0 0 2.19 3.371zm-.814.58l-.002-.003.005.007-.003-.003z"></path>
                                                                    <ellipse className="GeoDistance__iconPinHole stroke-none fill-currentColor"
                                                                        cx="5" cy="5.212" rx="1.25" ry="1.212"></ellipse>
                                                                </svg><span className="GeoDistance__text">1.4 mi to San Diego center</span></div>
                                                            </div>
                                                            <div className="HitInfo__details">
                                                                <div className="Details__propertyType Details__item">{capitalizeFirstLetter(propPostedResult.proptype)}</div>
                                                                <div className="Details__bathrooms text-capitalize Details__label">{propPostedResult.propbedroom} BA</div>
                                                                <div className="Details__sleeps Details__label">Sleeps {propPostedResult.propguestcount}</div>
                                                                <div className="Details__area Details__item Details__label"><span className="Details__value">200</span><span
                                                                    className="text-capitalize">Sq. Ft.</span></div>
                                                            </div>
                                                        </div>
                                                        <div className="HitInfo__infoBar hover-bg">
                                                            <div className="HitInfo__priceSuperlativeGroup"><span className="HitInfo__superlative small"><strong>Wonderful!</strong>
                                                                <span>4.9/5</span></span>
                                                                <div className="HitInfo__price"><span className="InstantBook__icon" aria-hidden="true"
                                                                    title="Book without waiting for owner approval"><span>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                                            viewBox="0 0 16 16">
                                                                            <path d="M6.9,8.9l-0.5,5.9c0,0.6,0.2,0.7,0.5,0.2l5.6-7c0.3-0.4,0.2-0.8-0.4-0.8h-3l0.5-5.9 c0-0.6-0.2-0.7-0.5-0.2l-5.6,7C3.1,8.5,3.3,8.9,3.9,8.9H6.9z"></path>
                                                                        </svg>
                                                                    </span></span><span className="Price"><span className="Price__value"
                                                                        data-wdio="Price" data-price="89">$&nbsp;{propPostedResult.propbaserate}</span><span className="Price__period">avg/night</span></span></div>
                                                            </div>
                                                            <div className="HitInfo__badgeRatingGroup"><span className="" style={{ display: "inline-block;", outline: "0;", position: "relative" }}
                                                                role="button" tabindex="0">
                                                                <div className="HitInfo__premierBadge bg-brand small" data-wdio="premier-partner-badge">Premier
                                                                Partner</div>
                                                            </span>
                                                                <div className="HitInfo__rating">
                                                                    <div className="rating rating-5"></div><span className="RatingReview__reviewCount">123</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                )
            })
        }
        return(
            <div>
                <TravelerProfilebar/>
                <div style ={{padding:"50px"}}>
                <h1 >Welcome! {capitalizeFirstLetter(sessionStorage.getItem('userFirstName'))}</h1>
                <h3>Your Properties Postings are...</h3>
                </div>
                {eachPropPostedResult}
                <hr/>
                <div style={{paddingLeft: "50px", paddingBottom:"40px"}}>
                <h3>Your Booked Properties are...</h3>
                <br/>
                </div>
                {eachPropBookedResult}
            </div>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        ownerBookings: (ownerPropertiesData, isOwnerBookingsFetched) => dispatch(ownerBookings(ownerPropertiesData, isOwnerBookingsFetched)),
        ownerProperties: (ownerPropertiesData, isOwnerPropertiesFetched) => dispatch(ownerProperties(ownerPropertiesData, isOwnerPropertiesFetched)),
    };
}

function mapStateToProps(state) {
    return{
        ownerPropertiesData : state.ownerPropertiesData,
    };
}
const ownerpostedproperties = withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnerPostedProperties));
export default ownerpostedproperties;
// export default OwnerPostedProperties;