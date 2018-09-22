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


//Route to handle Post Request Call for Login
app.post('/login',function(req,res){

    console.log("Inside Login Post Request");
    var EMAIL = req.body.email;
    var PASSWORD = req.body.password;
    console.log("Req Body : ",req.body);

    if(req.body.isTraveler == true) {

        console.log("Inside Traveler Login request");
        //QUERY TRAVELER_INFO_TABLE to get the email and password
        var sql = "SELECT *  FROM TRAVELER_INFO_TABLE WHERE EMAIL = " + 
        mysql.escape(EMAIL) + "and password = " + mysql.escape(PASSWORD);
    } else {

        console.log("Inside Owner Login request");
        //QUERY OWNER_INFO_TABLE to get the email and password
        var sql = "SELECT *  FROM OWNER_INFO_TABLE WHERE EMAIL = " + 
        mysql.escape(EMAIL) + "and password = " + mysql.escape(PASSWORD);
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
                        res.end("Successful Login");
                }
            });
        }
    });
});

//Route to get the Home page details

//Route to get the Search Property details
/*
    @param : City 
    @param : Arrival Date
    @param : End Date
*/

//Route to Post the Property Details
// TODO: Check if the the the login is Owner login 
// if yes then allow the Property post else throw error , handle that in front-end with suitable Message


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
    @param : 
    @param : 
*/
app.put('/editprofile:id',function(req,res){
    console.log("Inside Edit profile Request.");
    var FIRST_NAME = req.body.firstName;
    var LAST_NAME = req.body.lastName;
    var EMAIL = req.body.email;
    var PASSWORD = req.body.password;

});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");