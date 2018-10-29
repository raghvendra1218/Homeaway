const travelerModel = require('../models/traveler');
const ownerModel = require('../models/owner');
const jwt = require('jsonwebtoken');
const JWT_KEY = "secret";

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var email = msg.email;
    console.log("email: ", email);
    var isTraveler = JSON.parse(msg.isTraveler);
    if (isTraveler) {
        console.log("Inside Traveler Detail Request");
        //QUERY travelers collection to get the traveler details
        travelerModel.find({ email: email })
            .exec()
            .then(traveler => {
                if (traveler.length < 1) {
                    // return res.status(401).json({
                    //     message: 'Unable to find the user.'
                    // })
                    callback(err,'unable to find the user.')
                } else {
                    const token = jwt.sign(
                        {
                            email: traveler.email,
                            userId: traveler._id,
                            firstname: traveler.firstname,
                            lastname: traveler.lastname,
                            phonenumber: traveler.phonenumber,
                            profileimage: traveler.profileimage,
                            aboutme: traveler.aboutme,
                            city: traveler.city,
                            country: traveler.country,
                            company: traveler.company,
                            school: traveler.school,
                            hometown: traveler.hometown,
                            languages: traveler.languages,
                            gender: traveler.gender,
                            memberSince: traveler.memberSince,
                            isTraveler: traveler.isTraveler
                        },
                        JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    // return res.status(200).json({
                    //     message: "Auth Successful",
                    //     token: token
                    // });
                    callback(null,token);
                }
            })
            .catch(err => {
                console.log(err);
                // res.status(500).json({
                //     error: err
                // });
                callback(err,'unable to find the user.')
            });
    } else {
        console.log("Inside Owner Detail Request");
        //QUERY owners collection to get the owner details
        ownerModel.findOne({ email: msg.email })
            .exec()
            .then(owner => {
                if (owner.length < 1) {
                    // return res.status(401).json({
                    //     message: 'Unable to find the user.'
                    // })
                    callback(err, 'Unable to find user')
                } else {
                    const token = jwt.sign(
                        {
                            email: owner.email,
                            userId: owner._id,
                            firstname: owner.firstname,
                            lastname: owner.lastname,
                            phonenumber: owner.phonenumber,
                            profileimage: owner.profileimage,
                            aboutme: owner.aboutme,
                            city: owner.city,
                            country: owner.country,
                            company: owner.company,
                            school: owner.school,
                            hometown: owner.hometown,
                            languages: owner.languages,
                            gender: owner.gender,
                            memberSince: owner.memberSince,
                            isTraveler: owner.isTraveler
                        },
                        JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    // return res.status(200).json({
                    //     message: "Auth Successful",
                    //     token: token
                    // });
                    callback(null,token)
                }
            })
            .catch(err => {
                console.log(err);
                // res.status(500).json({
                //     error: err
                // });
                callback(err,'unable to find the user')
            });
    }
}

exports.handle_request = handle_request;