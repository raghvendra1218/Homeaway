const profileState = {
    'profileData' : '',
    'isFetched' : false,
    'isUpdated' : false,
}

export default function (state=profileState,action){
    var newState = {};
    switch (action.type) {
        case "PROFILE_DATA":
            // const newState = loginStatusState;
            console.log("at reducer",action.profileData);
            newState  = Object.assign({}, state, { isFetched: action.isFetched, isUpdated: action.isUpdated, profileData: action.profileData});
            console.log("new state",newState);
            return newState;  
        default :
            return state
    }

}