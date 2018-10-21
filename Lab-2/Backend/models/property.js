var mongoose = require('mongoose');

var Properties = mongoose.model('Properties',{
    propcountry :{
        type : String
    },
    propstaddress :{
        type : String
    },
    propapt :{
        type : String
    },
    propcity :{
        type : Number
    },
    propstate : {
        type : String
    },
    propzip :{
        type : Number
    },
    propheadline :{
        type : String
    },
    propdesc :{
        type : String
    },
    proptype :{
        type : String
    },
    propbedroom :{
        type : Number
    },
    propguestcount :{
        type : Number
    },
    propbath :{
        type : Number
    },
    propimages :{
        type : String
    },
    propcurrency :{
        type : String
    },
    propbaserate :{
        type : Number
    },
    propavaildate :{
        type : String
    },
    propavailtill :{
        type : String
    },
    email :{
        type : String
    }
});

module.exports = {Properties};