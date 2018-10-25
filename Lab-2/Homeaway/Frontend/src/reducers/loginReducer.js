const loginState = {
    'isLogged' : false,
    'loginData' : '',
    'isTraveler' : true
}

export default function (state=loginState,action){
    var newState = {};
    switch (action.type) {
        case "LOGIN_DATA":
            // const newState = loginStatusState;
            console.log("at reducer",action.user);
            newState  = Object.assign({}, state, { isLogged: action.flag, isTraveler: action.userFlag, loginData: action.user});
            console.log("new state",newState);
            return newState;
        case "LOGOUT_DATA" :
            console.log("at reducer", action.user);
            newState = Object.assign({}, state, {isLogged: action.flag, isTraveler: action.userFlag, loginData: action.user})
            console.log("new state",newState); 
            return newState;   
        default :
            return state
    }

}