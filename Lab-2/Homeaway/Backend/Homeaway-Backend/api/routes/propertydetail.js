const express = require('express');
const router = express.Router();
var kafka = require('../../kafka/client');

//Route to get the Details of a particular Property Id
/*
    @param : Property Id 
*/

router.get('/', function (req, res, next) {
    console.log("Inside Property Detail route");
    kafka.make_request('property_detail',req.query, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return res.status().json({
                message: "Failed to fetch property details"
            })
        }else{
            console.log("Inside else");
            return res.status(200).json({
                message: "Property details fetched Successfully",
                result:results
            });
        }   
    });
})

module.exports = router;