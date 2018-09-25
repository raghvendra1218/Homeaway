import React from 'react';
import './postproperty.css';
const location = (props) => {
    return(
        <div className="col-md-7 content-panel-container">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div>
                        <form role="form" className="location-form">
                            <div className="form-group floating-label not-empty"><label>Country</label>
                                <div className="form-group floating-label empty">
                                    <input className="form-control" aria-label="Unit, Suite, Building, Etc." aria-invalid="false"
                                        id="address2" name="address2" type="text" />
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
                        </form>
                        <div className="panel-control step-footer-wrapper">
                            <div className="row">
                                <div className="col-xs-6"><a className="btn btn-default btn-rounded btn-sm" label="Back" href="/pob/checklist/121.7360001.6717288"
                                        type="button"><span className="btn__label">Back</span></a>
                                </div>
                                <div className="col-xs-6"><a className="btn btn-primary btn-rounded btn-sm" label="Next" href="/pob/checklist/121.7360001.6717288/propertyDetails"
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