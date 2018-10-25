//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var session = require('express-session');
// var cookieParser = require('cookie-parser');
// app.set('view engine', 'ejs');
// var mysql = require('mysql');
// var pool = require('./pool');
var morgan = require('morgan');
var multer = require('multer');
const path = require('path');
const fs = require('fs');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

//include dependent files of mongo and models
var travelerModel = require('./models/traveler');
var ownerModel = require('./models/owner');
var propertyModel = require('./models/property');
var {mongoose} = require('./db/mongoose');
const JWT_KEY = "secret";
const checkAuth = require('./middleware/check-auth');
//include dependencies for mysql to work
var cors = require('cors');
//use cors to allow cross origin resource sharing
app.use(cors({origin:'http://localhost:3000', credentials: true}));

//Use morgan 
app.use(morgan('dev'));

//use express session to maintain session data
// app.use(session({
//     secret              : 'cmpe273_Homeaway',
//     resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
//     saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
//     duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
//     activeDuration      :  5 * 60 * 1000
// }));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/upload/images');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
        //  addPhotosToDB(req.query.uid,file.originalname)
    }
});
var upload = multer({storage: storage}).any();

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });


  app.post('/uploadImages', function (req, res) {
    upload(req, res, function (err) {
        //console.log(req.body);
        //console.log(req.files);
        if (err) {
            return res.end("Error uploading file.");
        }
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        })
        res.end("File is uploaded");
    });
});

//Handler for fetching the Image Name
app.post('/download/:file(*)', (req, res) => {
    console.log("inside download file");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/public/upload/images', file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, {'Content-Type': 'image/jpg'});
    res.end(base64img);
});

//Route to get the details of the user(Traveler/Owner)

app.get('/userdetail',checkAuth,function(req,res){
    console.log("Inside User Detail Request");
    var EMAIL = req.query.email;
    console.log(`is Traveler ${req.query.isTraveler}`);
    var isTraveler = JSON.parse(req.query.isTraveler);
    console.log("typeof: "+ isTraveler);

    if(isTraveler) {  
        console.log("Inside Traveler Detail Request");
        //QUERY travelers collection to get the traveler details
        travelerModel.findOne({email:req.query.email})
        .exec()
        .then(traveler => {
            if(traveler.length < 1) {
                return res.status(401).json({
                    message: 'Unable to find the user.'
                })
            } else {
                const token = jwt.sign(
                    {
                        email: traveler.email,
                        userId: traveler._id,
                        firstname: traveler.firstname,
                        lastname:traveler.lastname,
                        phonenumber: traveler.phonenumber,
                        profileimage : traveler.profileimage,
                        aboutme: traveler.aboutme,
                        city: traveler.city,
                        country: traveler.country,
                        company: traveler.company,
                        school: traveler.school,
                        hometown: traveler.hometown,
                        languages: traveler.languages,
                        gender: traveler.gender,
                        memberSince: traveler.memberSince,
                        isTraveler: traveler.isTraveler
                    },
                    JWT_KEY,
                    {
                        expiresIn : "1h"
                    }
                );
                return res.status(200).json( {
                    message: "Auth Successful",
                    token : token
                    });
                }        
            })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
        } else {
            console.log("Inside Owner Detail Request");
            //QUERY owners collection to get the owner details
            ownerModel.findOne({email:req.query.email})
            .exec()
            .then(owner => {
                if(owner.length < 1) {
                    return res.status(401).json({
                        message: 'Unable to find the user.'
                    })
                } else {
                    const token = jwt.sign(
                        {
                            email: owner.email,
                            userId: owner._id,
                            firstname: owner.firstname,
                            lastname:owner.lastname,
                            phonenumber: owner.phonenumber,
                            profileimage : owner.profileimage,
                            aboutme: owner.aboutme,
                            city: owner.city,
                            country: owner.country,
                            company: owner.company,
                            school: owner.school,
                            hometown: owner.hometown,
                            languages: owner.languages,
                            gender: owner.gender,
                            memberSince: owner.memberSince,
                            isTraveler: owner.isTraveler
                        },
                        JWT_KEY,
                        {
                            expiresIn : "1h"
                        }
                    );
                return res.status(200).json( {
                    message: "Auth Successful",
                    token : token
                    });
                } 
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
        }    
    })

        // }, function(err,traveler){
        //     if (err) {
        //         res.code = "400";
        //         res.value = "Unable to find the record.";
        //         console.log(`Unable to find record for ${EMAIL}`);
        //         res.sendStatus(400).end(); 
        //     } else if(traveler){
        //         res.code = "200";
        //         res.value = traveler;
        //         // res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
        //         console.log(`Found record for ${EMAIL} .`)
        //         res.sendStatus(200).end();
        //     }
        // })
//     } else {
//         console.log("Inside Owner Detail Request");
//         //QUERY owners collection to get the owner details
//         ownerModel.findOne({
//             email:req.query.email
//         }, function(err,owner){
//             if (err) {
//                 res.code = "400";
//                 res.value = "Unable to find the record.";
//                 console.log(`Unable to find record for ${EMAIL}`);
//                 res.sendStatus(400).end(); 
//             } else if(owner){
//                 res.code = "200";
//                 res.value = owner;
//                 // res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
//                 console.log(`Found record for ${EMAIL} .`)
//                 res.sendStatus(200).end();
//             }
//         })
//     }
// })

//Route to handle Post Request Call for Login
app.post('/login', (req,res) => {

    console.log("Inside Login Post Request");
    var EMAIL = req.body.userDetails.email;
    var PASSWORD = req.body.userDetails.password;
    console.log("Email and Password:  : ",EMAIL, PASSWORD);

    if(req.body.userDetails.isTraveler) {

        console.log("Inside Traveler Login Request");
        //QUERY TRAVELER_INFO Collection to get the email and password
        travelerModel.findOne({email: req.body.userDetails.email})
        .exec()
        .then(traveler => {
            if(traveler.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.userDetails.password, traveler.password, (err,result)=>{
                if(err) {
                    return res.status(401).json({
                        message: 'Auth failed' 
                    });
                }
                if(result) {
                    const token = jwt.sign(
                        {
                            email: traveler.email,
                            userId: traveler._id,
                            firstname: traveler.firstname,
                            lastname:traveler.lastname,
                            phonenumber: traveler.phonenumber,
                            profileimage : traveler.profileimage,
                            aboutme: traveler.aboutme,
                            city: traveler.city,
                            country: traveler.country,
                            company: traveler.company,
                            school: traveler.school,
                            hometown: traveler.hometown,
                            languages: traveler.languages,
                            gender: traveler.gender,
                            memberSince: traveler.memberSince,
                            isTraveler: traveler.isTraveler
                        },
                        JWT_KEY,
                        {
                            expiresIn : "1h"
                        }
                    );
                    return res.status(200).json( {
                        message: "Auth Successful",
                        token : token
                        });
                }
                res.status(401).json({
                    message: 'Auth failed' 
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error:err
            });
        });
    })
    } else {
        console.log("Inside Owner Login Request");
        //QUERY OWNER_INFO Collection to get the email and password
            ownerModel.findOne({email: req.body.userDetails.email})
            .exec()
            .then(owner => {
                if(owner.length < 1) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                bcrypt.compare(req.body.userDetails.password, owner.password, (err,result)=>{
                    if(err) {
                        return res.status(401).json({
                            message: 'Auth failed' 
                        });
                    }
                    if(result) {
                        const token = jwt.sign(
                            {
                                email: owner.email,
                                userId: owner._id,
                                firstname: owner.firstname,
                                lastname:owner.lastname,
                                phonenumber: owner.phonenumber,
                                profileimage : owner.profileimage,
                                aboutme: owner.aboutme,
                                city: owner.city,
                                country: owner.country,
                                company: owner.company,
                                school: owner.school,
                                hometown: owner.hometown,
                                languages: owner.languages,
                                gender: owner.gender,
                                memberSince: owner.memberSince,
                                isTraveler: owner.isTraveler
                            },
                            JWT_KEY,
                            {
                                expiresIn : "1h"
                            }
                        );
                        return res.status(200).json( {
                            message: "Auth Successful",
                            token : token
                        });
                    }
                    res.status(401).json({
                        message: 'Auth failed' 
                    });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error:err
                });
            });
        })
    }
});


//Route to get the Search Property details
/*
    @param : City 
    @param : Arrival Date
    @param : End Date
    @param : Head Count
*/

// app.get('/searchprop', function(req,res){
//     console.log("Inside search Request.");
//     var city = req.query.city.toLowerCase();
//     var startDate = req.query.startDate;
//     var endDate = req.query.endDate;
//     var headCount = req.query.headCount;

//     var sql = "SELECT *  FROM OWNER_PROPERTY_TABLE " + 
//                                     "WHERE PROP_CITY = " + mysql.escape(city) +
//                                     " AND PROP_AVAIL_DATE <= " + mysql.escape(startDate) +
//                                     " AND PROP_AVAIL_TILL >= " + mysql.escape(endDate) +
//                                     " AND PROP_GUEST_COUNT >=" + mysql.escape(headCount)+";"

//      //Get a connection from the created SQL pool
//      pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Invalid Credentials");
//                 }else{
//                     res.writeHead(200,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     console.log(`Successful fetched the ${city} details.`);
//                     console.log(`Result of searchprop  route: ${JSON.stringify(result)}`);
//                     res.end(JSON.stringify(result));
//                 }
//             });
//         }
//     });
// })

//Route to get the Details of a particular Property Id
/*
    @param : Property Id 
*/

// app.get('/propertydetail', function(req,res){
//     console.log("Inside Property Detail route");
//     var propertyId = req.query.propertyId;

//     var sql = "SELECT *  FROM OWNER_PROPERTY_TABLE " + 
//                         "WHERE PROP_ID = " + mysql.escape(propertyId) +";"

                        
//         //Get a connection from the created SQL pool
//         pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Invalid Credentials");
//                 }else {
//                     if(result.length > 0) {
//                         res.writeHead(200,{
//                             'Content-Type' : 'text/plain'
//                         })
//                         console.log(`Successful fetched the ${propertyId} details.`);
//                         console.log(`Result of propertydetail  route: ${JSON.stringify(result)}`);
//                         res.end(JSON.stringify(result));
//                     } else {
//                         res.status(401).json({"message":"Property not found"});
//                     }
//                 }
//             });
//         }
//     });
// })

//Route to book a particular Property

// app.post('/bookproperty', function(req,res){
//     console.log("Inside Property Detail route");
//     var PROP_ID = req.body.propertyId;
//     var OWNER_ID = req.body.propertyDetails[0].OWNER_ID;
//     var TRAVELER_ID = req.body.travelerId;
//     var BOOK_START_DATE = req.body.propertyBookStartDate;
//     var BOOK_END_DATE = req.body.propertyBookEndDate;

//     var sql = "INSERT INTO PR_BOOKING_TABLE (PROP_ID, OWNER_ID, TRAVELER_ID, BOOK_START_DATE, BOOK_END_DATE )" +
//                             "VALUES (" + PROP_ID +" ," +
//                                          OWNER_ID +" ," +
//                                          TRAVELER_ID +" ," + "'"+
//                                          BOOK_START_DATE +"' ," + "'"+
//                                          BOOK_END_DATE +"' );"

//     //Get a connection from the created SQL pool
//     pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("some error occurred while executing sql query");
//                 }else{
//                     res.writeHead(200,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     console.log(`Property with ID: ${PROP_ID} Booked Successfully`);
//                     res.end('Property Booked Successfully');
//                 }
//             });
//         }
//     });
// })

//Route to get Traveler bookings
/*
    @param: Traveler_Id
*/

// app.get('/travelerbookings', function(req,res){
//     console.log("Inside the Traveler Bookings route.");
//     var travelerId = req.query.travelerId;
//     var sql =   "SELECT PT.PROP_ID, PT.PROP_TYPE, PT.PROP_GUEST_COUNT, PT.PROP_BATH, PT.PROP_BASE_RATE, PT.PROP_HEADLINE, BT.BOOK_START_DATE, BT.BOOK_END_DATE " +
//                 "FROM PR_BOOKING_TABLE AS BT " +
//                 "LEFT JOIN OWNER_PROPERTY_TABLE AS PT " +
//                 "ON BT.PROP_ID = PT.PROP_ID " +
//                 "WHERE BT.TRAVELER_ID =" + mysql.escape(travelerId) +";"

//         //Get a connection from the created SQL pool
//         pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Invalid Credentials");
//                 }else{
//                     res.writeHead(200,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     console.log(`Successful fetched the ${travelerId} details.`);
//                     console.log(`Result of Traveler properties route: ${JSON.stringify(result)}`);
//                     res.end(JSON.stringify(result));
//                 }
//             });
//         }
//     });

// })

//Route to get Owner Properties bookings
/*
    @param: owner_Id
*/

// app.get ('/ownerpropsbooking', function(req,res) {
//     console.log("Inside the owner Property bookings route.");
//     var ownerId = req.query.ownerId;
//     var sql =   "SELECT PT.PROP_ID, PT.PROP_TYPE, PT.PROP_GUEST_COUNT, PT.PROP_BATH, PT.PROP_BASE_RATE, PT.PROP_HEADLINE, BT.BOOK_START_DATE, BT.BOOK_END_DATE " +
//                 "FROM PR_BOOKING_TABLE AS BT " +
//                 "LEFT JOIN OWNER_PROPERTY_TABLE AS PT " +
//                 "ON BT.PROP_ID = PT.PROP_ID " +
//                 "WHERE BT.OWNER_ID =" + mysql.escape(ownerId) +";"

//         //Get a connection from the created SQL pool
//         pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Invalid Credentials");
//                 }else{
//                     res.writeHead(200,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     console.log(`Successful fetched the ${ownerId} details.`);
//                     console.log(`Result of Owner properties bookings route: ${JSON.stringify(result)}`);
//                     res.end(JSON.stringify(result));
//                 }
//             });
//         }
//     });
// })

//Route to get Owner Properties owned by a particular Owner
/*
    @param: owner_Id
*/

// app.get('/ownerprops', function(req,res){
//     console.log("Inside the owner Property bookings route.");
//     var ownerId = req.query.ownerId;
//     var sql =   "SELECT * FROM OWNER_PROPERTY_TABLE WHERE OWNER_ID = " + mysql.escape(ownerId) +";"

//         //Get a connection from the created SQL pool
//         pool.getConnection(function(err,con){
//         if(err){
//             res.writeHead(400,{
//                 'Content-Type' : 'text/plain'
//             })
//             res.end("Could Not Get Connection Object");
//         } else {
//             con.query(sql,function(err,result){
//                 if(err){
//                     res.writeHead(400,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     res.end("Invalid Credentials");
//                 }else{
//                     res.writeHead(200,{
//                         'Content-Type' : 'text/plain'
//                     })
//                     console.log(`Successful fetched the ${ownerId} details.`);
//                     console.log(`Result of Owner properties route: ${JSON.stringify(result)}`);
//                     res.end(JSON.stringify(result));
//                 }
//             });
//         }
//     });
// })

//Route to Post the Property Details
// TODO: Check if the the the login is Owner login 
// if yes then allow the Property post else throw error , handle that in front-end with suitable Message

app.post('/postproperty',checkAuth,function(req,res){
    console.log("Inside the Post property Handler");
    var PROP_COUNTRY = req.body.propertyDetails.propCountry;
    // var PROP_ST_ADDRESS = req.body.propertyDetails.propStreetAddress.toUpperCase();
    // var PROP_APT = req.body.propertyDetails.propApartment;
    // var PROP_CITY = req.body.propertyDetails.propCity.toLowerCase();
    // var PROP_STATE = req.body.propertyDetails.propState.toUpperCase();
    // var PROP_ZIP = req.body.propertyDetails.propZip;
    // var PROP_HEADLINE = req.body.propertyDetails.propHeadline;
    // var PROP_DESC = req.body.propertyDetails.propDescription;
    // var PROP_TYPE = req.body.propertyDetails.propType;
    // var PROP_NO_BEDROOM = req.body.propertyDetails.propNoBedroom;
    // var PROP_GUEST_COUNT = req.body.propertyDetails.propGuestCount;
    // var PROP_BATH = req.body.propertyDetails.propNoBathroom;
    // var PROP_IMAGES = JSON.stringify(req.body.propertyDetails.propPhotosArr);
    // var PROP_CURRENCY = req.body.propertyDetails.propCurrency;
    // var PROP_BASE_RATE = req.body.propertyDetails.propBaseRate;
    // var PROP_AVAIL_DATE = req.body.propertyDetails.propStartDate;
    // var PROP_AVAIL_TILL = req.body.propertyDetails.propEndDate;
    // var EMAIL = req.body.propertyDetails.email.toLowerCase();
    // var OWNER_ID = req.body.propertyDetails.ownerId;

    //SQL Query to update the parameters received
    var newProperty = new propertyModel();
    newProperty._id = new mongoose.Types.ObjectId();
    newProperty.propcountry = req.body.propertyDetails.propCountry;
    newProperty.propstaddress = req.body.propertyDetails.propStreetAddress;
    newProperty.propapt = req.body.propertyDetails.propApartment;
    newProperty.propcity = req.body.propertyDetails.propCity;
    newProperty.propstate = req.body.propertyDetails.propState;
    newProperty.propzip = req.body.propertyDetails.propZip;
    newProperty.propheadline = req.body.propertyDetails.propHeadline;
    newProperty.propdesc = req.body.propertyDetails.propDescription;
    newProperty.proptype = req.body.propertyDetails.propType;
    newProperty.propbedroom = req.body.propertyDetails.propNoBedroom;
    newProperty.propguestcount = req.body.propertyDetails.propGuestCount;
    newProperty.propbath = req.body.propertyDetails.propNoBathroom;
    newProperty.propimages = JSON.stringify(req.body.propertyDetails.propPhotosArr);
    newProperty.propcurrency = req.body.propertyDetails.propCurrency;
    newProperty.propbaserate = req.body.propertyDetails.propBaseRate;
    newProperty.propavaildate = req.body.propertyDetails.propStartDate;
    newProperty.propavailtill = req.body.propertyDetails.propEndDate;
    newProperty.email = req.body.propertyDetails.email;
    newProperty.save()
    .then(property=>{
        console.log("Property created: ", property);
        res.status(200).json({
            message: 'Property posted Successfully'
        });
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(400).end();
    });
    // var sql = "INSERT INTO OWNER_PROPERTY_TABLE (PROP_COUNTRY, PROP_ST_ADDRESS, PROP_APT, PROP_CITY, " +
    //  "PROP_STATE, PROP_ZIP, PROP_HEADLINE, PROP_DESC, PROP_TYPE, PROP_NO_BEDROOM, PROP_GUEST_COUNT, PROP_BATH, PROP_IMAGES, " +
    //  "PROP_CURRENCY, PROP_BASE_RATE, PROP_AVAIL_DATE, PROP_AVAIL_TILL, EMAIL, OWNER_ID) " +
    //                                         "VALUES (" + "'" +
    //                                         PROP_COUNTRY + "' ," + "'" +
    //                                         PROP_ST_ADDRESS + "' ," + "'" +
    //                                         PROP_APT + "' ," + "'" +
    //                                         PROP_CITY + "' ," + "'" +
    //                                         PROP_STATE + "' ," +
    //                                         PROP_ZIP + " ," + "'" +
    //                                         PROP_HEADLINE + "' ," + "'" +
    //                                         PROP_DESC + "' ," + "'" +
    //                                         PROP_TYPE + "' ," +
    //                                         PROP_NO_BEDROOM + " ," +
    //                                         PROP_GUEST_COUNT + " ," +
    //                                         PROP_BATH + " ," + "'" +
    //                                         PROP_IMAGES + "' ," + "'" +
    //                                         PROP_CURRENCY + "' ," +
    //                                         PROP_BASE_RATE + " ," + "'" +
    //                                         PROP_AVAIL_DATE + "' ," + "'" +
    //                                         PROP_AVAIL_TILL + "' ," + "'" +
    //                                         EMAIL + "'" + " ," +
    //                                         OWNER_ID + ");";
    // //Get a connection from the created SQL pool
    // pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Could Not Get Connection Object");
    //     } else {
    //         con.query(sql,function(err,result){
    //             if(err){
    //                 res.writeHead(400,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 res.end("some error occurred while executing sql query");
    //             }else{
    //                 res.writeHead(200,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 console.log(`Property with Address: ${PROP_ST_ADDRESS} Created Successfully`);
    //                 res.end('Record Created Successfully');
    //             }
    //         });
    //     }
    // });

})

//Route to handle Post Request Call for SignUp
app.post('/signup',checkAuth,function(req,res){
    console.log("Inside Signup Request Handler");

    if(req.body.isTraveler) {
        //If Traveler, Insert the record in TRAVELER_INFO_TABLE
        console.log("Inside Traveler Signup request");
        // var sql = "INSERT INTO TRAVELER_INFO_TABLE (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD) VALUES ( " + 
        // mysql.escape(FIRST_NAME) + " , " + mysql.escape(LAST_NAME) + " , "+
        // mysql.escape(EMAIL) + " ," +  mysql.escape(PASSWORD) + ")";
        var newTraveler = new travelerModel();
        travelerModel.findOne({email: req.body.email}, function(err,traveler){
            console.log("Checking if the email already exists");
            if(traveler) {
                console.log("user already exists");
                res.send(400);
            } else {
                console.log("email not found, creating new user");
                // newTraveler = {
                    bcrypt.hash(req.body.password,10,(err,hash)=>{
                        if(err) {
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            newTraveler._id = new mongoose.Types.ObjectId(),
                            newTraveler.firstname = req.body.firstName;
                            newTraveler.lastname = req.body.lastName;
                            newTraveler.email = req.body.email;
                            newTraveler.password = hash;
                            newTraveler.phonenumber =req.body.phonenumber||"";
                            newTraveler.profileimage =req.body.profileimage||"preview.jpg";
                            newTraveler.aboutme = req.body.aboutme||"";
                            newTraveler.city =req.body.city||"";
                            newTraveler.country =req.body.country||"";
                            newTraveler.company =req.body.company||"";
                            newTraveler.school =req.body.school||"";
                            newTraveler.hometown =req.body.hometown||"";
                            newTraveler.languages =req.body.languages||"";
                            newTraveler.gender =req.body.gender||"";
                            newTraveler.memberSince= req.body.memberSince||Date.now();
                            newTraveler.isTraveler = req.body.isTraveler||true;
                            newTraveler.save()
                            .then(traveler=>{
                                console.log("Traveler record created: ", traveler);
                                res.sendStatus(200).end();
                            })
                            .catch(err => {
                                console.log(err);
                                res.sendStatus(400).end();
                            });
                        }
                // };
            })
        }
    })

    } else {
        //If Owner, Insert the record in the OWNER_INFO_TABLE 
        console.log("Inside Owner Signup request"); 
        // var sql = "INSERT INTO OWNER_INFO_TABLE (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD) VALUES ( " + 
        // mysql.escape(FIRST_NAME) + " , " + mysql.escape(LAST_NAME) + " , "+
        // mysql.escape(EMAIL) + " ," +  mysql.escape(PASSWORD) + ")";
        var newOwner = new ownerModel();
        ownerModel.findOne({email: req.body.email}, function(err,owner){
            console.log("Checking if the email already exists");
            if(owner) {
                console.log("user already exists");
                res.send(400);
            } else {
                console.log("email not found, creating new user");
                // newTraveler = {
                    bcrypt.hash(req.body.password,10,(err,hash)=>{
                        if(err) {
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            newOwner._id = new mongoose.Types.ObjectId(),
                            newOwner.firstname = req.body.firstName;
                            newOwner.lastname = req.body.lastName;
                            newOwner.email = req.body.email;
                            // newOwner.password = req.body.password;
                            newOwner.password = hash;
                            newOwner.phonenumber =req.body.phonenumber||"";
                            newOwner.profileimage =req.body.profileimage||"preview.jpg";
                            newOwner.aboutme = req.body.aboutme||"";
                            newOwner.city =req.body.city||"";
                            newOwner.country =req.body.country||"";
                            newOwner.company =req.body.company||"";
                            newOwner.school =req.body.school||"";
                            newOwner.hometown =req.body.hometown||"";
                            newOwner.languages =req.body.languages||"";
                            newOwner.gender =req.body.gender||"";
                            newOwner.memberSince= req.body.memberSince||Date.now();
                            newOwner.isTraveler = req.body.isTraveler||false;
                            newOwner.save()
                            .then(owner=>{
                                console.log("Owner record created: ", owner);
                                res.sendStatus(200).end();
                                // res.status(201).json({
                                //     message: 'Owner created'
                                // });
                            })
                            .catch(err => {
                                console.log(err);
                                res.sendStatus(400).end();
                            });
                        }
                    })
            }
        })
    }
    // pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Could Not Get Connection Object");
    //     } else {
    //         con.query(sql,function(err,result){
    //             if(err){
    //                 res.writeHead(400,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 console.log("Error while creating the new (traveler/owner) record.");
    //                 res.end("Error While Creating record");
    //             }else{
    //                 res.writeHead(200,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 console.log(`Record with Name: ${FIRST_NAME} Created Successfully`);
    //                 res.end('Record Created Successfully');
    //             }
    //         });
    //     }
    // });
});


//Route to handle update profile for the Traveler
/*
    @param : FIRST_NAME, LAST_NAME, EMAIL, PROFILE_IMAGE, PHONE_NUMBER
    @param : ABOUT_ME, CITY, COUNTRY, COMPANY, SCHOOL, HOMETOWN, LANGUAGES, GENDER
*/
app.put('/editprofile',function(req,res){
    console.log("Inside Edit profile Request.");
    // var FIRST_NAME = req.body.data.userDetails.firstName;
    // var LAST_NAME = req.body.data.userDetails.lastName;
    // var EMAIL = req.body.data.userDetails.email;
    // // var PROFILE_IMAGE = req.body.userDetails.image;
    // var PHONE_NUMBER = req.body.data.userDetails.phoneNumber;
    // var ABOUT_ME = req.body.data.userDetails.aboutMe;
    // var CITY = req.body.data.userDetails.city;
    // var COUNTRY = req.body.data.userDetails.country;
    // var COMPANY = req.body.data.userDetails.company;
    // var SCHOOL = req.body.data.userDetails.school;
    // var HOMETOWN = req.body.data.userDetails.hometown;
    // var LANGUAGES = req.body.data.userDetails.languages;
    // var GENDER = req.body.data.userDetails.gender;

    //SQL Query to update the parameters received
    if(req.body.data.userDetails.isTraveler) {
        travelerModel.update({email : req.body.data.userDetails.email}, 
                             {$set: {firstname: req.body.data.userDetails.firstName,
                                     lastname: req.body.data.userDetails.lastName,
                                     phonenumber: req.body.data.userDetails.phoneNumber,
                                     profileimage: req.body.data.userDetails.profileImage,
                                     aboutme: req.body.data.userDetails.aboutMe,
                                     city: req.body.data.userDetails.city,
                                     company: req.body.data.userDetails.company,
                                     school: req.body.data.userDetails.school,
                                     country: req.body.data.userDetails.country,
                                     hometown: req.body.data.userDetails.hometown,
                                     languages: req.body.data.userDetails.languages,
                                     gender: req.body.data.userDetails.gender,
                                    }})
                    .exec()
                    .then(result => {
                        console.log(result);
                        res.status(200).json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
    } else {
        ownerModel.update({email : req.body.data.userDetails.email}, 
                            {$set: {firstname: req.body.data.userDetails.firstName,
                                    lastname: req.body.data.userDetails.lastName,
                                    phonenumber: req.body.data.userDetails.phoneNumber,
                                    profileimage: req.body.data.userDetails.profileImage,
                                    aboutme: req.body.data.userDetails.aboutMe,
                                    city: req.body.data.userDetails.city,
                                    company: req.body.data.userDetails.company,
                                    school: req.body.data.userDetails.school,
                                    country: req.body.data.userDetails.country,
                                    hometown: req.body.data.userDetails.hometown,
                                    languages: req.body.data.userDetails.languages,
                                    gender: req.body.data.userDetails.gender,
                                }})
                    .exec()
                    .then(result => {
                        console.log(result);
                        res.status(200).json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    })
    }
    // var sql = "UPDATE TRAVELER_INFO_TABLE SET FIRST_NAME = '" + FIRST_NAME + "' ," +
    //                                           "LAST_NAME = '" + LAST_NAME + "'," +
    //                                         //   "PROFILE_IMAGE ="+ PROFILE_IMAGE + ","
    //                                           "PHONE_NUMBER ="+ PHONE_NUMBER + "," +
    //                                           "ABOUT_ME = '"+ ABOUT_ME + "' ," +
    //                                           "CITY = '"+ CITY + "' ," +
    //                                           "COUNTRY = '"+ COUNTRY + "' ," +
    //                                           "COMPANY = '"+ COMPANY + "' ," +
    //                                           "SCHOOL = '"+ SCHOOL + "' ," +
    //                                           "HOMETOWN = '"+ HOMETOWN + "' ," +
    //                                           "LANGUAGES = '"+ LANGUAGES + "' ," +
    //                                           "GENDER = '"+ GENDER + "' WHERE " +
    //                                           "EMAIL = '" + EMAIL + "' ;";
    //     pool.getConnection(function(err,con){
    //     if(err){
    //         res.writeHead(400,{
    //             'Content-Type' : 'text/plain'
    //         })
    //         res.end("Could Not Get Connection Object");
    //     } else {
    //         con.query(sql,function(err,result){
    //             if(err){
    //                 res.writeHead(400,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 console.log(`Error while updating the ${FIRST_NAME} record.`);
    //                 res.end("Error While updating the record");
    //             }else{
    //                 res.writeHead(200,{
    //                     'Content-Type' : 'text/plain'
    //                 })
    //                 console.log(`Record with Name: ${FIRST_NAME} updated Successfully`);
    //                 res.end('Record updated Successfully');
    //             }
    //         });
    //     }
    // });

});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");