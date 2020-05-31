import { userConsts }from '../constants/userConstants';

export default class UserAction {
  
    static login(firebaseUser) {
        return {
            type: userConsts.LOGIN_SUCCESS, 
            payload: firebaseUser
        }
    }

    static logout() {
        return {
            type: userConsts.LOGOUT
        }
    }

}