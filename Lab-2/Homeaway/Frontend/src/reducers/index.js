import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import postPropertyReducer from './postPropertyReducer';
import updateProfileReducer from './updateProfileReducer';
import searchPropertyReducer from './searchPropertyReducer';
import propertyDetailsReducer from './propertyDetailsReducer';
import travelerBookingsReducer from './travelerBookingsReducer';
import ownerPropertiesReducer from './ownerPropertiesReducer';

const rootReducer = combineReducers({
    loginData: loginReducer,
    propertyData : postPropertyReducer,
    profileData : updateProfileReducer,
    searchData: searchPropertyReducer,
    propertyDetailData : propertyDetailsReducer,
    travelerBookingDetailsData : travelerBookingsReducer,
    ownerPropertiesData: ownerPropertiesReducer,
});

export default rootReducer;