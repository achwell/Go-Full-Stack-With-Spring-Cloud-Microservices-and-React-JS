import ICourse from "./interfaces/ICource";

export default class Course implements ICourse {

    createTime: Date
    id: string
    price: number
    subtitle: string
    title: string

    constructor(title: string, subtitle: string, price: number, createTime: Date, id: string) {
        this.title = title
        this.subtitle = subtitle
        this.price = price
        this.createTime = createTime
        this.id = id
    }
}