const searchPropertiesState = {
    'searchData' : [],
    'isFetched' : false
}

export default function (state=searchPropertiesState,action){
    var newState = {};
    switch (action.type) {
        case "SEARCH_PROPERTY":
            // const newState = loginStatusState;
            console.log("at reducer",action.searchData);
            newState  = Object.assign({}, state, { isFetched: action.isFetched, searchData: action.searchData});
            console.log("new state",newState);
            return newState;    
        default :
            return state
    }

}