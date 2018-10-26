const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
const propertyModel = require('../../models/property');
const mongoose = require('mongoose');


//Route to Post the Property Details
// TODO: Check if the the the login is Owner login 
// if yes then allow the Property post else throw error , handle that in front-end with suitable Message

router.post('/',checkAuth,function(req,res){
    console.log("Inside the Post property Handler");
    var PROP_COUNTRY = req.body.propertyDetails.propCountry;

    //Query to update the parameters received
    var newProperty = new propertyModel();
    newProperty._id = new mongoose.Types.ObjectId();
    newProperty.propownerId = req.body.propertyDetails.ownerId;
    newProperty.propcountry = req.body.propertyDetails.propCountry;
    newProperty.propstaddress = req.body.propertyDetails.propStreetAddress;
    newProperty.propapt = req.body.propertyDetails.propApartment;
    newProperty.propcity = req.body.propertyDetails.propCity;
    newProperty.propstate = req.body.propertyDetails.propState;
    newProperty.propzip = req.body.propertyDetails.propZip;
    newProperty.propheadline = req.body.propertyDetails.propHeadline;
    newProperty.propdesc = req.body.propertyDetails.propDescription;
    newProperty.proptype = req.body.propertyDetails.propType;
    newProperty.propbedroom = req.body.propertyDetails.propNoBedroom;
    newProperty.propguestcount = req.body.propertyDetails.propGuestCount;
    newProperty.propbath = req.body.propertyDetails.propNoBathroom;
    newProperty.propimages = JSON.stringify(req.body.propertyDetails.propPhotosArr);
    newProperty.propcurrency = req.body.propertyDetails.propCurrency;
    newProperty.propbaserate = req.body.propertyDetails.propBaseRate;
    newProperty.propavaildate = req.body.propertyDetails.propStartDate;
    newProperty.propavailtill = req.body.propertyDetails.propEndDate;
    newProperty.email = req.body.propertyDetails.email;
    newProperty.isBooked = req.body.propertyDetails.isBooked;
    newProperty.travelerId = req.body.propertyDetails.travelerId;
    newProperty.bookstartdate = "";
    newProperty.bookenddate = "";
    newProperty.save()
    .then(property=>{
        console.log("Property created: ", property);
        res.status(200).json({
            message: 'Property posted Successfully'
        });
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400).end();
    });
})
module.exports = router;