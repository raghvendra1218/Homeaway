const travelerModel = require('../models/traveler');
const ownerModel = require('../models/owner');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var email = msg.email;
    console.log("Email: ",email);
    //Query to update the parameters received
    if (msg.isTraveler) {
        travelerModel
        .update(
            { email: msg.email },
            {
            $set: {
                firstname: msg.firstName,
                lastname: msg.lastName,
                phonenumber: msg.phoneNumber,
                profileimage: msg.profileImage,
                aboutme: msg.aboutMe,
                city: msg.city,
                company: msg.company,
                school: msg.school,
                country: msg.country,
                hometown: msg.hometown,
                languages: msg.languages,
                gender: msg.gender
            }
            }
        )
        .exec()
        .then(result => {
            console.log(result);
            // res.status(200).json(result);
            callback(null,result);
        })
        .catch(err => {
            console.log(err);
            // res.status(500).json({
            // error: err
            // });
            callback(err,"error");
        });
    } else {
        ownerModel
        .update(
            { email: msg.email },
            {
            $set: {
                firstname: msg.firstName,
                lastname: msg.lastName,
                phonenumber: msg.phoneNumber,
                profileimage: msg.profileImage,
                aboutme: msg.aboutMe,
                city: msg.city,
                company: msg.company,
                school: msg.school,
                country: msg.country,
                hometown: msg.hometown,
                languages: msg.languages,
                gender: msg.gender
            }
            }
        )
        .exec()
        .then(result => {
            console.log(result);
            // res.status(200).json(result);
            callback(null,result);
        })
        .catch(err => {
            console.log(err);
            // res.status(500).json({
            // error: err
            // });
            callback(err,"error");
        });
    }
}

exports.handle_request = handle_request;