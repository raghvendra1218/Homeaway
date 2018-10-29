const propertyModel = require('../models/property');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request:"+ JSON.stringify(msg));
    var city = msg.city;
    var startDate = new Date(msg.startDate);
    var endDate = new Date(msg.endDate);
    var headCount = msg.headCount;

    propertyModel.find({
        $and:[
            {propcity: city},
            {propguestcount: {$gte: headCount}},
            {propavaildate : {$lte: startDate}},
            {propavailtill : {$gte: endDate}},
            {isBooked : false}
        ]
    })
    .exec()
    .then(properties=>{
        console.log("Properties searched: ", properties);
        // res.status(200).json({
        //     message: 'Property posted Successfully',
        //     result : properties
        // });
        callback(null,properties)
    })
    .catch(err => {
        console.log(err);
        // res.sendStatus(400).end();
        callback(err, 'Unable to search property.')
    });
}
exports.handle_request = handle_request;