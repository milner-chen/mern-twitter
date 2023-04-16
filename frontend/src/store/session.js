// new fetch
import { startSession } from "../../../backend/models/Tweet";
import jwtFetch from "./jwt";

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_SESSION_ERRORS = "session/RECEIVE_SESSION_ERRORS";
const CLEAR_SESSION_ERRORS = "session/CLEAR_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "session/RECEIVE_USER_LOGOUT";

const receiveCurrentUser = (currentUser) => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

const receiveErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const clearSessionErrors = () => ({
    type: CLEAR_SESSION_ERRORS
});

// startSession is a helper func to login
export const signup = user => startSession(user, 'api/users/register');
export const login = user => startSession(user, 'api/users/login');

const startSession = (userInfo, route) => async (dispatch) => {
    try {
        const res = await jwtFetch(route, {
            method: "POST",
            body: JSON.stringify(userInfo)
        });
        // res returns both user and token
        const { user, token } = await res.json();
        // add token to localstorage
        localStorage.setItem('jwtToken', token);
        // update our state with the user
        return dispatch(receiveCurrentUser(user));
    } catch(err) {
        const res = await err.json();
        // if there are errors
        if (res.statusCode === 400) {
            // throw to errors slice
            return dispatch(receiveErrors(res.errors));
        }
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser());
};

const initialState = { user: undefined };

const sessionReducer = (state=initialState, action) => {
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            // set current user
            return { user: action.currentUser }
        case RECEIVE_USER_LOGOUT:
            // logout a user
            return initialState;
        default:
            return state;
    }   
}

const nullErrors = null;

export const sessionErrorsReducer = (state=nullErrors, action) => {
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        // once logged in or sign up (which still logs you in tbh) -> clear errors
        case RECEIVE_CURRENT_USER:
        case CLEAR_SESSION_ERRORS:
            return nullErrors;
        default:
            return state;
    }
};

export default sessionReducer;