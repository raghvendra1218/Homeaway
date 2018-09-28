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

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
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
                        })
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
    console.log("Req Body : ",req.body.userDetails);

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
                        console.log(`Result of login route: ${JSON.stringify(result)}`);
                        res.status(200).json(JSON.stringify(result));
                    }
                    else{
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
*/
app.get('/search:propid', function(req,res){
    console.log("Inside search Request.");
    
})



//Route to Post the Property Details
// TODO: Check if the the the login is Owner login 
// if yes then allow the Property post else throw error , handle that in front-end with suitable Message
app.post('/postproperty', function(req,res){
    console.log("Inside the Post property Handler");
    var PROP_COUNTRY = req.body.propertyDetails.propCountry;
    var PROP_ST_ADDRESS = req.body.propertyDetails.propStreetAddress;
    var PROP_APT = req.body.propertyDetails.propApartment;
    var PROP_CITY = req.body.propertyDetails.propCity;
    var PROP_STATE = req.body.propertyDetails.propState;
    var PROP_ZIP = req.body.propertyDetails.propZip;
    var PROP_HEADLINE = req.body.propertyDetails.propHeadline;
    var PROP_DESC = req.body.propertyDetails.propDescription;
    var PROP_TYPE = req.body.propertyDetails.propType;
    var PROP_NO_BEDROOM = req.body.propertyDetails.propNoBedroom;
    var PROP_GUEST_COUNT = req.body.propertyDetails.propGuestCount;
    var PROP_BATH = req.body.propertyDetails.propNoBathroom;
    var PROP_PHOTO_1 = req.body.propertyDetails.propPhoto1;
    var PROP_PHOTO_2 = req.body.propertyDetails.propPhoto2;
    var PROP_PHOTO_3 = req.body.propertyDetails.propPhoto3;
    var PROP_PHOTO_4 = req.body.propertyDetails.propPhoto4;
    var PROP_PHOTO_5 = req.body.propertyDetails.propPhoto5;
    var PROP_CURRENCY = req.body.propertyDetails.propCurrency;
    var PROP_BASE_RATE = req.body.propertyDetails.propBaseRate;
    var PROP_AVAIL_DATE = req.body.propertyDetails.propStartDate;
    var PROP_AVAIL_TILL = req.body.propertyDetails.propEndDate;
    var EMAIL = req.body.propertyDetails.email;

    //SQL Query to update the parameters received
    var sql = "INSERT INTO OWNER_PROPERTY_TABLE (PROP_COUNTRY, PROP_ST_ADDRESS, PROP_APT, PROP_CITY, " +
     "PROP_STATE, PROP_ZIP, PROP_HEADLINE, PROP_DESC, PROP_TYPE, PROP_NO_BEDROOM, PROP_GUEST_COUNT, PROP_BATH, PROP_PHOTO_1, " +
     "PROP_PHOTO_2, PROP_PHOTO_3, PROP_PHOTO_4, PROP_PHOTO_5, PROP_CURRENCY, PROP_BASE_RATE, PROP_AVAIL_DATE, PROP_AVAIL_TILL, EMAIL) " +
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
                                            PROP_PHOTO_1 + "' ," + "'" +
                                            PROP_PHOTO_2 + "' ," + "'" +
                                            PROP_PHOTO_3 + "' ," + "'" +
                                            PROP_PHOTO_4 + "' ," + "'" +
                                            PROP_PHOTO_5 + "' ," + "'" +
                                            PROP_CURRENCY + "' ," +
                                            PROP_BASE_RATE + " ," + "'" +
                                            PROP_AVAIL_DATE + "' ," + "'" +
                                            PROP_AVAIL_TILL + "' ," + "'" +
                                            EMAIL + "');";
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