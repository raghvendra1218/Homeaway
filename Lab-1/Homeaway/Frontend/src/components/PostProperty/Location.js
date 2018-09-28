import React from 'react';
import './postproperty.css';
const location = (props) => {
    return(
        <div className="col-md-7 content-panel-container">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div>
                        <form role="form" className="location-form">
                            <div className="form-group floating-label not-empty">
                                <div className="form-group floating-label empty">
                                    <input className="form-control" aria-label="Unit, Suite, Building, Etc." aria-invalid="false" id="address2" name="address2" type="text" />
                                    <label className="" for="address2">Country</label>
                                </div>
                                <div className="form-group floating-label empty has-feedback">
                                    <input className="form-control" aria-label="Street Address" aria-invalid="false" id="address1"
                                        name="address1" type="text" />
                                    <label className="" for="address1">Street Address</label>
                                    <span className="form-control-feedback"><i className="icon-required" aria-hidden="true"></i></span>
                                </div>
                                <div className="form-group floating-label empty">
                                    <input className="form-control" aria-label="Unit, Suite, Building, Etc." aria-invalid="false"
                                        id="address2" name="address2" type="text" />
                                    <label className="" for="address2">Unit, Suite, Building, Etc.</label>
                                </div>
                                <div className="form-group floating-label not-empty has-feedback">
                                    <input className="form-control" aria-label="City" aria-invalid="false" id="city" name="city"
                                        type="text" />
                                    <label className="" for="city">City</label>
                                    <span className="form-control-feedback"><i className="icon-required" aria-hidden="true"></i></span></div>
                                <div className="form-group floating-label not-empty"><label>State</label>
                                    <div className="form-group floating-label empty">
                                        <input className="form-control" aria-label="State" aria-invalid="false" id="State"
                                            name="State" type="text" /></div>
                                <div className="form-group floating-label not-empty has-feedback">
                                    <input className="form-control" aria-label="postalCode" aria-invalid="false" id="postalCode" name="postalCode"
                                        type="text" />         
                                        <label className="" for="postalCode">Zip Code</label><span className="form-control-feedback"><i
                                                className="icon-required" aria-hidden="true"></i></span>
                                    </div>
                                </div>
                            </div>        
                        </form><hr/>
                        <div style ={{paddingTop: '10px', paddingBottom: '25px' , textAlign: 'center'}} className="panel-control step-footer-wrapper">
                            <div className="row">
                                <div id = "back-lc" className="col-xs-6">
                                <a className="btn btn-default btn-rounded btn-sm" label="Back" data-toggle="tab" href="#welcome"
                                        type="button"><span className="btn__label">Back</span></a>
                                </div>
                                <div id = "next-lc" className="col-xs-6">
                                <a className="btn btn-primary btn-rounded btn-sm" label="Next" data-toggle="tab" href="#details"
                                        type="button"><span className="btn__label">Next</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default location;