import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {useForm} from "react-hook-form"
import AuthenticationService from '../../services/authentication.service'
import {setCurrentUser} from '../../store/actions/user'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserCircle} from '@fortawesome/free-solid-svg-icons'
import User from '../../models/user'
import IUser from "../../models/interfaces/IUser"
import State from "../../models/state"
import '../register/RegisterPage.css'

const LoginPage = () => {

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const currentUser: IUser | undefined = useSelector((state: State) => state.user)

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<IUser>({
        defaultValues: new User('', '', 'NAME', 'USER', 'TOKEN', 0)
    })

    const navigate = useNavigate()

    const dispatch = useDispatch()

    //mounted
    useEffect(() => {
        if (currentUser?.id) {
            navigate('/profile')
        }
    }, [])

    const handleLogin = (data: IUser) => {
        setLoading(true)

        console.log({data})

        AuthenticationService.login(data).then(response => {
            console.log({response})
            //set user in session.
            dispatch(setCurrentUser(response.data))
            navigate('/profile')
        }).catch(error => {
            console.error({error})
            setErrorMessage('username or password is not valid.')
            setLoading(false)
        })
    }

    return (
        <div className="container mt-5">
            <div className="card ms-auto me-auto p-3 shadow-lg custom-card">

                <FontAwesomeIcon icon={faUserCircle} className="ms-auto me-auto user-icon"/>

                {errorMessage &&
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                }

                <form
                    onSubmit={handleSubmit(handleLogin)}
                    noValidate
                    className={isSubmitted ? 'was-validated' : ''}
                >
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            required
                            {...register("username", {required: "Username is required.", maxLength: 255})}
                        />
                        {errors.username && errors.username.message && <div className="invalid-feedback">
                            {errors.username.message}
                        </div>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Password"
                            required
                            {...register("password", {required: "Password is required.", maxLength: 255})}
                        />
                        {errors.password && errors.password.message && <div className="invalid-feedback">
                            {errors.password.message}
                        </div>}
                    </div>

                    <button
                        className="btn btn-info w-100 mt-3"
                        disabled={loading}>
                        Sign In
                    </button>

                </form>

                <Link to="/register" className="btn btn-link" style={{color: 'darkgray'}}>
                    Create New Account!
                </Link>

            </div>
        </div>
    )
}

export {LoginPage}