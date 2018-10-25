export const LOGIN_DATA = "LOGIN_DATA";
export const LOGOUT_DATA = "LOGOUT_DATA";
export const PROPERTY_POST_DATA = "PROPERTY_POST_DATA";
export const PROFILE_DATA = "PROFILE_DATA";

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
    // console.log("action", user, userFlag);
    return {
        type: PROPERTY_POST_DATA,
        isPosted:isPosted,
        propertyData:propertyData,
    }
}

export const editProfileData = (profileData, isFetched, isUpdated) => {
    console.log("action", profileData, isFetched, isUpdated);
    // console.log("action", user, userFlag);
    return {
        type: PROFILE_DATA,
        isFetched:isFetched,
        isUpdated: isUpdated,
        profileData:profileData,
    }
}