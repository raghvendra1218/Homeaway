const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
var kafka = require('../../kafka/client');

//Route to get the details of the user(Traveler/Owner)

router.get('/', checkAuth, function (req, res, next) {
    console.log("Inside User Detail Request");
    kafka.make_request('user_details',req.query, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return res.status().json({
                message: "Failed to fetch user details"
            })
        }else{
            console.log("Inside else");
            return res.status(200).json({
                message: "Fetched user details successfully",
                token:results
            });
        }   
    });
})

module.exports = router;