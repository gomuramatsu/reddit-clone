import { userConsts }from '../constants/userConstants';

export default class UserAction {
  
    static login(userWrapper) {
        return {
            type: userConsts.LOGIN_SUCCESS, 
            payload: userWrapper
        }
    }

    static logout() {
        return {
            type: userConsts.LOGOUT
        }
    }

}