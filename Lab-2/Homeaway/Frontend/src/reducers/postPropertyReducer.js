const propertyPostState = {
    'propertyData' : '',
    'isPosted' : false
}

export default function (state=propertyPostState,action){
    var newState = {};
    switch (action.type) {
        case "PROPERTY_POST_DATA":
            // const newState = loginStatusState;
            console.log("at reducer",action.propertyData);
            newState  = Object.assign({}, state, { isPosted: action.isPosted, propertyData: action.propertyData});
            console.log("new state",newState);
            return newState;  
        default :
            return state
    }

}