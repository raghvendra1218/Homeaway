const propertyModel = require('../models/property');

function handle_request(msg, callback) {
    var res = {};
    console.log("In handle request:" + JSON.stringify(msg));
    var ownerId = msg.ownerId;
    propertyModel.find({
        $and:[
            {propownerId : ownerId},
            {isBooked : true}
        ]
    })
    .exec()
    .then(propbookings=>{
        console.log("Owner booked properties fetched: ", propbookings);
        // res.status(200).json({
        //     message: 'Owner booked properties fetched Successfully',
        //     result : propbookings
        // });
        callback(null,propbookings);
    })
    .catch(err => {
        console.log(err);
        // res.sendStatus(400).end();
        callback(err, 'Unable to fetch any owner booked properties')
    });
}
exports.handle_request = handle_request;