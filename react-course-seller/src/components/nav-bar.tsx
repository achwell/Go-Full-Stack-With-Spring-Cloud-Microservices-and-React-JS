import {NavLink, useNavigate} from "react-router-dom"
import logo from '../logo.svg'
import {useDispatch, useSelector} from "react-redux"
import IUser from "../models/interfaces/IUser"
import State from "../models/state"
import {clearCurrentUser} from "../store/actions/user"
import {Role} from "../models/role"

const NavBar = () => {

    const currentUser: IUser | undefined = useSelector((state: State) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch(clearCurrentUser());
        navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <NavLink to="https://reactjs.org" className="navbar-brand ms-1">
                <img src={logo} className="App-logo" alt="logo" />
                React
            </NavLink>

            <div className="navbar-nav me-auto">
                {currentUser?.role === Role.ADMIN &&
                    <li className="nav-item">
                        <NavLink to="/admin" className="nav-link">
                            Admin
                        </NavLink>
                    </li>
                }
                <li className="nav-item">
                    <NavLink to="/home" className="nav-link">
                        Home
                    </NavLink>
                </li>
            </div>

            {!currentUser &&
                <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/register" className="nav-link">
                            Sign Up
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" className="nav-link">
                            Sign In
                        </NavLink>
                    </li>
                </div>
            }

            {currentUser &&
                <div className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <NavLink to="/profile" className="nav-link">
                            {currentUser.name}
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a href="#" className="nav-link" onClick={logout}>
                            Sign Out
                        </a>
                    </li>
                </div>
            }
        </nav>
    )
}
export {NavBar}