const propertyModel = require('../models/property');
const mongoose = require('mongoose');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var PROP_COUNTRY = msg.propCountry;

    //Query to update the parameters received
    var newProperty = new propertyModel();
    newProperty._id = new mongoose.Types.ObjectId();
    newProperty.propownerId = msg.ownerId;
    newProperty.propcountry = msg.propCountry;
    newProperty.propstaddress = msg.propStreetAddress;
    newProperty.propapt = msg.propApartment;
    newProperty.propcity = msg.propCity;
    newProperty.propstate = msg.propState;
    newProperty.propzip = msg.propZip;
    newProperty.propheadline = msg.propHeadline;
    newProperty.propdesc = msg.propDescription;
    newProperty.proptype = msg.propType;
    newProperty.propbedroom = msg.propNoBedroom;
    newProperty.propguestcount = msg.propGuestCount;
    newProperty.propbath = msg.propNoBathroom;
    newProperty.propimages = JSON.stringify(msg.propPhotosArr);
    newProperty.propcurrency = msg.propCurrency;
    newProperty.propbaserate = msg.propBaseRate;
    newProperty.propavaildate = msg.propStartDate;
    newProperty.propavailtill = msg.propEndDate;
    newProperty.email = msg.email;
    newProperty.isBooked = msg.isBooked;
    newProperty.travelerId = msg.travelerId;
    newProperty.bookstartdate = "";
    newProperty.bookenddate = "";
    newProperty.save()
    .then(property=>{
        console.log("Property created: ", property);
        // res.status(200).json({
        //     message: 'Property posted Successfully'
        // });
        callback(null,property);
    })
    .catch(err => {
        console.log(err);
        // res.sendStatus(400).end();
        callback(err,"error");
    });
}
exports.handle_request = handle_request;