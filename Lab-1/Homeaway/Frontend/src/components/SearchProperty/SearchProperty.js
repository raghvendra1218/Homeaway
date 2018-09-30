import React, { Component } from 'react';
import SearchNavbar from './SearchNavbar';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import SearchResult from './SearchResult';
import './searchProperty.css'


class SearchProperty extends Component {
    constructor (props) {
        super();
        this.state = {
            searchResults:[],
            searchBoxCity: sessionStorage.getItem('searchBoxCity'),
            searchBoxStartDate: sessionStorage.getItem('searchBoxStartDate'),
            searchBoxEndDate: sessionStorage.getItem('searchBoxEndDate'),
            searchBoxHeadCount : sessionStorage.getItem('searchBoxHeadCount')
        }
    }
    
    //get the user details from Back-end  
    componentDidMount(){
        axios.get('http://localhost:3001/searchprop', { params: {city:this.state.searchBoxCity, startDate: this.state.searchBoxStartDate, endDate: this.state.searchBoxEndDate, headCount: this.state.searchBoxHeadCount}})
            .then((response) => {
            //Update the state with the response data    
            this.setState({
                    ...this.state,
                    searchResult: this.state.searchResults.concat(response.data)
            });
        });
    }
    render() {
        return(
            <div>
                <Navbar/>
                <SearchNavbar
                    city = {this.state.searchBoxCity}
                    startDate = {this.state.searchBoxStartDate}
                    endDate = {this.state.searchBoxEndDate}
                    headCount = {this.state.searchBoxHeadCount}
                />
                <SearchResult
                    results = {this.state.searchResult}
                />
            </div>
        )
    }
}

export default SearchProperty;