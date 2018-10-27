export const LOGIN_DATA = "LOGIN_DATA";
export const LOGOUT_DATA = "LOGOUT_DATA";
export const PROPERTY_POST_DATA = "PROPERTY_POST_DATA";
export const PROFILE_DATA = "PROFILE_DATA";
export const SEARCH_PROPERTY = "SEARCH_PROPERTY";
export const LIST_PROPERTY_DETAIL = "LIST_PROPERTY_DETAIL";
export const POST_PROPERTY = "POST_PROPERTY";
export const CHECK_TRAVELER_BOOKINGS = "CHECK_TRAVELER_BOOKINGS";
export const CHECK_OWNER_BOOKINGS = "CHECK_OWNER_BOOKINGS";
export const CHECK_OWNER_PROPERTIES_POSTED = "CHECK_OWNER_PROPERTIES_POSTED";

export const loginData = (flag, user, userFlag) => {
    console.log("action", flag, userFlag);
    console.log("action", user, userFlag);
    return {
        type: LOGIN_DATA,
        flag:flag,
        user:user,
        userFlag: userFlag
    }
}
export const logoutData = (flag, user, userFlag) => {
    console.log("action", flag, userFlag);
    console.log("action", user, userFlag);
    return {
        type: LOGOUT_DATA,
        flag:flag,
        user:user,
        userFlag: userFlag
    }
}

export const postPropertyData = (propertyData, isPosted) => {
    console.log("action", propertyData, isPosted);
    return {
        type: PROPERTY_POST_DATA,
        isPosted:isPosted,
        propertyData:propertyData,
    }
}

export const editProfileData = (profileData, isFetched, isUpdated) => {
    console.log("action", profileData, isFetched, isUpdated);
    return {
        type: PROFILE_DATA,
        isFetched:isFetched,
        isUpdated: isUpdated,
        profileData:profileData,
    }
}
export const searchProperties = (searchData, isFetched) => {
    console.log("action", searchData, isFetched);
    return {
        type: SEARCH_PROPERTY,
        isFetched:isFetched,
        searchData:searchData,
    }
}
export const propertyDetails = (propertyDetailData, isBooked, isFetched) => {
    console.log("action", propertyDetailData, isFetched);
    return {
        type: LIST_PROPERTY_DETAIL,
        isBooked:isBooked,
        isFetched:isFetched,
        propertyDetailData:propertyDetailData,
    }
}
export const propertyPosted = (propertyDetailData, isBooked, isFetched) => {
    console.log("action", propertyDetailData, isFetched);
    return {
        type: POST_PROPERTY,
        isBooked:isBooked,
        isFetched:isFetched,
        propertyDetailData:propertyDetailData,
    }
}
export const travelerBookedProperties = (travelerBookingDetailsData, isFetched) => {
    console.log("action", travelerBookingDetailsData, isFetched);
    return {
        type: CHECK_TRAVELER_BOOKINGS,
        isFetched:isFetched,
        travelerBookingDetailsData:travelerBookingDetailsData,
    }
}
export const ownerBookings = (ownerPropertiesData, isOwnerBookingsFetched) => {
    console.log("action", ownerPropertiesData, isOwnerBookingsFetched);
    return {
        type: CHECK_OWNER_BOOKINGS,
        isOwnerBookingsFetched:isOwnerBookingsFetched,
        ownerPropertiesData:ownerPropertiesData,
    }
}
export const ownerProperties = (ownerPropertiesData, isOwnerPropertiesFetched) => {
    console.log("action", ownerPropertiesData, isOwnerPropertiesFetched);
    return {
        type: CHECK_OWNER_PROPERTIES_POSTED,
        isOwnerPropertiesFetched:isOwnerPropertiesFetched,
        ownerPropertiesData:ownerPropertiesData,
    }
}