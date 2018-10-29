const propertyModel = require('../models/property');

function handle_request(msg, callback) {
    var res = {};
    console.log("In handle request:" + JSON.stringify(msg));
    var propId = msg.propertyId;
    var travelerId = msg.travelerId;
    var bookStartDate = new Date(msg.propertyBookStartDate);
    var bookEndDate = new Date(msg.propertyBookEndDate);
    propertyModel
        .update(
            { _id: propId },
            {
                $set: {
                    isBooked: true,
                    travelerId: travelerId,
                    bookstartdate: bookStartDate,
                    bookenddate: bookEndDate
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
            //     error: err
            // });
            callback(err, 'Unable to book property')
        });
}
exports.handle_request = handle_request;