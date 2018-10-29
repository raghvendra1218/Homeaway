const express = require('express');
const router = express.Router();
var kafka = require('../../kafka/client');

//Route to handle Post Request Call for SignUp

router.post('/',function(req,res){
    console.log("Inside Signup Request Handler");
    kafka.make_request('signup_user',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return res.status().json({
                message: "Failed to create new user"
            })
        }else{
            console.log("Inside else");
            return res.status(200).json({
                message: "User created successfully",
                result:results
            });
        }   
    });
});
module.exports = router;