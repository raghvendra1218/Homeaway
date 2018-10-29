const propertyModel = require('../models/property');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var propertyId = msg.propertyId;

    propertyModel.find({_id : propertyId})
    .exec()
    .then(property=>{
        console.log("Property details fetched: ", property);
        // res.status(200).json({
        //     message: 'Property details fetched Successfully',
        //     result : property
        // });
        callback(null,property);
    })
    .catch(err => {
        console.log(err);
        // res.sendStatus(400).end();
        callback(err, 'Unable to find property details');
    });
}
exports.handle_request = handle_request;