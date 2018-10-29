//import the require dependencies
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


const userdetailRoutes = require('./api/routes/userdetail');
const loginRoutes = require('./api/routes/login');
const signupRoutes = require('./api/routes/signup');
const postPropertyRoutes = require('./api/routes/postproperty');
const editProfileRoutes = require('./api/routes/editprofile');
const uploadImageRoutes = require('./api/routes/uploadImages');
const downloadImageRoutes = require('./api/routes/downloadImage');
const searchPropertyRoutes = require('./api/routes/searchproperty');
const propertyDetailRoutes = require('./api/routes/propertydetail');
const bookPropertyRoutes = require('./api/routes/bookproperty');
const travelerBookingRoutes = require('./api/routes/travelerbookings');
const ownerBookingRoutes = require('./api/routes/ownerpropertiesbookings');
const ownerPropertiesRoutes = require('./api/routes/ownerproperties');


//Use middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:3000', credentials: true}));
//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});



//Routes which should handle requests
app.use('/userdetail', userdetailRoutes);
app.use('/login',loginRoutes);
app.use('/signup',signupRoutes);
app.use('/postproperty', postPropertyRoutes);
app.use('/editprofile', editProfileRoutes);
app.use('/uploadImages', uploadImageRoutes);
app.use('/download', downloadImageRoutes);
app.use('/searchprop', searchPropertyRoutes);
app.use('/propertydetail', propertyDetailRoutes);
app.use('/bookproperty', bookPropertyRoutes);
app.use('/travelerbookings', travelerBookingRoutes);
app.use('/ownerpropsbooking', ownerBookingRoutes);
app.use('/ownerprops', ownerPropertiesRoutes);


//Handle the errors of the application
app.use((req,res,next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});

module.exports = app;