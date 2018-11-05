const messageModel = require('../models/message');
const mongoose = require('mongoose');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var owneremail = msg.ownerEmail;
    var traveleremail = msg.travelerEmail;
    var travelerid = msg.travelerId;
    var ownermessage = msg.ownerMessage;
    var travelermessage = msg.travelerMessage;
    var isTraveler = msg.isTraveler;
    var propHeadline = msg.propHeadline;
    if(msg.isTraveler) {
        var newMessage = new messageModel();
        newMessage._id = new mongoose.Types.ObjectId();
        newMessage.owneremail = msg.ownerEmail;
        newMessage.traveleremail = msg.travelerEmail;
        newMessage.travelerid = msg.travelerId;
        newMessage.ownermessage = msg.travelerMessage  || "";
        newMessage.travelermessage = msg.ownerMessage || "";
        newMessage.propheadline = msg.propHeadline;
        newMessage.save()
        .then(message=>{
            console.log("Message created: ", message);
            // res.status(200).json({
            //     message: 'Property posted Successfully'
            // });
            callback(null,message);
        })
        .catch(err => {
            console.log(err);
            // res.sendStatus(400).end();
            callback(err,"error");
        });
    } else {
        var newMessage = new messageModel();
        newMessage._id = new mongoose.Types.ObjectId();
        newMessage.owneremail = msg.ownerEmail;
        newMessage.traveleremail = msg.travelerEmail;
        newMessage.travelerid = msg.travelerId;
        newMessage.ownermessage = msg.travelerMessage || "";
        newMessage.travelermessage = msg.ownerMessage || "";
        newMessage.propheadline = msg.propHeadline;
        newMessage.save()
        .then(message=>{
            console.log("Message created: ", message);
            // res.status(200).json({
            //     message: 'Property posted Successfully'
            // });
            callback(null,message);
        })
        .catch(err => {
            console.log(err);
            // res.sendStatus(400).end();
            callback(err,"error");
        });
    }
}

exports.handle_request = handle_request;