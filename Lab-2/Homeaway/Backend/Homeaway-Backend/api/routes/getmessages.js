const express = require('express');
const router = express.Router();
const checkAuth = require("../../middleware/check-auth");
var kafka = require('../../kafka/client');

//Route to handle Get Request Call for Messages
router.get('/', checkAuth, (req,res, next) => {
    console.log("Inside Message Get Request");

    kafka.make_request('get_messages',req.query, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return res.status().json({
                message: "Error in fetching messages"
            })
        }else{
            console.log("Inside else");
            return res.status(200).json({
                message: "Messages fetched successfully.",
                result:results
            });
        }   
    });
});

module.exports = router;