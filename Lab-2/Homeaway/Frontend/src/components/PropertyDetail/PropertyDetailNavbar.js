import React from 'react';
import './propertydetail.css';
import {CONSTANTS} from '../../Constants';

const propertydetailsnavbar =(props)=>{
    return(
        <div className="pdp-container margin-bottom-sm shadow-bottom-s">
            <div className="pdp-body-wrapper">
                <div className="pdp-headline-container container hidden-xs js-headlineContainer">
                    <ul className="nav property-back-nav">
                        <li>
                            <form method='get' action={CONSTANTS.ROOTURL +"/searchproperty"}>
                                <button className="js-backToSearch btn-back-to-search btn btn-sm btn-default" type="submit">
                                    <span><i className="icon-chevron-left"></i>Back to Search</span>
                                </button>
                            </form>
                        </li>
                    </ul>
                    <div className="headline-messages">
                        <span className="premier-badge js-premierBadge"><span className="premier-badge-label">Premier Partner</span></span>
                        <div className="headline-message">
                            <div className="superlative-reviews-summary " data-wdio="reviews-summary-pdp-container">
                                <a href="#reviews">
                                    <span><strong>Wonderful!</strong></span>
                                    <span><strong>4.9/5 - </strong></span>
                                    <div className="rating rating-5" title="Average Rating: 4.9"></div>
                                    <span className="review-count">
                                        (7 traveler reviews)
                                            </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="summary" className="page-anchor"></div>
                <div className="pdp-cap js-pdpCap gt-navbar hidden-xs affix-top">
                    <div className="pdp-cap-inner with-hearting">
                        <div className="pdp-cap-container container">
                            <div className="row">
                                <div className="hidden-xs">
                                    <ul className="nav nav-underline section-nav js-propertyNav" role="tablist" data-wdio="pdp-navbar">
                                        <li className="js-sectionNavPill">
                                            <a href="#summary" data-navtitle="property-summary" data-wdio="navbar-property-summary">
                                                <i className="icon-home"></i>
                                                Overview
                                            </a>
                                        </li>
                                        <li className="js-sectionNavPill">
                                            <a href="#amenities" data-navtitle="amenities" data-wdio="navbar-amenties">
                                                <i className="icon-list"></i>
                                                Amenities
                                             </a>
                                        </li>
                                        <li className="js-sectionNavPill">
                                            <a href="#reviews" data-navtitle="reviews" data-wdio="navbar-reviews">
                                                <i className="icon-star"></i>
                                                Reviews
                                            </a>
                                        </li>
                                        <li className="js-sectionNavPill">
                                            <a href="#map" data-navtitle="map" data-wdio="navbar-map">
                                                <i className="icon-location"></i>
                                                Map
                                            </a>
                                        </li>
                                        <li className="js-sectionNavPill">
                                            <a href="#photos" data-navtitle="gallery" data-wdio="navbar-gallery">
                                                <i className="icon-picture"></i>
                                                Photos
                                            </a>
                                        </li>
                                        <li className="js-sectionNavPill">
                                            <a href="#ratesAnchor" data-navtitle="payment" data-wdio="navbar-payment">
                                                <i className="icon-creditcard"></i>
                                                Rates &amp; Availability
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default propertydetailsnavbar;