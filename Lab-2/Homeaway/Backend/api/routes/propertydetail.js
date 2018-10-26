const express = require('express');
const router = express.Router();
const propertyModel = require('../../models/property');

//Route to get the Details of a particular Property Id
/*
    @param : Property Id 
*/

router.get('/', function(req,res){
    console.log("Inside Property Detail route");
    var propertyId = req.query.propertyId;

    propertyModel.find({_id : propertyId})
    .exec()
    .then(property=>{
        console.log("Property searched: ", property);
        res.status(200).json({
            message: 'Property details fetched Successfully',
            result : property
        });
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400).end();
    });
});
module.exports = router;