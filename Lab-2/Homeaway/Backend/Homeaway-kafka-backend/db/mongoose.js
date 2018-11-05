const mongoose = require('mongoose');
require('dotenv').config();

//Extract DB username and password from the configuration file
// const username = process.env.MONGODB_MLAB_USERNAME;
const username = "Raghav";
// const password = process.env.MONGODB_MLAB_PASSWORD;
const password = "superman1";

//DB Configuration
const dbConfig = {
  production: `mongodb://${username}:${password}@MLAB_URL_FOR_PRODUCTION_WILL_COME_HERE`,
  development: `mongodb://${username}:${password}@ds231723.mlab.com:31723/homeaway`,
  test: 'mongodb://127.0.0.1/homeaway',
};

// var uri = 'mongodb://Raghav:superman1@ds231723.mlab.com:31723/homeaway';
// var uri = 'mongodb://' +process.env.MONGO_USERNAME +':' + process.env.MONGO_PWD +'@ds231723.mlab.com:31723/homeaway';
// var uri = 'mongodb://localhost:27017/homeaway';

var options = {
  "server" : {
    "socketOptions" : {
      "keepAlive" : 300000,
      "connectTimeoutMS" : 30000
    }
  },
  "replset" : {
    "socketOptions" : {
      "keepAlive" : 300000,
      "connectTimeoutMS" : 30000
    }
  },
  "useNewUrlParser" : true,
  "poolSize" : 700
}

const appEnv = 'development';
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig[appEnv], options, (err, res) => {
  console.log(`Connected to DB: ${dbConfig[appEnv]}`);
});

// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error:'));

module.exports = {mongoose};