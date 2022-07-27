import { BASE_API_URL } from '../common/Constants'
import axios, {AxiosResponse} from 'axios'
import IUser from "../models/interfaces/IUser"

const BASE_URL = BASE_API_URL + '/api/authentication'

class AuthenticationService {

    login(user: IUser): Promise<AxiosResponse<IUser>> {
        return axios.post<IUser>(BASE_URL + '/sign-in', user)
    }

    register(user: IUser): Promise<AxiosResponse<IUser>> {
        return axios.post<IUser>(BASE_URL + '/sign-up', user)
    }

}

export default new AuthenticationService()