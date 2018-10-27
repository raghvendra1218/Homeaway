const ownerPropertiesState = {
    'ownerBookingDetailsData' : [],
    'ownerPropertiesDetailsData' : [],
    'isOwnerBookingsFetched' : false,
    'isOwnerPropertiesFetched' : false
}

export default function (state=ownerPropertiesState,action){
    var newState = {};
    switch (action.type) {
        case "CHECK_OWNER_BOOKINGS":
            // const newState = loginStatusState;
            console.log("at reducer",action.ownerPropertiesData);
            newState  = Object.assign({}, state, { isOwnerBookingsFetched: action.isOwnerBookingsFetched, ownerBookingDetailsData: action.ownerPropertiesData});
            console.log("new state",newState);
            return newState;
        case "CHECK_OWNER_PROPERTIES_POSTED":
            // const newState = loginStatusState;
            console.log("at reducer",action.ownerPropertiesData);
            newState  = Object.assign({}, state, { isOwnerPropertiesFetched: action.isOwnerPropertiesFetched, ownerPropertiesDetailsData: action.ownerPropertiesData});
            console.log("new state",newState);
            return newState;     
        default :
            return state
    }

}