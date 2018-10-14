var mongoose = require('mongoose');

var Owners = mongoose.model('Owners',{
    firstname :{
        type : String
    },
    lastname :{
        type : String
    },
    email :{
        type : String
    },
    phonenumber :{
        type : Number
    },
    password : {
        type : String
    }
});

module.exports = {Owners};