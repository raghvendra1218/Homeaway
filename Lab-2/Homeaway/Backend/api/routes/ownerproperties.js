const express = require('express');
const router = express.Router();
const propertyModel = require('../../models/property');
const checkAuth = require('../../middleware/check-auth');


//Route to get Owner Properties owned by a particular Owner
/*
    @param: owner_Id
*/

router.get('/', function(req,res){
    console.log("Inside the owner property route.");
    var ownerId = req.query.ownerId;
    propertyModel.find({
            propownerId : ownerId
    })
    .exec()
    .then(properties=>{
        console.log("Properties fetched: ", properties);
        res.status(200).json({
            message: 'Properties fetched Successfully',
            result : properties
        });
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400).end();
    });
});

module.exports = router;