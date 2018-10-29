const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/check-auth');
const kafka = require('../../kafka/client');

//Route to Post the Property Details
// TODO: Check if the the the login is Owner login 
// if yes then allow the Property post else throw error , handle that in front-end with suitable Message

router.post('/',checkAuth,function(req,res){
    console.log("Inside the Post property Handler");

    kafka.make_request('post_property',req.body.propertyDetails, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return res.status().json({
                message: "Auth failed"
            })
        }else{
            console.log("Inside else");
            return res.status(200).json({
                message: "Auth Successful",
                token:results
            });
        }  
    });
})
module.exports = router;