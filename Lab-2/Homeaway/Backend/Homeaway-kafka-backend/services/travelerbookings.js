const propertyModel = require('../models/property');

function handle_request(msg, callback) {
    var res = {};
    console.log("In handle request:" + JSON.stringify(msg));
    var travelerId = msg.travelerId;

    propertyModel.find({
        $and:[
            {travelerId : travelerId},
            {isBooked : true}
        ]
    })
    .exec()
    .then(bookings=>{
        console.log("Bookings fetched: ", bookings);
        // res.status(200).json({
        //     message: 'Bookings fetched Successfully',
        //     result : bookings
        // });
        callback(null,bookings);
    })
    .catch(err => {
        console.log(err);
        // res.sendStatus(400).end();
        callback(err, 'Unable to find any bookings')
    });
}
exports.handle_request = handle_request;