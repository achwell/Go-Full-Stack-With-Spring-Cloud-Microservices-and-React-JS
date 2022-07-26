import IPurchase from "./interfaces/IPurchase"

export default class Purchase implements IPurchase {

    courseId: string
    id: string
    price: number
    purchaseTime: Date
    title: string
    userId: string

    constructor(userId: string, courseId: string, title: string, price: number, purchaseTime: Date, id: string) {
        this.userId = userId
        this.courseId = courseId
        this.title = title
        this.price = price
        this.purchaseTime = purchaseTime
        this.id = id
    }
}