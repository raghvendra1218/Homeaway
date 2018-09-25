import React from 'react';
import {Link} from 'react-router-dom';
import './postproperty.css';
const welcome = () => {
    return(
    <div id="tab-content" className="container">
        <div className="col-md-6 checklist-content property-container tab-pane fade in active">
            <div className="checklist-page">
                <div>
                    <div className="checklist-summary-header ">
                        <h1><span>Welcome! Verify the location of your rental</span></h1>
                    </div>
                </div>
                <div>
                    <div className="checklist-buttons">
                        <div><Link to = "http://localhost:3000/postproperty#location"></Link><button className="btn btn-primary continue-button"><span>Continue</span></button></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default welcome;