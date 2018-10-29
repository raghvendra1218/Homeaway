const connection =  new require('./kafka/Connection');
const {mongoose} = require('./db/mongoose');

//topics files
const login = require('./services/login');
const signup = require('./services/signup');
const editprofile = require('./services/editprofile');
const userdetail = require('./services/userdetail');
const postproperty = require('./services/postproperty');
const searchproperty = require('./services/searchproperty');
const propertydetail = require('./services/propertydetail');
const bookproperty = require('./services/bookproperty');
const travelerbookings = require('./services/travelerbookings');
const ownerproperties = require('./services/ownerproperties');
const ownerpropertiesbookings = require('./services/ownerpropertiesbookings');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("login_user",login);
handleTopicRequest("signup_user",signup);
handleTopicRequest("edit_user_profile",editprofile);
handleTopicRequest("user_details",userdetail);
handleTopicRequest("post_property",postproperty);
handleTopicRequest("search_property",searchproperty);
handleTopicRequest("property_detail",propertydetail);
handleTopicRequest("book_property",bookproperty);
handleTopicRequest("traveler_bookings",travelerbookings);
handleTopicRequest("owner_properties",ownerproperties);
handleTopicRequest("owner_prop_bookings",ownerpropertiesbookings);