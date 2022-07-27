import {FC, ReactElement} from "react"
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import IUser from "../models/interfaces/IUser";
import State from "../models/state";


interface Props {
    children: ReactElement
    roles: string[]
}

export const AuthGuard: FC<Props> = ({ children, roles }) => {

    const currentUser: IUser | undefined = useSelector((state: State) => state.user)

    const authorize = () => {
        if (!currentUser) {
            return (<Navigate to={{pathname: '/login'}}/>)
        }

        if (roles?.indexOf(currentUser.role) === -1) {
            return (<Navigate to={{pathname: '/401'}}/>)
        }

        return (children)
    }

    return (authorize())
}