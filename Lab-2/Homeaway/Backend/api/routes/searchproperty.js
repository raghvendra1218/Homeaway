const express = require('express');
const router = express.Router();
const propertyModel = require('../../models/property');

//Route to get the Search Property details
/*
    @param : City 
    @param : Arrival Date
    @param : End Date
    @param : Head Count
*/

router.get('/', function(req,res){
    console.log("Inside search Request.");
    var city = req.query.city;
    var startDate = new Date(req.query.startDate);
    var endDate = new Date(req.query.endDate);
    var headCount = req.query.headCount;

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
        res.status(200).json({
            message: 'Property posted Successfully',
            result : properties
        });
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400).end();
    });
});
module.exports = router;
