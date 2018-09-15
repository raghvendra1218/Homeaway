var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
// app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({origin:'http://localhost:3000', credentials: true}));


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


//route to process the result
app.get('/process',function(req,res, err){
    //check if user session exits
    console.log("session", req.session);
    console.log("body", req.query);
    var queryParam = req.query.displayValue;
    var result = eval(queryParam);
    // if(err) {
    //     resultString = 'Please Enter the correct Operands';
    //     res.status(500).json({displayValue:resultString})
    // }
    resultString = result.toString();
    // console.log("typeof" + typeof(resultString));
    res.status(200).json({displayValue:resultString});
});

var server = app.listen(3001, function () {
    console.log("Server listening on port 3001");
 
});