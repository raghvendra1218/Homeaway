import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import postPropertyReducer from './postPropertyReducer';
import updateProfileReducer from './updateProfileReducer';

const rootReducer = combineReducers({
    loginData: loginReducer,
    postProperty : postPropertyReducer,
    updateProfile : updateProfileReducer,
});

export default rootReducer;