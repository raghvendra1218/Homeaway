import React, { Component } from 'react';
import SearchNavbar from './SearchNavbar';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './searchProperty.css';
import {capitalizeFirstLetter} from '../../utility';
import {paginate} from '../../utility';
import {searchProperties} from '../../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Validate from '../../Validations/Validation';
import FilterNavbar from './FilterNavbar';
import Pagination from '../Pagination/Pagination';
import {CONSTANTS} from '../../Constants';

class SearchProperty extends Component {
    imageArr = []
    isOnceSet = false; 
    constructor (props) {
        super();
        this.state = {
            searchResults:[],
            city: sessionStorage.getItem('searchBoxCity'),
            startDate: sessionStorage.getItem('searchBoxStartDate'),
            endDate: sessionStorage.getItem('searchBoxEndDate'),
            headCount : sessionStorage.getItem('searchBoxHeadCount'),
            isSearched: false,
            getImage: false,
            minPrice: "",
            maxPrice: "",
            bedrooms: "",
            messagediv: "",
            originalSearchResults: [],
            currentPage: 1,
            pageSize: 10,
        }
        // Bind the handlers to this class
        this.propertyDetailHandler = this.propertyDetailHandler.bind(this);
        this.handleGetPhoto = this.handleGetPhoto.bind(this);
        this.searchCityChangeHandler = this.searchCityChangeHandler.bind(this);
        this.searchStartDateChangeHandler = this.searchStartDateChangeHandler.bind(this);
        this.searchEndDateChangeHandler = this.searchEndDateChangeHandler.bind(this);
        this.searchHeadCountChangeHandler = this.searchHeadCountChangeHandler.bind(this);
        this.applyBedroomHandler = this.applyBedroomHandler.bind(this);
        this.searchHandler = this.searchHandler.bind(this);
        this.PageChangeHandler = this.PageChangeHandler.bind(this);
    }
    
    //get the user details from Back-end  
    componentDidMount(){
        axios.get(`${CONSTANTS.BACKEND_URL}/searchprop`, { params: {city:this.state.city, startDate: this.state.startDate, endDate: this.state.endDate, headCount: this.state.headCount}})
            .then((response) => {
            //Update the state with the response data    
            this.setState({
                    ...this.state,
                    searchResults: this.state.searchResults.concat(response.data.result),
                    originalSearchResults: this.state.searchResults.concat(response.data.result),
                    isSearched : true
            });
            let obj1 = this.state;
            this.props.searchProperties(obj1,true);
            for(var i=0; i<response.data.result.length;i++){
                var photoD = response.data.result[i] ;
                // console.log(JSON.stringify(photoD.propimages));
                var photoArray = JSON.parse(photoD.propimages);
                this.handleGetPhoto(photoArray[0]);
            }
            console.log("State result: "+ JSON.stringify(this.state.searchResults));
        })
        .catch( error =>{
            console.log("error:", error);
        });
    }

    handleGetPhoto = (fileName) => {
        axios.post(`${CONSTANTS.BACKEND_URL}/download/` + fileName)
            .then(response => {
                console.log("Image Res : ", response);
                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                this.imageArr.push(imagePreview)
                this.setState({
                    getImage: true
                })
            });
    }

    //Handle Pagination
    PageChangeHandler = page => {
        this.setState({
            ...this.state, 
            currentPage: page 
        })
    };

    propertyDetailHandler =(e,propertyId) =>{
        console.log(`Inside Property detail handler of: ${propertyId}`);
        //Get call to fetch the property detail
        sessionStorage.removeItem('propertyDetailId');
        sessionStorage.setItem('propertyDetailId', propertyId);
    }

    //Search City change handler to update state variable with the text entered by the user
    searchCityChangeHandler = (e) => {
        this.setState({
            ...this.state,
            city : e.target.value
        })
    }
    //Search Start Date change handler to update state variable with the text entered by the user
    searchStartDateChangeHandler = (e) => {
        this.setState({
            ...this.state,
            startDate : e.target.value
        })
    }
    //Search End Date change handler to update state variable with the text entered by the user
    searchEndDateChangeHandler = (e) => {
        this.setState({
            ...this.state,
            endDate : e.target.value
        })
    }
    //Search Head Count change handler to update state variable with the text entered by the user
    searchHeadCountChangeHandler = (e) => {
        this.setState({
            ...this.state,
            headCount : e.target.value
        })
    }
    //Search Minimum Price change handler to update state variable with the text entered by the user
    minPriceChangeHandler = (e) => {
        this.setState({
            ...this.state,
            minPrice : e.target.value
        })
    }
    //Search Maximum Price change handler to update state variable with the text entered by the user
    maxPriceChangeHandler = (e) => {
        this.setState({
            ...this.state,
            maxPrice : e.target.value
        })
    }
    //Search  Bedroom change handler to update state variable with the text entered by the user
    bedroomChangeHandler = (e) => {
        this.setState({
            ...this.state,
            bedrooms : e.target.value
        })
    }

    //Handle Price Filter values 
    applyPriceHandler = (event) => {
        event.preventDefault();
        var obj = this.state.originalSearchResults;
        if(this.state.bedrooms !== ""){
            var newresult = obj.filter(result => result.propbaserate >= this.state.minPrice && result.propbaserate <= this.state.maxPrice && result.propbedroom == this.state.bedrooms)
        } else if(this.state.minPrice === "" || this.state.maxPrice === ""){
            alert("Please enter both the Minimum and Maximum Price fields");
            newresult = this.state.originalSearchResults;
        } else {
            var newresult = obj.filter(result => result.propbaserate >= this.state.minPrice && result.propbaserate <= this.state.maxPrice);
        }
        //Update the searchResults to empty before filling it with new response data 
        this.setState({
            ...this.state,
            searchResults: newresult
        });
        let obj1 = this.state;
        this.props.searchProperties(obj1,true);
        console.log("State result: "+ JSON.stringify(this.state.searchResults));
    }
    //Handle Bedroom Filter values
 
    applyBedroomHandler = (event) => {
        event.preventDefault(); 
        var obj = this.state.originalSearchResults;
        if(this.state.minPrice !== "" && this.state.maxPrice !== ""){
            var newresult = obj.filter(result => result.propbedroom == this.state.bedrooms && result.propbaserate >= this.state.minPrice && result.propbaserate <= this.state.maxPrice)
        } else if(this.state.minPrice !== "" || this.state.maxPrice !== "" || this.state.bedrooms === "") {
            alert("Please enter all the fields");
            newresult = this.state.originalSearchResults;
        } else {
            newresult = obj.filter(result => result.propbedroom == this.state.bedrooms);
        }
        //Update the searchResults to empty before filling it with new response data 
        this.setState({
            ...this.state,
            searchResults: newresult
        });
        let obj1 = this.state;
        this.props.searchProperties(obj1,true);
        console.log("State result: "+ JSON.stringify(this.state.searchResults));
    }
    //Search Property handler to send a request to the node back-end
    searchHandler = (event) => {
        //prevent page from refresh
        // event.preventDefault();
        let valid = Validate.search(this.state);
        if(valid === '') {
            sessionStorage.removeItem('searchBoxCity');
            sessionStorage.removeItem('searchBoxStartDate');
            sessionStorage.removeItem('searchBoxEndDate');
            sessionStorage.removeItem('searchBoxHeadCount');
            sessionStorage.setItem('searchBoxCity',this.state.city);
            sessionStorage.setItem('searchBoxStartDate', this.state.startDate);
            sessionStorage.setItem('searchBoxEndDate',this.state.endDate);
            sessionStorage.setItem('searchBoxHeadCount',this.state.headCount);
            axios.get(`${CONSTANTS.BACKEND_URL}/searchprop`, { params: {city:this.state.city, startDate: this.state.startDate, endDate: this.state.endDate, headCount: this.state.headCount}})
            .then((response) => {
            //Update the searchResults to empty before filling it with new response data 
            this.setState({
                ...this.state,
                searchResults: [],
                minPrice : "",
                maxPrice: "",
                bedrooms: ""
            }); 
            this.setState({
                    ...this.state,
                    searchResults: this.state.searchResults.concat(response.data.result),
                    isSearched : true
            });
            let obj1 = this.state;
            this.props.searchProperties(obj1,true);
            for(var i=0; i<response.data.result.length;i++){
                var photoD = response.data.result[i] ;
                // console.log(JSON.stringify(photoD.propimages));
                var photoArray = JSON.parse(photoD.propimages);
                this.handleGetPhoto(photoArray[0]);
            }
            console.log("State result: "+ JSON.stringify(this.state.searchResults));
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
        //Pagination code
        const { length: count } = this.state.searchResults;
        console.log(count);
        const { pageSize, currentPage } = this.state;
        const results = paginate(this.state.searchResults, currentPage, pageSize);
        //iterate over the searched result data to display each result in the below html skeleton
        // let results = this.state.searchResults;
        // let results = this.props.searchData.searchData.searchResults;
        let eachResult = null;
        if(results.length === 0 && this.state.isSearched) {
            eachResult = (
                <div>
                    <br/>
                    <div className="alert alert-info" role="alert" style={{paddingLeft: '25px'}}>
                        <p>Please try different City or Dates.</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )
        } else {
            eachResult = results.map((result, index) => {
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
                                                        data-index="0"   data-wdio="SimpleImageCarousel--main" role="button" tabindex="0" style={{ backgroundImage: "url('https://odis.homeaway.com/odis/listing/acec066f-9d31-4aed-9e32-9f06406edba3.c6.jpg');" }}>
                                                        <div className="SimpleImageCarousel__image SimpleImageCarousel__image--cur" role="img"
                                                            aria-label="" style={{ backgroundImage: "url('http:/odis.homeaway.com/odis/listing/acec066f-9d31-4aed-9e32-9f06406edba3.c6.jpg')" }}></div>
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
                                                <div className="Hit__info"><a key = {result._id} className="a--plain-link Hit__infoLink" onClick ={(event) => {this.propertyDetailHandler(event,result._id)}} href={CONSTANTS.ROOTURL+ '/propertydetail/'+ result._id} >
                                                    <div className="HitInfo HitInfo--desktop">
                                                        <div className="HitInfo__content">
                                                            <div className="HitInfo__viewedUrgency hidden-xs" data-wdio="viewed-urgency-message"><small>Viewed
                                                            46 times in the last 48 hours</small></div>
                                                            <h4 className="HitInfo__headline hover-text hidden-xs" href="/vacation-rental/p455355vb">
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
        return(
            <div>
                <Navbar/>
                <div className = "row">
                    {message}
                </div>
                <SearchNavbar
                    city = {this.state.city}
                    startDate = {this.state.startDate}
                    endDate = {this.state.endDate}
                    headCount = {this.state.headCount}
                    changeCity = {this.searchCityChangeHandler}
                    changeStartDate = {this.searchStartDateChangeHandler}
                    changeEndDate = {this.searchEndDateChangeHandler}
                    changeHeadCount = {this.searchHeadCountChangeHandler}
                    searchPropHandler = {this.searchHandler}
                />
                <FilterNavbar
                    minimumPrice = {this.state.minPrice}
                    maximumPrice = {this.state.maxPrice}
                    numberOfBedroom = {this.state.bedrooms}
                    changeMinPrice = {this.minPriceChangeHandler}
                    changeMaxPrice = {this.maxPriceChangeHandler}
                    changeBedroom = {this.bedroomChangeHandler}
                    applyPrice = {this.applyPriceHandler}
                    clearPrice = {this.searchHandler}
                    applyBedroom = {this.applyBedroomHandler}
                />
                {eachResult}
                {/* <SearchResult
                    results = {this.state.searchResults}
                /> */}
                <Pagination
                    itemsCount={count}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    onPageChange={this.PageChangeHandler}
                />
            </div>
        )
    }
}
function mapDispatchToProps(dispatch) {
    return {
        searchProperties: (searchData, isFetched) => dispatch(searchProperties(searchData, isFetched)),
    };
}

function mapStateToProps(state) {
    return{
        searchData : state.searchData,
    };
}
const searchproperty = withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchProperty));
export default searchproperty;

// export default SearchProperty;