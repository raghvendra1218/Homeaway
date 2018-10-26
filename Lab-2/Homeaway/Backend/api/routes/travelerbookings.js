
const express = require('express');
const router = express.Router();
const propertyModel = require('../../models/property');
const checkAuth = require('../../middleware/check-auth');

//Route to get Traveler bookings
/*
    @param: Traveler_Id
*/

router.get('/', checkAuth,function(req,res){
    console.log("Inside the Traveler Bookings route.");
    var travelerId = req.query.travelerId;

    propertyModel.find({
        $and:[
            {travelerId : travelerId},
            {isBooked : true}
        ]
    })
    .exec()
    .then(bookings=>{
        console.log("Bookings fetched: ", bookings);
        res.status(200).json({
            message: 'Bookings fetched Successfully',
            result : bookings
        });
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400).end();
    });
});

module.exports = router;