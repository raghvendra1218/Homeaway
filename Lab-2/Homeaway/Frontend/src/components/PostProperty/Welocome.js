import React from 'react';
import {capitalizeFirstLetter} from '../../utility';
import './postproperty.css';
import jwtDecode from 'jwt-decode';
const welcome = () => {
    return(
    <div id="tab-content" className="container">
        <div className="col-md-8 checklist-content property-container tab-pane fade in active">
            <div className="checklist-page">
                <div>
                    <div className="checklist-summary-header ">
                        <h1><span>Welcome! {capitalizeFirstLetter(jwtDecode(localStorage.getItem('token')).firstname)}</span> </h1>
                        <p><span>Verify the location of your rental</span></p>
                    </div>
                </div><br/>
                <div>
                    <div id = "continueNext" className="checklist-buttons">
                        <div><a href="#location" data-toggle="tab" ref= {nextTab => this.nextTab = nextTab}></a>
                        <button onClick={()=> this.nextTab.click()} className="btn btn-primary continue-button"><span>Continue</span></button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default welcome;