import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './propertydetail.css';
import PropertyDetailsNavbar from './PropertyDetailNavbar';
import PriceBook from './priceBook';
import jwtDecode from 'jwt-decode';
import {propertyDetails} from '../../actions/index';
import {propertyPosted} from '../../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

class PropertyDetail extends Component {
    imageArr = []
    constructor(props) {
        super();
        this.state = {
            propertyDetails: [],
            travelerId: jwtDecode(localStorage.getItem('token')).userId,
            isTraveler: jwtDecode(localStorage.getItem('token')).isTraveler,
            propertyId: sessionStorage.getItem('propertyDetailId'),
            propertyBookStartDate: sessionStorage.getItem('searchBoxStartDate'),
            searchBoxHeadCount : sessionStorage.getItem('searchBoxHeadCount'),
            propertyBookEndDate: sessionStorage.getItem('searchBoxEndDate'),
            isPropertyBooked: false,
            getImage: false,
            question: ""
        }
        // Bind the handlers to this class
        this.bookPropertyHandler = this.bookPropertyHandler.bind(this);
        this.handleGetPhoto = this.handleGetPhoto.bind(this);
        this.submitQuestionHandler = this.submitQuestionHandler.bind(this);
        this.submitQuestionHandler = this.submitQuestionHandler.bind(this);
    }

    //get the property details from Back-end  
    componentDidMount(){
        axios.get('http://localhost:3001/propertydetail', { params: {propertyId:this.state.propertyId}})
            .then((response) => {
            //Update the state with the response data    
            this.setState({
                    ...this.state,
                    propertyDetails: this.state.propertyDetails.concat(response.data.result)
            });
            let obj1 = this.state;
            this.props.propertyDetails(obj1,false,true);
            for(var i=0; i<response.data.result.length;i++){
                var photoD = response.data.result[i];
                var photoArray = JSON.parse(photoD.propimages);
                this.handleGetPhoto(photoArray[0]);
            }
            console.log("State result: "+ JSON.stringify(this.state.propertyDetails));
            console.log("State result1: "+ JSON.stringify(this.state.propertyDetails[0].propbaserate));
        })
        .catch( error =>{
            console.log("error:", error);
            alert("Error in fetching the property details.");
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
    //Property Headline change handler to update state variable with the text entered by the user
    questionChangeHandler = (e) => {
        this.setState({
            ...this.state,
            question : e.target.value
        })
    }
    submitQuestionHandler = (e) =>{
        console.log("Inside the submit Question Handler.");
        if(this.state.isTraveler) {

        } else {
            alert("You need to be Logged in as a Traveler");
        }
    }

    bookPropertyHandler =(e) =>{
        console.log(`Inside Property detail handler`);
        if(this.state.travelerId && this.state.isTraveler) {
            e.preventDefault();
            const data = {
                ...this.state
            }
            //Post call to book the property
            axios.post('http://localhost:3001/bookproperty', 
            data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            }
            )
            .then((response) => {
                console.log("Status Code for post: ",response.status);
                if(response.status === 200){
                    //Update the state with the response data    
                    this.setState({
                        ...this.state,
                        isPropertyBooked: true
                    });
                    let obj1 = this.state;
                    this.props.propertyPosted(obj1,true,true);
                    console.log("State result: "+ JSON.stringify(this.state.propertyDetails));
                    alert("Property Booked successfully.");
                } else {
                    alert("Error: ", response.data.message);
                    this.setState({
                        ...this.state,
                        isPropertyBooked: false
                    });
                    let obj1 = this.state;
                    this.props.propertyPosted(obj1,false, false);
                };
            })
            .catch( error =>{
                console.log("error:", error);
            });
        } else {
            alert("Please login as a Traveler and then try Booking.");
        }
    }

    render() {
        let propertyRate = this.state.propertyDetails[0];
        return (
            <div>
                <Navbar/>
                <div id="content-wrapper">
                    <div className="clearfix"></div>
                    <PropertyDetailsNavbar/>
                    <PriceBook
                    startDate ={this.state.propertyBookStartDate}
                    endDate ={this.state.propertyBookEndDate}
                    headCount = {this.state.searchBoxHeadCount}
                    questionAsked = {this.state.question}
                    handleQuestionText = {this.questionChangeHandler}
                    propertyDetails ={propertyRate}
                    bookProperty = {this.bookPropertyHandler}
                    imageArray = {this.imageArr}
                    submitQuestion = {this.submitQuestionHandler}
                    />
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        propertyDetails: (propertyDetailData, isBooked, isFetched) => dispatch(propertyDetails(propertyDetailData, isBooked, isFetched)),
        propertyPosted: (propertyDetailData, isBooked, isFetched) => dispatch(propertyPosted(propertyDetailData, isBooked, isFetched)),
    };
}

function mapStateToProps(state) {
    return{
        propertyDetailData : state.propertyDetailData,
    };
}
const propertydetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertyDetail));
export default propertydetail;

// export default PropertyDetail;