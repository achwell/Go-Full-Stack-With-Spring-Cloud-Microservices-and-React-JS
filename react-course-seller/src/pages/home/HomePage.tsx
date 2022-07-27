import {useEffect, useState} from "react"
import {useSelector} from "react-redux"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserGraduate} from '@fortawesome/free-solid-svg-icons'
import CourseService from '../../services/course.service'
import PurchaseService from '../../services/purchase.service'
import State from "../../models/state"
import ICourse from "../../models/interfaces/ICource"
import IUser from "../../models/interfaces/IUser"
import Purchase from "../../models/purchase"
import './HomePage.css'

const HomePage = () => {

    const [courseList, setCourseList] = useState<ICourse[]>([])
    const [errorMessage, setErrorMessage] = useState('')
    const [infoMessage, setInfoMessage] = useState('')

    useEffect(() => {
        CourseService.getAllCourses().then((response) => {
            setCourseList(response.data);
        });
    }, [])

    const currentUser: IUser | undefined = useSelector((state: State) => state.user)

    const purchase = (course: ICourse) => {
        if (!currentUser?.id) {
            setErrorMessage('You should login to buy a course.')
            return;
        }

        const purchase = new Purchase(currentUser.id, course.id, course.title, course.price, new Date(), 0)

        PurchaseService.savePurchase(purchase).then(() => {
            setInfoMessage('Mission is completed.')
        }).catch((err) => {
            setErrorMessage('Unexpected error occurred.')
            console.error(err)
        })
    }


    return (
        <div className="container p-3">
            {errorMessage &&
                <div className="alert alert-danger">
                    {errorMessage}
                </div>
            }

            {infoMessage &&
                <div className="alert alert-success">
                    {infoMessage}
                </div>
            }

            <div className="d-flex flex-wrap">
                {courseList.map((item, index) =>
                    <div key={item.id} className="card m-3 home-card">
                        <div className="card-body">
                            <div className="card-title text-uppercase">
                                {item.title}
                            </div>
                            <div className="card-subtitle text-muted">
                                {item.subtitle}
                            </div>
                            <FontAwesomeIcon icon={faUserGraduate} className="ms-auto me-auto course-icon"/>
                            <div className="row mt-2 p-3">
                                <div className="col-6 mt-2 ps-4">
                                    {`${item.price} kr.`}
                                </div>
                                <div className="col-6">
                                    <button
                                        className="btn btn-outline-success w-100"
                                        onClick={() => purchase(item)}>
                                        Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export {HomePage}