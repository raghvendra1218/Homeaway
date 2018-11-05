import React, { Component } from 'react';
import TravelerProfilebar from '../TravelerProfilebar/TravelerProfilebar';
import axios from 'axios';
import './inbox.css';
import jwtDecode from 'jwt-decode';
import {CONSTANTS} from '../../Constants';


class Inbox extends Component {
    constructor(props) {
        super()
        this.state = {
            searchResults: [],
            ownermessage: "",
            travelermessage: "",
            reply: "",
            isTraveler : jwtDecode(localStorage.getItem('token')).isTraveler,
            travelerId: jwtDecode(localStorage.getItem('token')).userId,
            ownerEmail: jwtDecode(localStorage.getItem('token')).email,
            travelerEmail: jwtDecode(localStorage.getItem('token')).email,
            isFetched: false
        }
        // Bind the handlers to this class
        this.submitReplyHandler = this.submitReplyHandler.bind(this);
        this.replyChangeHandler = this.replyChangeHandler.bind(this);
    }

    //get the Message details from Back-end  
    componentDidMount(){
        axios.get(`${CONSTANTS.BACKEND_URL}/getmessages`,{
            params: {ownerEmail:this.state.ownerEmail, isTraveler: this.state.isTraveler, travelerEmail: this.state.travelerEmail},
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
                searchResults: this.state.searchResults.concat(response.data.result),
                isFetched: true
            });
        })
        .catch( error =>{
            console.log("error:", error);
            alert("Error in fetching the messages");
        });
    }

   //Question change handler to update state variable with the text entered by the user
    replyChangeHandler = (e) => {
        this.setState({
            ...this.state,
            reply : e.target.value
        })
    }

    submitReplyHandler = (event, index) =>{
        // alert("Inside the submit Question Handler.");
            event.preventDefault();
            let searchResult = this.state.searchResults[index];
            if(this.state.isTraveler) {
                var data = {
                    propId: searchResult._id,
                    ownerEmail: searchResult.owneremail,
                    travelerEmail: searchResult.traveleremail,
                    travelerId: searchResult.travelerid,
                    isTraveler: this.state.isTraveler,
                    travelerMessage: this.state.reply,
                    ownerMessage: "",
                    propHeadline: searchResult.propheadline
                }
            } else {
                var data = {
                    propId: searchResult._id,
                    ownerEmail: searchResult.owneremail,
                    travelerEmail: searchResult.traveleremail,
                    travelerId: searchResult.travelerid,
                    isTraveler: this.state.isTraveler,
                    travelerMessage: "",
                    ownerMessage: this.state.reply,
                    propHeadline: searchResult.propheadline
                }
            }
            //Post call to Ask Question about the property
            axios.post(`${CONSTANTS.BACKEND_URL}/postmessage`, 
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
                        isQuestionPosted: true
                    });
                    // let obj1 = this.state;
                    // this.props.propertyPosted(obj1,true,true);
                    console.log("State result: "+ JSON.stringify(this.state.propertyDetails));
                    alert("Message sent successfully.");
                } else {
                    alert("Error: ", response.data.message);
                    this.setState({
                        ...this.state,
                        isQuestionPosted: false
                    });
                    // let obj1 = this.state;
                    // this.props.propertyPosted(obj1,false, false);
                };
            })
            .catch( error =>{
                console.log("error:", error);
            });
    }


    render() {
        let results = this.state.searchResults;
        if(results.length === 1) {
            var singleResult = results[0];
        }
        let eachResult = null;
        if(results.length === 0 && this.state.isFetched){
            eachResult = (
            <div>
                <br />
                <div className="alert alert-info" role="alert" style={{ paddingLeft: '25px' }}>
                    <p>No Messages</p>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
            )
        } 
        else if((results.length ===1 && singleResult.travelermessage ==="" && this.state.isTraveler) || (results.length ===1 && singleResult.ownermessage ==="" && !this.state.isTraveler) ){
            eachResult = (
                <div>
                    <br />
                    <div className="alert alert-info" role="alert" style={{ paddingLeft: '25px' }}>
                        <p>No Messages</p>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>
            )
        } 
        else if(this.state.isTraveler && results.length !=0){
            eachResult = results.map((message, index) => {
                if(message.travelermessage === ""){
                    return(
                        <div></div>
                    )
                } else {
                    return (
                        <div>
                            <div className="prop-desc-txt cont-inbox cont-center">
                                <h2>{message.propheadline}</h2>
                                <p><b style={{color: "#000"}}>{message.owneremail}</b>: <em style={{color: "#000"}}>{message.travelermessage}</em></p>
                                <div className="js-descriptionCollapse collapse">
                                    <div class="form-group">
                                        <label for="comment">Reply</label>
                                        <textarea class="form-control" rows="5" id="comment" onChange={this.replyChangeHandler}></textarea>
                                    </div>
                                    <button className="btn btn-book btn-sm btn-default" onClick = {(event) => this.submitReplyHandler(event,index)}>
                                        <span>
                                            Submit
                                    </span>
                                    </button>
                                </div>
                                <a data-toggle="collapse" className="js-descriptionCollapseText" data-target=".js-descriptionCollapse" href="javascript:;">
                                    Reply Back
                            </a>
                            </div><br/>
                        </div>
                    )
                }
            })
        } else {
            eachResult = results.map((message, index) => {
                if(message.ownermessage === "") {
                    return(
                        <div></div>
                    )
                } else {
                    return (
                        <div>
                            <div className="prop-desc-txt cont-inbox cont-center">
                                <h2>{message.propheadline}</h2>
                                <p><b style={{color: "#000"}}>{message.traveleremail}</b> : <em style={{color: "#000"}}>{message.ownermessage}</em></p>
                                <div className="js-descriptionCollapse collapse">
                                    <div class="form-group">
                                        <label for="comment">Reply</label>
                                        <textarea class="form-control" rows="5" id="comment" onChange = {this.replyChangeHandler}></textarea>
                                    </div>
                                    <button className="btn btn-book btn-sm btn-default" onClick = {(event) => this.submitReplyHandler(event,index)}>
                                        <span>
                                            Submit
                                    </span>
                                    </button>
                                </div>
                                <a data-toggle="collapse" className="js-descriptionCollapseText" data-target=".js-descriptionCollapse" href="javascript:;">
                                    Reply Back
                            </a>
                            </div><br/>
                        </div>
                    )
                }
            })
        }
        return(
            <div>
                <TravelerProfilebar /><br />
                {eachResult}
            </div>
        )
    }

}
// function mapDispatchToProps(dispatch) {
//     return {
//         messageData: (flag,user,userFlag) => dispatch(logoutData(flag, user,userFlag))

//     };
// }

// function mapStateToProps(state) {
//     return{
//         userData : state.loginData,
//     };
// }
// const inbox = withRouter(connect(mapStateToProps, mapDispatchToProps)(Inbox));
// export default inbox;
export default Inbox;