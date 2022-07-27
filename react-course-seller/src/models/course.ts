import ICourse from "./interfaces/ICource";

export default class Course implements ICourse {

    createTime: Date
    id: number
    price: number
    subtitle: string
    title: string

    constructor(title: string, subtitle: string, price: number, createTime: Date, id: number) {
        this.title = title
        this.subtitle = subtitle
        this.price = price
        this.createTime = createTime
        this.id = id
    }
}