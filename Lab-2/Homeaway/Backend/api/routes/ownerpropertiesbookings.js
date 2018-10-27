
const express = require('express');
const router = express.Router();
const propertyModel = require('../../models/property');
const checkAuth = require('../../middleware/check-auth');

//Route to get Owner Properties bookings
/*
    @param: owner_Id
*/

router.get ('/', checkAuth, function(req,res) {
    console.log("Inside the owner Property bookings route.");
    var ownerId = req.query.ownerId;
    propertyModel.find({
        $and:[
            {propownerId : ownerId},
            {isBooked : true}
        ]
    })
    .exec()
    .then(propbookings=>{
        console.log("Booked properties fetched: ", propbookings);
        res.status(200).json({
            message: 'Booked properties fetched Successfully',
            result : propbookings
        });
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400).end();
    });
});

module.exports = router;