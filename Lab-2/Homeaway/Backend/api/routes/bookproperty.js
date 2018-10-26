const express = require('express');
const router = express.Router();
const propertyModel = require('../../models/property');
const checkAuth = require('../../middleware/check-auth');

//Route to book a particular Property

router.post('/', checkAuth,function(req,res){
    console.log("Inside Book Property route");
    var propId = req.body.propertyId;
    var travelerId = req.body.travelerId;
    var bookStartDate = new Date(req.body.propertyBookStartDate);
    var bookEndDate = new Date(req.body.propertyBookEndDate);
    propertyModel
    .update(
        { _id: propId},
        {
            $set :{
                isBooked : true,
                travelerId : travelerId,
                bookstartdate : bookStartDate,
                bookenddate : bookEndDate
            }
        }
    )
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
      })
    .catch(err => {
    console.log(err);
    res.status(500).json({
        error: err
    });
    });
});
module.exports = router;