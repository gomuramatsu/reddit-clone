import { userConsts } from '../constants/userConstants';

const initialState = { loggedIn: false, username: null };

export function authentication(state = initialState, action) {
    switch (action.type) {
    case userConsts.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            username: action.payload.username,
            firebaseUser: action.payload.firebaseUser
        };
    case userConsts.LOGOUT:
        return {
            loggedIn: false,
            username: null
        };
    default:
        return state
    }
}