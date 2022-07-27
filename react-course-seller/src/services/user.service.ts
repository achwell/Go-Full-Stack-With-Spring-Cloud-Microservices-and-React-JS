import axios, {AxiosResponse} from 'axios'
import { BASE_API_URL } from '../common/Constants'
import { authHeader } from './base.service'

const API_URL = BASE_API_URL + '/api/user'

class UserService {

    changeRole(role: string): Promise<AxiosResponse<boolean>> {
        return axios.put<boolean>(API_URL + '/change/' + role, {}, {headers: authHeader()});
    }
}

export default new UserService()