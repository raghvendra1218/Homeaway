var mongoose = require('mongoose');

var Travelers = mongoose.model('Travelers',{
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
    },
    profileimage :{
        type : String
    },
    aboutme :{
        type : String
    },
    city :{
        type : String
    },
    country :{
        type : String
    },
    company :{
        type : String
    },
    school :{
        type : String
    },
    hometown :{
        type : String
    },
    languages :{
        type : String
    },
    gender :{
        type : String
    },
});

module.exports = {Travelers};