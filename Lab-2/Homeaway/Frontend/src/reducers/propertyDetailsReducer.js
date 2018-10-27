const propertyDetailState = {
    'propertyDetailData' : [],
    'isBooked' : false,
    'isFetched' : false
}

export default function (state=propertyDetailState,action){
    var newState = {};
    switch (action.type) {
        case "LIST_PROPERTY_DETAIL":
            // const newState = loginStatusState;
            console.log("at reducer",action.propertyDetailData);
            newState  = Object.assign({}, state, { isFetched: action.isFetched, isBooked:action.isBooked, propertyDetailData: action.propertyDetailData});
            console.log("new state",newState);
            return newState; 
        case "POST_PROPERTY":
            // const newState = loginStatusState;
            console.log("at reducer",action.propertyDetailData);
            newState  = Object.assign({}, state, { isFetched: action.isFetched, isBooked:action.isBooked, propertyDetailData: action.propertyDetailData});
            console.log("new state",newState);
            return newState; 
        default :
            return state
    }

}