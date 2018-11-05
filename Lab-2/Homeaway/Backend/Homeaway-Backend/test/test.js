var chai = require('chai'), chaiHttp = require('chai-http');
const { CONSTANTS } = require('../Constants');

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check Traveler credentials and return status code", function(done){
    chai.request(`http://ec2-34-221-135-2.us-west-2.compute.amazonaws.com:3001`)
    .post('/login')
    .send({
        "userDetails": {
            "email": "sitaram.sahu@gmail.com",
            "password": "Sitaram1@",
            "isTraveler": true
        }
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Owner Login :

it("Should check Traveler credentials and return status code", function(done){
    chai.request(`http://ec2-34-221-135-2.us-west-2.compute.amazonaws.com:3001`)
    .post('/login')
    .send({
        "userDetails": {
            "email": "mohanlal@gmail.com",
            "password": "Mohan111@",
            "isTraveler": false
        }
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Traveler Signup:

it("Should signup/create a new Traveler and return status code", function(done){
    chai.request(`http://ec2-34-221-135-2.us-west-2.compute.amazonaws.com:3001`)
    .post('/signup')
    .send({
        "firstName": "mochafirstName",
        "lastName": "mochafirstName",
        "email": "mocha@gmail.com",
        "password": "Mocha111@",
        "isTraveler": true
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Owner Signup:

it("Should signup/create a new Owner and return status code", function(done){
    chai.request(`http://ec2-34-221-135-2.us-west-2.compute.amazonaws.com:3001`)
    .post('/signup')
    .send({
        "firstName": "mochaownerfirstName",
        "lastName": "mochaownerlastName",
        "email": "mochaowner@gmail.com",
        "password": "Mochaow111@",
        "isTraveler": false
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//Post a Property 

it("Should not post a Property and return 401 status code as authorization is not passed", function(done){
    chai.request(`http://ec2-34-221-135-2.us-west-2.compute.amazonaws.com:3001`)
    .post('/postproperty')
    .send(
        {
        "propertyDetails" : {
                    "ownerId": "5bde47ac4f53f44e00ee635a",
                    "email": "mohanlal@gmail.com",
                    "propCountry": "USA",
                    "propStreetAddress": "123 Japan town",
                    "propApartment": "Barn",
                    "propCity": "San Jose",
                    "propState": "CA",
                    "propZip": 95112,
                    "propHeadline": "Damn good property",
                    "propDescription": "Property Desc",
                    "propType": "barn",
                    "propNoBedroom": 3,
                    "propGuestCount": 3,
                    "propNoBathroom": 3,
                    "propPhotosArr" : "[\"House1.jpg\",\"House3.jpeg\"]",
                    "propCurrency": "USD",
                    "propBaseRate": 56,
                    "propStartDate": "2018-11-01",
                    "propEndDate": "2018-11-30",
                    "isBooked": false,
                    "travelerId": ""
                }
    })
    .end(function (err, res) {
        expect(res).to.have.status(401);
        done();
    });
})

//Search a Property:

it("Should search properties and return status code", function(done){
    chai.request(`http://ec2-34-221-135-2.us-west-2.compute.amazonaws.com:3001`)
    .get('/searchprop')
    .send({
        "city":"san jose", 
        "startDate": "2018-11-02", 
        "endDate": "2018-11-05", 
        "headCount": 2
        
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})

//For Property Detail Route:

it("Should show property detail and return status code", function(done){
    chai.request(`http://ec2-34-221-135-2.us-west-2.compute.amazonaws.com:3001`)
    .get('/propertydetail')
    .send({
        "propertyId":"5bde89e971e8691abc43f2cd", 
    })
    .end(function (err, res) {
        expect(res).to.have.status(200);
        done();
    });
})


// it("Should check Owner credentials and return status code", function(done){
//     chai.request(`http://ec2-54-189-89-51.us-west-2.compute.amazonaws.com:3001`)
//     .post('/login')
//     .send({ "email": "testowner@gmail.com", "password" : "test", "isTraveler" : false})
//     .end(function (err, res) {
//         expect(res).to.have.status(200);
//         done();
//     });
// })

// it("Should check credentials and return status code 401 with wrong username and password", function(done){
//     chai.request(`http://ec2-54-189-89-51.us-west-2.compute.amazonaws.com:3001`)
//     .post('/login')
//     .send({
//         "userDetails": {
//             "email": "sitaram.sahu@gmail.com",
//             "password": "Sitaram1@",
//             "isTraveler": true
//         }
//     })
//     .end(function (err, res) {
//         expect(res).to.have.status(401);
//         done();
//     });
// })

// it("Should check the Traveler details in signUp handler and return the success status code", function(done){
//     chai.request(`http://ec2-54-189-89-51.us-west-2.compute.amazonaws.com:3001`)
//     .post('/signup')
//     .send({"firstName":"Robert" , "lastName":"Martin" , "email": "robert.martin@gmail.com", "password" : "syntel1", "isTraveler" : true})
//     .end(function (err, res) {
//         expect(res).to.have.status(200);
//         done();
//     });
// })

// it("Should check the Owner details in signUp handler and return the success status code", function(done){
//     chai.request(`${CONSTANTS.BACKEND_URL}`)
//     .post('/signup')
//     .send({"firstName":"Robert" , "lastName":"Martin" , "email": "robert.martin@gmail.com", "password" : "syntel1", "isTraveler" : false})
//     .end(function (err, res) {
//         expect(res).to.have.status(200);
//         done();
//     });
// })