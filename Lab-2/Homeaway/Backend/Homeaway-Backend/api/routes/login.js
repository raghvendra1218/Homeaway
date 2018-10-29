const express = require('express');
const router = express.Router();
var kafka = require('../../kafka/client');

//Route to handle Post Request Call for Login
router.post('/', (req,res, next) => {
    console.log("Inside Login Post Request");

    kafka.make_request('login_user',req.body.userDetails, function(err,results){
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
});

module.exports = router;

