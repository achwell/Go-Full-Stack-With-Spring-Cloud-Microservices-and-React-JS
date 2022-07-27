import axios, {AxiosResponse} from 'axios'
import { BASE_API_URL } from '../common/Constants'
import { authHeader } from './base.service'
import ICourse from "../models/interfaces/ICource";

const API_URL = BASE_API_URL + '/gateway/course'

class CourseService {

    saveCourse(course: ICourse): Promise<AxiosResponse<ICourse>> {
        return axios.post<ICourse>(API_URL, course, {headers: authHeader()})
    }

    deleteCourse(course: ICourse): Promise<AxiosResponse<void>> {
        return axios.delete<void>(API_URL + '/' + course.id, {headers: authHeader()})
    }

    getAllCourses(): Promise<AxiosResponse<ICourse[]>> {
        return axios.get<ICourse[]>(API_URL)
    }

}

export default new CourseService()