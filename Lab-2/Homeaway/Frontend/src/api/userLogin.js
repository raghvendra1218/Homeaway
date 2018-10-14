const axios = require("axios")
// const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

const requestURI = "http://localhost:3001";

export const signup = (payload) => {
    console.log("payload", payload)
    return axios.post(`${requestURI}/signup`, payload)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const login = (payload) => {
    console.log("payload", payload)
    return axios.post(`${requestURI}/login`, payload)
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const signout = () => {
    return axios.post(`${requestURI}/signout`, {}
    )
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};

export const update = (payload) => {
    let id = payload.id;
    return axios.put(`${requestURI}/users/${id}`, payload
    )
        .then(function (response) {
            console.log(response);
            return response
        })
        .catch(function (error) {
            console.log(error);
            return error
        });
};
