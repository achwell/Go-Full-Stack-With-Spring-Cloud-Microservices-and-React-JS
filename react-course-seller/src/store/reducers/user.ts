import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from '../types'
import IUser from "../../models/interfaces/IUser";

interface ActionType {
    type: string
    payload: IUser
}

const userReducer = (state = {}, action: ActionType) => {
    switch (action?.type) {
        case SET_CURRENT_USER:
            localStorage.setItem('currentUser', JSON.stringify(action?.payload));
            return action?.payload;
        case CLEAR_CURRENT_USER:
            localStorage.removeItem('currentUser');
            return null;
        default:
            let currentUser = localStorage.getItem('currentUser')
            if (!currentUser) {
                return undefined
            }
            return JSON.parse(currentUser)
    }
};

export default userReducer