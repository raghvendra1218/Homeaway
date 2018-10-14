export const signup = (data) => {
    let msg = "";
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@]{8,}$/;

    if(data.firstName ==='' || data.lastName ==='' || data.email ==='' || data.password ===''){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!(namePattern.test(data.firstName))) {
        msg = "Enter correct First Name";
        return msg;
    }
    if(!(namePattern.test(data.lastName))){
        msg = "Enter correct Last Name";
        return msg;
    }
    if (!(emailPattern.test(data.email))) {
        msg = "Enter correct Email Address";
        return msg;
    }
    if (data.password.length<8 || data.password.length>14) {
        msg = "Password must be 8 to 15 character long";
        return msg;
    }
    if (!(passwordPattern.test(data.password))) {
        msg = "Password should contain one small letter, \n one capital letter, one digit \nand one special character @ ";
        return msg;
    }
    return msg;
};

export const search = (data) => {
    let msg = "";
    const city = /^[a-zA-Z\s]+$/;

    if(data.city ==='' || data.startDate ==='' || data.endDate ==='' || data.headCount ===''){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!(city.test(data.city))) {
        msg = "Enter correct City";
        return msg;
    }
    if(new Date(data.startDate) > new Date(data.endDate)){
        msg = "Start Date cannot be greater than End Date";
        return msg;
    } 
    if (data.headCount<0) {
        msg = "Head Count cannot be negative";
        return msg;
    }
    return msg;
};

export const login = (data) => {
    let msg = "";
    const emailPattern = /^[\w.]*@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

    if( data.email ==='' || data.password ===''){
        msg = "All fields are mandatory. Please fill all details";
        return msg;
    }
    if (!(emailPattern.test(data.email))) {
        msg = "Enter correct email";
        return msg;
    }
    return msg;
};


export const postproperty = (data) => {
    let msg = "";
    const countryPattern = /^[a-zA-Z\s]+$/;
    const cityPattern = /^[a-zA-Z\s]+$/;
    const statePattern = /^[a-zA-Z\s]+$/;
    const zipcodePattern  = /^\d{5}(?:[-]\d{4})?$/;

    if(data.propCountry ==='' || data.propStreetAddress ==='' ||
    data.propApartment ==='' || data.propCity ==='' || data.propState ==='' || data.propZip ==='' ||
    data.propHeadline ==='' || data.propDescription ==='' || data.propType ==='' ||
    data.propNoBedroom ==='' || data.propGuestCount ==='' || data.propNoBathroom ==='' ||
    data.propCurrency ==='' || data.propBaseRate ==='' || data.propStartDate ==='' || data.propEndDate ===''
    ){
        msg = "All fields are mandatory. Please fill all details";
        return msg; 
    }
    if(!countryPattern.test(data.propCountry)) {
        msg = "Enter correct Country"
        return msg; 
    }
    if(!cityPattern.test(data.propCity)) {
        msg = "Enter correct City"
        return msg; 
    }
    if(!statePattern.test(data.propState)) {
        msg = "Enter correct State"
        return msg; 
    }
    if(!zipcodePattern.test(data.propZip)) {
        msg = "Enter correct Zip Code"
        return msg; 
    }
    if(data.propNoBedroom < 0) {
        msg = "Number of Bedroom cannot be Negative."
        return msg; 
    }
    if(data.propGuestCount < 0) {
        msg = "Guests Count cannot be Negative."
        return msg; 
    }
    if(data.propNoBathroom < 0) {
        msg = "Number of Bathroom cannot be Negative."
        return msg; 
    }
    if(data.propBaseRate < 0) {
        msg = "Base Rate cannot be Negative."
        return msg; 
    }
    if(new Date(data.propStartDate) > new Date(data.propEndDate)){
        msg = "Start Date cannot be greater than End Date";
        return msg;
    } 
};