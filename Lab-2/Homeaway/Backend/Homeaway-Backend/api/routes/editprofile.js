const express = require("express");
const router = express.Router();
const checkAuth = require("../../middleware/check-auth");
var kafka = require('../../kafka/client');

//Route to handle update profile for the Traveler
/*
    @param : FIRST_NAME, LAST_NAME, EMAIL, PROFILE_IMAGE, PHONE_NUMBER
    @param : ABOUT_ME, CITY, COUNTRY, COMPANY, SCHOOL, HOMETOWN, LANGUAGES, GENDER
*/
router.put("/", checkAuth, function(req, res) {
  console.log("Inside Edit profile Request.");

      kafka.make_request('edit_user_profile',req.body.userDetails, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return res.status(404).json({
                message: "error"
            })
        }else{
            console.log("Inside else");
            return res.status(200).json({
                message: "Profile updated successfully",
                token:results
            });
        }   
    });
});
module.exports = router;