import IPurchase from "./interfaces/IPurchase"

export default class Purchase implements IPurchase {

    courseId: number
    id: number
    price: number
    purchaseTime: Date
    title: string
    userId: number

    constructor(userId: number, courseId: number, title: string, price: number, purchaseTime: Date, id: number) {
        this.userId = userId
        this.courseId = courseId
        this.title = title
        this.price = price
        this.purchaseTime = purchaseTime
        this.id = id
    }
}