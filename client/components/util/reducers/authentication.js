import { userConsts } from '../constants/userConstants';

const initialState = { loggedIn: false, user: null };

export function authentication(state = initialState, action) {
    switch (action.type) {
    case userConsts.LOGIN_SUCCESS:
        return {
            loggedIn: true,
            user: action.payload
        };
    case userConsts.LOGOUT:
        return {
            loggedIn: false,
            user: null
        };
    default:
        return state
    }
}