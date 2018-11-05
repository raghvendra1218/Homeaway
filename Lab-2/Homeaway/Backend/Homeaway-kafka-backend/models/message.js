var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    owneremail :{
        type : String,
        required: true,
        lowercase: true,
        default : ""
    },
    traveleremail :{
        type : String,
        lowercase: true,
        required: true,
        default: ""
    },
    travelerid :{
        type : String,
        required: true,
        default : ""
    },
    travelermessage :{
        type : String,
        required: false,
        default : ""
    },
    ownermessage :{
        type : String,
        required: false,
        default : ""
    },
    propheadline :{
        type : String,
        required: false,
        default : ""
    }
});

module.exports = mongoose.model("Messages",messageSchema);