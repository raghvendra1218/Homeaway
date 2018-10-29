const express = require('express');
const router = express.Router();
const kafka = require('../../kafka/client');

//Route to get the Search Property details
/*
    @param : City 
    @param : Arrival Date
    @param : End Date
    @param : Head Count
*/

router.get('/', function(req,res){
    console.log("Inside search Request.");

    kafka.make_request('search_property',req.query, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return res.status().json({
                message: "Unable to find property."
            })
        }else{
            console.log("Inside else");
            return res.status(200).json({
                message: "Successfully fetched the properties",
                result:results
            });
        }  
    });
});
module.exports = router;
