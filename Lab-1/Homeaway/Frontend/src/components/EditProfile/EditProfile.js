import React, { Component } from 'react';
import './editprofile.css';
import TravelerProfilebar from '../TravelerProfilebar';

class EditProfile extends Component {
    render(){
        return(
            <div>
                <TravelerProfilebar />
                <div className="js-traveler-home-container js-loader-section loader-section">
                    <div>
                        <nav className="visible-xs text-center edit-profile-nav">
                            <ul className="nav nav-underline" role="tablist">
                                <li role="presentation" className="active">
                                    <a href="#profileInfo" role="tab" data-toggle="tab" data-bypass="true">Profile Information</a></li>
                                <li role="presentation"><a href="#verification" role="tab" data-toggle="tab" data-bypass="true">Verification</a></li>
                            </ul>
                        </nav>
                        <section id="js-photo-cropper-container-mobile" className="stab-photo-cropper-container-mobile"></section>

                        <section className="container">
                            <div id="js-profile-alert"></div>

                            <div className="row tab-content">
                                <div id="profileInfo" role="tabpanel" className="tab-pane fade in active">
                                    <section id="js-photo-cropper-container" className="stab-photo-cropper-container is-closed"></section>

                                    <header id="js-avatar-summary" className="profile-header text-center">
                                        <div>
                                            <div className="profile-header-photo">
                                                <div className="img-circle profile-user-photo js-user-photo">
                                                    <div className="img-circle user-photo" style={{ backgroundImage: "url('https://odis.homeaway.com/mda01/7651dc3c-43ae-4ab3-98ef-396e47b19072.2.2')" }}></div>
                                                </div>
                                                <button id="js-edit-photo" className="btn btn-default btn-icon-circle btn-edit-photo" title="Add photo"
                                                    type="button">
                                                    <i className="icon-edit"></i>
                                                </button>
                                            </div>

                                            <h2 className="user-name">XXXXXXX</h2>
                                            <p className="text-muted"><span className="user-location"></span>Member since XXXXXXX</p>
                                        </div>
                                    </header>

                                    <div className="col-xs-12 col-sm-8">
                                        <div className="js-profile-form profile-form-container">
                                            <div>
                                                <div className="section-with-border no-bottom-padding">
                                                    <div className="row">
                                                        <div className="col-xs-8 hidden-xs">
                                                            <h3 className="section-header">
                                                                Profile information
                                            </h3>
                                                        </div>
                                                        <div className="col-xs-12 col-sm-4 text-right">
                                                            <a className="facebook-import-link js-facebook-import">
                                                                Import
                                                <div className="social-icon img-circle text-center">
                                                                    <i className="icon-facebook icon-white"></i>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <form role="form" className="js-profile-form">
                                                        <div className="row form-group ">
                                                            <label className="col-xs-12 sr-only" for="profileFirstNameInput">First name</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileFirstNameInput"
                                                                    placeholder="First name" value="XXXXXXX" data-input-model-name="firstName"
                                                                    maxlength="100" required="" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group ">
                                                            <label className="col-xs-12 sr-only" for="profileLastNameInput">Last name or
                                                initial</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileLastNameInput"
                                                                    placeholder="Last name or initial" value="XXXXXXX"
                                                                    data-input-model-name="lastName" maxlength="100" required="" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileAboutInput">About me</label>
                                                            <div className="col-xs-12">
                                                                <textarea type="text" className="form-control input-lg js-input-field" rows="4"
                                                                    id="profileAboutInput" placeholder="About me" data-input-model-name="about"
                                                                    maxlength="4000"></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileCityInput">Current City</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileCityInput"
                                                                    placeholder="My city, country" value="" data-input-model-name="currentCity"
                                                                    maxlength="80" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileCompanyInput">Company</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileCompanyInput"
                                                                    placeholder="Company" value="" data-input-model-name="company"
                                                                    maxlength="100" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileSchoolInput">School</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileSchoolInput"
                                                                    placeholder="School" value="" data-input-model-name="school"
                                                                    maxlength="100" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileHometownInput">Hometown</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileHometownInput"
                                                                    placeholder="Hometown" value="" data-input-model-name="hometown"
                                                                    maxlength="80" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileLanguageInput">Languages</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileLanguageInput"
                                                                    placeholder="Languages" value="" data-input-model-name="languages"
                                                                    maxlength="100" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileGenderInput">Gender</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <select className="form-control input-lg js-input-field" id="profileGenderInput"
                                                                    data-input-model-name="gender">
                                                                    <option disabled="" hidden="" value="" selected="selected">Gender</option>
                                                                    <option value="female">Female</option>
                                                                    <option value="male">Male</option>
                                                                    <option value="other">Other</option>
                                                                </select>
                                                            </div>
                                                            <span className="col-xs-12 help-block">
                                                                <div className="inline-svg svg-brand">
                                                                    <i class="fa fas fa-lock"></i>
                                                                </div>
                                                                This is never shared
                                            </span>
                                                        </div>

                                                        <div className="row form-group" id="mediated-sms-preference">
                                                            <div className="pull-left switch">
                                                                <input type="checkbox" name="settingsSmsPreference" id="settingsSmsPreference"
                                                                    className="js-settings-toggle-sms-preference" aria-checked="" />
                                                                <label for="settingsSmsPreference">
                                                                    <svg className="inline-svg switch-checked">
                                                                        {/* <use xmlns: xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-check"></use> */}
                                                                    </svg>
                                                                    <div className="switch-toggle"></div>
                                                                </label>
                                                            </div>
                                                            <br></br><br></br><br></br>
                                                            <div className="col-md-7 pull-left">
                                                                <span className="sms-pref-title">Send me texts about my bookings</span><br></br>
                                                                <span className="sms-pref-info">Only available for mobile phones in select
                                                    countries. Standard messaging rates apply. See <a href="https://www.homeaway.com/info/about-us/legal/terms-conditions"
                                                                        target="_blank">terms and conditions</a> and <a href="https://www.homeaway.com/info/about-us/legal/privacy-policy"
                                                                            target="_blank">privacy policy.</a></span>
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileLanguageInput">Phone number</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="tel" className="form-control input-lg js-input-field" id="profileLanguageInput"
                                                                    placeholder="Phone Number"  data-input-model-name="languages"
                                                                    maxlength="100" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">   
                                                            <span className="col-xs-12 help-block repeat-number hidden">
                                                                You've already entered this number. Please enter a different number.</span>

                                                            <span className="col-xs-12 help-block add-another-phone-section">
                                                                <a id="add-another-phone-link"> Add another phone number</a>
                                                            </span>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="profile-form-footer">
                                                <button type="submit" className="btn btn-primary hidden-xs js-submit-profile"
                                                    data-loading-text="Sending...">Save changes</button>
                                                <button type="submit" className="btn btn-primary btn-block visible-xs js-submit-profile"
                                                    disabled="disabled" data-loading-text="Sending...">Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
        )
    }
}

export default EditProfile;
