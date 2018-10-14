//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
var mysql = require('mysql');
var pool = require('./pool');
var morgan = require('morgan');
var multer = require('multer');
const path = require('path');
const fs = require('fs');

//use cors to allow cross origin resource sharing
app.use(cors({origin:'http://localhost:3000', credentials: true}));

//Use morgan 
app.use(morgan('dev'));
//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_Homeaway',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

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

//Hnadler for fetching the Image Name
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
app.get('/userdetail',function(req,res){
    console.log("Inside User Detail Request");
    var EMAIL = req.query.email;
    console.log(`is Traveler ${req.query.isTraveler}`);
    var isTraveler = JSON.parse(req.query.isTraveler);
    console.log("typeof: "+ isTraveler);

    if(isTraveler) {  
        console.log("Inside Traveler Detail Request");
        //QUERY TRAVELER_INFO_TABLE to get the email and password
        var sql = "SELECT *  FROM TRAVELER_INFO_TABLE WHERE EMAIL = " + mysql.escape(EMAIL);
    } else {

        console.log("Inside Owner Detail Request");
        //QUERY OWNER_INFO_TABLE to get the email and password
        var sql = "SELECT *  FROM OWNER_INFO_TABLE WHERE EMAIL = " + mysql.escape(EMAIL);
    }

    //Get a connection from the created SQL pool
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                    req.session.user = result;
                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        });
                    console.log(`Successful fetched the ${EMAIL} details.`);
                    console.log(`Result of userdetail  route: ${JSON.stringify(result)}`);
                    res.end(JSON.stringify(result));
                }
            });
        }
    });
})

//Route to handle Post Request Call for Login
app.post('/login',function(req,res){

    console.log("Inside Login Post Request");
    var EMAIL = req.body.userDetails.email;
    var PASSWORD = req.body.userDetails.password;
    // console.log("Req Body : ",req.body.userDetails);

    if(req.body.userDetails.isTraveler) {

        console.log("Inside Traveler Login Request");
        //QUERY TRAVELER_INFO_TABLE to get the email and password
        var sql = "SELECT *  FROM TRAVELER_INFO_TABLE WHERE EMAIL = " + 
        mysql.escape(EMAIL) + "and password = " + mysql.escape(PASSWORD);
    } else {

        console.log("Inside Owner Login Request");
        //QUERY OWNER_INFO_TABLE to get the email and password
        var sql = "SELECT *  FROM OWNER_INFO_TABLE WHERE EMAIL = " + 
        mysql.escape(EMAIL) + "and PASSWORD = " + mysql.escape(PASSWORD);
    }

    //Get a connection from the created SQL pool
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("some error occurred while executing sql query");
                }else{
                    if (result.length > 0){
                        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
                        req.session.user = result;
                        // console.log(`Result of login route: ${JSON.stringify(result)}`);
                        res.status(200).json(JSON.stringify(result));
                    } else {
                        res.status(401).json({"message":"incorrect username or password"});
                    }
                }
            });
        }
    });
});


//Route to get the Search Property details
/*
    @param : City 
    @param : Arrival Date
    @param : End Date
    @param : Head Count
*/
app.get('/searchprop', function(req,res){
    console.log("Inside search Request.");
    var city = req.query.city.toLowerCase();
    var startDate = req.query.startDate;
    var endDate = req.query.endDate;
    var headCount = req.query.headCount;

    var sql = "SELECT *  FROM OWNER_PROPERTY_TABLE " + 
                                    "WHERE PROP_CITY = " + mysql.escape(city) +
                                    " AND PROP_AVAIL_DATE <= " + mysql.escape(startDate) +
                                    " AND PROP_AVAIL_TILL >= " + mysql.escape(endDate) +
                                    " AND PROP_GUEST_COUNT >=" + mysql.escape(headCount)+";"

     //Get a connection from the created SQL pool
     pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(`Successful fetched the ${city} details.`);
                    console.log(`Result of searchprop  route: ${JSON.stringify(result)}`);
                    res.end(JSON.stringify(result));
                }
            });
        }
    });
})

//Route to get the Details of a particular Property Id
/*
    @param : Property Id 
*/
app.get('/propertydetail', function(req,res){
    console.log("Inside Property Detail route");
    var propertyId = req.query.propertyId;

    var sql = "SELECT *  FROM OWNER_PROPERTY_TABLE " + 
                        "WHERE PROP_ID = " + mysql.escape(propertyId) +";"

                        
        //Get a connection from the created SQL pool
        pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else {
                    if(result.length > 0) {
                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        console.log(`Successful fetched the ${propertyId} details.`);
                        console.log(`Result of propertydetail  route: ${JSON.stringify(result)}`);
                        res.end(JSON.stringify(result));
                    } else {
                        res.status(401).json({"message":"Property not found"});
                    }
                }
            });
        }
    });
})

//Route to book a particular Property
app.post('/bookproperty', function(req,res){
    console.log("Inside Property Detail route");
    var PROP_ID = req.body.propertyId;
    var OWNER_ID = req.body.propertyDetails[0].OWNER_ID;
    var TRAVELER_ID = req.body.travelerId;
    var BOOK_START_DATE = req.body.propertyBookStartDate;
    var BOOK_END_DATE = req.body.propertyBookEndDate;

    var sql = "INSERT INTO PR_BOOKING_TABLE (PROP_ID, OWNER_ID, TRAVELER_ID, BOOK_START_DATE, BOOK_END_DATE )" +
                            "VALUES (" + PROP_ID +" ," +
                                         OWNER_ID +" ," +
                                         TRAVELER_ID +" ," + "'"+
                                         BOOK_START_DATE +"' ," + "'"+
                                         BOOK_END_DATE +"' );"

    //Get a connection from the created SQL pool
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("some error occurred while executing sql query");
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(`Property with ID: ${PROP_ID} Booked Successfully`);
                    res.end('Property Booked Successfully');
                }
            });
        }
    });
})

//Route to get Traveler bookings
/*
    @param: Traveler_Id
*/

app.get('/travelerbookings', function(req,res){
    console.log("Inside the Traveler Bookings route.");
    var travelerId = req.query.travelerId;
    var sql =   "SELECT PT.PROP_ID, PT.PROP_TYPE, PT.PROP_GUEST_COUNT, PT.PROP_BATH, PT.PROP_BASE_RATE, PT.PROP_HEADLINE, BT.BOOK_START_DATE, BT.BOOK_END_DATE " +
                "FROM PR_BOOKING_TABLE AS BT " +
                "LEFT JOIN OWNER_PROPERTY_TABLE AS PT " +
                "ON BT.PROP_ID = PT.PROP_ID " +
                "WHERE BT.TRAVELER_ID =" + mysql.escape(travelerId) +";"

        //Get a connection from the created SQL pool
        pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(`Successful fetched the ${travelerId} details.`);
                    console.log(`Result of Traveler properties route: ${JSON.stringify(result)}`);
                    res.end(JSON.stringify(result));
                }
            });
        }
    });

})

//Route to get Owner Properties bookings
/*
    @param: owner_Id
*/

app.get ('/ownerpropsbooking', function(req,res) {
    console.log("Inside the owner Property bookings route.");
    var ownerId = req.query.ownerId;
    var sql =   "SELECT PT.PROP_ID, PT.PROP_TYPE, PT.PROP_GUEST_COUNT, PT.PROP_BATH, PT.PROP_BASE_RATE, PT.PROP_HEADLINE, BT.BOOK_START_DATE, BT.BOOK_END_DATE " +
                "FROM PR_BOOKING_TABLE AS BT " +
                "LEFT JOIN OWNER_PROPERTY_TABLE AS PT " +
                "ON BT.PROP_ID = PT.PROP_ID " +
                "WHERE BT.OWNER_ID =" + mysql.escape(ownerId) +";"

        //Get a connection from the created SQL pool
        pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(`Successful fetched the ${ownerId} details.`);
                    console.log(`Result of Owner properties bookings route: ${JSON.stringify(result)}`);
                    res.end(JSON.stringify(result));
                }
            });
        }
    });
})

//Route to get Owner Properties owned by a particular Owner
/*
    @param: owner_Id
*/

app.get('/ownerprops', function(req,res){
    console.log("Inside the owner Property bookings route.");
    var ownerId = req.query.ownerId;
    var sql =   "SELECT * FROM OWNER_PROPERTY_TABLE WHERE OWNER_ID = " + mysql.escape(ownerId) +";"

        //Get a connection from the created SQL pool
        pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Invalid Credentials");
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(`Successful fetched the ${ownerId} details.`);
                    console.log(`Result of Owner properties route: ${JSON.stringify(result)}`);
                    res.end(JSON.stringify(result));
                }
            });
        }
    });
})

//Route to Post the Property Details
// TODO: Check if the the the login is Owner login 
// if yes then allow the Property post else throw error , handle that in front-end with suitable Message
app.post('/postproperty', function(req,res){
    console.log("Inside the Post property Handler");
    var PROP_COUNTRY = req.body.propertyDetails.propCountry.toUpperCase();
    var PROP_ST_ADDRESS = req.body.propertyDetails.propStreetAddress.toUpperCase();
    var PROP_APT = req.body.propertyDetails.propApartment;
    var PROP_CITY = req.body.propertyDetails.propCity.toLowerCase();
    var PROP_STATE = req.body.propertyDetails.propState.toUpperCase();
    var PROP_ZIP = req.body.propertyDetails.propZip;
    var PROP_HEADLINE = req.body.propertyDetails.propHeadline;
    var PROP_DESC = req.body.propertyDetails.propDescription;
    var PROP_TYPE = req.body.propertyDetails.propType;
    var PROP_NO_BEDROOM = req.body.propertyDetails.propNoBedroom;
    var PROP_GUEST_COUNT = req.body.propertyDetails.propGuestCount;
    var PROP_BATH = req.body.propertyDetails.propNoBathroom;
    var PROP_IMAGES = JSON.stringify(req.body.propertyDetails.propPhotosArr);
    var PROP_CURRENCY = req.body.propertyDetails.propCurrency;
    var PROP_BASE_RATE = req.body.propertyDetails.propBaseRate;
    var PROP_AVAIL_DATE = req.body.propertyDetails.propStartDate;
    var PROP_AVAIL_TILL = req.body.propertyDetails.propEndDate;
    var EMAIL = req.body.propertyDetails.email.toLowerCase();
    var OWNER_ID = req.body.propertyDetails.ownerId;

    //SQL Query to update the parameters received
    var sql = "INSERT INTO OWNER_PROPERTY_TABLE (PROP_COUNTRY, PROP_ST_ADDRESS, PROP_APT, PROP_CITY, " +
     "PROP_STATE, PROP_ZIP, PROP_HEADLINE, PROP_DESC, PROP_TYPE, PROP_NO_BEDROOM, PROP_GUEST_COUNT, PROP_BATH, PROP_IMAGES, " +
     "PROP_CURRENCY, PROP_BASE_RATE, PROP_AVAIL_DATE, PROP_AVAIL_TILL, EMAIL, OWNER_ID) " +
                                            "VALUES (" + "'" +
                                            PROP_COUNTRY + "' ," + "'" +
                                            PROP_ST_ADDRESS + "' ," + "'" +
                                            PROP_APT + "' ," + "'" +
                                            PROP_CITY + "' ," + "'" +
                                            PROP_STATE + "' ," +
                                            PROP_ZIP + " ," + "'" +
                                            PROP_HEADLINE + "' ," + "'" +
                                            PROP_DESC + "' ," + "'" +
                                            PROP_TYPE + "' ," +
                                            PROP_NO_BEDROOM + " ," +
                                            PROP_GUEST_COUNT + " ," +
                                            PROP_BATH + " ," + "'" +
                                            PROP_IMAGES + "' ," + "'" +
                                            PROP_CURRENCY + "' ," +
                                            PROP_BASE_RATE + " ," + "'" +
                                            PROP_AVAIL_DATE + "' ," + "'" +
                                            PROP_AVAIL_TILL + "' ," + "'" +
                                            EMAIL + "'" + " ," +
                                            OWNER_ID + ");";
    //Get a connection from the created SQL pool
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("some error occurred while executing sql query");
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(`Property with Address: ${PROP_ST_ADDRESS} Created Successfully`);
                    res.end('Record Created Successfully');
                }
            });
        }
    });

})

//Route to handle Post Request Call for SignUp
app.post('/signup',function(req,res){
    console.log("Inside Signup Request Handler");
    var FIRST_NAME = req.body.firstName;
    var LAST_NAME = req.body.lastName;
    var EMAIL = req.body.email;
    var PASSWORD = req.body.password;

    if(req.body.isTraveler) {
        
        //If Traveler, Insert the record in TRAVELER_INFO_TABLE
        console.log("Inside Traveler Signup request");
        var sql = "INSERT INTO TRAVELER_INFO_TABLE (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD) VALUES ( " + 
        mysql.escape(FIRST_NAME) + " , " + mysql.escape(LAST_NAME) + " , "+
        mysql.escape(EMAIL) + " ," +  mysql.escape(PASSWORD) + ")";
    } else {

        //If Owner, Insert the record in the OWNER_INFO_TABLE 
        console.log("Inside Owner Signup request"); 
        var sql = "INSERT INTO OWNER_INFO_TABLE (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD) VALUES ( " + 
        mysql.escape(FIRST_NAME) + " , " + mysql.escape(LAST_NAME) + " , "+
        mysql.escape(EMAIL) + " ," +  mysql.escape(PASSWORD) + ")";
    }

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log("Error while creating the new (traveler/owner) record.");
                    res.end("Error While Creating record");
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(`Record with Name: ${FIRST_NAME} Created Successfully`);
                    res.end('Record Created Successfully');
                }
            });
        }
    });
});


//Route to handle update profile for the Traveler
/*
    @param : FIRST_NAME, LAST_NAME, EMAIL, PROFILE_IMAGE, PHONE_NUMBER
    @param : ABOUT_ME, CITY, COUNTRY, COMPANY, SCHOOL, HOMETOWN, LANGUAGES, GENDER
*/
app.put('/editprofile',function(req,res){
    console.log("Inside Edit profile Request.");
    var FIRST_NAME = req.body.userDetails.firstName;
    var LAST_NAME = req.body.userDetails.lastName;
    var EMAIL = req.body.userDetails.email;
    // var PROFILE_IMAGE = req.body.userDetails.image;
    var PHONE_NUMBER = req.body.userDetails.phoneNumber;
    var ABOUT_ME = req.body.userDetails.aboutMe;
    var CITY = req.body.userDetails.city;
    var COUNTRY = req.body.userDetails.country;
    var COMPANY = req.body.userDetails.company;
    var SCHOOL = req.body.userDetails.school;
    var HOMETOWN = req.body.userDetails.hometown;
    var LANGUAGES = req.body.userDetails.languages;
    var GENDER = req.body.userDetails.gender;

    //SQL Query to update the parameters received
    var sql = "UPDATE TRAVELER_INFO_TABLE SET FIRST_NAME = '" + FIRST_NAME + "' ," +
                                              "LAST_NAME = '" + LAST_NAME + "'," +
                                            //   "PROFILE_IMAGE ="+ PROFILE_IMAGE + ","
                                              "PHONE_NUMBER ="+ PHONE_NUMBER + "," +
                                              "ABOUT_ME = '"+ ABOUT_ME + "' ," +
                                              "CITY = '"+ CITY + "' ," +
                                              "COUNTRY = '"+ COUNTRY + "' ," +
                                              "COMPANY = '"+ COMPANY + "' ," +
                                              "SCHOOL = '"+ SCHOOL + "' ," +
                                              "HOMETOWN = '"+ HOMETOWN + "' ," +
                                              "LANGUAGES = '"+ LANGUAGES + "' ," +
                                              "GENDER = '"+ GENDER + "' WHERE " +
                                              "EMAIL = '" + EMAIL + "' ;";
        pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        } else {
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(`Error while updating the ${FIRST_NAME} record.`);
                    res.end("Error While updating the record");
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'text/plain'
                    })
                    console.log(`Record with Name: ${FIRST_NAME} updated Successfully`);
                    res.end('Record updated Successfully');
                }
            });
        }
    });

});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");