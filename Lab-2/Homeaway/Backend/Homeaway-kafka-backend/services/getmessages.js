const messageModel = require('../models/message');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var owneremail = msg.ownerEmail;
    var traveleremail = msg.travelerEmail;
    var isTraveler = JSON.parse(msg.isTraveler);
    if(isTraveler) {
        console.log("Inside Traveler get messages logic");
        messageModel.find({
            traveleremail: traveleremail
        })
        .exec()
        .then(messages=>{
            console.log("Property details fetched: ", messages);
            // res.status(200).json({
            //     message: 'Property details fetched Successfully',
            //     result : property
            // });
            callback(null,messages);
        })
        .catch(err => {
            console.log(err);
            // res.sendStatus(400).end();
            callback(err, 'Unable to find property details');
        });
    } else {
        console.log("Inside Owner get messages logic");
        messageModel.find({
            owneremail: owneremail
        })
        .exec()
        .then(messages=>{
            console.log("Property details fetched: ", messages);
            // res.status(200).json({
            //     message: 'Property details fetched Successfully',
            //     result : property
            // });
            callback(null,messages);
        })
        .catch(err => {
            console.log(err);
            // res.sendStatus(400).end();
            callback(err, 'Unable to find property details');
        });
    }
}

exports.handle_request = handle_request;