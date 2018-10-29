
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
var kafka = require('../../kafka/client');

//Route to get Traveler bookings
/*
    @param: Traveler_Id
*/

router.get('/', checkAuth,function(req,res){
    console.log("Inside the Traveler Bookings route.");
    kafka.make_request('traveler_bookings',req.query, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return res.status().json({
                message: "Failed to load traveler bookings"
            })
        }else{
            console.log("Inside else");
            return res.status(200).json({
                message: "Traveler bookings loaded successfully",
                result:results
            });
        }   
    });
});

module.exports = router;