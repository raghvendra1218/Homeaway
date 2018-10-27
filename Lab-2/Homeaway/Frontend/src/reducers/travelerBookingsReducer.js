const searchPropertiesState = {
    'travelerBookingDetailsData' : [],
    'isFetched' : false
}

export default function (state=searchPropertiesState,action){
    var newState = {};
    switch (action.type) {
        case "CHECK_TRAVELER_BOOKINGS":
            // const newState = loginStatusState;
            console.log("at reducer",action.travelerBookingDetailsData);
            newState  = Object.assign({}, state, { isFetched: action.isFetched, travelerBookingDetailsData: action.travelerBookingDetailsData});
            console.log("new state",newState);
            return newState;    
        default :
            return state
    }

}