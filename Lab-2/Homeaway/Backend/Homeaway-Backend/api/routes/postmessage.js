const express = require('express');
const router = express.Router();
const checkAuth = require("../../middleware/check-auth");
var kafka = require('../../kafka/client');

//Route to handle Get Request Call for Messages
router.post('/', checkAuth,(req,res, next) => {
    console.log("Inside Message Post Request");

    kafka.make_request('post_message',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return res.status().json({
                message: "Error in posting messages"
            })
        }else{
            console.log("Inside else");
            return res.status(200).json({
                message: "Messages posted successfully.",
                result:results
            });
        }   
    });
});

module.exports = router;