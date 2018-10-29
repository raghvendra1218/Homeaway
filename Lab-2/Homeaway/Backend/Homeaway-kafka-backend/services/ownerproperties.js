const propertyModel = require('../models/property');

function handle_request(msg, callback) {
    var res = {};
    console.log("In handle request:" + JSON.stringify(msg));
    var ownerId = msg.ownerId;
    propertyModel.find({
            propownerId : ownerId
    })
    .exec()
    .then(properties=>{
        console.log("Properties fetched: ", properties);
        // res.status(200).json({
        //     message: 'Properties fetched Successfully',
        //     result : properties
        // });
        callback(null,properties);
    })
    .catch(err => {
        console.log(err);
        // res.sendStatus(400).end();
        callback(err, 'Unable to find any properties')
    });
}
exports.handle_request = handle_request;