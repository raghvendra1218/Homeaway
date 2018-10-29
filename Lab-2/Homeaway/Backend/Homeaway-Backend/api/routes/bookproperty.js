const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
var kafka = require('../../kafka/client');

//Route to book a particular Property

router.post('/', checkAuth,function(req,res){
    console.log("Inside Book Property route");
    kafka.make_request('book_property',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return res.status().json({
                message: "Failed to book property"
            })
        }else{
            console.log("Inside else");
            return res.status(200).json({
                message: "Property booked successfully",
                result:results
            });
        }   
    });
});
module.exports = router;