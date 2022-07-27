import axios, {AxiosResponse} from 'axios'
import { BASE_API_URL } from '../common/Constants'
import { authHeader } from './base.service'
import IPurchase from "../models/interfaces/IPurchase"

const API_URL = BASE_API_URL + '/gateway/purchase'

class PurchaseService {

    savePurchase(purchase: IPurchase): Promise<AxiosResponse<IPurchase>> {
        return axios.post<IPurchase>(API_URL, purchase, {headers: authHeader()})
    }

    getAllPurchaseItems(): Promise<AxiosResponse<IPurchase[]>> {
        return axios.get<IPurchase[]>(API_URL, {headers: authHeader()})
    }
}

export default new PurchaseService()