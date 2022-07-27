import {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {useSelector} from "react-redux"
import {Link, useNavigate} from "react-router-dom"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUserCircle} from "@fortawesome/free-solid-svg-icons"
import IUser from "../../models/interfaces/IUser"
import AuthenticationService from "../../services/authentication.service"
import './RegisterPage.css'
import State from "../../models/state";

const RegisterPage = () => {

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string>("")

    const {register, handleSubmit, formState: {errors, isSubmitted}} = useForm<IUser>()

    const currentUser: IUser | undefined = useSelector((state: State) => state.user)
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser?.id) {
            navigate("/profile")
        }
    }, [])

    const handleRegister = (data: IUser) => {
        setLoading(true)
        AuthenticationService.register(data).then(_ => {
            navigate('/login')
        }).catch(error => {
            console.error({error})
            if (error?.response?.status === 409) {
                setErrorMessage('username or password is not valid.')
            } else {
                setErrorMessage('Unexpected error occurred.')
            }
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
                    onSubmit={handleSubmit(handleRegister)}
                    noValidate
                    className={isSubmitted ? 'was-validated' : ''}
                >
                    <div className="form-group">
                        <label htmlFor="name">Full Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            required
                            {...register("name", {required: "Full name is required.", maxLength: 255})}
                        />
                        {errors.name && errors.name.message && <div className="invalid-feedback">
                            {errors.name.message}
                        </div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Username"
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
                            type="password"
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
                        Sign Up
                    </button>
                </form>
                <Link to="/login" className="btn btn-link" style={{color: 'darkgray'}}>
                    I have an Account!
                </Link>
            </div>
        </div>
    )
}

export {RegisterPage}