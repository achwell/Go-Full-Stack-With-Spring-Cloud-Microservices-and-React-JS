import {CLEAR_CURRENT_USER, SET_CURRENT_USER} from '../types'
import IUser from "../../models/interfaces/IUser"

export const setCurrentUser = (user: IUser) => {
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};

export const clearCurrentUser = () => {
    return {
        type: CLEAR_CURRENT_USER,
    };
}