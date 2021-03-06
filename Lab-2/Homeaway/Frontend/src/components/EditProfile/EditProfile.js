import React, { Component } from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import './editprofile.css';
import {capitalizeFirstLetter} from '../../utility';
import TravelerProfilebar from '../TravelerProfilebar/TravelerProfilebar';
import jwtDecode from 'jwt-decode';
import {userProfileDateFormat} from '../../utility';
import {editProfileData} from '../../actions/index';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import {CONSTANTS} from '../../Constants';

class EditProfile extends Component {
    constructor(props) {
        super();
        this.state = {
            userDetails : {
                // email: sessionStorage.getItem('userEmail'),
                // firstName : capitalizeFirstLetter(sessionStorage.getItem('userFirstName')),
                // lastName : capitalizeFirstLetter(sessionStorage.getItem('userLastName')),
                // aboutMe: sessionStorage.getItem('aboutMe'),
                // city: capitalizeFirstLetter(sessionStorage.getItem('city')),
                // country: capitalizeFirstLetter(sessionStorage.getItem('country')),
                // company: capitalizeFirstLetter(sessionStorage.getItem('company')),
                // school: capitalizeFirstLetter(sessionStorage.getItem('school')),
                // hometown: capitalizeFirstLetter(sessionStorage.getItem('hometown')),
                // languages:capitalizeFirstLetter(sessionStorage.getItem('languages')),
                // gender: capitalizeFirstLetter(sessionStorage.getItem('gender')),
                // phoneNumber: sessionStorage.getItem('phoneNumber'),

                //Using get api Call through Get Component didmount.

                email: jwtDecode(localStorage.getItem('token')).email,
                isTraveler: jwtDecode(localStorage.getItem('token')).isTraveler,
                userId: jwtDecode(localStorage.getItem('token')).userId,
                firstName : "",
                lastName : "",
                aboutMe: "",
                profileImage: "",
                city: "",
                country: "",
                company: "",
                school: "",
                hometown: "",
                languages:"",
                gender: "",
                phoneNumber: "",
                memberSince: "",
                isUpdated: false,
                getImage: false
            }
        }

        // Bind the handlers to this class
        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
        this.aboutMeChangeHandler = this.aboutMeChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.fileChangeHandler = this.fileChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
        this.languagesChangeHandler = this.languagesChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.phoneNumberChangeHandler = this.phoneNumberChangeHandler.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    //get the user details from Back-end  
    componentDidMount(){
        axios.get(`${CONSTANTS.BACKEND_URL}/userdetail`,{
        params: {email:this.state.userDetails.email, isTraveler: this.state.userDetails.isTraveler},
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        })
        // axios.get(`${CONSTANTS.BACKEND_URL}/userdetail`, { params: {email:this.state.email, isTraveler: this.state.isTraveler}})
                .then((response) => {
                    if(response.status === 200) {
                        // console.log("Decoded Values: ", jwtDecode(response.data.token));
                        //update the state with the response data
                        let userDetailsFetched = jwtDecode(localStorage.getItem('token'));
                        let obj1 = this.state.userDetails;
                        obj1.userId = userDetailsFetched.userId;
                        obj1.firstName = userDetailsFetched.firstname;
                        obj1.lastName = userDetailsFetched.lastname;
                        obj1.aboutMe = userDetailsFetched.aboutme;
                        obj1.profileImage = userDetailsFetched.profileimage;
                        obj1.city = userDetailsFetched.city;
                        obj1.country = userDetailsFetched.country;
                        obj1.company = userDetailsFetched.company;
                        obj1.school = userDetailsFetched.school;
                        obj1.hometown = userDetailsFetched.hometown;
                        obj1.languages = userDetailsFetched.languages;
                        obj1.gender = userDetailsFetched.gender;
                        obj1.memberSince = userDetailsFetched.memberSince;
                        obj1.phoneNumber = userDetailsFetched.phonenumber;
                        this.setState({
                                ...this.state,
                                userDetails: obj1
                        });
                        console.log("OBJ1: ", obj1);
                        localStorage.setItem('token', response.data.token);
                        this.props.editProfileData(obj1,true,false);
                        // var profilePhoto = userDetailsFetched.profileimage;
                        // this.handleGetPhoto(profilePhoto);
                    }
            });
    }
    //Call the Will Mount to set the auth Flag to false
    // componentWillMount(){
    //     this.setState({
    //         userDetails : {
    //             ...this.state.userDetails,
    //             authFlag : false
    //         }
    //     })
    // }

    handleGetPhoto = (fileName) => {
        axios.post(`${CONSTANTS.BACKEND_URL}/download/` + fileName)
            .then(response => {
                console.log("Image Res : ", response);
                let imagePreview = 'data:image/jpg;base64, ' + response.data;
                this.setState({
                    ...this.state.userDetails,
                    profileImage: imagePreview,
                    getImage: true
                })
            });
    }
    //First Name change handler to update state variable with the text entered by the user
    firstNameChangeHandler = (e) => {
        const userFirstName = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                // ...this.state,
                firstName : userFirstName
            }
        })
    }

    //Last Name change handler to update state variable with the text entered by the user
    lastNameChangeHandler = (e) => {
        const userLastName = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                // ...this.state,
                lastName : userLastName
            }
        })
    }

    //About Me change handler to update state variable with the text entered by the user
    aboutMeChangeHandler = (e) => {
        const userAboutMe = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                // ...this.state,
                aboutMe : userAboutMe
            }
        })
    }

    //File change Handler to upload a new file uploaded by the user
    fileChangeHandler = (e) => {
        const newImage = e.target.files[0];
        this.setState({
            userDetails: {
                ...this.state.userDetails,
                // ...this.state,
                profileImage: newImage
            }
        })
    }
    //City change handler to update state variable with the text entered by the user
    cityChangeHandler = (e) => {
        const userCity = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                // ...this.state,
                city : userCity
            }
        })
    }

    //Country change handler to update state variable with the text entered by the user
    countryChangeHandler = (e) => {
        const userCountry = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                // ...this.state,
                country : userCountry
            }
        })
    }

    //Company change handler to update state variable with the text entered by the user
    companyChangeHandler = (e) => {
        const userCompany = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                // ...this.state,
                company : userCompany
            }
        })
    }

    //School change handler to update state variable with the text entered by the user
    schoolChangeHandler = (e) => {
        const userSchool = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                // ...this.state,
                school : userSchool
            }
        })
    }

    //Hometown change handler to update state variable with the text entered by the user
    hometownChangeHandler = (e) => {
        const userHometown = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                // ...this.state,
                hometown : userHometown
            }
        })
    }

    //Languages change handler to update state variable with the text entered by the user
    languagesChangeHandler = (e) => {
        const userLanguages = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                // ...this.state,
                languages : userLanguages
            }
        })
    }

    //Gender change handler to update state variable with the text entered by the user
    genderChangeHandler = (e) => {
        const userGender = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                // ...this.state,
                gender : userGender
            }
        })
    }

    //Phone Number change handler to update state variable with the text entered by the user
    phoneNumberChangeHandler = (e) => {
        const userPhoneNumber = e.target.value;
        this.setState({
            userDetails:{
                ...this.state.userDetails,
                // ...this.state,
                phoneNumber : userPhoneNumber
            }
        })
    }
    
    //submit Change handler to send a request to the node back-end
    saveChanges = (e) => {
        // var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            userDetails: {
                ...this.state.userDetails,
            }
        }
        this.props.editProfileData(data,true,false);
        //Put Call to update the Traveler Details
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a put request with the user data
        axios.put(`${CONSTANTS.BACKEND_URL}/editprofile`,
        data,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        })
        .then(response => {
            console.log("Status Code : ",response.status);
            if(response.status === 200){
                this.setState({
                    ...this.state,
                    isUpdated : true
                })
                // localStorage.setItem('token', response.data.token);
                this.props.editProfileData(data,true,true);
                console.log("message:", response.data.message);
                alert("Your profile was successfully edited");
            } else {
                this.setState({
                    ...this.state,
                    isUpdated : false
                })
                // localStorage.setItem('token', response.data.token);
                this.props.editProfileData(data,true,true);
                console.log("message:", response.data.message);
                alert("Unable to update the profile");
            }
        })
        .catch( error =>{
            console.log("error:", error);
        });
    }
    render() {
        // redirect based on successful login
        let redirectVar = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/"/>
        }


        //Retriving the values associated with the logged in User
        const userFirstName = capitalizeFirstLetter(sessionStorage.getItem('userFirstName'));
        // const userLastName = capitalizeFirstLetter(sessionStorage.getItem('userLastName'));
        // const userAboutMe = sessionStorage.getItem('aboutMe');
        // const userCity = capitalizeFirstLetter(sessionStorage.getItem('city'));
        // const userCountry = capitalizeFirstLetter(sessionStorage.getItem('country'));
        // const userCompany = capitalizeFirstLetter(sessionStorage.getItem('company'));
        // const userSchool = capitalizeFirstLetter(sessionStorage.getItem('school'));
        // const userHometown = capitalizeFirstLetter(sessionStorage.getItem('hometown'));
        // const userLanguages = capitalizeFirstLetter(sessionStorage.getItem('languages'));
        // const userGender = capitalizeFirstLetter(sessionStorage.getItem('gender'));
        // const phoneNumber = sessionStorage.getItem('phoneNumber');
        return(
            <div>
                {redirectVar}
                <TravelerProfilebar />
                <div className="js-traveler-home-container js-loader-section loader-section">
                    <div>
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
                                                        <input style={{display: 'none'}} type="file" onChange ={this.fileChangeHandler} ref= {fileInput => this.fileInput = fileInput}/>
                                                        <button id="js-edit-photo" onClick={()=> this.fileInput.click()} className="btn btn-default btn-icon-circle btn-edit-photo" title="Add photo" type="button">
                                                            <i className="icon-edit"></i>
                                                        </button>
                                                    </div>
                                                    <h2 className="user-name">{userFirstName}</h2>
                                            <p className="text-muted"><span className="user-location"></span>Member since {userProfileDateFormat(this.state.userDetails.memberSince)}</p>
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
                                                                    placeholder="First name" data-input-model-name="firstName" value ={this.state.userDetails.firstName} onChange = {this.firstNameChangeHandler}
                                                                    maxlength="100" required="" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group ">
                                                            <label className="col-xs-12 sr-only" for="profileLastNameInput">Last name or initial</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileLastNameInput"
                                                                    placeholder="Last name or initial" value = {this.state.userDetails.lastName} onChange ={this.lastNameChangeHandler}
                                                                    data-input-model-name="lastName" maxlength="100" required="" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileAboutInput">About me</label>
                                                            <div className="col-xs-12">
                                                                <textarea type="text" className="form-control input-lg js-input-field" rows="4"
                                                                    id="profileAboutInput" placeholder="About me" value = {this.state.userDetails.aboutMe} onChange = {this.aboutMeChangeHandler} data-input-model-name="about"
                                                                    maxlength="4000"></textarea>
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileCityInput">Current City</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileCityInput"
                                                                    placeholder="My city" value ={this.state.userDetails.city} onChange ={this.cityChangeHandler} data-input-model-name="currentCity"
                                                                    maxlength="80" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileCountryInput">Current Country</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileCountryInput"
                                                                    placeholder="My country" value = {this.state.userDetails.country} onChange={this.countryChangeHandler} data-input-model-name="currentCountry"
                                                                    maxlength="80" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileCompanyInput">Company</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileCompanyInput"
                                                                    placeholder="Company" value= {this.state.userDetails.company} onChange ={this.companyChangeHandler} data-input-model-name="company"
                                                                    maxlength="100" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileSchoolInput">School</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileSchoolInput"
                                                                    placeholder="School" value = {this.state.userDetails.school} onChange={this.schoolChangeHandler} data-input-model-name="school"
                                                                    maxlength="100" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileHometownInput">Hometown</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileHometownInput"
                                                                    placeholder="Hometown" value = {this.state.userDetails.hometown} onChange ={this.hometownChangeHandler} data-input-model-name="hometown"
                                                                    maxlength="80" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileLanguageInput">Languages</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <input type="text" className="form-control input-lg js-input-field" id="profileLanguageInput"
                                                                    placeholder="Languages" value = {this.state.userDetails.languages} onChange={this.languagesChangeHandler} data-input-model-name="languages"
                                                                    maxlength="100" />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <label className="col-xs-12 sr-only" for="profileGenderInput">Gender</label>
                                                            <div className="col-sm-12 col-md-7">
                                                                <select className="form-control input-lg js-input-field" id="profileGenderInput"
                                                                    data-input-model-name="gender" onChange ={this.genderChangeHandler}>
                                                                    <option disabled="" hidden="" value={this.state.userDetails.gender} selected="selected">{this.state.userDetails.gender}</option>
                                                                    <option value="female">Female</option>
                                                                    <option value="male">Male</option>
                                                                    <option value="other">Other</option>
                                                                </select>
                                                            </div>
                                                            <span className="col-xs-12 help-block">
                                                                <div className="inline-svg svg-brand">
                                                                    <i class="fa fas fa-lock"></i>
                                                                </div>This is never shared
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
                                                                    placeholder="Phone Number"value ={this.state.userDetails.phoneNumber} onChange= {this.phoneNumberChangeHandler}  data-input-model-name="languages"
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
                                                <button type="submit" onClick= {this.saveChanges} className="btn btn-primary hidden-xs js-submit-profile"
                                                    data-loading-text="Sending...">Save changes</button>
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
function mapDispatchToProps(dispatch) {
    return {
        editProfileData: (profileData, isFetched, isUpdated) => dispatch(editProfileData(profileData, isFetched, isUpdated)),
    };
}

function mapStateToProps(state) {
    return{
        profileData : state.profileData,
    };
}
const editprofile = withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProfile));
export default editprofile;
// export default EditProfile;
