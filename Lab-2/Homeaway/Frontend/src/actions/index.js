export const LOGIN_DATA = "LOGIN_DATA";
export const LOGOUT_DATA = "LOGOUT_DATA";

export const loginData = (flag, user) => {
    console.log("action", flag);
    console.log("action", user);
    return {
        type: LOGIN_DATA,
        flag:flag,
        user:user
    }
}
export const logoutData = (flag, user) => {
    console.log("action", flag);
    console.log("action", user);
    return {
        type: LOGOUT_DATA,
        flag:flag,
        user:user
    }
}