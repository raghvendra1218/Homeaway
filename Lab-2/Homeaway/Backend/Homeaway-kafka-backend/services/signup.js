const travelerModel = require('../models/traveler');
const ownerModel = require('../models/owner');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var isTraveler = JSON.parse(msg.isTraveler)
    if(isTraveler) {
        //If Traveler, Insert the record in TRAVELER_INFO_TABLE
        console.log("Inside Traveler Signup request");
        var newTraveler = new travelerModel();
        travelerModel.findOne({email: msg.email}, function(err,traveler){
            console.log("Checking if the email already exists");
            if(traveler) {
                console.log("user already exists");
                // res.send(400);
                callback(err, 'User already exists.');
            } else {
                console.log("email not found, creating new user");
                // newTraveler = {
                    bcrypt.hash(msg.password,10,(err,hash)=>{
                        if(err) {
                            // return res.status(500).json({
                            //     error: err
                            // });
                            callback(err, 'error in decrypting password')
                        } else {
                            newTraveler._id = new mongoose.Types.ObjectId(),
                            newTraveler.firstname = msg.firstName;
                            newTraveler.lastname = msg.lastName;
                            newTraveler.email = msg.email;
                            newTraveler.password = hash;
                            newTraveler.phonenumber =msg.phonenumber||"";
                            newTraveler.profileimage =msg.profileimage||"preview.jpg";
                            newTraveler.aboutme = msg.aboutme||"";
                            newTraveler.city =msg.city||"";
                            newTraveler.country =msg.country||"";
                            newTraveler.company =msg.company||"";
                            newTraveler.school =msg.school||"";
                            newTraveler.hometown =msg.hometown||"";
                            newTraveler.languages =msg.languages||"";
                            newTraveler.gender =msg.gender||"";
                            newTraveler.memberSince= msg.memberSince||Date.now();
                            newTraveler.isTraveler = msg.isTraveler||true;
                            newTraveler.save()
                            .then(traveler=>{
                                console.log("Traveler record created: ", traveler);
                                // res.sendStatus(200).end();
                                callback(null,traveler);
                            })
                            .catch(err => {
                                console.log(err);
                                // res.sendStatus(400).end();
                                callback(err,'error in creating the user');
                            });
                        }
                // };
            })
        }
    })

    } else {
        //If Owner, Insert the record in the OWNER_INFO_TABLE 
        console.log("Inside Owner Signup request"); 
        var newOwner = new ownerModel();
        ownerModel.findOne({email: msg.email}, function(err,owner){
            console.log("Checking if the email already exists");
            if(owner) {
                console.log("user already exists");
                // res.send(400);
                callback(err, 'User already exists.');
            } else {
                console.log("email not found, creating new user");
                // newTraveler = {
                    bcrypt.hash(msg.password,10,(err,hash)=>{
                        if(err) {
                            // return res.status(500).json({
                            //     error: err
                            // });
                            callback(err, 'error in decrypting password')
                        } else {
                            newOwner._id = new mongoose.Types.ObjectId(),
                            newOwner.firstname = msg.firstName;
                            newOwner.lastname = msg.lastName;
                            newOwner.email = msg.email;
                            // newOwner.password = msg.password;
                            newOwner.password = hash;
                            newOwner.phonenumber =msg.phonenumber||"";
                            newOwner.profileimage =msg.profileimage||"preview.jpg";
                            newOwner.aboutme = msg.aboutme||"";
                            newOwner.city =msg.city||"";
                            newOwner.country =msg.country||"";
                            newOwner.company =msg.company||"";
                            newOwner.school =msg.school||"";
                            newOwner.hometown =msg.hometown||"";
                            newOwner.languages =msg.languages||"";
                            newOwner.gender =msg.gender||"";
                            newOwner.memberSince= msg.memberSince||Date.now();
                            newOwner.isTraveler = msg.isTraveler||false;
                            newOwner.save()
                            .then(owner=>{
                                console.log("Owner record created: ", owner);
                                // res.sendStatus(200).end();
                                callback(null,owner);
                            })
                            .catch(err => {
                                console.log(err);
                                // res.sendStatus(400).end();
                                callback(err,'error in creating the user');
                            });
                        }
                    })
            }
        })
    }
}
exports.handle_request = handle_request;