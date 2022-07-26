import iUser from "./interfaces/IUser"

export default class User implements iUser {

    username: string
    password: string
    name: string
    role: string
    token: string
    id: string

    constructor(username: string, password: string, name: string, role: string, token: string, id: string) {
        this.username = username
        this.password = password
        this.name = name
        this.role = role
        this.token = token
        this.id = id
    }
}