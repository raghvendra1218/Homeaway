import React, { Component } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './propertydetail.css';
import PropertyDetailsNavbar from './PropertyDetailNavbar';
import PriceBook from './priceBook';

class PropertyDetail extends Component {
    imageArr = []
    constructor(props) {
        super();
        this.state = {
            propertyDetails: [],
            travelerId: sessionStorage.getItem('travelerId'),
            isTraveler: JSON.parse(sessionStorage.getItem('isTraveler')),
            propertyId: sessionStorage.getItem('propertyDetailId'),
            propertyBookStartDate: sessionStorage.getItem('searchBoxStartDate'),
            searchBoxHeadCount : sessionStorage.getItem('searchBoxHeadCount'),
            propertyBookEndDate: sessionStorage.getItem('searchBoxEndDate'),
            isPropertyBooked: false,
            getImage: false
        }
        // Bind the handlers to this class
        this.bookPropertyHandler = this.bookPropertyHandler.bind(this);
        this.handleGetPhoto = this.handleGetPhoto.bind(this);
    }

    //get the property details from Back-end  
    componentDidMount(){
        axios.get('http://localhost:3001/propertydetail', { params: {propertyId:this.state.propertyId}})
            .then((response) => {
            //Update the state with the response data    
            this.setState({
                    ...this.state,
                    propertyDetails: this.state.propertyDetails.concat(response.data)
            });
            for(var i=0; i<response.data.length;i++){
                var photoD = response.data[i].PROP_IMAGES ;
                var photoArray = JSON.parse(photoD);
                this.handleGetPhoto(photoArray[0]);
            }
            console.log("State result: "+ JSON.stringify(this.state.propertyDetails));
            console.log("State result1: "+ JSON.stringify(this.state.propertyDetails[0].PROP_BASE_RATE));
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

    bookPropertyHandler =(e) =>{
        console.log(`Inside Property detail handler`);
        if(this.state.travelerId && this.state.isTraveler) {
            e.preventDefault();
            const data = {
                ...this.state
            }
            //Post call to book the property
            axios.post('http://localhost:3001/bookproperty', data)
                .then((response) => {
                    console.log("Status Code for post: ",response.status);
                    if(response.status === 200){
                        //Update the state with the response data    
                        this.setState({
                            ...this.state,
                            isPropertyBooked: true
                        });
                        console.log("State result: "+ JSON.stringify(this.state.propertyDetails));
                        alert("Property Booked successfully.");
                    } else {
                        alert("Error: ", response.data.message);
                        this.setState({
                            ...this.state,
                            isPropertyBooked: false
                        });
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
                    propertyDetails ={propertyRate}
                    bookProperty = {this.bookPropertyHandler}
                    imageArray = {this.imageArr}
                    />
                </div>
            </div>
        )
    }
}

export default PropertyDetail;