import React from 'react';
import './postproperty.css';
const pricing = () => {
    return(
        <div id="layout" className="layout">
            <section data-reactroot="" className="rates-onboarding">
                <div>
                    <div className="alert-page-wrapper">
                        <div>
                            <div>
                                <div className="panel panel-dashboard onboarding-page">
                                    <div className="panel-body">
                                        <div>
                                            <div>
                                                <div className="le-nav-header">
                                                    <h1 className="nav-header-text">How much do you want to charge?</h1>
                                                </div>
                                                <hr></hr>
                                            </div>
                                        </div>
                                        <article className="onboarding-page-item" style={{ paddingTop: "0px;" }}>
                                            <div className="rates-onboarding-rates-page-title">
                                                <p>We recommend starting with a low price to get a few bookings and earn some
                                            initial guest reviews. You can update your rates at any time.</p>
                                            </div>
                                        </article>
                                        <article className="onboarding-page-item">
                                            <div className="form-inline onboarding-inline-row">
                                                <div className="form-group form-group-label"><label className="control-label currency-select-label"
                                                    for="rates-onboarding-currencyCode">Currency</label></div>
                                                <div className="form-group">
                                                    <div><select id="rates-onboarding-currencyCode" className="form-control currency-select">
                                                        <option value=""></option>
                                                        <option value="AUD">Australian Dollar (AUD)</option>
                                                        <option value="EUR">Euros (EUR)</option>
                                                        <option value="GBP">Great British Pound (GBP)</option>
                                                        <option value="USD">US Dollar (USD)</option>
                                                        <option value="CAD">Canadian Dollar (CAD)</option>
                                                        <option value="NZD">New Zealand Dollar (NZD)</option>
                                                        <option value="BRL">Brazil Real (BRL)</option>
                                                    </select></div>
                                                </div>
                                            </div>
                                        </article>
                                        <article className="onboarding-page-item padding-top-20">
                                            <fieldset id="base-period-editor-container">
                                                <form className="rates-onboarding-base-period-editor">
                                                    <div className="form-inline onboarding-inline-row">
                                                        <div className="form-group form-group-label"><label className="control-label"
                                                            for="rates-onboarding-base-rate-amount">Nightly Base Rate</label></div>
                                                        <div className="form-group">
                                                            <div className="">
                                                                <div className="form-group form-control-text-overlay-container left"><input
                                                                    type="text" min="1" max="10000" className="form-control"
                                                                    maxlength="10" title="(USD)" id="rates-onboarding-base-rate-amount" /><span
                                                                        className="form-control-text-overlay text-muted">$</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="form-inline onboarding-inline-row minimum-stay-block">
                                                        <div className="form-group form-group-label"><label className="control-label"
                                                            for="rates-onboarding-base-rate-minstay">Minimum stay</label></div>
                                                        <div className="form-group">
                                                            <div className="form-group form-control-text-overlay-container right"><input
                                                                type="number" id="rates-onboarding-base-rate-minstay" className="form-control no-number-styles"
                                                                pattern="\d*" /><span className="form-control-text-overlay text-muted">night</span></div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </fieldset>
                                        </article>
                                        <article className="onboarding-page-item">
                                            <div className="le-nav-footer">
                                                <div className="nav-footer-back"><button className="btn btn-link btn-block"
                                                    data-automation-className="nav-footer-back" type="button">Back</button></div>
                                                <div>
                                                    <div className="nav-footer-next" aria-describedby="footer-next-button-popover"><button
                                                        className="btn btn-primary btn-block disabled" data-automation-className="nav-footer-next"
                                                        type="button" style={{ pointerEvents: "auto;" }}>Next</button></div>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default pricing;