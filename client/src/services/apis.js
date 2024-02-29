const BASE_URL = process.env.REACT_APP_BASE_URL;

console.log( "backend url" ,  BASE_URL);


// AUTH ENDPOINTS
export const endpoints = {
  LOGIN_API: BASE_URL + "/auth/login",
  SIGNUP_API: BASE_URL + "/auth/signup",
  GET_ALL_USERS: BASE_URL+"/auth/all-users"
};
