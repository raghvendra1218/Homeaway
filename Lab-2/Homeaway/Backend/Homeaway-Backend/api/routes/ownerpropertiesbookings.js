
const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
var kafka = require('../../kafka/client');

//Route to get Owner Properties bookings
/*
    @param: owner_Id
*/

router.get ('/', checkAuth, function(req,res) {
    console.log("Inside the owner Property bookings route.");
    kafka.make_request('owner_prop_bookings',req.query, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return res.status().json({
                message: "Failed to load owner properties bookings"
            })
        }else{
            console.log("Inside else");
            return res.status(200).json({
                message: "Owner properties bookings loaded successfully",
                result:results
            });
        }   
    });
});

module.exports = router;