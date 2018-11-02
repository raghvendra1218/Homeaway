import React, { Component } from 'react';
import Navbar from '../Navbar/Navbar';
import './inbox.css';
import jwtDecode from 'jwt-decode';


class Inbox extends Component {
    constructor(props) {
        super()
        this.state = {
            searchResult: [],
            messages: [],
            travelerId: "",
            ownerId: "",
            propId: "",
            isTraveler : jwtDecode(localStorage.getItem('token')).isTraveler
        }
    }
    render() {
        let results = this.state.searchResult;
        if(this.state.isTraveler){

        } else {

        }
        // eachResult = results.map((messages, index) => {
        //     return (
        //         <div>
        //             <div className="prop-desc-txt">
        //                 <div className="preview">
        //                     <p className="detailDescription">{propertyDetailsFetched.propdesc}</p>
        //                 </div>
        //                 <div className="js-descriptionCollapse collapse">
        //                     <div class="form-group">
        //                         <label for="comment">Ask Owner a Question:</label>
        //                         <textarea class="form-control" rows="5" id="comment"></textarea>
        //                     </div>
        //                     <button className="btn btn-book btn-sm btn-default">
        //                         <span>
        //                             Submit
        //                     </span>
        //                     </button>
        //                 </div>
        //             </div>
        //             <a data-toggle="collapse" className="js-descriptionCollapseText" data-target=".js-descriptionCollapse" href="javascript:;">
        //                 Reply Back
        //             </a>
        //         </div>
        //     )
        // })
        return(
            <div>
                <Navbar /><br />
                <div className="prop-desc-txt cont-inbox cont-center">
                    <h2>Traveler: </h2>
                    <p>Hello. How are you today?</p>
                    <div className="js-descriptionCollapse collapse">
                        <div class="form-group">
                            <label for="comment">Reply</label>
                            <textarea class="form-control" rows="5" id="comment"></textarea>
                        </div>
                        <button className="btn btn-book btn-sm btn-default">
                            <span>
                                Submit
                            </span>
                        </button>
                    </div>
                    <a data-toggle="collapse" className="js-descriptionCollapseText" data-target=".js-descriptionCollapse" href="javascript:;">
                        Reply Back
                    </a>
                </div>
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