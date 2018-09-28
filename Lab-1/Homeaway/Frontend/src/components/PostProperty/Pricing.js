import React from 'react';
import './postproperty.css';
const pricing = () => {
    return(
        <div id="layout" className="col-md-7 content-panel-container center-property-form">
            <div className="panel panel-default">
                <div className="panel-body">
                    <div className="panel-body">
                        <div className="checklist-header-container">
                            <div className="le-nav-header">
                                <h2 className="nav-header-text">How much do you want to charge?</h2>
                            </div>
                            <hr></hr>
                        </div>
                            <div className="rates-onboarding-rates-page-title">
                                <p>We recommend starting with a low price to get a few bookings and earn some initial guest reviews. You can update your rates at any time.</p>
                            </div>
                        <form role="form">
                            <div className="row">
                                <label className="col-2 col-form-label" for="rates-onboarding-currencyCode">Currency</label>
                                <div className="col-10">
                                    <div className="form-group">
                                        <div>
                                            <select id="rates-onboarding-currencyCode" className="form-control currency-select">
                                                <option value=""></option>
                                                <option value="AUD">Australian Dollar (AUD)</option>
                                                <option value="EUR">Euros (EUR)</option>
                                                <option value="GBP">Great British Pound (GBP)</option>
                                                <option value="USD">US Dollar (USD)</option>
                                                <option value="CAD">Canadian Dollar (CAD)</option>
                                                <option value="NZD">New Zealand Dollar (NZD)</option>
                                                <option value="BRL">Brazil Real (BRL)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="example-text-input" class="col-2 col-form-label">Nightly Base Rate</label>
                                <div class="col-10">
                                    <div>
                                        <input class="form-control" title="(USD)" min="1" max="10000" maxlength="10" type="text" id="rates-onboarding-base-rate-amount" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="example-text-input" class="col-2 col-form-label">Minimum stay</label>
                                <div class="col-10">
                                    <div>
                                        <input class="form-control" title="Days" pattern="\d*" min="1" type="number" id="rates-onboarding-base-rate-minstay" />
                                    </div>
                                </div>
                            </div><hr />
                            <div style={{ paddingTop: '10px', paddingBottom: '25px', textAlign: 'center' }} className="panel-control step-footer-wrapper">
                                <div className="row">
                                    <div id= "back-pr" className="col-xs-6">
                                    <a className="btn btn-default btn-rounded btn-sm" label="Back" data-toggle="tab" href="#photos"
                                        type="button"><span className="btn__label">Back</span></a>
                                    </div>
                                    <div className="col-xs-6"><a className="btn btn-primary btn-rounded btn-sm" label="Next" href="/pob/checklist/121.7360001.6717288/propertyDetails"
                                        type="button"><span className="btn__label">Next</span></a>
                                    </div>
                                </div>
                            </div>
                        </form>    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default pricing;