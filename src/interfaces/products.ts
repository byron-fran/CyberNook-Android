import { Review } from "./Review"
import { User } from "./User"

interface UserProduct {
    ProductId : string,
    UserId : string,
    createdAt : string,
    updatedAt : string
}
export interface Product {

    id?: string,
    name: string,
    quantity: number,
    price: number,
    image: string,
    paid?: boolean
    category: string,
    stock?: number,
    unitPrice?: number,
    mark?: string,
    ProductId?:  string,
    Reviews?: Review[],
    description?: string,
    discount: number,
    createdAt?: string,
    favorites? : User[],
    UserId? : string
    UserProduct? : UserProduct,
    users? : User[]

    // Spec?: Specs,
};

